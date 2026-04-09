"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  {
    icon: "💊",
    title: "Generic & Branded Generic",
    desc: "Complete product pipeline from development to commercial manufacturing.",
  },
  {
    icon: "🧴",
    title: "Nutraceutical & Cosmetics",
    desc: "Creams, ointments, lotions, gels, multivitamins & mineral formulations.",
  },
  {
    icon: "🏭",
    title: "Contract Manufacturing",
    desc: "Trusted CMO partner for domestic and international pharma brands.",
  },
  {
    icon: "📋",
    title: "Licensing & Development",
    desc: "End-to-end formulation development and regulatory licensing support.",
  },
];

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
      <div className="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text mb-2">
        {value}
      </div>
      <div className="text-white/50 text-sm tracking-widest uppercase font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 bg-[#0D0D0D] overflow-hidden">
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
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#1EB7D9]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 text-[#1EB7D9] text-xs font-semibold tracking-widest uppercase mb-6">
                Who We Are
              </span>

              <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
                Integrated
                <br />
                <span className="text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text">
                  Pharmaceutical
                </span>
                <br />
                Excellence
              </h2>

              <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-6 font-light">
                Established in <span className="text-[#F2A81D] font-medium">2008</span>, Rivpra
                Formulations is a{" "}
                <span className="text-white font-medium">debt-free, profit-making</span> ISO-certified
                pharmaceutical company with state-of-the-art infrastructure built in compliance
                with WHO-cGMP standards.
              </p>

              <p className="text-white/50 text-sm lg:text-base leading-relaxed mb-10 font-light">
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
                      className="px-4 py-1.5 rounded-full text-xs font-semibold border border-white/10 text-white/60 bg-white/5"
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
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#0583F2]/10 to-[#1EB7D9]/5 rounded-2xl" />

                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>

                {/* Border gradient on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#0583F2]/30 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/8"
        >
          <AnimatedStat value="15+" label="Years Experience" />
          <AnimatedStat value="WHO" label="cGMP Certified" />
          <AnimatedStat value="100+" label="Products" />
          <AnimatedStat value="2" label="Global Markets" />
        </motion.div>
      </div>
    </section>
  );
}
