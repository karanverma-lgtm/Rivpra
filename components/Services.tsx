"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const products = [
  {
    number: "01",
    image: "/images1/pic-1-150x150.png",
    title: "Nephrology & Transplant",
    desc: "Pioneers in nephrology — innovative medicines for kidney disease management and transplant support. First-in-India launches that set new standards.",
    color: "#0583F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    number: "02",
    image: "/images1/pic-2-150x150.png",
    title: "Cardiovascular",
    desc: "Comprehensive range of cardiovascular medications for hypertension, heart failure, and lipid management — supporting heart health every step.",
    color: "#1EB7D9",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l2.25-2.25M3 13.5l2.25 2.25M3 13.5H15M21 13.5l-2.25 2.25M21 13.5l-2.25-2.25M21 13.5H9M12 6.75V3m0 0L9.75 5.25M12 3l2.25 2.25m-2.25 9v3m0 0l-2.25-1.5M12 17.25l2.25-1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    image: "/images1/pic-3-150x150.png",
    title: "Diabetology",
    desc: "Effective diabetes management solutions including oral hypoglycaemics and supportive formulations to help patients lead healthier lives.",
    color: "#D9CD2B",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.242.097A2.25 2.25 0 0117.25 13.5H18a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-1.5A2.25 2.25 0 015.999 13.5h.006" />
      </svg>
    ),
  },
  {
    number: "04",
    image: "/images1/pic-4-150x150.png",
    title: "Pediatrics",
    desc: "Safe, child-friendly formulations designed with precise dosing and palatable taste profiles for neonatal through adolescent care.",
    color: "#F2A81D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    number: "05",
    image: "/images1/pic-5-150x150.png",
    title: "Neurology",
    desc: "Precision neurological medications targeting epilepsy, neuropathy, and cognitive disorders with highest therapeutic reliability.",
    color: "#0583F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    number: "06",
    image: "/images1/pic-6-150x150.png",
    title: "General",
    desc: "Broad-spectrum general medicine portfolio covering antibiotics, analgesics, anti-infectives, and supportive care formulations.",
    color: "#1EB7D9",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    number: "07",
    image: "/images1/pic-7-150x150.png",
    title: "Dermatology",
    desc: "Topical and systemic dermatology solutions including creams, gels, ointments, and lotions for diverse skin conditions.",
    color: "#D9CD2B",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    number: "08",
    image: "/images1/pic-8-150x150.png",
    title: "Urology",
    desc: "Targeted urology medications addressing kidney stones, urinary tract infections, and prostate conditions with proven efficacy.",
    color: "#F2A81D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-32 bg-[#0D0D0D] overflow-hidden">
      {/* Background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white select-none pointer-events-none whitespace-nowrap opacity-[0.02]">
        PRODUCTS
      </div>

      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[#0583F2]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-80 w-80 rounded-full bg-[#1EB7D9]/8 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 text-[#1EB7D9] text-xs font-semibold tracking-widest uppercase mb-6"
          >
            Therapy Areas
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-white leading-tight max-w-xl"
            >
              Our{" "}
              <span className="text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text">
                Products
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 max-w-md text-sm leading-relaxed"
            >
              Rivpra offers a comprehensive portfolio of products catering to multiple therapies in various dosage forms. We specialize in nephrology products and are innovators in launching many products that are first time in India.
            </motion.p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 * i }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                style={{ background: product.color }}
              />

              {/* Number watermark */}
              <span
                className="absolute -right-1 -top-3 select-none text-6xl font-black opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-300"
                style={{ color: product.color }}
              >
                {product.number}
              </span>

              {/* Image */}
              <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="80px"
                />
                {/* colour tint overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-color"
                  style={{ background: product.color }}
                />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base mb-2 leading-snug">
                {product.title}
              </h3>

              {/* Desc */}
              <p className="text-white/45 text-xs leading-relaxed mb-5 font-light">
                {product.desc}
              </p>

              {/* Know more link */}
              <div className="flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5" style={{ color: product.color }}>
                <span className="text-xs font-semibold tracking-wide">Know more</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>

              {/* Bottom glow on hover */}
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15"
                style={{ background: product.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
