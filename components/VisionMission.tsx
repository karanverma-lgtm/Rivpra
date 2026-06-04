"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#1fb8e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.761a1.2 1.2 0 00-.77-1.936H14.25v-6L5.27 13.064a1.2 1.2 0 00.77 1.936h5.773z" />
      </svg>
    ),
    title: "What We Do",
    desc: "From product identification to production, from drug delivery to ensuring superior quality, we aim to deliver differentiated products in the committed time period to our customers.",
    bg: "from-[#1fb8e5]/5 to-[#1fb8e5]/0",
    border: "group-hover:border-[#1fb8e5]/40",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#f6b11b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Our Vision",
    desc: "To support our marketing partners with the latest research-based innovative molecules and formulations and to become a leader in the global pharmaceutical market.",
    bg: "from-[#f6b11b]/5 to-[#f6b11b]/0",
    border: "group-hover:border-[#f6b11b]/40",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#ddd82a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
    title: "Our Mission",
    desc: "To be the most valued partner to the pharmaceutical industry by providing research-based novel drug delivery systems that comply with regulatory standards.",
    bg: "from-[#ddd82a]/5 to-[#ddd82a]/0",
    border: "group-hover:border-[#ddd82a]/40",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#1fb8e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m0 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    title: "Our Presence",
    desc: "After success in domestic markets, Rivpra Formulations is now rapidly expanding its wings in Asia, Africa, Latin America, CIS, ASEAN, MENA and European countries.",
    bg: "from-[#1fb8e5]/5 to-[#1fb8e5]/0",
    border: "group-hover:border-[#1fb8e5]/40",
  },
];

export default function VisionMission() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="identity" className="relative w-full overflow-hidden bg-slate-50 py-12">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Vision & Mission
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black text-slate-950 tracking-tight mb-4"
          >
            Our Vision, Mission &{" "}
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              Values
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed font-light"
          >
            Driven by purpose, guided by values — shaping the future of global healthcare.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 45 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative p-8 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden cursor-default transition-all duration-300"
            >
              {/* Card gradient bg on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${card.bg}`} />
              
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                {card.icon}
              </div>

              <h3 className="text-slate-950 font-extrabold text-xl mb-4 group-hover:text-[#f6b11b] transition-colors duration-300 relative z-10">
                {card.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed font-light relative z-10">
                {card.desc}
              </p>

              {/* Borders */}
              <div className={`absolute inset-0 rounded-2xl border border-transparent ${card.border} transition-colors duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
