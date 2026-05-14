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
    icon: "🇮🇳",
    color: "#1fb8e5",
    gradient: "from-[#1fb8e5]/20 to-[#f6b11b]/5",
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
    icon: "🌍",
    color: "#f6b11b",
    gradient: "from-[#f6b11b]/20 to-[#1fb8e5]/5",
  },
];

export default function Markets() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="markets" className="relative w-full overflow-hidden bg-white py-32">
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
                  <div className="text-5xl mb-4">{market.icon}</div>
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
