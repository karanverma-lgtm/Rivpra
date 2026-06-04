"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const oteriaProducts = [
  {
    cat: "Cleansers & Mists",
    items: ["White Tea Face Wash", "Aloe Hydrating Face Wash", "Kiwi Face Mist", "Berry Face Mist", "Rosette Face Mist"],
    type: "cleanser",
  },
  {
    cat: "Moisturisers",
    items: ["Twinkle Skin Cream", "Go-To Anti-Ageing Cream", "All-Rounder Anti-Acne Cream", "Revive Bounce Back Cream", "Velvet Dew 72h Cream"],
    type: "moisturiser",
  },
  {
    cat: "Serums & Sunscreen",
    items: ["Time Travel Under Eye Serum", "Plumpy Skin Serum", "10% Vitamin C Face Serum", "Sun-Kissed Suncare Gel (SPF 30)"],
    type: "serum",
  },
  {
    cat: "Bath & Hair Essentials",
    items: ["Green Coffee Shower Gel", "White Tea Shower Gel", "Whipped Body Yogurt", "Voluminous Hair Lotion", "Go-To Hair Serum"],
    type: "bath",
  },
];

function OteriaIcon({ type }: { type: string }) {
  switch (type) {
    case "cleanser":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="mistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8c3c7" />
              <stop offset="100%" stopColor="#b2767e" />
            </linearGradient>
            <radialGradient id="mistGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#b2767e" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M44 32 L56 32 L54 42 L46 42 Z" fill="#d1d5db" />
          <path d="M48 24 L52 24 L52 32 L48 32 Z" fill="#9ca3af" />
          <path d="M44 20 L50 20 L50 24 L44 24 Z" fill="#9ca3af" />
          <rect x="36" y="42" width="28" height="42" rx="6" fill="url(#mistGrad)" />
          <path d="M36 12 C28 12 24 18 28 22 C22 24 24 30 30 28 C28 34 36 34 38 30 C42 32 44 26 40 22 C44 18 40 12 36 12 Z" fill="url(#mistGlow)" opacity="0.6" transform="translate(10, -5) scale(0.7)" />
        </svg>
      );
    case "moisturiser":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="creamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3c68f" />
              <stop offset="100%" stopColor="#b2767e" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e8c3c7" />
            </linearGradient>
          </defs>
          <path d="M26 48 C26 44 28 44 32 44 L68 44 C72 44 74 44 74 48 L70 78 C70 82 66 84 60 84 L40 84 C34 84 30 82 30 78 Z" fill="url(#creamGrad)" />
          <rect x="22" y="34" width="56" height="10" rx="3" fill="url(#lidGrad)" />
          <rect x="22" y="44" width="56" height="3" fill="#b2767e" opacity="0.3" />
        </svg>
      );
    case "serum":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="serGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d49ca4" />
              <stop offset="100%" stopColor="#b2767e" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e8c3c7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M50 14 C46 14, 44 20, 44 24 L56 24 C56 24, 54 14, 50 14 Z" fill="#b2767e" />
          <rect x="42" y="24" width="16" height="6" rx="1" fill="#475569" />
          <path d="M34 32 C34 30, 36 30, 38 30 L62 30 C64 30, 66 30, 66 32 L66 74 C66 78, 62 82, 58 82 L42 82 C38 82, 34 78, 34 74 Z" fill="url(#serGrad)" />
          <path d="M34 32 C34 30, 36 30, 38 30 L62 30 C64 30, 66 30, 66 32 L66 74 C66 78, 62 82, 58 82 L42 82 C38 82, 34 78, 34 74 Z" fill="url(#glassGrad)" />
          <path d="M50 64 C50 64, 44 72, 44 77 C44 80, 47 83, 50 83 C53 83, 56 80, 56 77 C56 72, 50 64, 50 64 Z" fill="#ffffff" opacity="0.9" transform="translate(0, 8) scale(0.8)" />
        </svg>
      );
    case "bath":
      return (
        <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md">
          <defs>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8c3c7" />
              <stop offset="100%" stopColor="#b2767e" />
            </linearGradient>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b2767e" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path d="M50 20 L50 30 C40 30 32 40 32 54 C32 68 40 76 50 76 C60 76 68 68 68 54 C68 40 60 30 50 30 Z" fill="url(#bodyGrad)" />
          <rect x="46" y="14" width="8" height="6" rx="1" fill="#e8c3c7" />
          <path d="M42 58 C42 46, 50 38, 58 38 C58 50, 50 58, 42 58 Z" fill="url(#leafGrad)" opacity="0.9" />
        </svg>
      );
    default:
      return <OteriaFallbackIcon />;
  }
}

function OteriaFallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="oteFailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="32" fill="url(#oteFailGrad)" />
      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">?</text>
    </svg>
  );
}

const oteriaStores = [
  { name: "AMAZON", url: "https://www.amazon.in/stores/Oteria/page/913ADE90-6F16-4B36-9562-5DA1BF4BF3A1?lp_asin=B0D1C9SVRP&ref_=ast_bln&store_ref=bl_ast_dp_brandLogo_sto" },
  { name: "FLIPKART", url: "https://www.flipkart.com/search?q=oteria+&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&sort=popularity" },
  { name: "MYNTRA", url: "https://www.myntra.com/oteria?rawQuery=oteria" },
  { name: "NYKAA", url: "https://www.nykaa.com/brands/oteria/c/61439?ptype=lst&id=61439&root=brand_menu%2Cbrand_list%2COteria&search_redirection=True" },
  { name: "PURPLLE", url: "https://www.purplle.com/brand/oteria?srsltid=AfmBOorXQ7xo38i-KEXjqDi5gr04A3sq3AHIM2_YmIH1g395zOM8lYXt" },
  { name: "MACCARON", url: "https://maccaron.in/en/products/brand/oteria-23634/" },
  { name: "SMYTTEN", url: "https://smytten.com/search-product?search=oteria" },
  { name: "JIOMART", url: "https://www.jiomart.com/products?q=oteria" },
  { name: "FIRSTCRY", url: "https://www.firstcry.com/oteria/0/0/1011052?q=ard-oteria&ref2=q_ard_oteria&asid=95599" }
];

export default function OteriaBrand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="oteria" className="relative w-full overflow-hidden bg-slate-950 py-16 text-white">
      {/* Botanical/Luxury abstract glow blobs */}
      <div className="absolute -left-20 top-1/4 w-[500px] h-[500px] bg-[#b2767e]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -right-20 bottom-1/4 w-[500px] h-[500px] bg-[#b2767e]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column — Text Intro */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-[#b2767e]/40 bg-[#b2767e]/10 text-[#b2767e] text-xs font-semibold tracking-widest uppercase mb-6">
                Skincare Sister Brand
              </span>
              
              <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-none mb-6">
                Meet{" "}
                <span className="text-transparent bg-gradient-to-r from-[#b2767e] to-[#e8c3c7] bg-clip-text">
                  Oteria
                </span>
              </h2>
              
              <p className="text-2xl font-bold text-slate-200 mb-6 font-sans">
                India's 1st Circadian Rhythm Based Skincare Brand
              </p>
              
              <p className="text-slate-400 text-base leading-relaxed mb-8 font-light">
                Developed in collaboration with Rivpra's R&D division, Oteria syncs skincare with the body's natural 24-hour biological clock. Our formulations protect skin from daily environmental stressors (UV, blue light, pollution) during the day, and boost cellular repair and hydration at night.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["Dermatologically Tested", "Animal Test-Free", "100% Vegan", "For All Skin Types"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold border border-slate-800 text-slate-300 bg-slate-900/50"
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>

              {/* Links and Shop button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <a
                  href="https://www.oteria.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#b2767e] to-[#d49ca4] hover:from-[#b2767e]/90 hover:to-[#d49ca4]/90 text-white font-black rounded-full shadow-lg shadow-[#b2767e]/10 hover:shadow-xl hover:shadow-[#b2767e]/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore www.oteria.com
                </a>
                <div className="text-xs text-slate-400">
                  <p>Inquiries: <a href="mailto:care@oteria.in" className="text-[#b2767e] hover:underline">care@oteria.in</a></p>
                  <p>Phone: +91-9311586399</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Product Categories Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {oteriaProducts.map((cat, i) => (
              <motion.div
                key={cat.cat}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-slate-900 hover:border-[#b2767e]/30 bg-slate-900/30 backdrop-blur-sm transition-all duration-300"
              >
                {/* 3D Animated Skincare Icon */}
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
                  <OteriaIcon type={cat.type} />
                </motion.div>

                <h3 className="text-lg font-extrabold text-white mb-3">{cat.cat}</h3>
                <ul className="space-y-1 text-xs text-slate-400 font-light">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b2767e]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* E-Commerce Presence Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-slate-900 flex flex-col items-center gap-6"
        >
          <span className="text-slate-400 text-sm font-semibold tracking-wider uppercase">
            Available Online On
          </span>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-extrabold tracking-wider">
            {oteriaStores.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full border border-slate-900 hover:border-[#b2767e]/40 bg-slate-900/40 hover:bg-[#b2767e]/10 text-slate-400 hover:text-white transition-all duration-300 backdrop-blur-sm shadow-md"
              >
                {store.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
