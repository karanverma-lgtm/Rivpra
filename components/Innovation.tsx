"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Formulation {
  title: string;
  category: string;
  tag: string;
  icon: string;
  details: string;
}

const categories = [
  "All",
  "Nephrology",
  "Effervescent",
  "Gastroenterology",
  "Specialty"
];

const formulations: Formulation[] = [
  {
    title: "Medicinal Grade Sodium Bicarbonate (Tablets, Suspension, Sachet, Solution)",
    category: "Nephrology",
    tag: "Renal Acidosis",
    icon: "drop",
    details: "Specifically formulated for clinical management of metabolic acidosis in chronic kidney disease (CKD) patients. Available in multiple precise strength options to optimize metabolic balance."
  },
  {
    title: "Alpha Ketoanalogue (Tablets, Sachet, Solution, Shots)",
    category: "Nephrology",
    tag: "CKD Nutrition",
    icon: "dna",
    details: "Vital nutritional therapy containing essential amino acid analogues. Used alongside low-protein diets to delay progression of chronic renal failure and manage nitrogen metabolism."
  },
  {
    title: "Benidipine Tablet",
    category: "Specialty",
    tag: "Hypertension",
    icon: "heart",
    details: "Long-acting, triple calcium channel blocker that provides dual cardioprotection and renal-protective benefits, reducing intraglomerular pressure in hypertensive patients."
  },
  {
    title: "Ranitidine Sustained Release Tablet",
    category: "Gastroenterology",
    tag: "Acidity Care",
    icon: "pill",
    details: "Engineered with sustained-release delivery systems to maintain therapeutic levels, ensuring long-lasting suppression of acid secretion and relief from GERD."
  },
  {
    title: "Sodium Bicarbonate Enteric Coated Tablet",
    category: "Nephrology",
    tag: "Targeted Release",
    icon: "shield",
    details: "Enteric coating protects the active ingredient from gastric acid, allowing targeted release in the upper intestine to prevent gastric distress and improve absorption."
  },
  {
    title: "N-Acetylcysteine Effervescent Tablet",
    category: "Effervescent",
    tag: "Mucolytic",
    icon: "bubbles",
    details: "Fizzy, high-solubility formulation acting as a powerful mucolytic agent and precursor to glutathione. Dissolves rapidly with high bioavailability."
  },
  {
    title: "Sildenafil Citrate Effervescent Tablet",
    category: "Effervescent",
    tag: "Fast Absorption",
    icon: "bubbles",
    details: "Effervescent formulation designed for faster drug disintegration and speedier onset of action compared to standard tablets."
  },
  {
    title: "Paracetamol Effervescent Tablet",
    category: "Effervescent",
    tag: "Fever & Pain",
    icon: "bubbles",
    details: "Gentle on the stomach lining with rapid absorption rates, providing quick antipyretic and analgesic effects."
  },
  {
    title: "Multivitamin Effervescent Tablet",
    category: "Effervescent",
    tag: "Daily Health",
    icon: "bubbles",
    details: "Fruity, effervescent multivitamin blend optimizing nutrient uptake and providing a refreshing hydration method."
  },
  {
    title: "UDCA SR Tablet",
    category: "Gastroenterology",
    tag: "Liver Health",
    icon: "flask",
    details: "Sustained Release Ursodeoxycholic Acid formulated to facilitate the dissolution of gallstones and support long-term management of cholestatic liver diseases."
  },
  {
    title: "Sucroferric Oxyhydroxide Chewable Tablet",
    category: "Nephrology",
    tag: "Phosphate Binder",
    icon: "teeth",
    details: "Chewable iron-based phosphate binder formulated to control serum phosphorus levels in chronic kidney disease patients undergoing dialysis."
  },
  {
    title: "Calcium Polystyrene Sulphonate Suspension",
    category: "Nephrology",
    tag: "Hyperkalemia",
    icon: "flask",
    details: "Ready-to-use liquid suspension designed to safely bind and eliminate excess potassium, treating hyperkalemia in renal failure patients."
  },
  {
    title: "Tablet In Tablet (N-Acetylcysteine+Taurine / Pyridoxamine)",
    category: "Specialty",
    tag: "Combination Tech",
    icon: "pill",
    details: "Advanced multi-core drug delivery system combining incompatible active compounds in a single tablet, preventing chemical cross-interaction for kidney care."
  },
  {
    title: "Mycophenolate Mofetil for Oral Suspension 1gm/5ml",
    category: "Nephrology",
    tag: "Immunosuppression",
    icon: "flask",
    details: "Stable oral liquid suspension designed for transplant patients, providing reliable immunosuppressive therapy to prevent organ transplant rejection."
  },
  {
    title: "Budesonide Enteric Coated Modified Release Tablet",
    category: "Gastroenterology",
    tag: "IBD Therapy",
    icon: "shield",
    details: "Modified release intestinal formulation targeted at treating Crohn's disease and active ulcerative colitis while minimizing systemic side effects."
  }
];

function FormulationIcon({ type }: { type: string }) {
  switch (type) {
    case "drop":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M50 15 C50 15, 24 48, 24 64 C24 78, 35 88, 50 88 C65 88, 76 78, 76 64 C76 48, 50 15, 50 15 Z" fill="url(#dropGrad)" />
          <circle cx="43" cy="55" r="7" fill="#ffffff" opacity="0.3" />
        </svg>
      );
    case "dna":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          <path d="M30 20 C45 20, 55 80, 70 80" fill="none" stroke="url(#dnaGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M70 20 C55 20, 45 80, 30 80" fill="none" stroke="#e0e7ff" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
          <path d="M34 32 L66 32 M38 50 L62 50 M34 68 L66 68" stroke="url(#dnaGrad)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <path d="M12 35 C12 21, 28 15, 50 35 C72 15, 88 21, 88 35 C88 58, 50 85, 50 85 C50 85, 12 58, 12 35 Z" fill="url(#heartGrad)" />
          <circle cx="34" cy="30" r="5" fill="#ffffff" opacity="0.3" />
        </svg>
      );
    case "pill":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md" style={{ transform: "rotate(45deg)" }}>
          <defs>
            <linearGradient id="pillBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="pillRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <path d="M50 15 L28 15 C18 15, 18 45, 28 45 L50 45 Z" fill="url(#pillRed)" />
          <path d="M50 15 L72 15 C82 15, 82 45, 72 45 L50 45 Z" fill="url(#pillBlue)" />
          <line x1="50" y1="15" x2="50" y2="45" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="shdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path d="M50 15 L80 25 L80 55 C80 70, 66 82, 50 86 C34 82, 20 70, 20 55 L20 25 Z" fill="url(#shdGrad)" />
          <path d="M38 50 L47 58 L63 36" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "bubbles":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="bubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="22" fill="url(#bubGrad)" />
          <circle cx="42" cy="42" r="5" fill="#ffffff" opacity="0.4" />
          <circle cx="28" cy="28" r="8" fill="none" stroke="url(#bubGrad)" strokeWidth="2.5" />
          <circle cx="70" cy="65" r="12" fill="none" stroke="url(#bubGrad)" strokeWidth="3" />
          <circle cx="72" cy="30" r="6" fill="none" stroke="url(#bubGrad)" strokeWidth="2" />
        </svg>
      );
    case "flask":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="flkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>
          </defs>
          <path d="M42 20 L58 20 L58 35 L76 72 C79 78, 75 84, 68 84 L32 84 C25 84, 21 78, 24 72 L42 35 Z" fill="url(#flkGrad)" />
          <rect x="38" y="14" width="24" height="6" rx="2" fill="#94a3b8" />
          <path d="M29 70 L71 70 C71 70, 68 62, 50 62 C32 62, 29 70, 29 70 Z" fill="#ffffff" opacity="0.3" />
        </svg>
      );
    case "teeth":
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          <defs>
            <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <circle cx="34" cy="50" r="16" fill="url(#toothGrad)" />
          <circle cx="66" cy="50" r="16" fill="#f6b11b" />
          <path d="M34 50 L66 50" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="50" r="8" fill="#ffffff" />
        </svg>
      );
    default:
      return <FallbackIcon />;
  }
}

function FallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="failGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill="url(#failGrad)" />
      <text x="50" y="60" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="bold">?</text>
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 inline-block align-middle mr-1 drop-shadow-sm">
      <defs>
        <linearGradient id="foldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="foldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      {/* Back flap */}
      <path d="M15 25 C15 22, 18 20, 22 20 L45 20 L55 30 L80 30 C84 30, 85 32, 85 35 L85 75 C85 78, 82 80, 78 80 L22 80 C18 80, 15 78, 15 75 Z" fill="url(#foldGrad1)" />
      {/* Front flap */}
      <path d="M15 35 C15 35, 18 35, 20 35 L80 35 C83 35, 85 37, 85 40 L80 77 C80 80, 77 82, 73 82 L22 82 C18 82, 15 80, 15 77 Z" fill="url(#foldGrad2)" opacity="0.95" />
    </svg>
  );
}

function ApprovedShieldIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 inline-block align-middle mr-1 drop-shadow-sm">
      <defs>
        <linearGradient id="shldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <radialGradient id="shldHighlight" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M50 15 L80 25 L80 55 C80 70, 66 82, 50 86 C34 82, 20 70, 20 55 L20 25 Z" fill="url(#shldGrad1)" />
      <path d="M50 15 L80 25 L80 55 C80 70, 66 82, 50 86 C34 82, 20 70, 20 55 L20 25 Z" fill="url(#shldHighlight)" />
      <path d="M38 50 L47 58 L63 36" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PushpinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 drop-shadow-md text-[#f6b11b] inline-block align-middle mr-1.5">
      <defs>
        <linearGradient id="pinGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6l.8 2 .8-2v-6H18v-2z" fill="url(#pinGold)" />
    </svg>
  );
}

export default function Innovation() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filteredFormulations = formulations.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section id="innovation" className="relative w-full overflow-hidden bg-slate-50 py-16">
      {/* Decorative gradient blur */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#1fb8e5]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-[#f6b11b]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Pioneering R&D
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            R&D Milestones &{" "}
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              First Formulations
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 text-base font-light"
          >
            Rivpra is at the forefront of pharmaceutical formulation development, introducing cutting-edge drug delivery systems and first-to-market solutions in India.
          </motion.p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedCard(null); // Collapse any open card when switching tabs
                }}
                className={`relative px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 ${
                  isActive
                    ? "text-slate-950 border-[#1fb8e5]/40"
                    : "text-slate-500 border-slate-200 bg-white hover:text-slate-950 hover:border-slate-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1fb8e5]/10 to-[#f6b11b]/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat} Formulations</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Formulation Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredFormulations.map((item, idx) => {
              const globalIdx = formulations.findIndex((f) => f.title === item.title);
              const isExpanded = expandedCard === globalIdx;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.title}
                  onClick={() => setExpandedCard(isExpanded ? null : globalIdx)}
                  className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isExpanded 
                      ? "border-[#1fb8e5]/60 bg-gradient-to-b from-white to-slate-50/20" 
                      : "border-slate-200"
                  }`}
                >
                  <div>
                    {/* Badge row */}
                    <div className="flex items-center justify-between mb-3">
                      {/* 3D Animated Icon */}
                      <motion.div
                        className="relative flex-shrink-0 w-10 h-10"
                        style={{ perspective: 400 }}
                        animate={{
                          y: [0, -2, 0],
                          rotateY: [0, 4, -4, 0]
                        }}
                        transition={{
                          duration: 4 + (idx * 0.4),
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        whileHover={{
                          scale: 1.12,
                          rotateY: 12,
                          z: 15
                        }}
                      >
                        <FormulationIcon type={item.icon} />
                      </motion.div>
                      <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-gradient-to-r from-[#1fb8e5]/10 to-[#f6b11b]/10 text-slate-800 border border-slate-100">
                        India's First
                      </span>
                    </div>

                    {/* Tag */}
                    <span className="text-[10px] font-bold text-[#f6b11b] tracking-wider uppercase bg-[#f6b11b]/10 px-2.5 py-0.5 rounded-md inline-block mb-3">
                      {item.tag}
                    </span>

                    {/* Title */}
                    <h3 className="text-slate-900 font-bold text-sm sm:text-base leading-snug mb-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Expanding Description Panel */}
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-slate-500 text-xs font-light leading-relaxed mt-3"
                  >
                    <div className="border-t border-slate-100 pt-3">
                      {item.details}
                      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                        <span className="flex items-center"><CategoryIcon />&nbsp;Category: {item.category}</span>
                        <span className="flex items-center"><ApprovedShieldIcon />&nbsp;WHO-cGMP Approved</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Toggle button indicator */}
                  <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100/60 pt-3 font-semibold hover:text-slate-600 transition-colors">
                    <span>{isExpanded ? "Collapse Details" : "Expand Details"}</span>
                    <span className={`transform transition-transform duration-300 text-[9px] ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Global Compliance Note */}
        <motion.div
          layout
          className="mt-12 p-4 rounded-xl bg-slate-900 text-slate-300 text-xs sm:text-sm font-light text-center border border-slate-800 max-w-3xl mx-auto flex items-center justify-center gap-2"
        >
          <PushpinIcon /> Formulations and processes designed in compliance with WHO-cGMP guidelines.
        </motion.div>
      </div>
    </section>
  );
}
