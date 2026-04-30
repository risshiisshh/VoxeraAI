import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { getTopicBySlug, getGuidesByTopic, LEARN_TOPICS } from "@/lib/learn-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEARN_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Topic Not Found" };
  return {
    title: topic.title,
    description: topic.description,
  };
}

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const DIFFICULTY_COLOR: Record<string, string> = {
  beginner: "badge-success",
  intermediate: "badge-amber",
  advanced: "badge-blue",
};

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const guides = getGuidesByTopic(slug);

  return (
    <>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="section-container">

          {/* Breadcrumb */}
          <nav className="breadcrumb mb-8" aria-label="Breadcrumb">
            <Link href="/learn" className="breadcrumb-link">Learn Hub</Link>
            <span className="breadcrumb-sep" aria-hidden="true">›</span>
            <span className="text-white font-medium">{topic.title}</span>
          </nav>

          {/* Topic Header */}
          <div className="mb-10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
              style={{ background: `${topic.color}18` }}
              aria-hidden="true"
            >
              {topic.icon}
            </div>
            <span className="badge badge-blue mb-3">Topic</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
              {topic.title}
            </h1>
            <p className="text-[#B0C0DF] mt-3 text-lg max-w-2xl">{topic.description}</p>
            <p className="text-sm text-[#8A9BB8] mt-2">{topic.articleCount} articles in this topic</p>
          </div>

          {/* Difficulty breakdown */}
          <div className="flex flex-wrap gap-3 mb-8">
            {(["beginner", "intermediate", "advanced"] as const).map((d) => {
              const count = guides.filter((g) => g.difficulty === d).length;
              if (count === 0) return null;
              return (
                <div key={d} className={`badge ${DIFFICULTY_COLOR[d]}`}>
                  {DIFFICULTY_LABEL[d]} · {count}
                </div>
              );
            })}
          </div>

          {/* Guides list */}
          <section aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="text-2xl font-bold text-white mb-6">
              All Articles
            </h2>
            <div className="space-y-4">
              {guides.map((guide, i) => (
                <Link
                  key={guide.id}
                  href={`/learn/${slug}/${guide.slug}`}
                  className={`card p-6 flex items-start gap-5 no-underline group animate-fade-up stagger-${Math.min(i + 1, 5)}`}
                  aria-label={`${guide.title} — ${guide.readTime} min read`}
                >
                  {/* Difficulty indicator */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 font-bold"
                    style={{ background: `${topic.color}18`, color: topic.color }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`badge ${DIFFICULTY_COLOR[guide.difficulty]}`}>
                        {guide.difficulty}
                      </span>
                      {guide.source && (
                        <span className="badge badge-muted">Official Source</span>
                      )}
                    </div>
                    <h3 className="font-bold text-white group-hover:text-[#F5A623] transition-colors mb-1">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-[#B0C0DF] leading-relaxed line-clamp-2">{guide.excerpt}</p>
                    {guide.sections && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {guide.sections.slice(0, 3).map((s) => (
                          <span key={s} className="text-xs text-[#8A9BB8] bg-white/[0.04] px-2 py-0.5 rounded-full">
                            {s}
                          </span>
                        ))}
                        {guide.sections.length > 3 && (
                          <span className="text-xs text-[#8A9BB8]">+{guide.sections.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#8A9BB8]">{guide.readTime} min</p>
                    <p className="text-xs text-[#F5A623] group-hover:translate-x-1 transition-transform inline-block mt-2">
                      Read →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Ask AI CTA */}
          <div
            className="mt-12 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-6"
            style={{
              background: "linear-gradient(135deg,#162444 0%,#0F1F3D 100%)",
              border: "1px solid rgba(245,166,35,0.2)",
            }}
          >
            <div className="flex-1 text-center sm:text-left">
              <div className="text-3xl mb-2" aria-hidden="true">🤖</div>
              <h2 className="text-xl font-bold text-white mb-1">Have a question about {topic.title}?</h2>
              <p className="text-[#B0C0DF] text-sm">Ask our AI assistant for a personalised explanation.</p>
            </div>
            <Link
              href={`/assistant?prompt=Explain+${encodeURIComponent(topic.title)}+in+the+context+of+Indian+elections`}
              className="btn-primary whitespace-nowrap"
            >
              Ask AI Assistant →
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
