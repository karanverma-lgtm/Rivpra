"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// ── Hex geometry constants ────────────────────────────────────────────────────
const W = 182;        // hex width px
const H = 210;        // hex height ≈ W * 2/√3
const GAP = 4;        // gap between cells
const OVERLAP = 52;   // H * 0.25 — vertical row overlap
const CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// ── Cell types ────────────────────────────────────────────────────────────────
type SCellData = { type: "strength"; num: string; title: string; desc: string; accent: string };
type ICellData = { type: "image";    src: string; alt: string };
type CellData  = SCellData | ICellData;

// ── Honeycomb rows ────────────────────────────────────────────────────────────
// ml = marginLeft (px). Rows alternate offset to tessellate.
// Row 0 (3 cells, offset right)   → S  I  S
// Row 1 (4 cells, flush left)     → S  I  I  S
// Row 2 (3 cells, offset right)   → S  I  S
// Row 3 (2 cells, centred under 1)→    S  S
const ROWS: { ml: number; cells: CellData[] }[] = [
  {
    ml: (W + GAP) / 2,
    cells: [
      { type: "strength", num: "01", title: "Robust Infrastructure",      desc: "3600 sq.ft facility in Sidcul, Haridwar.",  accent: "#0583F2" },
      { type: "image",    src: "/image_16.jpg", alt: "Rivpra Facility" },
      { type: "strength", num: "02", title: "Innovative Drug Delivery",   desc: "Solutions, Suspensions & Tablets.",           accent: "#1EB7D9" },
    ],
  },
  {
    ml: 0,
    cells: [
      { type: "strength", num: "03", title: "In-House Formulation",       desc: "Research – Formulation – Delivery.",          accent: "#D9CD2B" },
      { type: "image",    src: "/image_17.jpg", alt: "Rivpra Lab" },
      { type: "image",    src: "/image_18.jpg", alt: "Rivpra Production" },
      { type: "strength", num: "04", title: "Approved Products",          desc: "Approved by Key Regulatory Agencies.",        accent: "#F2A81D" },
    ],
  },
  {
    ml: (W + GAP) / 2,
    cells: [
      { type: "strength", num: "05", title: "WHO-cGMP & ISO 9001:2015",  desc: "Globally certified pharmaceutical company.",  accent: "#0583F2" },
      { type: "image",    src: "/image_19.jpg", alt: "Rivpra Quality" },
      { type: "strength", num: "06", title: "24×7 Support",              desc: "Formulation · Production · Logistics.",       accent: "#1EB7D9" },
    ],
  },
  {
    ml: W + GAP,
    cells: [
      { type: "strength", num: "07", title: "In-House Laboratory",       desc: "Advanced in-house development & testing.",    accent: "#D9CD2B" },
      { type: "strength", num: "08", title: "Zero Defect",               desc: "Customer-centric quality approach.",          accent: "#F2A81D" },
    ],
  },
];

// mobile-only flat list
const MOBILE: SCellData[] = ROWS.flatMap(r =>
  r.cells.filter((c): c is SCellData => c.type === "strength")
);

// ── Single hex cell ───────────────────────────────────────────────────────────
function HexCell({ cell, delay, show }: { cell: CellData; delay: number; show: boolean }) {
  const baseAnim = {
    initial: { opacity: 0, scale: 0.78 },
    animate: show ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 0.55, delay, ease: "easeOut" } as const,
  };

  if (cell.type === "image") {
    return (
      <motion.div {...baseAnim} className="relative flex-shrink-0" style={{ width: W, height: H }}>
        {/* border ring */}
        <div
          className="absolute inset-0"
          style={{ clipPath: CLIP, background: "linear-gradient(135deg,#0583F250,#1EB7D940)" }}
        />
        {/* image */}
        <div className="absolute inset-[3px] overflow-hidden" style={{ clipPath: CLIP }}>
          <Image src={cell.src} alt={cell.alt} fill className="object-cover" sizes={`${W}px`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]/40" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div {...baseAnim} className="group relative flex-shrink-0" style={{ width: W, height: H }}>
      {/* outer glow ring */}
      <div
        className="absolute inset-0 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
        style={{ clipPath: CLIP, background: `${cell.accent}28` }}
      />
      {/* inner dark fill */}
      <div
        className="absolute inset-[2px]"
        style={{ clipPath: CLIP, background: "#0f0f0f" }}
      />
      {/* hover colour wash */}
      <div
        className="absolute inset-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ clipPath: CLIP, background: `${cell.accent}14` }}
      />
      {/* content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-7 text-center">
        <span className="mb-1 text-[10px] font-black opacity-40" style={{ color: cell.accent }}>
          {cell.num}
        </span>
        <span className="mb-2 text-[13px] font-bold leading-snug text-white">
          {cell.title}
        </span>
        <span className="text-[10px] font-light leading-snug text-white/50">
          {cell.desc}
        </span>
        <span className="mt-3 block h-[2px] w-6 rounded-full" style={{ background: cell.accent }} />
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Strengths() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // pre-compute global stagger indices
  let idx = 0;
  const rowDelays = ROWS.map(row => row.cells.map(() => (idx++) * 0.08));

  return (
    <section id="strengths" className="relative overflow-hidden bg-[#0D0D0D] py-28">
      {/* grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#0583F2]/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#1EB7D9]/8 blur-[110px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1EB7D9]">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-black text-white lg:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text text-transparent">
              Strengths
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/40">
            Built on years of expertise, compliance, and relentless commitment to quality — the pillars that set Rivpra apart.
          </p>
        </motion.div>

        {/* ── Honeycomb (md+) ── */}
        <div className="hidden overflow-x-auto md:flex md:justify-center">
          <div className="flex flex-col items-start">
            {ROWS.map((row, ri) => (
              <div
                key={ri}
                className="flex"
                style={{
                  marginLeft: row.ml,
                  marginTop: ri === 0 ? 0 : -(OVERLAP - GAP),
                  gap: GAP,
                }}
              >
                {row.cells.map((cell, ci) => (
                  <HexCell key={ci} cell={cell} delay={rowDelays[ri][ci]} show={inView} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile card grid ── */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {MOBILE.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
            >
              <span className="text-lg font-black" style={{ color: item.accent }}>{item.num}</span>
              <h3 className="mt-1 text-sm font-bold leading-tight text-white">{item.title}</h3>
              <p className="mt-1 text-[11px] leading-snug text-white/50">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
