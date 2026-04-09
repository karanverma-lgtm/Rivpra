"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const certifications = [
  {
    title: "ISO Certified",
    desc: "International Organization for Standardization — ensuring quality management across all processes.",
    color: "#0583F2",
    icon: "🏆",
  },
  {
    title: "WHO-cGMP",
    desc: "World Health Organization current Good Manufacturing Practices — the global gold standard.",
    color: "#1EB7D9",
    icon: "✅",
  },
  {
    title: "SIDCUL Facility",
    desc: "State Industrial Development Corporation of Uttarakhand — prime industrial infrastructure.",
    color: "#D9CD2B",
    icon: "🏭",
  },
  {
    title: "Debt-Free",
    desc: "Financially sound and profit-making since inception — a stable, trusted business partner.",
    color: "#F2A81D",
    icon: "💰",
  },
];

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
    <section id="quality" className="relative py-32 bg-[#0D0D0D] overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(5,131,242,0.08) 0%, transparent 70%)" }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 text-[#1EB7D9] text-xs font-semibold tracking-widest uppercase mb-6">
            Quality & Compliance
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
            Uncompromising
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text">
              Quality Standards
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed font-light">
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
              className="group relative p-7 rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden cursor-default"
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

              <div className="text-4xl mb-4">{cert.icon}</div>
              <h3
                className="font-black text-lg mb-3"
                style={{ color: cert.color }}
              >
                {cert.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">{cert.desc}</p>
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
            <h3 className="text-3xl font-black text-white mb-8">
              Our Quality{" "}
              <span className="text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text">
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
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#0583F2] to-[#1EB7D9] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
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
                  <span className="text-white/60 text-sm leading-relaxed">
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
            <div className="relative rounded-3xl overflow-hidden border border-white/10 p-8 bg-white/[0.03]">
              {/* Centered quality badge */}
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0583F2] to-[#1EB7D9] opacity-20 animate-pulse" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0583F2] to-[#1EB7D9] opacity-30" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#0583F2] to-[#1EB7D9] flex items-center justify-center">
                    <span className="text-white font-black text-2xl">Q</span>
                  </div>
                </div>
                <div className="text-white font-black text-2xl mb-2">
                  Quality First
                </div>
                <div className="text-white/40 text-sm max-w-xs">
                  Every batch manufactured adheres to international quality
                  benchmarks before reaching patients worldwide.
                </div>

                <div className="mt-8 flex gap-6">
                  {[
                    { v: "100%", l: "GMP Compliant" },
                    { v: "Zero", l: "Compromise" },
                  ].map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="text-3xl font-black text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text">
                        {s.v}
                      </div>
                      <div className="text-white/40 text-xs tracking-wide mt-1">
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
