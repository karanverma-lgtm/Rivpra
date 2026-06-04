"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const dosageForms = [
  {
    type: "tablet",
    title: "Tablet",
    desc: "Coated, uncoated, film-coated, enteric-coated, dispersible, chewable, and sustained-release formulations.",
  },
  {
    type: "capsule",
    title: "Capsule",
    desc: "Hard gelatin and softgel capsules containing custom powders, pellets, or oil-based suspensions.",
  },
  {
    type: "liquid",
    title: "Oral Liquid",
    desc: "Syrups, suspensions, drops, and solutions formulated for optimal absorption and pleasant taste.",
  },
  {
    type: "sachet",
    title: "Sachet Dry Powder",
    desc: "Single-dose effervescent and non-effervescent powders, prebiotics, and health supplements.",
  },
  {
    type: "drypowder",
    title: "Dry Powder",
    desc: "Dry powder for oral suspensions, antibiotics, and pediatric reconstituted formulations.",
  },
  {
    type: "external",
    title: "External Preparations",
    desc: "Medicated creams, ointments, lotions, and gels for targeted dermatological treatments.",
  },
  {
    type: "cosmetic",
    title: "Cosmetic",
    desc: "Premium skin cleansers, moisturizers, serums, hair cares, lip cares, and skincare creams.",
  },
  {
    type: "food",
    title: "Food Supplements",
    desc: "Nutraceutical formulations, daily multivitamins, minerals, and functional health supplements.",
  },
];

function DosageIcon({ type }: { type: string }) {
  switch (type) {
    case "tablet":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="dosTabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="32" fill="url(#dosTabGrad)" />
          <path d="M18 50 L82 50" stroke="#ffffff" strokeWidth="4" opacity="0.4" />
        </svg>
      );
    case "capsule":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md" style={{ transform: "rotate(30deg)" }}>
          <defs>
            <linearGradient id="dosCapRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
            <linearGradient id="dosCapYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <path d="M50 20 L30 20 C18 20, 18 50, 30 50 L50 50 Z" fill="url(#dosCapRed)" />
          <path d="M50 20 L70 20 C82 20, 82 50, 70 50 L50 50 Z" fill="url(#dosCapYellow)" />
          <line x1="50" y1="20" x2="50" y2="50" stroke="#ffffff" strokeWidth="2.5" opacity="0.5" />
        </svg>
      );
    case "liquid":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="dosLiqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M36 28 L64 28 L64 36 L72 44 L72 82 C72 86, 68 90, 64 90 L36 90 C32 90, 28 86, 28 82 L28 44 L36 36 Z" fill="url(#dosLiqGrad)" />
          <rect x="42" y="16" width="16" height="12" fill="#475569" />
          <rect x="28" y="55" width="44" height="25" fill="#ffffff" opacity="0.2" />
        </svg>
      );
    case "sachet":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="dosSacGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <rect x="24" y="24" width="52" height="52" rx="4" fill="url(#dosSacGrad)" />
          <path d="M24 36 L76 36 M24 64 L76 64" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,3" />
          <path d="M24 24 L30 30 M76 24 L70 30 M24 76 L30 70 M76 76 L70 70" stroke="#475569" strokeWidth="2" />
        </svg>
      );
    case "drypowder":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="dosPowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          <path d="M32 30 L68 30 L68 84 C68 88, 64 92, 60 92 L40 92 C36 92, 32 88, 32 84 Z" fill="none" stroke="url(#dosPowGrad)" strokeWidth="4" />
          <rect x="42" y="16" width="16" height="14" rx="2" fill="#94a3b8" />
          <ellipse cx="50" cy="74" rx="14" ry="10" fill="url(#dosPowGrad)" opacity="0.6" />
          <circle cx="44" cy="72" r="1.5" fill="#ffffff" />
          <circle cx="54" cy="75" r="1.5" fill="#ffffff" />
          <circle cx="48" cy="77" r="1.5" fill="#ffffff" />
        </svg>
      );
    case "external":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md" style={{ transform: "rotate(-15deg)" }}>
          <defs>
            <linearGradient id="dosExtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path d="M34 90 L66 90 L58 35 L42 35 Z" fill="url(#dosExtGrad)" />
          <path d="M42 35 L58 35 L50 25 Z" fill="#94a3b8" />
          <path d="M46 25 L54 25 L50 12 Z" fill="#ffffff" opacity="0.9" />
        </svg>
      );
    case "cosmetic":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="dosCosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          <rect x="32" y="44" width="36" height="42" rx="6" fill="url(#dosCosGrad)" />
          <path d="M42 44 L42 28 L50 28 L50 44" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="58" cy="28" r="4" fill="#cbd5e1" />
        </svg>
      );
    case "food":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="dosFoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#4d7c0f" />
            </linearGradient>
          </defs>
          <path d="M50 14 C30 14 18 36 28 58 C38 80 62 80 72 58 C82 36 70 14 50 14 Z" fill="url(#dosFoodGrad)" />
          <path d="M50 14 L50 72" stroke="#ffffff" strokeWidth="3" opacity="0.3" />
          <path d="M34 40 C34 40, 42 42, 50 34" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" />
          <path d="M66 48 C66 48, 58 50, 50 42" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.4" />
        </svg>
      );
    default:
      return <DosageFallbackIcon />;
  }
}

function DosageFallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="dosFailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="url(#dosFailGrad)" />
      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">?</text>
    </svg>
  );
}

export default function DosageForms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dosages" className="relative w-full overflow-hidden bg-white py-12">
      {/* Background decoration */}
      <div className="absolute -left-40 top-1/3 w-96 h-96 bg-[#1fb8e5]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Capabilities & Range
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            Diverse{" "}
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              Dosage Forms
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 text-base font-light"
          >
            Equipped with state-of-the-art machinery to manufacture pharmaceutical, nutraceutical, and cosmetic products in multiple delivery formats.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dosageForms.map((form, i) => (
            <motion.div
              key={form.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default"
            >
              {/* Inner gradient glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#1fb8e5]/5 to-[#f6b11b]/5 rounded-2xl" />

              {/* 3D Animated Icon */}
              <motion.div
                className="relative mb-6 flex-shrink-0 w-12 h-12"
                style={{ perspective: 400 }}
                animate={{
                  y: [0, -3, 0],
                  rotateY: [0, 6, -6, 0]
                }}
                transition={{
                  duration: 4.5 + (i * 0.4),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.15,
                  rotateY: 15,
                  z: 20
                }}
              >
                <DosageIcon type={form.type} />
              </motion.div>
              
              <h3 className="text-slate-950 font-extrabold text-lg mb-2 relative z-10">
                {form.title}
              </h3>
              
              <p className="text-slate-500 text-xs leading-relaxed font-light relative z-10">
                {form.desc}
              </p>

              {/* Borders */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-slate-200 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
