"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const row1 = [
  "Mankind Pharma",
  "Wockhardt",
  "Biocon",
  "Emcure",
  "Intas",
  "Wallace",
  "Truemeds",
  "Celsius",
  "J. B. Chemicals",
  "Themis Medicare",
  "Concord Biotech",
  "Entero Healthcare",
  "Vivaldis",
  "Austrak",
  "Wanbury",
];

const row2 = [
  "RPG Life Sciences",
  "Corona Remedies",
  "Anand Vihari",
  "Bestead",
  "Rene Pharma",
  "Medisch Lifesciences",
  "Immune Biotech",
  "MayBritt",
  "Reepinor",
  "Rennew Biotech",
  "Secure Lifescience",
  "Biovia",
  "Glasier Wellness",
  "SynGex",
  "Saffron",
];

export default function Clients() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Duplicate arrays to make seamless loops
  const doubleRow1 = [...row1, ...row1];
  const doubleRow2 = [...row2, ...row2];

  return (
    <section id="clients" className="relative w-full overflow-hidden bg-white py-12">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#f6b11b]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div ref={ref} className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Our Partners
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            Trusted by{" "}
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              Industry Leaders
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 text-base font-light"
          >
            We manufacture formulations for some of India's most prestigious healthcare and pharmaceutical brands.
          </motion.p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 relative max-w-full">
        {/* Row 1 - scrolling left */}
        <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,parent,white_10%,white_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex gap-4 whitespace-nowrap min-w-full"
          >
            {doubleRow1.map((client, idx) => (
              <div
                key={`${client}-${idx}`}
                className="group relative flex items-center justify-center px-8 py-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#1fb8e5]/40 hover:bg-white hover:shadow-sm cursor-default transition-all duration-300"
              >
                <span className="text-slate-500 font-extrabold text-sm tracking-wide group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#1fb8e5] group-hover:to-[#f6b11b] group-hover:bg-clip-text transition-colors duration-300">
                  {client}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - scrolling right */}
        <div className="flex overflow-hidden select-none [mask-image:linear-gradient(to_right,parent,white_10%,white_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
            className="flex gap-4 whitespace-nowrap min-w-full"
          >
            {doubleRow2.map((client, idx) => (
              <div
                key={`${client}-${idx}`}
                className="group relative flex items-center justify-center px-8 py-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#f6b11b]/40 hover:bg-white hover:shadow-sm cursor-default transition-all duration-300"
              >
                <span className="text-slate-500 font-extrabold text-sm tracking-wide group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#f6b11b] group-hover:to-[#ddd82a] group-hover:bg-clip-text transition-colors duration-300">
                  {client}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
