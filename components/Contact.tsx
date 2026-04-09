"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const contactInfo = [
  {
    label: "Location",
    value: "SIDCUL, Haridwar, Uttarakhand, India",
    icon: "📍",
    color: "#0583F2",
  },
  {
    label: "Specialization",
    value: "Contract Manufacturing · Formulation Development",
    icon: "🏭",
    color: "#1EB7D9",
  },
  {
    label: "Markets",
    value: "Domestic & International",
    icon: "🌍",
    color: "#D9CD2B",
  },
  {
    label: "Certification",
    value: "ISO Certified · WHO-cGMP Compliant",
    icon: "✅",
    color: "#F2A81D",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
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

  return (
    <section id="contact" className="relative py-32 bg-[#0D0D0D] overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#0583F2]/8 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#0583F2]/40 bg-[#0583F2]/10 text-[#1EB7D9] text-xs font-semibold tracking-widest uppercase mb-6">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
            Partner With
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] bg-clip-text">
              Rivpra Today
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed font-light">
            Whether you are looking for contract manufacturing services, product
            licensing or formulation development — we are here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.2 }}
                className="flex items-start gap-5 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${info.color}15` }}
                >
                  {info.icon}
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-1 font-medium">
                    {info.label}
                  </div>
                  <div className="text-white/80 text-sm font-medium leading-relaxed">
                    {info.value}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Trust note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 p-6 rounded-2xl border border-[#0583F2]/20 bg-gradient-to-br from-[#0583F2]/8 to-transparent"
            >
              <div className="text-white font-bold mb-2">
                Trusted Since 2008
              </div>
              <div className="text-white/50 text-sm leading-relaxed">
                Rivpra Formulations has been a reliable pharmaceutical partner
                for over 15 years — delivering quality, consistency and value
                across every product we manufacture.
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0583F2] to-[#1EB7D9] flex items-center justify-center text-4xl mb-6">
                  ✅
                </div>
                <div className="text-white font-black text-2xl mb-3">
                  Message Sent!
                </div>
                <div className="text-white/50 text-sm max-w-xs">
                  Thank you for reaching out to Rivpra Formulations. Our team
                  will get back to you shortly.
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0583F2]/60 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0583F2]/60 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your Company Ltd."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0583F2]/60 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">
                    Area of Interest
                  </label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0583F2]/60 transition-colors duration-200"
                  >
                    <option value="" className="bg-[#0D0D0D]">
                      Select interest...
                    </option>
                    <option value="contract" className="bg-[#0D0D0D]">
                      Contract Manufacturing
                    </option>
                    <option value="formulation" className="bg-[#0D0D0D]">
                      Formulation Development
                    </option>
                    <option value="licensing" className="bg-[#0D0D0D]">
                      Product Licensing
                    </option>
                    <option value="generic" className="bg-[#0D0D0D]">
                      Generic Medicines Supply
                    </option>
                    <option value="nutraceutical" className="bg-[#0D0D0D]">
                      Nutraceuticals
                    </option>
                    <option value="cosmetic" className="bg-[#0D0D0D]">
                      Cosmetic Products
                    </option>
                    <option value="other" className="bg-[#0D0D0D]">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0583F2]/60 transition-colors duration-200 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0583F2] to-[#1EB7D9] text-white font-bold text-sm tracking-wide hover:shadow-2xl hover:shadow-[#0583F2]/30 transition-shadow duration-300"
                >
                  Send Message →
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
