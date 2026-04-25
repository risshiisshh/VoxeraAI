"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { INDIA_STATES } from "@/lib/election-data";
import { ONBOARDING_GOALS, type OnboardingData, type UserRole } from "@/types";
import Footer from "@/components/layout/Footer";

// VoxeraAI uses local storage for onboarding — no account required.
// This makes the experience fully accessible, including for elderly users.

const ROLES: { id: UserRole; label: string; description: string; icon: string }[] = [
  { id: "first-time-voter",  label: "First-Time Voter",  description: "I'm new to voting and want to learn the basics.", icon: "🌱" },
  { id: "experienced-voter", label: "Experienced Voter",  description: "I vote regularly but want to stay better informed.", icon: "🗳️" },
  { id: "civic-educator",    label: "Civic Educator",     description: "I help others understand democracy and elections.", icon: "📚" },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep]   = useState<1 | 2 | 3>(1);
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<OnboardingData>({
    location: { country: "India", state: "" },
    role:     "first-time-voter",
    goals:    [],
  });

  function toggleGoal(id: string) {
    setData((d) => ({
      ...d,
      goals: d.goals.includes(id)
        ? d.goals.filter((g) => g !== id)
        : [...d.goals, id],
    }));
  }

  async function handleFinish() {
    setSaving(true);
    try {
      // Save preferences to localStorage — no account required
      if (typeof window !== "undefined") {
        localStorage.setItem("voxeraai_onboarding", JSON.stringify({
          ...data,
          onboardingComplete: true,
          savedAt: new Date().toISOString(),
        }));
      }
      router.push("/assistant");
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    n < step
                      ? "bg-[#22C55E] text-white"
                      : n === step
                      ? "bg-[#F5A623] text-[#0A1628]"
                      : "bg-white/10 text-[#4A5A7A]"
                  }`}
                  aria-current={n === step ? "step" : undefined}
                >
                  {n < step ? "✓" : n}
                </div>
                {n < 3 && (
                  <div
                    className={`flex-1 h-0.5 transition-all ${n < step ? "bg-[#22C55E]" : "bg-white/10"}`}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1 — Location */}
          {step === 1 && (
            <div className="card p-8 animate-fade-up">
              <h1 className="text-3xl font-extrabold text-white mb-2">Where are you voting?</h1>
              <p className="text-[#8899BB] mb-8">We use this to personalise election info for your state.</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="country" className="text-sm font-medium text-[#8899BB] block mb-1.5">Country</label>
                  <input
                    id="country"
                    className="input-base"
                    value="India"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="state" className="text-sm font-medium text-[#8899BB] block mb-1.5">State</label>
                  <select
                    id="state"
                    className="input-base"
                    value={data.location.state}
                    onChange={(e) => setData((d) => ({ ...d, location: { ...d.location, state: e.target.value } }))}
                  >
                    <option value="">Select your state…</option>
                    {INDIA_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="btn-primary w-full mt-8"
                disabled={!data.location.state}
                onClick={() => setStep(2)}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Role */}
          {step === 2 && (
            <div className="card p-8 animate-fade-up">
              <h2 className="text-3xl font-extrabold text-white mb-2">How do you describe yourself?</h2>
              <p className="text-[#8899BB] mb-8">This helps us tailor the experience to your needs.</p>

              <div className="space-y-4">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    id={`role-${role.id}`}
                    onClick={() => setData((d) => ({ ...d, role: role.id }))}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      data.role === role.id
                        ? "border-[#F5A623]/50 bg-[#F5A623]/10 card-active"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                    }`}
                    aria-pressed={data.role === role.id}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{role.icon}</span>
                      <div>
                        <div className="font-bold text-white">{role.label}</div>
                        <div className="text-sm text-[#8899BB] mt-0.5">{role.description}</div>
                      </div>
                      {data.role === role.id && (
                        <div className="ml-auto w-5 h-5 rounded-full bg-[#F5A623] flex items-center justify-center text-[#0A1628] text-xs">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <button className="btn-ghost flex-1" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary flex-1" onClick={() => setStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {/* Step 3 — Goals */}
          {step === 3 && (
            <div className="card p-8 animate-fade-up">
              <h2 className="text-3xl font-extrabold text-white mb-2">What are your goals?</h2>
              <p className="text-[#8899BB] mb-8">Select all that apply — we&apos;ll surface the most relevant content.</p>

              <div className="grid grid-cols-2 gap-3">
                {ONBOARDING_GOALS.map((g) => (
                  <button
                    key={g.id}
                    id={`goal-${g.id}`}
                    onClick={() => toggleGoal(g.id)}
                    className={`p-4 rounded-2xl border text-left text-sm transition-all ${
                      data.goals.includes(g.id)
                        ? "border-[#F5A623]/50 bg-[#F5A623]/10 text-[#F5A623]"
                        : "border-white/[0.08] text-[#8899BB] hover:border-white/20 hover:text-white"
                    }`}
                    aria-pressed={data.goals.includes(g.id)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <button className="btn-ghost flex-1" onClick={() => setStep(2)}>← Back</button>
                <button
                  className="btn-primary flex-1"
                  disabled={data.goals.length === 0 || saving}
                  onClick={handleFinish}
                >
                  {saving ? "Saving…" : "Finish Setup →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
