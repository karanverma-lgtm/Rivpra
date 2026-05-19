"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Quality", href: "#quality" },
  { label: "Markets", href: "#markets" },
  { label: "Contact", href: "#contact" },
];

const mobileNavLinks = [
  { 
    label: "Home", 
    href: "#", 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) 
  },
  { 
    label: "Services", 
    href: "#services", 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ) 
  },
  { 
    label: "Quality", 
    href: "#quality", 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ) 
  },
  { 
    label: "About", 
    href: "#about", 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) 
  },
  { 
    label: "Contact", 
    href: "#contact", 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) 
  },
];

const logoSrc = "/Rivpra%20Logo.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [activeMobileLink, setActiveMobileLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setHidden(current > lastScroll.current && current > 100);
      lastScroll.current = current;

      // Simple scroll spy logic for mobile active state
      const sections = ["contact", "quality", "services", "about"];
      let found = false;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          const matchedLink = mobileNavLinks.find(link => link.href === `#${section}`);
          if (matchedLink) {
            setActiveMobileLink(matchedLink.label);
            found = true;
          }
          break;
        }
      }
      if (!found && current < 200) {
        setActiveMobileLink("Home");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string, label?: string) => {
    if (label) setActiveMobileLink(label);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop & Top Mobile Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group" aria-label="Rivpra Formulations home" onClick={(e) => { e.preventDefault(); handleNavClick("#", "Home"); }}>
              <Image
                src={logoSrc}
                alt="Rivpra Formulations"
                width={132}
                height={160}
                unoptimized
                className="h-10 sm:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-2 text-sm text-slate-700 hover:text-slate-950 transition-colors duration-200 group font-medium tracking-wide"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-slate-50 transition-colors duration-200" />
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => handleNavClick("#contact")}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 text-sm font-bold hover:shadow-lg hover:shadow-[#1fb8e5]/30 transition-all duration-300 hover:scale-105 tracking-wide"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation Bar (Nykaa/Amazon Style) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-2 pt-1"
      >
        <ul className="flex items-center justify-around px-2">
          {mobileNavLinks.map((link) => {
            const isActive = activeMobileLink === link.label;
            return (
              <li key={link.label} className="flex-1">
                <button
                  onClick={() => handleNavClick(link.href, link.label)}
                  className="w-full flex flex-col items-center justify-center gap-1 group relative py-2"
                >
                  {/* Indicator Dot */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute top-0 w-1 h-1 rounded-full bg-[#1fb8e5]"
                    />
                  )}
                  
                  {/* Icon */}
                  <div className={`transition-all duration-300 ${isActive ? 'text-[#1fb8e5] scale-110 -translate-y-0.5' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {link.icon}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-[#1fb8e5]' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {link.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
}
