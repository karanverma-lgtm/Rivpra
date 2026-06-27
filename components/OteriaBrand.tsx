"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

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
    <section id="oteria" className="relative w-full overflow-hidden bg-gradient-to-tr from-[#faf3f3] via-[#f7e4e6] to-[#edd0d4] py-16 text-slate-800">
      
      {/* Botanical/Luxury background graphic waves */}
      <svg className="absolute bottom-0 left-0 w-full h-40 opacity-40 pointer-events-none text-[#b2767e]/20" viewBox="0 0 1440 200" fill="none">
        <path d="M0,100 C360,150 720,50 1080,150 C1260,200 1380,180 1440,160 L1440,200 L0,200 Z" fill="currentColor" />
        <path d="M0,80 C400,120 800,20 1200,130 C1320,165 1400,150 1440,140" stroke="#b2767e" strokeWidth="1" opacity="0.3" />
        <path d="M0,120 C300,180 700,80 1100,180 C1250,220 1370,195 1440,180" stroke="#b2767e" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.3" />
      </svg>

      {/* Botanical Leaf Graphic 1 - Top Right */}
      <svg className="absolute -right-16 top-0 w-80 h-80 opacity-15 pointer-events-none text-[#b2767e]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M50 0 C30 20, 20 50, 50 100 C80 50, 70 20, 50 0 Z" />
        <path d="M50 0 C40 30, 40 70, 50 100" />
        <path d="M50 20 Q 35 30, 25 40" />
        <path d="M50 40 Q 30 50, 20 60" />
        <path d="M50 60 Q 35 70, 30 80" />
        <path d="M50 20 Q 65 30, 75 40" />
        <path d="M50 40 Q 70 50, 80 60" />
        <path d="M50 60 Q 65 70, 70 80" />
      </svg>

      {/* Botanical Leaf Graphic 2 - Bottom Left */}
      <svg className="absolute -left-20 -bottom-10 w-96 h-96 opacity-15 pointer-events-none text-[#b2767e] rotate-[45deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M50 0 C30 20, 20 50, 50 100 C80 50, 70 20, 50 0 Z" />
        <path d="M50 0 C40 30, 40 70, 50 100" />
        <path d="M50 15 Q 30 25, 20 35" />
        <path d="M50 35 Q 25 45, 15 55" />
        <path d="M50 55 Q 30 65, 25 75" />
        <path d="M50 15 Q 70 25, 80 35" />
        <path d="M50 35 Q 75 45, 85 55" />
        <path d="M50 55 Q 70 65, 75 75" />
      </svg>

      {/* Botanical/Luxury abstract glow blobs */}
      <div className="absolute -left-20 top-1/4 w-[500px] h-[500px] bg-[#b2767e]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -right-20 bottom-1/4 w-[500px] h-[500px] bg-[#b2767e]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#b2767e 1px,transparent 1px),linear-gradient(90deg,#b2767e 1px,transparent 1px)",
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
              <span className="inline-block px-3 py-1 rounded-full border border-[#b2767e]/40 bg-[#b2767e]/10 text-[#7f4a51] text-xs font-semibold tracking-widest uppercase mb-6">
                Skincare Sister Brand
              </span>
              
              <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-none mb-6 text-slate-900">
                Meet{" "}
                <span className="text-transparent bg-gradient-to-r from-[#b2767e] to-[#7f4a51] bg-clip-text">
                  Oteria
                </span>
              </h2>
              
              <p className="text-2xl font-bold text-[#7f4a51] mb-6 font-sans">
                India's 1st Circadian Rhythm Based Skincare Brand
              </p>
              
              <p className="text-slate-600 text-base leading-relaxed mb-8 font-light">
                Developed in collaboration with Rivpra's R&D division, Oteria syncs skincare with the body's natural 24-hour biological clock. Our formulations protect skin from daily environmental stressors (UV, blue light, pollution) during the day, and boost cellular repair and hydration at night.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["Dermatologically Tested", "Animal Test-Free", "100% Vegan", "For All Skin Types"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#b2767e]/30 text-[#7f4a51] bg-white/60 hover:bg-[#b2767e]/10 transition-colors duration-200"
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
                <div className="text-xs text-slate-500">
                  <p>Inquiries: <a href="mailto:care@oteria.in" className="text-[#b2767e] hover:underline font-semibold">care@oteria.in</a></p>
                  <p>Phone: +91-9311586399</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Premium Oteria Brand Mockup Graphic with Floating & Glassmorphism */}
          <div className="relative w-full flex items-center justify-center p-4">
            
            {/* Ambient Animated Glows behind the card */}
            <motion.div
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-[#b2767e]/15 via-transparent to-[#edd0d4]/20 blur-3xl pointer-events-none -z-10"
            />

            {/* Main Floating Glassmorphic Container */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full rounded-[2.5rem] border border-white/50 bg-white/20 p-3 shadow-2xl backdrop-blur-md overflow-hidden"
            >
              {/* Image wrap with skew reflections */}
              <div className="relative rounded-[2rem] overflow-hidden border border-[#b2767e]/20 shadow-inner">
                <Image
                  src="/clients/H1_7e3945f1-004e-4403-af33-999bb1096580.webp"
                  alt="Oteria Circadian Rhythm Based Skincare Formulations"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover rounded-[2rem]"
                />

                {/* Glossy Reflection Sweep */}
                <motion.div
                  className="absolute inset-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 pointer-events-none"
                  initial={{ left: "-60%" }}
                  animate={{ left: "160%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* E-Commerce Presence Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-[#b2767e]/25 flex flex-col items-center gap-6"
        >
          <span className="text-[#7f4a51] text-sm font-semibold tracking-wider uppercase">
            Available Online On
          </span>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-extrabold tracking-wider">
            {oteriaStores.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full border border-slate-300 hover:border-[#b2767e] bg-white/80 hover:bg-[#b2767e]/10 text-slate-700 hover:text-[#7f4a51] transition-all duration-300 backdrop-blur-sm shadow-md"
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
