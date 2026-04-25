const FEATURES = [
  { icon: "⚡", title: "Instant AI answers", description: "Powered by Google Gemini — get accurate civic info in under 3 seconds." },
  { icon: "🗺️", title: "State-specific guidance", description: "Rules differ by state. ElectIQ knows your local laws and deadlines." },
  { icon: "📅", title: "Election timeline tracker", description: "Visual roadmap from registration to results, personalised to your location." },
  { icon: "📚", title: "Structured learn hub", description: "Topic-based guides, quizzes, and explainers from beginner to advanced." },
  { icon: "🔒", title: "100% non-partisan", description: "No endorsements, no bias. Just facts, context, and your rights." },
  { icon: "🌐", title: "Multilingual support", description: "English first — with more languages on the way." },
];

export default function FeatureHighlight() {
  return (
    <section className="py-24 relative z-[1]">
      {/* Background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(15,31,61,0.4) 50%, transparent 100%)" }}
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <span className="badge badge-amber mb-4">Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-6">
              Everything you need to
              <br />
              <span className="text-gradient">vote with confidence</span>
            </h2>
            <p className="text-[#8899BB] text-lg leading-relaxed mb-8">
              VoxeraAI combines AI technology with verified civic data to give you
              a complete civic education platform — no textbooks required.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="p-4 rounded-2xl border border-white/[0.06] hover:border-[#F5A623]/30 hover:bg-[#F5A623]/[0.03] transition-all group"
                >
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
                  <div className="text-xs text-[#8899BB] leading-relaxed">{f.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mock timeline preview */}
          <div className="card p-6 space-y-4" aria-label="Election timeline preview">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white">Your Election Timeline</h3>
              <span className="badge badge-success">
                <span className="live-dot mr-1" aria-hidden="true" />
                Live
              </span>
            </div>

            {[
              { done: true,  label: "Register to Vote",          date: "Mar 15" },
              { done: true,  label: "Research Candidates",        date: "Apr 01" },
              { done: false, label: "Request Mail-in Ballot",     date: "May 05", active: true },
              { done: false, label: "Early Voting Opens",         date: "May 20" },
              { done: false, label: "Election Day",               date: "Jun 03" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all ${
                    item.done
                      ? "bg-[#22C55E] text-white"
                      : item.active
                      ? "bg-[#F5A623] text-[#0A1628] animate-glow-pulse"
                      : "border border-white/20 text-[#4A5A7A]"
                  }`}
                >
                  {item.done ? "✓" : i + 1}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${item.active ? "text-[#F5A623]" : item.done ? "text-[#8899BB] line-through" : "text-white"}`}>
                    {item.label}
                  </div>
                </div>
                <div className="text-xs text-[#4A5A7A]">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
