"use client";

import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Company: ["About Us", "Services", "Manufacturing", "Quality", "Our Clients", "Careers", "Media Gallery"],
  Products: ["Tablets & Capsules", "Syrups & Sachets", "Nutraceuticals", "Cosmetics", "Oteria Skincare"],
  Services: ["Contract Manufacturing", "Formulation Development", "Licensing", "Generic Supply"],
};

const anchorMap: Record<string, string> = {
  "About Us": "#about",
  "Services": "#services",
  "Manufacturing": "#manufacturing",
  "Quality": "#quality",
  "Our Clients": "#clients",
  "Careers": "/careers",
  "Media Gallery": "/gallery",
  "Tablets & Capsules": "#dosages",
  "Syrups & Sachets": "#dosages",
  "Nutraceuticals": "#dosages",
  "Cosmetics": "#dosages",
  "Oteria Skincare": "#oteria",
  "Contract Manufacturing": "#services",
  "Formulation Development": "#services",
  "Licensing": "#services",
  "Generic Supply": "#services",
};

const logoSrc = "/Rivpra%20Logo.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    const href = anchorMap[link];
    if (!href) return;
    if (href.startsWith("/")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-200 bg-white">
      {/* Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-[#1fb8e5]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6 group w-fit" aria-label="Rivpra Formulations home">
              <Image
                src={logoSrc}
                alt="Rivpra Formulations"
                width={132}
                height={160}
                unoptimized
                className="h-20 w-auto transition-transform duration-300 group-hover:scale-105"
              />
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
                {links.map((link) => {
                  const href = anchorMap[link] || "#";
                  const isExternalOrSubpage = href.startsWith("/");
                  return (
                    <li key={link}>
                      {isExternalOrSubpage ? (
                        <Link
                          href={href}
                          className="text-slate-400 text-sm hover:text-[#1fb8e5] transition-colors duration-200"
                        >
                          {link}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          onClick={(e) => handleLinkClick(e, link)}
                          className="text-slate-400 text-sm hover:text-[#1fb8e5] transition-colors duration-200"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  );
                })}
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
