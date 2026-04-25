const STEPS = [
  {
    step: "01",
    icon: "📍",
    title: "Set your location & role",
    description:
      "Tell us your state and whether you're a first-time voter, experienced voter, or civic educator. We personalise everything for you.",
    color: "#F5A623",
  },
  {
    step: "02",
    icon: "🤖",
    title: "Ask the AI anything",
    description:
      "Get instant, accurate answers about voter registration, candidates, ballot measures, and your rights — in plain English.",
    color: "#3B82F6",
  },
  {
    step: "03",
    icon: "🗳️",
    title: "Vote with confidence",
    description:
      "Follow your personalised election timeline, explore the Learn Hub, and head to the polls fully informed.",
    color: "#22C55E",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative z-[1]">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge badge-blue mb-4">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
            From confused to confident
            <br />
            <span className="text-gradient">in three steps</span>
          </h2>
          <p className="text-[#8899BB] mt-4 text-lg max-w-xl mx-auto">
            We built VoxeraAI to remove every barrier between you and informed civic participation.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="card p-8 flex flex-col gap-5 group relative overflow-hidden"
            >
              {/* Number watermark */}
              <span
                className="absolute -right-2 -top-4 text-[6rem] font-black opacity-[0.04] select-none"
                aria-hidden="true"
                style={{ color: s.color, lineHeight: 1 }}
              >
                {s.step}
              </span>

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: `${s.color}18` }}
              >
                {s.icon}
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: s.color }}>
                  Step {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#8899BB] text-sm leading-relaxed">{s.description}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
