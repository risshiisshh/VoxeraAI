"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import ArticleSkeleton from "@/components/ui/ArticleSkeleton";
import { useProgress } from "@/lib/hooks/useProgress";
import { getGuideBySlug, getTopicBySlug, getRelatedGuides } from "@/lib/learn-data";

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-amber",
  advanced: "badge-blue",
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export default function ArticlePage() {
  const params = useParams() as { slug: string; article: string };
  const guide = getGuideBySlug(params.article);
  const topic = guide ? getTopicBySlug(guide.topicSlug) : null;
  const related = guide ? getRelatedGuides(guide) : [];

  const { isRead, markAsRead, loading: progressLoading } = useProgress();
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markedRead, setMarkedRead] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLElement | null>(null);
  const alreadyFetched = useRef(false);

  // If guide not found, show 404
  if (!guide || !topic) {
    notFound();
  }

  // Track scroll-based reading progress
  useEffect(() => {
    function handleScroll() {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight;
      const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.5);
      setReadProgress(Math.min(100, Math.round((scrolled / total) * 100)));
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-mark as read when 80% scrolled
  useEffect(() => {
    if (readProgress >= 80 && !markedRead && !progressLoading) {
      setTimeout(() => setMarkedRead(true), 0);
      markAsRead(guide.id);
    }
  }, [readProgress, markedRead, progressLoading, guide.id, markAsRead]);

  // Fetch or generate article content
  useEffect(() => {
    if (alreadyFetched.current) return;
    alreadyFetched.current = true;

    async function fetchArticle() {
      setGenerating(true);
      try {
        const res = await fetch("/api/learn/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guideId: guide!.id,
            contentPrompt: guide!.contentPrompt,
            title: guide!.title,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Failed to load article.");
        } else {
          setMarkdown(data.markdown);
        }
      } catch {
        setError("A network error occurred. Please try again.");
      } finally {
        setGenerating(false);
      }
    }

    fetchArticle();
  }, [guide]);

  // Extract headings for table of contents
  const headings = markdown
    ? markdown
        .split("\n")
        .filter((l) => /^#{1,3} /.test(l))
        .map((l) => {
          const level = l.match(/^#+/)?.[0].length ?? 1;
          const text = l.replace(/^#+\s*/, "");
          return { level, text, id: slugify(text) };
        })
    : guide.sections?.map((s) => ({ level: 2, text: s, id: slugify(s) })) ?? [];

  const isAlreadyRead = !progressLoading && isRead(guide.id);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#FFD580] z-50 transition-all duration-300"
        style={{ width: `${readProgress}%` }}
        role="progressbar"
        aria-valuenow={readProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <div className="pt-24 pb-16 min-h-screen">
        <div className="section-container">

          {/* Breadcrumb */}
          <nav className="breadcrumb mb-8" aria-label="Breadcrumb">
            <Link href="/learn" className="breadcrumb-link">Learn Hub</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <Link href={`/learn/${topic.slug}`} className="breadcrumb-link">{topic.title}</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <span className="text-white font-medium line-clamp-1">{guide.title}</span>
          </nav>

          <div className="flex gap-12 items-start">

            {/* Main article */}
            <article ref={articleRef} className="flex-1 min-w-0">
              {/* Article header */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`badge ${DIFFICULTY_COLOR[guide.difficulty]}`}>
                    {guide.difficulty}
                  </span>
                  <span className="badge badge-blue">{topic.title}</span>
                  {isAlreadyRead && (
                    <span className="badge badge-success">✓ Read</span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
                  {guide.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4A5A7A]">
                  <span>{guide.readTime} min read</span>
                  <span>·</span>
                  <span>{new Date(guide.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
                  {guide.source && (
                    <>
                      <span>·</span>
                      <a
                        href={guide.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F5A623] hover:opacity-80 transition-opacity"
                      >
                        Official Source ↗
                      </a>
                    </>
                  )}
                </div>

                <p className="text-[#8899BB] text-lg leading-relaxed mt-4 border-l-4 border-[#F5A623]/40 pl-4">
                  {guide.excerpt}
                </p>
              </header>

              {/* Article content */}
              <div className="card p-6 md:p-8">
                {generating && <ArticleSkeleton />}
                {error && !generating && (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4" aria-hidden="true">⚠️</div>
                    <p className="text-[#8899BB] mb-6">{error}</p>
                    <button
                      onClick={() => {
                        alreadyFetched.current = false;
                        setError(null);
                        setMarkdown(null);
                      }}
                      className="btn-secondary"
                    >
                      Try Again
                    </button>
                  </div>
                )}
                {markdown && !generating && (
                  <MarkdownRenderer markdown={markdown} />
                )}
              </div>

              {/* Mark as read button (manual) */}
              {!progressLoading && !isAlreadyRead && !markedRead && markdown && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => { setMarkedRead(true); markAsRead(guide.id); }}
                    className="btn-secondary"
                    id="mark-read-btn"
                  >
                    ✓ Mark as Read
                  </button>
                </div>
              )}
              {(isAlreadyRead || markedRead) && markdown && (
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-sm font-medium">
                    <span>✓</span>
                    <span>Marked as Read</span>
                  </div>
                </div>
              )}

              {/* Navigation between articles */}
              <div className="mt-10 flex justify-between gap-4">
                <Link href={`/learn/${topic.slug}`} className="btn-ghost text-sm">
                  ← Back to {topic.title}
                </Link>
                <Link
                  href={`/assistant?prompt=Tell+me+more+about+${encodeURIComponent(guide.title)}`}
                  className="btn-secondary text-sm"
                >
                  Ask AI about this →
                </Link>
              </div>

              {/* Related guides */}
              {related.length > 0 && (
                <section className="mt-12" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-xl font-bold text-white mb-4">
                    Related Articles
                  </h2>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/learn/${r.topicSlug}/${r.slug}`}
                        className="card p-4 flex items-center gap-4 no-underline group"
                      >
                        <div className="flex-1 min-w-0">
                          <span className={`badge ${DIFFICULTY_COLOR[r.difficulty]} mb-1`}>{r.difficulty}</span>
                          <h3 className="font-semibold text-white group-hover:text-[#F5A623] transition-colors text-sm">
                            {r.title}
                          </h3>
                        </div>
                        <span className="text-xs text-[#F5A623] group-hover:translate-x-1 transition-transform flex-shrink-0">
                          Read →
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Table of contents sidebar (desktop) */}
            {headings.length > 0 && (
              <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-28 self-start" aria-label="Table of contents">
                <div className="card p-4">
                  <p className="text-xs font-bold text-[#4A5A7A] uppercase tracking-widest mb-3">In This Article</p>
                  <nav>
                    <ul className="space-y-1">
                      {headings.map((h) => (
                        <li key={h.id} style={{ paddingLeft: `${(h.level - 1) * 0.75}rem` }}>
                          <a
                            href={`#${h.id}`}
                            className="toc-link text-xs leading-snug block py-1"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
