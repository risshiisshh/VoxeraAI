import { ELECTION_INFO } from "@/lib/election-data";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Election Timeline" };

export default function TimelinePage() {
  const steps = ELECTION_INFO.steps;
  const completedCount = steps.filter((s) => s.status === "completed").length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="section-container">

          {/* Header */}
          <div className="mb-12">
            <span className="badge badge-amber mb-4">Election Roadmap</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2">
              {ELECTION_INFO.name}
            </h1>
            <p className="text-[#8899BB] mt-3 text-lg">{ELECTION_INFO.date}</p>

            {/* Progress bar */}
            <div className="mt-8 max-w-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#8899BB]">Your progress</span>
                <span className="text-sm font-bold text-[#F5A623]">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #F5A623, #FFD580)",
                  }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>

          {/* Horizontal connector line (desktop) */}
          <div className="hidden md:flex items-center justify-between relative mb-8">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-white/10 z-0" aria-hidden="true" />
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                    step.status === "completed"
                      ? "bg-[#22C55E] text-white"
                      : step.status === "active"
                      ? "bg-[#F5A623] text-[#0A1628] animate-glow-pulse"
                      : "bg-[#162444] border border-white/20 text-[#4A5A7A]"
                  }`}
                >
                  {step.status === "completed" ? "✓" : step.icon}
                </div>
                <span className={`text-xs font-semibold text-center max-w-[80px] ${
                  step.status === "active" ? "text-[#F5A623]" : "text-[#8899BB]"
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Step detail cards */}
          <div className="grid gap-4">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`card p-6 md:p-8 ${
                  step.status === "active" ? "card-active border-[#F5A623]/30" : ""
                }`}
              >
                <div className="flex items-start gap-5">
                  {/* Step number */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
                      step.status === "completed"
                        ? "bg-[#22C55E]/20 text-[#22C55E]"
                        : step.status === "active"
                        ? "bg-[#F5A623]/20 text-[#F5A623]"
                        : "bg-white/[0.04] text-[#4A5A7A]"
                    }`}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="text-xs text-[#4A5A7A] uppercase tracking-widest">Step {i + 1}</span>
                      {step.status === "active" && (
                        <span className="badge badge-amber">
                          <span className="live-dot mr-1" aria-hidden="true" />
                          Current
                        </span>
                      )}
                      {step.status === "completed" && (
                        <span className="badge badge-success">Done</span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">{step.title}</h2>
                    <p className="text-[#8899BB] text-sm mb-1">{step.date}</p>
                    <p className="text-[#8899BB] mb-4">{step.description}</p>

                    {step.details && (
                      <ul className="space-y-2">
                        {step.details.map((d, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#8899BB]">
                            <span className="text-[#F5A623] mt-0.5 flex-shrink-0">→</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
