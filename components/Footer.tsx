"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  Company: ["About Us", "Services", "Manufacturing", "Quality"],
  Products: ["Tablets & Capsules", "Syrups & Sachets", "Nutraceuticals", "Cosmetics"],
  Services: ["Contract Manufacturing", "Formulation Development", "Licensing", "Generic Supply"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-[#0583F2]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0583F2] to-[#1EB7D9] flex items-center justify-center shadow-lg shadow-[#0583F2]/20">
                <span className="text-white font-black text-lg">R</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-lg tracking-tight">Rivpra</span>
                <span className="text-[#1EB7D9] text-xs tracking-[0.2em] uppercase font-medium">
                  Formulations
                </span>
              </div>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs font-light">
              A trusted, reliable healthcare partner. ISO-certified, WHO-cGMP compliant
              pharmaceutical company delivering quality medicines since 2008.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {["ISO Certified", "WHO-cGMP", "Est. 2008"].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full text-xs border border-[#0583F2]/20 text-[#1EB7D9]/60 bg-[#0583F2]/5"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div className="text-white/80 font-semibold text-sm mb-5 tracking-wide">
                {section}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-white/30 text-sm hover:text-white/60 transition-colors duration-200 cursor-default">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-light">
            © {year} Rivpra Formulations. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1EB7D9] animate-pulse" />
            <span className="text-white/25 text-xs">
              SIDCUL, Haridwar · Uttarakhand, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
