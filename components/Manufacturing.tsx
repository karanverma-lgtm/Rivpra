"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { label: "Tablets", icon: "💊", color: "#0583F2" },
  { label: "Capsules", icon: "🔵", color: "#1EB7D9" },
  { label: "HPMC Capsules", icon: "🟡", color: "#D9CD2B" },
  { label: "Syrups", icon: "🧪", color: "#F2A81D" },
  { label: "Sachets", icon: "📦", color: "#0583F2" },
  { label: "Multivitamins", icon: "⭐", color: "#1EB7D9" },
  { label: "Creams", icon: "🧴", color: "#D9CD2B" },
  { label: "Ointments", icon: "💫", color: "#F2A81D" },
  { label: "Lotions", icon: "🌊", color: "#0583F2" },
  { label: "Gels", icon: "✨", color: "#1EB7D9" },
];

const facilities = [
  { title: "SIDCUL, Haridwar", desc: "State-of-the-art manufacturing plant", icon: "🏭" },
  { title: "WHO-cGMP", desc: "Manufacturing compliance standards", icon: "✅" },
  { title: "Modern R&D Lab", desc: "Advanced formulation research facility", icon: "🔬" },
  { title: "QC Laboratory", desc: "In-house quality control testing", icon: "🧬" },
];

export default function Manufacturing() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollLine = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!sectionRef.current || !scrollLine.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollLine.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manufacturing"
      ref={sectionRef}
      className="relative py-32 bg-[#080808] overflow-hidden"
    >
      {/* Animated gradient line */}
      <div className="absolute left-0 top-0 bottom-0 w-px ml-8 lg:ml-24">
        <div
          ref={scrollLine}
          className="w-full h-full bg-gradient-to-b from-[#0583F2] via-[#1EB7D9] to-[#D9CD2B]"
          style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
        />
      </div>

      {/* Glow blob */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#0583F2]/8 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8 pl-16 lg:pl-36">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 text-[#1EB7D9] text-xs font-semibold tracking-widest uppercase mb-6">
            Manufacturing Unit
          </span>

          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
            State-of-the-Art
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text">
              Infrastructure
            </span>
          </h2>

          <p className="text-white/50 max-w-xl text-base leading-relaxed font-light">
            Our manufacturing unit in{" "}
            <span className="text-[#F2A81D] font-medium">SIDCUL, Haridwar</span> is equipped with
            the latest technology to produce a wide range of pharmaceutical and cosmetic products
            to the highest quality standards.
          </p>
        </motion.div>

        {/* Product Marquee */}
        <div className="mb-20 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-white/30 text-xs tracking-widest uppercase font-medium"
          >
            Products We Manufacture
          </motion.div>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-4 w-max"
          >
            {[...products, ...products].map((prod, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-3 rounded-full border whitespace-nowrap"
                style={{
                  borderColor: `${prod.color}33`,
                  background: `${prod.color}0D`,
                }}
              >
                <span>{prod.icon}</span>
                <span
                  className="text-sm font-medium"
                  style={{ color: prod.color }}
                >
                  {prod.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Facility Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((fac, i) => (
            <motion.div
              key={fac.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-[#0583F2]/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#0583F2]/8 to-transparent rounded-2xl" />
              <div className="text-3xl mb-4">{fac.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1">{fac.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{fac.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
