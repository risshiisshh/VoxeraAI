import Link from "next/link";

const LINKS = {
  Product: [
    { label: "How It Works",     href: "/#how-it-works" },
    { label: "AI Assistant",     href: "/assistant" },
    { label: "Election Timeline", href: "/timeline" },
    { label: "Learn Hub",        href: "/learn" },
    { label: "Find Booths",      href: "/booths" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  Connect: [
    { label: "GitHub",  href: "https://github.com" },
    { label: "Twitter", href: "https://twitter.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24 relative z-[1]">
      <div className="section-container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                style={{ background: "linear-gradient(135deg,#F5A623,#D4891A)" }}
              >
                V
              </span>
              <span className="font-extrabold text-lg tracking-tight">
                Voxera<span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="text-sm text-[#B0C0DF] leading-relaxed max-w-xs">
              Know your vote. Own your voice. AI-powered civic education for every Indian citizen.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB8] mb-4">
                {heading}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#B0C0DF] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8A9BB8]">
            © {new Date().getFullYear()} VoxeraAI. All rights reserved.
          </p>
          <p className="text-xs text-[#8A9BB8]">
            Built with ❤ for democracy
          </p>
        </div>
      </div>
    </footer>
  );
}
