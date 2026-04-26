import { NextRequest, NextResponse } from "next/server";
import { streamCivicChat } from "@/lib/gemini";
import { apiLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!apiLimiter.check(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  try {
    const { messages } = await req.json() as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid or empty messages provided" }, { status: 400 });
    }

    // Sanitize and validate messages
    const sanitizedMessages = messages.map(m => ({
      role: m.role,
      content: typeof m.content === "string" ? m.content.substring(0, 4000) : "",
    })).filter(m => m.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: "No valid text content found" }, { status: 400 });
    }

    // Convert to Gemini format (exclude last user message — that's the live prompt)
    const rawHistory = sanitizedMessages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    }));

    // Gemini requires history to start with 'user' — drop any leading model messages
    // (e.g. the welcome message shown before the first user input)
    const firstUserIdx = rawHistory.findIndex((m) => m.role === "user");
    const history = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : [];

    const lastMessage = sanitizedMessages[sanitizedMessages.length - 1].content;

    const stream = await streamCivicChat(history, lastMessage);

    // Return as a ReadableStream (SSE-compatible)
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type":  "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection":    "keep-alive",
      },
    });
    } catch (err: unknown) {
      console.error("Chat API error:", err);
      // Surface rate-limit and capacity errors with a friendly message
      if (err && typeof err === "object" && "status" in err) {
        const status = (err as { status: number }).status;
        if (status === 429) {
          return NextResponse.json(
            { error: "The AI is receiving too many requests. Please wait a moment and try again." },
            { status: 429 }
          );
        } else if (status === 503) {
          return NextResponse.json(
            { error: "The AI is currently experiencing high demand. Please try again in a few moments." },
            { status: 503 }
          );
        }
      }
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
