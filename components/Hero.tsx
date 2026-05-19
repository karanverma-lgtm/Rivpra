"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const heroWords = ["Reliable", "Trusted", "Innovative", "ISO-Certified"];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wordIndex = useRef(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );

    // word cycling
    const interval = setInterval(() => {
      if (!wordRef.current) return;
      gsap.to(wordRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => {
          wordIndex.current = (wordIndex.current + 1) % heroWords.length;
          if (wordRef.current) {
            wordRef.current.textContent = heroWords[wordIndex.current];
            gsap.fromTo(
              wordRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.3 }
            );
          }
        },
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-white">
      {/* Subtle background glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#1fb8e5]/8 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#f6b11b]/6 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-[#ddd82a]/5 blur-[100px]" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-8">
        {/* ── Two-column grid ── */}
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* ── Left Column — Text ── */}
          <div className="pt-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-[#f6b11b] animate-pulse" />
              <span className="text-[#f6b11b] text-xs font-semibold tracking-widest uppercase">
                ISO Certified · WHO-cGMP Compliant · Est. 2008
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              ref={titleRef}
              className="opacity-0 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-slate-950 leading-[0.95] tracking-tight mb-5"
            >
              A{" "}
              <span
                ref={wordRef}
                className="inline-block bg-gradient-to-r from-[#1fb8e5] via-[#f6b11b] to-[#1fb8e5] bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-shift"
              >
                Trusted
              </span>
              <br />
              Pharmaceutical
              <br />
              <span className="text-slate-500">Partner</span>
            </h1>

            {/* Subtext */}
            <p
              ref={subtitleRef}
              className="opacity-0 text-base lg:text-lg text-slate-600 max-w-md mb-8 leading-relaxed font-light"
            >
              Integrated pharmaceutical company delivering highly effective,
              affordable medicines. Debt-free & profit-making since{" "}
              <span className="text-[#f6b11b] font-medium">2008</span> — from
              Haridwar to the world.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCTA}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 font-semibold text-sm tracking-wide overflow-hidden hover:shadow-2xl hover:shadow-[#1fb8e5]/30 transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Discover Rivpra
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/45 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-full border border-slate-300 text-slate-700 font-semibold text-sm tracking-wide hover:border-[#1fb8e5]/60 hover:text-slate-950 hover:bg-slate-50 transition-all duration-300"
              >
                Partner With Us
              </button>
            </div>
          </div>

          {/* ── Right Column — Glassmorphism Enquiry Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative"
          >
            {/* Glow behind form */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#1fb8e5]/20 via-[#f6b11b]/10 to-[#ddd82a]/10 blur-2xl" />

            {/* Glassmorphism card */}
            <div className="relative rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-2xl shadow-slate-200/60 overflow-hidden">
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#1fb8e5] via-[#f6b11b] to-[#ddd82a]" />

              <div className="p-7 lg:p-8">
                {/* Form header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-slate-950 font-bold text-lg leading-tight">
                        Request a Quote
                      </h3>
                      <p className="text-slate-500 text-xs">
                        Get a response within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] flex items-center justify-center text-3xl mb-4">
                      ✅
                    </div>
                    <div className="text-slate-950 font-black text-xl mb-2">
                      Quote Requested!
                    </div>
                    <div className="text-slate-500 text-sm max-w-xs">
                      Thank you! Our team will review your enquiry and get back
                      to you within 24 hours.
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Name & Email row */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full bg-white/70 border border-slate-200/80 rounded-xl px-4 py-2.5 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 focus:bg-white transition-all duration-200 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="john@company.com"
                          className="w-full bg-white/70 border border-slate-200/80 rounded-xl px-4 py-2.5 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 focus:bg-white transition-all duration-200 backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Phone & Interest row */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/70 border border-slate-200/80 rounded-xl px-4 py-2.5 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 focus:bg-white transition-all duration-200 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                          Interest
                        </label>
                        <select
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/70 border border-slate-200/80 rounded-xl px-4 py-2.5 text-slate-950 text-sm focus:outline-none focus:border-[#1fb8e5]/60 focus:bg-white transition-all duration-200 backdrop-blur-sm"
                        >
                          <option value="">Select...</option>
                          <option value="contract">Contract Manufacturing</option>
                          <option value="formulation">Formulation Development</option>
                          <option value="licensing">Product Licensing</option>
                          <option value="generic">Generic Medicines</option>
                          <option value="nutraceutical">Nutraceuticals</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase tracking-widest mb-1.5 font-semibold">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Tell us about your requirements..."
                        className="w-full bg-white/70 border border-slate-200/80 rounded-xl px-4 py-2.5 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 focus:bg-white transition-all duration-200 resize-none backdrop-blur-sm"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 font-bold text-sm tracking-wide hover:shadow-xl hover:shadow-[#1fb8e5]/25 transition-shadow duration-300"
                    >
                      Submit Enquiry →
                    </motion.button>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center gap-4 pt-1">
                      {[
                        { icon: "🔒", text: "Secure" },
                        { icon: "⚡", text: "24hr Response" },
                        { icon: "✅", text: "No Obligation" },
                      ].map((item) => (
                        <div
                          key={item.text}
                          className="flex items-center gap-1"
                        >
                          <span className="text-xs">{item.icon}</span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -bottom-3 -right-2 lg:right-4 flex items-center gap-2 rounded-full border border-[#1fb8e5]/30 bg-white px-4 py-2 shadow-lg z-10">
              <span className="h-2 w-2 rounded-full bg-[#f6b11b] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-[#f6b11b]">
                WHO-cGMP Certified
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Stats — Full width below both columns ── */}
        <div
          ref={statsRef}
          className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-6 pb-4 border-t border-slate-200 pt-6"
        >
          {[
            { value: "13+", label: "Years of Experience" },
            { value: "800+", label: "Product SKUs" },
            { value: "100+", label: "Clients" },
            { value: "600+", label: "Formulations" },
            { value: "15+", label: "Accreditations" },
            { value: "20+", label: "Global Markets Presence" },
          ].map((stat) => (
            <div key={stat.label} className="opacity-0">
              <div className="text-3xl lg:text-4xl font-black text-slate-950 mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 text-xs tracking-widest uppercase font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
