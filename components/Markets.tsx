"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const markets = [
  {
    title: "Domestic Market",
    subtitle: "Pan-India Distribution",
    desc: "Rivpra Formulations has a robust domestic presence, supplying pharmaceutical products to hospitals, clinics, retail pharmacies, and healthcare institutions across India.",
    points: [
      "Pan-India distribution network",
      "Hospital and institutional supply",
      "Retail pharmacy partnerships",
      "Regional coverage across Indian states",
    ],
    type: "domestic",
    color: "#1fb8e5",
    gradient: "from-[#1fb8e5]/20 to-[#f6b11b]/5",
    contacts: {
      phones: ["8800394441", "8510881144"],
      email: "sales@rivpraformulation.com"
    }
  },
  {
    title: "International Market",
    subtitle: "Global Healthcare Export",
    desc: "With WHO-cGMP certification, Rivpra is positioned to serve global healthcare markets, exporting high-quality generics and formulations to international clients and partners.",
    points: [
      "WHO-cGMP compliant exports",
      "Competitive generic formulations",
      "Documentation & regulatory support",
      "Flexible MOQ for global partners",
    ],
    type: "international",
    color: "#f6b11b",
    gradient: "from-[#f6b11b]/20 to-[#1fb8e5]/5",
    contacts: {
      phones: ["9718540207", "9311400851"],
      email: "bd@rivpraformulation.com"
    }
  },
];

function MarketIcon({ type }: { type: string }) {
  switch (type) {
    case "domestic":
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-lg">
          <defs>
            <linearGradient id="domGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <radialGradient id="domGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1fb8e5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1fb8e5" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="78" rx="35" ry="12" fill="url(#domGlow)" />
          <path d="M25 65 Q 40 45, 50 45 Q 60 45, 75 65" fill="none" stroke="#e0f2fe" strokeWidth="2" strokeDasharray="3,3" opacity="0.8" />
          <path d="M35 70 Q 50 55, 50 45" fill="none" stroke="#e0f2fe" strokeWidth="2" strokeDasharray="3,3" opacity="0.8" />
          <circle cx="25" cy="65" r="4" fill="#38bdf8" />
          <circle cx="75" cy="65" r="4" fill="#38bdf8" />
          <path d="M50 15 C36 15 26 25 26 39 C26 53 44 71 48 75 C49 76 51 76 52 75 C56 71 74 53 74 39 C74 25 64 15 50 15 Z" fill="url(#domGrad)" />
          <circle cx="50" cy="39" r="12" fill="#ffffff" opacity="0.85" />
          <g transform="translate(42, 33) scale(0.16)">
            <path d="M0 10 L100 10 L100 35 L0 35 Z" fill="#ff9933" />
            <path d="M0 35 L100 35 L100 65 L0 65 Z" fill="#ffffff" />
            <path d="M0 65 L100 65 L100 90 L0 90 Z" fill="#128807" />
            <circle cx="50" cy="50" r="12" fill="none" stroke="#000080" strokeWidth="2" />
            <circle cx="50" cy="50" r="2" fill="#000080" />
            <path d="M50 38 L50 62 M38 50 L62 50 M41.5 41.5 L58.5 58.5 M41.5 58.5 L58.5 41.5" stroke="#000080" strokeWidth="1" />
          </g>
        </svg>
      );
    case "international":
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-lg">
          <defs>
            <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <radialGradient id="globeHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f6b11b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f6b11b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="78" rx="35" ry="12" fill="url(#globeGlow)" />
          <circle cx="50" cy="46" r="28" fill="url(#globeGrad)" />
          <circle cx="50" cy="46" r="28" fill="url(#globeHighlight)" />
          <path d="M50 18 A 12 28 0 0 0 50 74 A 12 28 0 0 0 50 18 Z" fill="none" stroke="#78350f" strokeWidth="1.5" opacity="0.3" />
          <path d="M50 18 A 24 28 0 0 0 50 74 A 24 28 0 0 0 50 18 Z" fill="none" stroke="#78350f" strokeWidth="1.5" opacity="0.15" />
          <path d="M22 46 L78 46" fill="none" stroke="#78350f" strokeWidth="1.5" opacity="0.3" />
          <path d="M24.5 34 A 25 12 0 0 0 75.5 34" fill="none" stroke="#78350f" strokeWidth="1.5" opacity="0.2" />
          <path d="M24.5 58 A 25 12 0 0 1 75.5 58" fill="none" stroke="#78350f" strokeWidth="1.5" opacity="0.2" />
          <path d="M12 55 C12 35, 88 20, 88 45 C88 65, 12 75, 12 55" fill="none" stroke="#f6b11b" strokeWidth="3" strokeLinecap="round" />
          <circle cx="82" cy="38" r="4.5" fill="#ffffff" />
          <circle cx="82" cy="38" r="8" fill="#f6b11b" opacity="0.5" />
        </svg>
      );
    default:
      return <MarketFallbackIcon />;
  }
}

function MarketFallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="mktFailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="35" fill="url(#mktFailGrad)" />
      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">?</text>
    </svg>
  );
}

export default function Markets() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="markets" className="relative w-full overflow-hidden bg-white py-12">
      {/* Decorative diagonal */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-6">
            Market Reach
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-950 leading-tight mb-6">
            Domestic &{" "}
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              International
            </span>
            <br />
            Markets
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed font-light">
            From local healthcare to global pharmaceutical supplies — Rivpra&apos;s
            quality reaches across borders.
          </p>
        </motion.div>

        {/* Market Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {markets.map((market, i) => (
            <motion.div
              key={market.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className={`group relative p-10 rounded-3xl border border-slate-200 bg-gradient-to-br ${market.gradient} backdrop-blur-sm overflow-hidden cursor-default`}
            >
              {/* Glow */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: market.color, opacity: 0.08 }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  {/* 3D Animated Icon */}
                  <motion.div
                    className="relative mb-6 flex-shrink-0 w-14 h-14"
                    style={{ perspective: 400 }}
                    animate={{
                      y: [0, -4, 0],
                      rotateY: [0, 8, -8, 0]
                    }}
                    transition={{
                      duration: 4.5 + (i * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotateY: 15,
                      z: 20
                    }}
                  >
                    <MarketIcon type={market.type} />
                  </motion.div>
                  <h3 className="text-slate-950 font-black text-2xl mb-1">
                    {market.title}
                  </h3>
                  <div
                    className="text-sm font-semibold tracking-wide"
                    style={{ color: market.color }}
                  >
                    {market.subtitle}
                  </div>
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{
                    borderColor: market.color,
                    background: `${market.color}15`,
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: market.color }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light">
                {market.desc}
              </p>

              {/* Points */}
              <ul className="space-y-3">
                {market.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: market.color }}
                    />
                    <span className="text-slate-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Contact section in Markets Card */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-slate-800 font-bold text-xs uppercase tracking-wider mb-3">
                  Inquiries & Sales Support
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">Mob:</span>
                    {market.contacts.phones.map((phone, idx) => (
                      <span key={phone}>
                        <a href={`tel:+91${phone}`} className="text-slate-700 hover:text-[#1fb8e5] font-semibold transition-colors">
                          {phone}
                        </a>
                        {idx < market.contacts.phones.length - 1 && " / "}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">Email:</span>
                    <a href={`mailto:${market.contacts.email}`} className="text-slate-700 hover:text-[#1fb8e5] font-semibold transition-colors">
                      {market.contacts.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 rounded-3xl border border-[#f6b11b]/20 bg-gradient-to-r from-[#f6b11b]/8 to-[#ddd82a]/5 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="text-[#f6b11b] font-bold text-lg mb-1">
              Looking to partner with us?
            </div>
            <div className="text-slate-500 text-sm">
              Reach out to explore contract manufacturing and supply opportunities.
            </div>
          </div>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-shrink-0 px-7 py-3.5 rounded-full border border-[#f6b11b]/50 text-[#f6b11b] text-sm font-semibold hover:bg-[#f6b11b]/10 transition-all duration-300 whitespace-nowrap"
          >
            Contact Us →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
