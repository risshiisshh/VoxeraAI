"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Message } from "@/types";
import Image from "next/image";
import { ELECTION_INFO } from "@/lib/election-data";
import { useAuth } from "@/lib/hooks/useAuth";
import { useLanguage } from "@/lib/language-context";
import AuthModal from "@/components/ui/AuthModal";


const SUGGESTIONS = [
  "How do I register to vote online?",
  "What is the role of the Election Commission?",
  "When is the next Lok Sabha election?",
  "How does EVM and VVPAT work?",
];

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-center px-4 py-3" role="status" aria-label="AI is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-[#F5A623] animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export default function AssistantPage() {
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const [showAuth, setShowAuth] = useState(false);

  const [messages, setMessages] = useState<Message[]>([{
    id: "welcome",
    role: "assistant",
    content: "👋 Hi! I'm your VoxeraAI assistant. Ask me anything about Indian elections, voter registration, candidates, or your civic rights.",
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || streaming) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setStreaming(true);

    const aiId = crypto.randomUUID();
    setMessages((p) => [...p, { id: aiId, role: "assistant", content: "", timestamp: new Date(), loading: true }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          language: language.label,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Something went wrong." }));
        setMessages((p) => p.map((m) => m.id === aiId ? { ...m, content: error ?? "Something went wrong.", loading: false } : m));
        return;
      }

      if (!res.body) throw new Error("No body");

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of dec.decode(value).split("\n\n").filter(Boolean)) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") break;
          try {
            const { text: chunk } = JSON.parse(raw) as { text: string };
            full = full + chunk;
            const currentFull = full;
            setMessages((p) => p.map((m) => m.id === aiId ? { ...m, content: currentFull, loading: false } : m));
          } catch {
            // ignore parse errors on partial chunks
          }
        }
      }
    } catch {
      setMessages((p) => p.map((m) =>
        m.id === aiId ? { ...m, content: "Sorry, something went wrong. Please try again.", loading: false } : m
      ));
    } finally {
      setStreaming(false);
    }
  }, [messages, streaming, language]);

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)] mt-16">
        {/* Sidebar */}
        <aside aria-label="Chat sessions" className="w-72 hidden lg:flex flex-col border-r border-white/[0.06] p-4 gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#B0C0DF] uppercase tracking-widest">Chats</h2>
            <button
              className="badge badge-amber cursor-pointer"
              aria-label="Start new chat"
              onClick={() => setMessages([{
                id: "welcome",
                role: "assistant",
                content: "👋 Hi! Ask me anything about Indian elections.",
                timestamp: new Date(),
              }])}
            >
              + New
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20">
            <p className="text-sm text-white truncate">Current conversation</p>
            <p className="text-xs text-[#B0C0DF] mt-0.5">{messages.length} messages</p>
          </div>

          <div className="mt-auto border-t border-white/[0.06] pt-4">
            {!loading && (
              user ? (
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border border-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] text-sm font-black">
                      {(user.displayName ?? user.email ?? "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.displayName}</p>
                    <p className="text-xs text-[#8A9BB8] truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#8A9BB8] text-sm font-black">
                      👤
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">Guest</p>
                      <p className="text-xs text-[#8A9BB8]">Progress not saved</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAuth(true)}
                    className="text-xs font-medium text-[#F5A623] hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              )
            )}
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06] glass">
            <div
              className="w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0A1628] font-black"
              aria-hidden="true"
            >
              V
            </div>
            <div>
              <h1 className="font-bold text-white">VoxeraAI Assistant</h1>
              <div className="flex items-center gap-1.5 text-xs text-[#B0C0DF]">
                <span className="live-dot" aria-hidden="true" />
                Powered by Gemini · Non-partisan · {language.nativeName}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fade-up ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="w-8 h-8 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] text-xs font-black flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    V
                  </div>
                )}
                <div
                  className={`max-w-[72%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#1D2E52] text-white rounded-tr-sm"
                      : "bg-[#162444] text-[#E0EAFF] rounded-tl-sm"
                  }`}
                >
                  {msg.loading ? <TypingIndicator /> : <span className="whitespace-pre-wrap">{msg.content}</span>}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-6 pb-2 flex flex-wrap gap-2" aria-label="Suggested questions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="badge badge-blue cursor-pointer text-xs"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="px-6 pb-6 pt-2">
            <div className="flex items-end gap-3 p-3 rounded-2xl border border-white/[0.08] bg-[#162444] focus-within:border-[#F5A623]/50 transition-colors">
              <textarea
                id="chat-input"
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-[#8A9BB8] text-sm resize-none outline-none py-1 max-h-40"
                placeholder="Ask anything about elections…"
                aria-label="Ask anything about elections"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                disabled={streaming}
              />
              <button
                className="btn-primary py-2 px-4 text-sm"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || streaming}
                aria-label="Send message"
              >
                {streaming ? "…" : "Send"}
              </button>
            </div>
            <p className="text-xs text-[#8A9BB8] text-center mt-2">
              VoxeraAI may make mistakes. Verify at voters.eci.gov.in.
            </p>
          </div>
        </div>

        {/* Mini timeline */}
        <aside
          aria-label="Election timeline"
          className="w-80 hidden xl:flex flex-col border-l border-white/[0.06] p-5 gap-4 overflow-y-auto"
        >
          <h2 className="text-sm font-semibold text-[#B0C0DF] uppercase tracking-widest">Election Timeline</h2>
          {ELECTION_INFO.steps.map((step, i) => (
            <div key={step.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${
                    step.status === "completed"
                      ? "bg-[#22C55E] text-white"
                      : step.status === "active"
                      ? "bg-[#F5A623] text-[#0A1628]"
                      : "border border-white/20 text-[#8A9BB8]"
                  }`}
                  aria-label={`${step.title} — ${step.status}`}
                >
                  {step.status === "completed" ? "✓" : step.icon}
                </div>
                {i < ELECTION_INFO.steps.length - 1 && (
                  <div
                    className={`w-0.5 h-6 ${step.status === "completed" ? "bg-[#22C55E]" : "bg-white/10"}`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="pb-2">
                <p className={`text-sm font-medium ${step.status === "active" ? "text-[#F5A623]" : "text-white"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-[#8A9BB8] mt-0.5">{step.date}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
