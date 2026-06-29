"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const accreditations = [
  "WHO-GMP",
  "ISO 9001-2015",
  "AIRP IVORY COAST",
  "PPB KENYA ACCREDITED",
  "NAFDAC NIGERIA",
  "MOH AFGHANISTAN",
  "FDA PHILIPPINES",
  "MOH AZERBAIJAN",
  "MOH CAMBODIA",
  "FDA VIETNAM",
  "MOH YEMEN",
  "MOH KAZAKHSTAN",
  "MOH IRAQ",
  "MOH KOSOVO",
  "EFDA ETHIOPIA",
];

interface Country {
  name: string;
  flag?: string;
}

interface SubRegion {
  name: string;
  countries: Country[];
}

interface MainRegion {
  name: string;
  subRegions: SubRegion[];
}

const globalFootprints: MainRegion[] = [
  {
    name: "Asia",
    subRegions: [
      {
        name: "South East Asia (SEA)",
        countries: [
          { name: "Myanmar", flag: "/exports/1-19.png" },
          { name: "Cambodia", flag: "/exports/1-17.png" },
          { name: "Vietnam", flag: "/exports/1-1-268x300.png" },
          { name: "Philippines", flag: "/exports/1-12.png" }
        ]
      },
      {
        name: "South Asia",
        countries: [
          { name: "Bangladesh", flag: "/exports/1-7-268x300.png" },
          { name: "Nepal", flag: "/exports/1-2-268x300.png" },
          { name: "Afghanistan", flag: "/exports/1-9-268x300.png" }
        ]
      },
      {
        name: "Central Asia / CIS",
        countries: [
          { name: "Kazakhstan", flag: "/exports/1-23-268x300.png" },
          { name: "Uzbekistan", flag: "/exports/1-24-268x300.png" },
          { name: "Azerbaijan", flag: "/exports/1-13.png" },
          { name: "Georgia", flag: "/exports/1-22-268x300.png" }
        ]
      }
    ]
  },
  {
    name: "Middle East & Africa (MEA)",
    subRegions: [
      {
        name: "Middle East",
        countries: [
          { name: "Yemen", flag: "/exports/1-6-268x300.png" },
          { name: "Iraq", flag: "/exports/1-16.png" }
        ]
      },
      {
        name: "Africa",
        countries: [
          { name: "Nigeria", flag: "/exports/1-5-268x300.png" },
          { name: "Kenya", flag: "/exports/1-11.png" },
          { name: "Ethiopia", flag: "/exports/1-15.png" },
          { name: "Gambia", flag: "/exports/1-3-268x300.png" }
        ]
      }
    ]
  },
  {
    name: "Latin America & Balkans",
    subRegions: [
      {
        name: "Latin America (LATAM)",
        countries: [
          { name: "Cuba", flag: "/exports/1-8-268x300.png" },
          { name: "Guatemala", flag: "/exports/1-20.png" },
          { name: "Dominican Republic", flag: "/exports/1-18.png" },
          { name: "Bolivia", flag: "/exports/1-4-268x300.png" },
          { name: "Ecuador", flag: "/exports/ecuador-flag.png" },
          { name: "Venezuela", flag: "/exports/1-21-268x300.png" },
          { name: "Chile", flag: "/exports/chile-flag.png" }
        ]
      },
      {
        name: "Balkans",
        countries: [
          { name: "Kosovo", flag: "/exports/1-14.png" }
        ]
      }
    ]
  }
];

const accentColors = ["#1fb8e5", "#f6b11b", "#ddd82a", "#f6b11b"];

export default function Exports() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="exports" className="relative w-full overflow-hidden bg-white py-12">
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#1fb8e5]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-[#f6b11b]/8 blur-[100px]" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">



        {/* ── Global Footprints Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h3 className="text-2xl font-black text-slate-950 lg:text-3xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#ddd82a] to-[#f6b11b] bg-clip-text text-transparent">
              Global Footprints
            </span>
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500 leading-relaxed">
            We are expanding our operations across the globe &amp; attained the
            following accreditations
          </p>
        </motion.div>

        {/* ── Accreditation text pills scroll ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mb-10 overflow-hidden"
        >
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28"
            style={{ background: "linear-gradient(to right,#ffffff 40%,transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28"
            style={{ background: "linear-gradient(to left,#ffffff 40%,transparent)" }}
          />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
            className="flex gap-3 w-max"
          >
            {[...accreditations, ...accreditations].map((acc, i) => {
              const color = accentColors[i % 4];
              return (
                <span
                  key={i}
                  className="flex-shrink-0 rounded-full px-5 py-2 text-xs font-semibold whitespace-nowrap"
                  style={{
                    border: `1px solid ${color}40`,
                    background: `${color}12`,
                    color,
                  }}
                >
                  {acc}
                </span>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Grouped Categorized Flag Grid ── */}
        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          {globalFootprints.map((mainReg, mainIdx) => (
            <motion.div
              key={mainReg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + (mainIdx * 0.15) }}
              className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/20 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/60">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#1fb8e5] to-[#f6b11b]" />
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider leading-tight">
                    {mainReg.name}
                  </h4>
                </div>

                <div className="space-y-5">
                  {mainReg.subRegions.map((subReg) => (
                    <div key={subReg.name} className="space-y-2">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {subReg.name}
                      </h5>
                      <div className="flex flex-wrap gap-3">
                        {subReg.countries
                          .filter((c) => c.flag)
                          .map((c) => (
                            <div
                              key={c.name}
                              className="flex flex-col items-center gap-1"
                            >
                              <div
                                className="group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-[#1fb8e5]/40 hover:shadow-md flex items-center justify-center"
                              >
                                <Image
                                  src={c.flag!}
                                  alt={c.name}
                                  fill
                                  className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                                  sizes="64px"
                                />
                              </div>
                              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 text-center leading-tight max-w-[64px]">
                                {c.name}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
