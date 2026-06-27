"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  {
    type: "generic",
    title: "Generic & Branded Generic",
    desc: "Complete product pipeline from development to commercial manufacturing.",
    color: "#1fb8e5"
  },
  {
    type: "cosmetics",
    title: "Nutraceutical & Cosmetics",
    desc: "Creams, ointments, lotions, gels, multivitamins & mineral formulations.",
    color: "#f6b11b"
  },
  {
    type: "manufacturing",
    title: "Contract Manufacturing",
    desc: "Trusted CMO partner for domestic and international pharma brands.",
    color: "#ddd82a"
  },
  {
    type: "licensing",
    title: "Licensing & Development",
    desc: "End-to-end formulation development and regulatory licensing support.",
    color: "#1fb8e5"
  },
];

function AboutIcon({ type }: { type: string }) {
  switch (type) {
    case "generic":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="abtTabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="30" fill="url(#abtTabGrad)" />
          <path d="M20 50 L80 50" stroke="#ffffff" strokeWidth="3.5" opacity="0.4" />
        </svg>
      );
    case "cosmetics":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="abtCosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
          </defs>
          <rect x="34" y="40" width="32" height="46" rx="5" fill="url(#abtCosGrad)" />
          <path d="M42 40 L42 26 L50 26 L50 40" stroke="#94a3b8" strokeWidth="3" />
          <path d="M46 16 L54 16 L54 26 L46 26 Z" fill="#cbd5e1" />
        </svg>
      );
    case "manufacturing":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="abtFacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <path d="M20 54 L68 54 L78 64 L78 86 L20 86 Z" fill="url(#abtFacGrad)" />
          <path d="M20 54 L32 42 L32 54 L44 42 L44 54 L56 42 L56 54 L68 54" fill="url(#abtFacGrad)" />
          <rect x="36" y="24" width="8" height="30" fill="#64748b" />
          <rect x="48" y="18" width="8" height="36" fill="#64748b" />
        </svg>
      );
    case "licensing":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="abtLicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          <rect x="28" y="20" width="44" height="60" rx="6" fill="url(#abtLicGrad)" />
          <rect x="40" y="14" width="20" height="8" rx="2" fill="#475569" />
          <line x1="38" y1="36" x2="62" y2="36" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
          <line x1="38" y1="48" x2="62" y2="48" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
          <line x1="38" y1="60" x2="54" y2="60" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    default:
      return <AboutFallbackIcon />;
  }
}

function AboutFallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="abtFailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="30" fill="url(#abtFailGrad)" />
      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">?</text>
    </svg>
  );
}

function AnimatedStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="text-center"
    >
      <div className="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text mb-2">
        {value}
      </div>
      <div className="text-slate-500 text-sm tracking-widest uppercase font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative w-full overflow-hidden bg-white py-12">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#f6b11b]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-6">
                Who We Are
              </span>

              <h2 className="text-4xl lg:text-6xl font-black text-slate-950 leading-tight mb-6">
                Integrated
                <br />
                <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
                  Pharmaceutical
                </span>
                <br />
                Excellence
              </h2>

              <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-6 font-light">
                Established in <span className="text-[#f6b11b] font-medium">2008</span>, Rivpra
                Formulations is a{" "}
                <span className="text-slate-950 font-medium">debt-free, profit-making</span> ISO-certified
                pharmaceutical company with state-of-the-art infrastructure built in compliance
                with WHO-cGMP standards.
              </p>

              <p className="text-slate-500 text-sm lg:text-base leading-relaxed mb-10 font-light">
                Our core competency lies in the development and manufacture of highly effective,
                affordable medicines to treat various ailments. We serve as a trusted service
                provider for contract pharma manufacturing across India and international markets.
              </p>

              {/* Certifications */}
              <div className="flex flex-wrap gap-3">
                {["ISO Certified", "WHO-cGMP", "Debt-Free", "Profit-Making"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold border border-slate-200 text-slate-600 bg-slate-50"
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* Right — cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative p-6 rounded-2xl border border-slate-200 bg-white backdrop-blur-sm overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1fb8e5]/10 to-[#f6b11b]/5 rounded-2xl" />

                {/* 3D Animated Icon */}
                <motion.div
                  className="relative mb-4 flex-shrink-0 w-12 h-12"
                  style={{ perspective: 400 }}
                  animate={{
                    y: [0, -3, 0],
                    rotateY: [0, 6, -6, 0]
                  }}
                  transition={{
                    duration: 4 + (i * 0.5),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotateY: 15,
                    z: 20
                  }}
                >
                  <AboutIcon type={item.type} />
                </motion.div>
                <h3 className="text-slate-950 font-bold text-sm mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>

                {/* Border gradient on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#1fb8e5]/30 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-slate-200"
        >
          <AnimatedStat value="19+" label="Years Experience" />
          <AnimatedStat value="WHO" label="cGMP Certified" />
          <AnimatedStat value="100+" label="Products" />
          <AnimatedStat value="20" label="Global Markets" />
        </motion.div>
      </div>
    </section>
  );
}
