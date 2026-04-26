import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import { getFirebaseDb } from "@/lib/firebase";
import { apiLimiter } from "@/lib/rate-limit";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const articleSchema: Schema = {
  description: "A civic education article structure",
  type: SchemaType.OBJECT,
  properties: {
    title: { type: SchemaType.STRING },
    sections: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          heading: { type: SchemaType.STRING },
          content: { type: SchemaType.STRING, description: "Markdown formatted content for this section" }
        },
        required: ["heading", "content"]
      }
    },
    keyTakeaways: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING }
    },
    officialSources: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          url: { type: SchemaType.STRING }
        },
        required: ["title", "url"]
      }
    }
  },
  required: ["title", "sections", "keyTakeaways", "officialSources"]
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!apiLimiter.check(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  try {
    const { guideId, contentPrompt, title } = (await req.json()) as {
      guideId: string;
      contentPrompt: string;
      title: string;
    };

    if (!guideId || !contentPrompt || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── 1. Check Firestore cache ──────────────────────────────
    const db = getFirebaseDb();
    const articleRef = doc(db, "articles", guideId);
    const cached = await getDoc(articleRef);

    if (cached.exists()) {
      const data = cached.data();
      return NextResponse.json({ markdown: data.markdown, cached: true });
    }

    // ── 2. Generate with Gemini ──────────────────────────────
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: articleSchema,
      },
      systemInstruction: `You are a civic education content writer for VoxeraAI, an app that helps Indian citizens understand elections and democracy.
Write detailed, accurate, factual articles about Indian elections and civic processes.
Always cite official Indian government sources (eci.gov.in, sansad.in, panchayat.gov.in, etc.).
Be completely non-partisan. Do not endorse any political party or candidate.
Write in clear, accessible English appropriate for Indian voters of all education levels.
Aim for 600–900 words of substantive content.`,
    });

    const result = await model.generateContent(
      `Write a civic education article for Indian voters.\n\nTitle: ${title}\n\n${contentPrompt}`
    );

    const jsonText = result.response.text();
    if (!jsonText) {
      return NextResponse.json({ error: "Failed to generate article content" }, { status: 500 });
    }

    const articleData = JSON.parse(jsonText) as {
      title: string;
      sections: { heading: string; content: string }[];
      keyTakeaways: string[];
      officialSources: { title: string; url: string }[];
    };

    let markdown = `# ${articleData.title}\n\n`;
    for (const section of articleData.sections) {
      markdown += `## ${section.heading}\n\n${section.content}\n\n`;
    }
    
    if (articleData.keyTakeaways && articleData.keyTakeaways.length > 0) {
      markdown += `## 📌 Key Takeaways\n\n`;
      for (const takeaway of articleData.keyTakeaways) {
        markdown += `- ${takeaway}\n`;
      }
      markdown += `\n`;
    }

    if (articleData.officialSources && articleData.officialSources.length > 0) {
      markdown += `## 🔗 Official Sources\n\n`;
      for (const source of articleData.officialSources) {
        markdown += `- [${source.title}](${source.url})\n`;
      }
      markdown += `\n`;
    }

    // ── 3. Cache in Firestore ────────────────────────────────
    try {
      await setDoc(articleRef, {
        guideId,
        markdown,
        generatedAt: new Date().toISOString(),
        source: "gemini-2.5-flash",
      });
    } catch (firestoreErr) {
      // Cache failure is non-fatal — still return the content
      console.warn("Firestore cache write failed:", firestoreErr);
    }

    return NextResponse.json({ markdown, cached: false });
  } catch (err: unknown) {
    console.error("Learn generate API error:", err);

    if (err && typeof err === "object" && "status" in err) {
      const status = (err as { status: number }).status;
      if (status === 429) {
        return NextResponse.json(
          { error: "The AI is receiving too many requests. Please wait a moment and try again." },
          { status: 429 }
        );
      }
      if (status === 503) {
        return NextResponse.json(
          { error: "The AI is currently experiencing high demand. Please try again in a few moments." },
          { status: 503 }
        );
      }
    }

    return NextResponse.json({ error: "Failed to generate article content" }, { status: 500 });
  }
}
