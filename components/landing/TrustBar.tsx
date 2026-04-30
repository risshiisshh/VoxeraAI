const STATS = [
  { value: "50+",   label: "U.S. States" },
  { value: "2026",  label: "Election Cycle" },
  { value: "< 3s",  label: "Average Answer Time" },
  { value: "100%",  label: "Non-partisan" },
  { value: "24/7",  label: "AI Available" },
];

export default function TrustBar() {
  return (
    <section
      className="relative z-[1] py-8 border-y border-white/[0.06]"
      style={{ background: "rgba(22,36,68,0.4)" }}
      aria-label="Trust statistics"
    >
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div>
                <div className="text-2xl font-extrabold text-gradient">{s.value}</div>
                <div className="text-xs text-[#B0C0DF] mt-0.5 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
              <div className="h-8 w-px bg-white/[0.08] last:hidden" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
