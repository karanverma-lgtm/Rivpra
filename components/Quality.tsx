"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const certifications = [
  {
    title: "ISO Certified",
    desc: "International Organization for Standardization — ensuring quality management across all processes.",
    color: "#1fb8e5",
    type: "iso",
  },
  {
    title: "WHO-cGMP",
    desc: "World Health Organization current Good Manufacturing Practices — the global gold standard.",
    color: "#f6b11b",
    type: "who",
  },
  {
    title: "SIDCUL Facility",
    desc: "State Industrial Development Corporation of Uttarakhand — prime industrial infrastructure.",
    color: "#ddd82a",
    type: "sidcul",
  },
  {
    title: "Debt-Free",
    desc: "Financially sound and profit-making since inception — a stable, trusted business partner.",
    color: "#f6b11b",
    type: "debt",
  },
];

function QualityIcon({ type }: { type: string }) {
  switch (type) {
    case "iso":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <path d="M26 22 L74 22 L70 50 C70 60, 60 70, 50 70 C40 70, 30 60, 30 50 Z" fill="url(#goldGrad)" />
          <path d="M26 26 C15 26, 15 42, 28 42" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M74 26 C85 26, 85 42, 72 42" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" />
          <rect x="46" y="70" width="8" height="12" fill="url(#goldGrad)" />
          <ellipse cx="50" cy="84" rx="20" ry="6" fill="url(#silverGrad)" />
        </svg>
      );
    case "who":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <radialGradient id="greenHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M50 16 L80 26 L80 56 C80 72, 66 84, 50 88 C34 84, 20 72, 20 56 L20 26 Z" fill="url(#greenGrad)" />
          <path d="M50 16 L80 26 L80 56 C80 72, 66 84, 50 88 C34 84, 20 72, 20 56 L20 26 Z" fill="url(#greenHighlight)" />
          <path d="M38 52 L47 61 L64 38" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "sidcul":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="facGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="chimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <rect x="36" y="20" width="8" height="30" fill="url(#chimGrad)" />
          <rect x="48" y="15" width="8" height="35" fill="url(#chimGrad)" />
          <circle cx="40" cy="12" r="5" fill="#e2e8f0" opacity="0.8" />
          <circle cx="52" cy="7" r="6" fill="#e2e8f0" opacity="0.6" />
          <path d="M22 50 L68 50 L78 60 L78 85 L22 85 Z" fill="url(#facGrad)" />
          <path d="M22 50 L34 38 L34 50 L46 38 L46 50 L58 38 L58 50 L68 50" fill="url(#facGrad)" />
          <rect x="30" y="62" width="8" height="12" rx="1" fill="#ffffff" opacity="0.8" />
          <rect x="44" y="62" width="8" height="12" rx="1" fill="#ffffff" opacity="0.8" />
          <rect x="58" y="62" width="8" height="12" rx="1" fill="#ffffff" opacity="0.8" />
        </svg>
      );
    case "debt":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="coinHighlight" cx="30%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="74" rx="28" ry="10" fill="#78350f" />
          <ellipse cx="50" cy="70" rx="28" ry="10" fill="url(#coinGrad)" />
          <ellipse cx="50" cy="59" rx="28" ry="10" fill="#78350f" />
          <ellipse cx="50" cy="55" rx="28" ry="10" fill="url(#coinGrad)" />
          <ellipse cx="50" cy="44" rx="28" ry="10" fill="#78350f" />
          <ellipse cx="50" cy="40" rx="28" ry="10" fill="url(#coinGrad)" />
          <ellipse cx="50" cy="40" rx="28" ry="10" fill="url(#coinHighlight)" />
          <text x="50" y="45" textAnchor="middle" fill="#78350f" fontSize="16" fontWeight="bold">₹</text>
        </svg>
      );
    default:
      return <QualityFallbackIcon />;
  }
}

function QualityFallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="qFailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="url(#qFailGrad)" />
      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">?</text>
    </svg>
  );
}

const qualityPoints = [
  "In-house QC laboratory with state-of-the-art testing equipment",
  "Strict adherence to WHO-cGMP guidelines at every production stage",
  "Comprehensive documentation and batch record management",
  "Regular internal and external audits for continuous improvement",
  "Stability testing programs for all formulations",
  "Dedicated quality assurance team with pharmaceutical expertise",
];

export default function Quality() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="quality" className="relative w-full overflow-hidden bg-white py-12">
      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(31,184,229,0.08) 0%, transparent 70%)" }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-6">
            Quality & Compliance
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-950 leading-tight mb-6">
            Uncompromising
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              Quality Standards
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed font-light">
            Every product that leaves our facility undergoes rigorous quality checks
            to ensure safety, efficacy and compliance with global standards.
          </p>
        </motion.div>

        {/* Certification Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-7 rounded-2xl border border-slate-200 bg-white overflow-hidden cursor-default"
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${cert.color}15, transparent 60%)`,
                }}
              />

              {/* Top line accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                style={{ background: cert.color }}
              />

              {/* 3D Animated Icon */}
              <motion.div
                className="relative mb-4 flex-shrink-0 w-12 h-12"
                style={{ perspective: 400 }}
                animate={{
                  y: [0, -4, 0],
                  rotateY: [0, 8, -8, 0]
                }}
                transition={{
                  duration: 4.5 + (i * 0.4),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.18,
                  rotateY: 20,
                  z: 25
                }}
              >
                <QualityIcon type={cert.type} />
              </motion.div>

              <h3
                className="font-black text-lg mb-3"
                style={{ color: cert.color }}
              >
                {cert.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">{cert.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Quality Checklist */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-3xl font-black text-slate-950 mb-8">
              Our Quality{" "}
              <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
                Commitment
              </span>
            </h3>
            <ul className="space-y-4">
              {qualityPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-slate-950"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-600 text-sm leading-relaxed">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 p-8 bg-white">
              {/* Centered quality badge */}
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] opacity-20 animate-pulse" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] opacity-30" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] flex items-center justify-center">
                    <span className="text-slate-950 font-black text-2xl">Q</span>
                  </div>
                </div>
                <div className="text-slate-950 font-black text-2xl mb-2">
                  Quality First
                </div>
                <div className="text-slate-500 text-sm max-w-xs">
                  Every batch manufactured adheres to international quality
                  benchmarks before reaching patients worldwide.
                </div>

                <div className="mt-8 flex gap-6">
                  {[
                    { v: "100%", l: "GMP Compliant" },
                    { v: "Zero", l: "Compromise" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="text-3xl font-black text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
                        {s.v}
                      </div>
                      <div className="text-slate-500 text-xs tracking-wide mt-1">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
