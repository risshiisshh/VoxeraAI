"use client";
import { useState } from "react";
import Footer from "@/components/layout/Footer";

// Major Indian cities with their coordinates for the map markers
const FEATURED_CITIES = [
  { name: "Delhi",      state: "Delhi",           lat: 28.6139, lng: 77.2090, booths: "13,033" },
  { name: "Mumbai",     state: "Maharashtra",     lat: 19.0760, lng: 72.8777, booths: "10,244" },
  { name: "Bengaluru",  state: "Karnataka",       lat: 12.9716, lng: 77.5946, booths: "8,892"  },
  { name: "Chennai",    state: "Tamil Nadu",       lat: 13.0827, lng: 80.2707, booths: "7,452"  },
  { name: "Kolkata",    state: "West Bengal",     lat: 22.5726, lng: 88.3639, booths: "6,843"  },
  { name: "Hyderabad",  state: "Telangana",       lat: 17.3850, lng: 78.4867, booths: "5,912"  },
  { name: "Ahmedabad",  state: "Gujarat",         lat: 23.0225, lng: 72.5714, booths: "4,611"  },
  { name: "Jaipur",     state: "Rajasthan",       lat: 26.9124, lng: 75.7873, booths: "4,203"  },
  { name: "Lucknow",    state: "Uttar Pradesh",   lat: 26.8467, lng: 80.9462, booths: "5,100"  },
  { name: "Patna",      state: "Bihar",           lat: 25.5941, lng: 85.1376, booths: "3,890"  },
  { name: "Bhopal",     state: "Madhya Pradesh",  lat: 23.2599, lng: 77.4126, booths: "2,744"  },
  { name: "Pune",       state: "Maharashtra",     lat: 18.5204, lng: 73.8567, booths: "4,522"  },
];

export default function BoothsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(FEATURED_CITIES[0]);
  const [mapMode, setMapMode] = useState<"search" | "city">("city");

  const filtered = FEATURED_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase())
  );

  // Build the Google Maps embed URL for the selected city/search
  const mapSrc = mapMode === "search" && search.trim()
    ? `https://maps.google.com/maps?q=${encodeURIComponent(search + " polling booth India")}&output=embed&z=12`
    : `https://maps.google.com/maps?q=${encodeURIComponent(selected.name + " India polling booth voting")}&output=embed&z=12`;

  return (
    <>
      <div className="pt-16 min-h-screen">
        {/* Hero header */}
        <div
          className="relative py-14 px-4 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(22,36,68,0.8) 0%, transparent 100%)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(245,166,35,0.10) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="section-container relative z-10 text-center">
            <span className="badge badge-amber mb-4">🗺️ Booth Locator</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-2 mb-4">
              Find Your Voting Booth
            </h1>
            <p className="text-[#8899BB] text-lg max-w-2xl mx-auto mb-8">
              Locate polling stations across India. Search by city, constituency, or PIN code — then verify at{" "}
              <a
                href="https://voters.eci.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5A623] underline underline-offset-2 hover:opacity-80"
              >
                voters.eci.gov.in
              </a>{" "}
              for your exact booth.
            </p>

            {/* Search bar */}
            <div className="max-w-xl mx-auto relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5A7A] text-lg pointer-events-none">
                🔍
              </span>
              <input
                id="booth-search"
                type="text"
                className="input-base pl-11 pr-32 py-4 text-base rounded-2xl"
                placeholder="Search city, constituency or PIN code…"
                aria-label="Search city, constituency or PIN code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 text-sm py-2 px-5"
                onClick={() => setMapMode("search")}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Main content: map + sidebar */}
        <div className="section-container pb-16">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Sidebar — city list */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="card p-4">
                <h2 className="text-sm font-semibold text-[#8899BB] uppercase tracking-widest mb-4">
                  Major Cities
                </h2>
                <ul className="space-y-1 max-h-[420px] overflow-y-auto">
                  {(search.trim() ? filtered : FEATURED_CITIES).map((city) => (
                    <li key={city.name}>
                      <button
                        id={`booth-city-${city.name.toLowerCase()}`}
                        onClick={() => {
                          setSelected(city);
                          setMapMode("city");
                          setSearch("");
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                          selected.name === city.name && mapMode === "city"
                            ? "bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623]"
                            : "hover:bg-white/[0.04] text-[#8899BB] hover:text-white"
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-sm leading-tight">
                            {city.name}
                          </p>
                          <p className="text-xs text-[#4A5A7A] mt-0.5">{city.state}</p>
                        </div>
                        <span className="text-xs text-[#4A5A7A] group-hover:text-[#8899BB] transition-colors">
                          {city.booths} booths
                        </span>
                      </button>
                    </li>
                  ))}
                  {search.trim() && filtered.length === 0 && (
                    <li className="text-center py-6 text-[#4A5A7A] text-sm">
                      No cities matched. Try the search button to look up on maps.
                    </li>
                  )}
                </ul>
              </div>

              {/* Official link card */}
              <div
                className="card mt-4 p-5"
                style={{ border: "1px solid rgba(245,166,35,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🏛️</span>
                  <span className="font-semibold text-white text-sm">Official ECI Locator</span>
                </div>
                <p className="text-xs text-[#8899BB] mb-4 leading-relaxed">
                  Find your exact booth, polling officer details, and voter slip on the Election Commission of India website.
                </p>
                <a
                  href="https://voters.eci.gov.in/BLO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-sm py-2.5 text-center block"
                >
                  Find My Booth →
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.eci.citizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full text-sm py-2 text-center block mt-2 text-[#8899BB]"
                >
                  📱 Download Voter Helpline App
                </a>
              </div>
            </aside>

            {/* Map embed */}
            <div className="flex-1 min-h-[480px] lg:min-h-0">
              <div className="card overflow-hidden h-full" style={{ minHeight: "480px" }}>
                {/* Map header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {mapMode === "search" && search.trim()
                        ? `Searching: "${search}"`
                        : `${selected.name}, ${selected.state}`}
                    </p>
                    {mapMode === "city" && (
                      <p className="text-xs text-[#4A5A7A] mt-0.5">
                        Approx. {selected.booths} polling stations
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="live-dot" />
                    <span className="text-xs text-[#8899BB]">Google Maps</span>
                  </div>
                </div>

                {/* Map iframe */}
                <div className="relative w-full" style={{ height: "calc(100% - 64px)", minHeight: "420px" }}>
                  <iframe
                    key={mapSrc}
                    src={mapSrc}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Voting booths map — ${selected.name}`}
                  />
                  {/* Overlay gradient at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                    style={{ background: "linear-gradient(to top, #162444 0%, transparent 100%)" }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Info cards row */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: "📋",
                title: "Check Your Voter ID",
                desc: "Verify your Voter ID status and download your e-EPIC card from the official portal.",
                href: "https://voters.eci.gov.in",
                cta: "voters.eci.gov.in",
              },
              {
                icon: "📍",
                title: "Home Voting Available",
                desc: "Citizens aged 85+ and persons with disabilities can vote from home. Contact your BLO.",
                href: "https://eci.gov.in",
                cta: "Learn more →",
              },
              {
                icon: "🕐",
                title: "Booth Timings",
                desc: "Most polling stations operate from 7:00 AM to 6:00 PM on election day. Check local notifications.",
                href: "https://eci.gov.in",
                cta: "eci.gov.in →",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="card p-6 flex flex-col gap-3 hover:border-[#F5A623]/30 transition-all"
              >
                <div className="text-3xl">{card.icon}</div>
                <h3 className="font-bold text-white">{card.title}</h3>
                <p className="text-sm text-[#8899BB] leading-relaxed flex-1">{card.desc}</p>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#F5A623] hover:underline font-medium"
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
