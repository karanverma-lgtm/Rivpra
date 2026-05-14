"use client";

import Link from "next/link";

const footerLinks = {
  Company: ["About Us", "Services", "Manufacturing", "Quality"],
  Products: ["Tablets & Capsules", "Syrups & Sachets", "Nutraceuticals", "Cosmetics"],
  Services: ["Contract Manufacturing", "Formulation Development", "Licensing", "Generic Supply"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-200 bg-white">
      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-[#1fb8e5]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] flex items-center justify-center shadow-lg shadow-[#1fb8e5]/20">
                <span className="text-slate-950 font-black text-lg">R</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-slate-950 font-bold text-lg tracking-tight">Rivpra</span>
                <span className="text-[#f6b11b] text-xs tracking-[0.2em] uppercase font-medium">
                  Formulations
                </span>
              </div>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs font-light">
              A trusted, reliable healthcare partner. ISO-certified, WHO-cGMP compliant
              pharmaceutical company delivering quality medicines since 2008.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {["ISO Certified", "WHO-cGMP", "Est. 2008"].map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 rounded-full text-xs border border-[#1fb8e5]/20 text-[#f6b11b]/60 bg-[#1fb8e5]/5"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div className="text-slate-700 font-semibold text-sm mb-5 tracking-wide">
                {section}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <span className="text-slate-400 text-sm hover:text-slate-600 transition-colors duration-200 cursor-default">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs font-light">
            © {year} Rivpra Formulations. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f6b11b] animate-pulse" />
            <span className="text-slate-400 text-xs">
              SIDCUL, Haridwar · Uttarakhand, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
