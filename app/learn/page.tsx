"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { LEARN_TOPICS, LEARN_GUIDES, getFeaturedGuide } from "@/lib/learn-data";

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-amber",
  advanced: "badge-blue",
};

export default function LearnPage() {
  const [query, setQuery] = useState("");
  const featured = getFeaturedGuide();

  // Client-side search filter across topics + guides
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { topics: LEARN_TOPICS, guides: LEARN_GUIDES.slice(0, 6) };
    const topics = LEARN_TOPICS.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
    const guides = LEARN_GUIDES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.topic.toLowerCase().includes(q)
    );
    return { topics, guides };
  }, [query]);

  const totalGuides = LEARN_GUIDES.length;
  const totalTopics = LEARN_TOPICS.length;

  return (
    <>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="section-container">

          {/* Header */}
          <div className="mb-12 animate-fade-up">
            <span className="badge badge-blue mb-4">Learn Hub</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
              Civic education,
              <br />
              <span className="text-gradient">made simple</span>
            </h1>
            <p className="text-[#8899BB] mt-4 text-lg max-w-xl">
              Explore guides, explainers, and quizzes on every aspect of Indian democracy and elections.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-6">
              {[
                { value: totalTopics, label: "Topics" },
                { value: totalGuides, label: "Guides" },
                { value: "AI", label: "Powered" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-[#F5A623]">{value}</span>
                  <span className="text-sm text-[#4A5A7A]">{label}</span>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="mt-6 relative max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5A7A]" aria-hidden="true">🔍</span>
              <input
                id="learn-search"
                type="search"
                placeholder="Search topics, guides…"
                className="input-base pl-10"
                aria-label="Search learn content"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4A5A7A] hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Featured article (only shown when not searching) */}
          {!query && (
            <div className="mb-12 animate-fade-up stagger-1">
              <h2 className="text-sm font-bold text-[#4A5A7A] uppercase tracking-widest mb-4">Featured Guide</h2>
              <Link
                href={`/learn/${featured.topicSlug}/${featured.slug}`}
                className="card p-6 md:p-8 flex flex-col md:flex-row gap-6 no-underline group card-active"
                aria-label={`Featured: ${featured.title}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: "#F5A62318" }}
                  aria-hidden="true"
                >
                  📋
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="badge badge-amber">Start Here</span>
                    <span className={`badge ${DIFFICULTY_COLOR[featured.difficulty]}`}>{featured.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F5A623] transition-colors mb-2">
                    {featured.title}
                  </h3>
                  <p className="text-[#8899BB] leading-relaxed line-clamp-2">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-xs text-[#4A5A7A]">{featured.readTime} min read</span>
                    <span className="text-xs text-[#F5A623] group-hover:translate-x-1 transition-transform inline-block">
                      Read Now →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Topic grid */}
          {filtered.topics.length > 0 && (
            <section aria-labelledby="topics-heading" className="mb-16">
              <h2 id="topics-heading" className="text-2xl font-bold text-white mb-6">
                {query ? `Topics matching "${query}"` : "Browse by Topic"}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.topics.map((topic, i) => (
                  <Link
                    key={topic.id}
                    href={`/learn/${topic.slug}`}
                    className={`card p-6 flex flex-col gap-4 group cursor-pointer no-underline animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                    aria-label={`${topic.title} — ${topic.articleCount} articles`}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${topic.color}18` }}
                      aria-hidden="true"
                    >
                      {topic.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-[#F5A623] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-[#8899BB] mt-1 leading-relaxed">{topic.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
                      <span className="text-xs text-[#4A5A7A]">{topic.articleCount} articles</span>
                      <span className="text-xs text-[#F5A623] group-hover:translate-x-1 transition-transform inline-block">
                        Explore →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Guides */}
          {filtered.guides.length > 0 && (
            <section aria-labelledby="guides-heading" className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 id="guides-heading" className="text-2xl font-bold text-white">
                  {query ? `Guides matching "${query}"` : "Recent Guides"}
                </h2>
                {!query && (
                  <Link href="/learn/voter-registration" className="text-sm text-[#F5A623] hover:opacity-80 transition-opacity">
                    View all →
                  </Link>
                )}
              </div>
              <div className="space-y-4">
                {filtered.guides.map((guide, i) => (
                  <Link
                    key={guide.id}
                    href={`/learn/${guide.topicSlug}/${guide.slug}`}
                    className={`card p-5 flex items-start gap-5 no-underline group animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                    aria-label={`${guide.title} — ${guide.readTime} min read`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`badge ${DIFFICULTY_COLOR[guide.difficulty]}`}>
                          {guide.difficulty}
                        </span>
                        <span className="badge badge-muted">{guide.topic}</span>
                      </div>
                      <h3 className="font-bold text-white group-hover:text-[#F5A623] transition-colors mb-1">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-[#8899BB] leading-relaxed line-clamp-2">{guide.excerpt}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-[#4A5A7A]">{guide.readTime} min read</p>
                      <p className="text-xs text-[#4A5A7A] mt-1">
                        {new Date(guide.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* No results */}
          {query && filtered.topics.length === 0 && filtered.guides.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
              <p className="text-white font-bold text-xl mb-2">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-[#8899BB] mb-6">Try searching for "EVM", "registration", "voter rights", or "Panchayat"</p>
              <button onClick={() => setQuery("")} className="btn-secondary">Clear Search</button>
            </div>
          )}

          {/* Quiz CTA */}
          {!query && (
            <section
              className="rounded-[2rem] p-10 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#162444 0%,#0F1F3D 100%)",
                border: "1px solid rgba(59,130,246,0.25)",
              }}
              aria-label="Take a quiz on Indian civic knowledge"
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="text-4xl mb-4" aria-hidden="true">🧠</div>
                <h2 className="text-3xl font-extrabold text-white mb-3">Test your civic knowledge</h2>
                <p className="text-[#8899BB] mb-6 max-w-md mx-auto">
                  Take a quick quiz to see how much you know about Indian elections — and discover what to learn next.
                </p>
                <Link
                  href="/assistant?prompt=Quiz+me+on+Indian+civic+knowledge+and+elections"
                  className="btn-primary text-base py-3 px-8"
                  id="start-quiz-btn"
                >
                  Start Quiz →
                </Link>
              </div>
            </section>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
