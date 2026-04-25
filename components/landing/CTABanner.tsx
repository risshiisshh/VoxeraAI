import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-24 relative z-[1]" aria-label="Call to action">
      <div className="section-container">
        <div
          className="relative rounded-[3rem] p-12 md:p-16 overflow-hidden text-center"
          style={{
            background: "linear-gradient(135deg, #162444 0%, #0F1F3D 100%)",
            border: "1px solid rgba(245,166,35,0.2)",
            boxShadow: "0 0 80px rgba(245,166,35,0.08)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(245,166,35,0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <span className="badge badge-amber mb-6">Start for free</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              Your vote is your
              <br />
              <span className="text-gradient">superpower</span>
            </h2>
            <p className="text-[#8899BB] text-xl max-w-2xl mx-auto mb-10">
              Join thousands of citizens who use VoxeraAI to stay informed,
              understand their rights, and participate in democracy.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/onboarding" className="btn-primary text-lg py-4 px-10">
                Get Started — It&apos;s Free
              </Link>
              <Link href="/assistant" className="btn-secondary text-lg py-4 px-10">
                Try AI Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
