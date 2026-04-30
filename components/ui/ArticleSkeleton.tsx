export default function ArticleSkeleton() {
  return (
    <div className="animate-fade-in space-y-6" aria-label="Loading article content" aria-busy="true">
      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="skeleton h-9 w-3/4 rounded-xl" />
        <div className="skeleton h-9 w-1/2 rounded-xl" />
      </div>

      {/* Meta row */}
      <div className="flex gap-3 mt-2">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-24 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>

      {/* Intro paragraph */}
      <div className="space-y-2 mt-6">
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-5/6 rounded-lg" />
      </div>

      {/* Section heading */}
      <div className="skeleton h-6 w-2/5 rounded-lg mt-8" />

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-4/5 rounded-lg" />
      </div>

      {/* Bullet list */}
      <div className="space-y-2 pl-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-2">
            <div className="skeleton h-3 w-3 rounded-full flex-shrink-0" />
            <div
              className="skeleton h-4 rounded-lg"
              style={{ width: `${60 + n * 10}%` }}
            />
          </div>
        ))}
      </div>

      {/* Section heading 2 */}
      <div className="skeleton h-6 w-1/3 rounded-lg mt-8" />

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-4 w-full rounded-lg" />
      </div>

      {/* Generating message */}
      <div className="flex items-center gap-3 mt-8 py-4 px-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex gap-1">
          {[0, 1, 2].map((d) => (
            <div
              key={d}
              className="w-2 h-2 rounded-full bg-[#F5A623]"
              style={{
                animation: "bounce 1.2s ease-in-out infinite",
                animationDelay: `${d * 0.2}s`,
              }}
            />
          ))}
        </div>
        <span className="text-sm text-[#8A9BB8]">Generating article with AI…</span>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
