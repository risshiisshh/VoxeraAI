import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden amber-glow-bg"
      aria-label="Hero"
    >
      {/* Radial background glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container w-full py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="animate-fade-up flex items-center gap-2 mb-6">
            <span className="live-dot" aria-hidden="true" />
            <span className="badge badge-amber">AI-Powered Civic Education</span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up stagger-1 text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Know your vote.
            <br />
            <span className="text-gradient">Own your voice.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up stagger-2 text-lg md:text-xl text-[#B0C0DF] leading-relaxed max-w-2xl mb-10">
            VoxeraAI makes civic participation clear and accessible. Ask any question
            about elections, candidates, or your voting rights — and get trustworthy,
            AI-powered answers in seconds.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up stagger-3 flex flex-wrap items-center gap-4 mb-16">
            <Link href="/onboarding" className="btn-primary text-base py-3.5 px-8">
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </Link>
            <Link href="/assistant" className="btn-secondary text-base py-3.5 px-8">
              Ask the AI →
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up stagger-4 grid grid-cols-3 gap-6 max-w-xl">
            {[
              { value: "50+", label: "States covered" },
              { value: "10k+", label: "Questions answered" },
              { value: "100%", label: "Free to use" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-extrabold text-gradient">
                  {stat.value}
                </div>
                <div className="text-sm text-[#B0C0DF] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating mock chat card */}
        <div
          className="animate-float absolute right-8 top-1/2 -translate-y-1/2 w-80 hidden xl:block"
          aria-hidden="true"
        >
          <div className="card p-5 animate-glow-pulse">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0A1628] text-xs font-black">
                AI
              </span>
              <span className="text-sm font-semibold">VoxeraAI Assistant</span>
              <span className="live-dot ml-auto" />
            </div>
            <div className="space-y-3">
              {/* User message */}
              <div className="flex justify-end">
                <div className="bg-[#1D2E52] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[85%]">
                  When is the next election in California?
                </div>
              </div>
              {/* AI reply */}
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] text-xs flex-shrink-0 mt-0.5">
                  V
                </div>
                <div className="bg-[#162444] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-[#B0C0DF] max-w-[85%]">
                  California&apos;s next primary election is in June 2026. Here&apos;s what you need to know to prepare…
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <div className="input-base text-sm text-[#8A9BB8] cursor-text">
                Ask anything about elections…
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
