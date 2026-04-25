import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFirebaseDb } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

// Rate limiting: track requests per IP (in-memory, resets on server restart)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS_PER_MINUTE = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_MINUTE) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before generating another article." },
        { status: 429 }
      );
    }

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
      systemInstruction: `You are a civic education content writer for VoxeraAI, an app that helps Indian citizens understand elections and democracy.
Write detailed, accurate, factual articles about Indian elections and civic processes.
Always cite official Indian government sources (eci.gov.in, sansad.in, panchayat.gov.in, etc.).
Format articles using markdown: use # for the title, ## for sections, ### for subsections.
Include bullet points, numbered lists, bold text for key terms, and blockquotes for official quotes.
Add a "📌 Key Takeaways" section at the end with 3–5 bullet points.
Add a "🔗 Official Sources" section at the very end with relevant government URLs.
Be completely non-partisan. Do not endorse any political party or candidate.
Write in clear, accessible English appropriate for Indian voters of all education levels.
Aim for 600–900 words of substantive content.`,
    });

    const result = await model.generateContent(
      `Write a civic education article for Indian voters.\n\nTitle: ${title}\n\n${contentPrompt}`
    );

    const markdown = result.response.text();

    if (!markdown) {
      return NextResponse.json({ error: "Failed to generate article content" }, { status: 500 });
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
