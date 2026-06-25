"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ContactInfoItem {
  label: string;
  value: React.ReactNode;
  type: string;
  color: string;
}

const contactInfo: ContactInfoItem[] = [
  {
    label: "Corporate Office",
    value: "Office No: 1005-1008, 11th Floor, KM Trade Tower (Radisson Blu), H-3, Kaushambi, Ghaziabad-201010, India",
    type: "office",
    color: "#1fb8e5",
  },
  {
    label: "Manufacturing Works",
    value: "Plot No. 8, Sector-6A, I.I.E., SIDCUL, Haridwar-249 403 (U.K.), India",
    type: "works",
    color: "#f6b11b",
  },
  {
    label: "General Reception",
    value: (
      <div className="space-y-1">
        <div>
          <span className="text-slate-400 font-normal">Tel:</span>{" "}
          <a href="tel:01204277177" className="hover:text-[#1fb8e5] transition-colors">0120-4277177</a>
        </div>
        <div>
          <span className="text-slate-400 font-normal">Mob:</span>{" "}
          <a href="tel:+919205981454" className="hover:text-[#1fb8e5] transition-colors">9205981454</a> /{" "}
          <a href="tel:+919205981455" className="hover:text-[#1fb8e5] transition-colors">1455</a> /{" "}
          <a href="tel:+919205981456" className="hover:text-[#1fb8e5] transition-colors">1456</a>
        </div>
      </div>
    ),
    type: "phone",
    color: "#ddd82a",
  },
  {
    label: "Sales & Business Development",
    value: (
      <div className="space-y-1">
        <div>
          <span className="text-slate-400 font-normal text-xs uppercase tracking-wide block sm:inline mr-1">Domestic Sales:</span>
          <a href="tel:+918800394441" className="hover:text-[#1fb8e5] transition-colors">8800394441</a> &{" "}
          <a href="tel:+918510881144" className="hover:text-[#1fb8e5] transition-colors">8510881144</a>
        </div>
        <div>
          <span className="text-slate-400 font-normal text-xs uppercase tracking-wide block sm:inline mr-1">New Business:</span>
          <a href="tel:+919718540207" className="hover:text-[#1fb8e5] transition-colors">9718540207</a> &{" "}
          <a href="tel:+919311400851" className="hover:text-[#1fb8e5] transition-colors">9311400851</a>
        </div>
      </div>
    ),
    type: "phone",
    color: "#1fb8e5",
  },
  {
    label: "Purchase Department",
    value: (
      <div>
        <span className="text-slate-400 font-normal">Mob:</span>{" "}
        <a href="tel:+919205981459" className="hover:text-[#1fb8e5] transition-colors">9205981459</a>
      </div>
    ),
    type: "phone",
    color: "#f6b11b",
  },
  {
    label: "Email Channels",
    value: (
      <div className="space-y-1">
        <div>
          <span className="text-slate-400 font-normal text-xs uppercase tracking-wide block sm:inline mr-1">Business:</span>
          <a href="mailto:bd@rivpraformulation.com" className="hover:text-[#1fb8e5] transition-colors">bd@rivpraformulation.com</a>
        </div>
        <div>
          <span className="text-slate-400 font-normal text-xs uppercase tracking-wide block sm:inline mr-1">Sales:</span>
          <a href="mailto:sales@rivpraformulation.com" className="hover:text-[#1fb8e5] transition-colors">sales@rivpraformulation.com</a>
        </div>
        <div>
          <span className="text-slate-400 font-normal text-xs uppercase tracking-wide block sm:inline mr-1">Careers:</span>
          <a href="mailto:career@rivpraformulation.com" className="hover:text-[#1fb8e5] transition-colors">career@rivpraformulation.com</a>
        </div>
      </div>
    ),
    type: "email",
    color: "#be185d",
  },
];

function ContactIcon({ type }: { type: string }) {
  switch (type) {
    case "office":
      return (
        <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-md">
          <defs>
            <linearGradient id="conOff" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M30 20 L70 20 L70 90 L30 90 Z" fill="url(#conOff)" />
          <path d="M20 50 L30 50 L30 90 L20 90 Z" fill="#0284c7" />
          <path d="M70 50 L80 50 L80 90 L70 90 Z" fill="#0284c7" />
          <rect x="38" y="30" width="8" height="10" rx="1" fill="#ffffff" opacity="0.8" />
          <rect x="54" y="30" width="8" height="10" rx="1" fill="#ffffff" opacity="0.8" />
          <rect x="38" y="48" width="8" height="10" rx="1" fill="#ffffff" opacity="0.8" />
          <rect x="54" y="48" width="8" height="10" rx="1" fill="#ffffff" opacity="0.8" />
          <rect x="46" y="70" width="8" height="20" fill="#ffffff" />
        </svg>
      );
    case "works":
      return (
        <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-md">
          <defs>
            <linearGradient id="conWrk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>
          <path d="M20 54 L68 54 L78 64 L78 86 L20 86 Z" fill="url(#conWrk)" />
          <path d="M20 54 L32 42 L32 54 L44 42 L44 54 L56 42 L56 54 L68 54" fill="url(#conWrk)" />
          <rect x="34" y="22" width="6" height="28" fill="#64748b" />
          <rect x="46" y="16" width="6" height="34" fill="#64748b" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-md">
          <defs>
            <linearGradient id="conPhn" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#4d7c0f" />
            </linearGradient>
          </defs>
          <path d="M24 24 C24 20, 30 20, 34 24 L44 34 C48 38, 44 44, 40 48 C44 56, 52 64, 60 68 C64 64, 70 60, 74 64 L84 74 C88 78, 88 84, 84 88 C76 96, 56 96, 36 76 C16 56, 16 36, 24 24 Z" fill="url(#conPhn)" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-md">
          <defs>
            <linearGradient id="conEml" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </linearGradient>
          </defs>
          <rect x="18" y="26" width="64" height="48" rx="6" fill="url(#conEml)" />
          <path d="M18 30 L50 56 L82 30" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      );
    default:
      return <ContactFallbackIcon />;
  }
}

function ContactFallbackIcon() {
  return (
    <svg viewBox="0 0 100 100" className="w-7 h-7 drop-shadow-md inline-block align-middle">
      <defs>
        <linearGradient id="conFailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="30" fill="url(#conFailGrad)" />
      <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="bold">?</text>
    </svg>
  );
}

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
    <section id="contact" className="relative w-full overflow-hidden bg-white py-12">
      {/* Background accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#1fb8e5]/8 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/40 bg-[#1fb8e5]/10 text-[#f6b11b] text-xs font-semibold tracking-widest uppercase mb-6">
            Get In Touch
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-950 leading-tight mb-6">
            Partner With
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              Rivpra Today
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed font-light">
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
                className="flex items-start gap-5 p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${info.color}15` }}
                >
                  <ContactIcon type={info.type} />
                </div>
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest mb-1 font-medium">
                    {info.label}
                  </div>
                  <div className="text-slate-700 text-sm font-medium leading-relaxed">
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
              className="mt-4 p-6 rounded-2xl border border-[#1fb8e5]/20 bg-gradient-to-br from-[#1fb8e5]/8 to-transparent"
            >
              <div className="text-slate-950 font-bold mb-2">
                Trusted Since 2008
              </div>
              <div className="text-slate-500 text-sm leading-relaxed">
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
            className="relative p-8 rounded-3xl border border-slate-200 bg-white backdrop-blur-sm"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1fb8e5] to-[#f6b11b] flex items-center justify-center mb-6 shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-slate-950" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div className="text-slate-950 font-black text-2xl mb-3">
                  Message Sent!
                </div>
                <div className="text-slate-500 text-sm max-w-xs">
                  Thank you for reaching out to Rivpra Formulations. Our team
                  will get back to you shortly.
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2 font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your Company Ltd."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2 font-medium">
                    Area of Interest
                  </label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-950 text-sm focus:outline-none focus:border-[#1fb8e5]/60 transition-colors duration-200"
                  >
                    <option value="" className="bg-white">
                      Select interest...
                    </option>
                    <option value="contract" className="bg-white">
                      Contract Manufacturing
                    </option>
                    <option value="formulation" className="bg-white">
                      Formulation Development
                    </option>
                    <option value="licensing" className="bg-white">
                      Product Licensing
                    </option>
                    <option value="generic" className="bg-white">
                      Generic Medicines Supply
                    </option>
                    <option value="nutraceutical" className="bg-white">
                      Nutraceuticals
                    </option>
                    <option value="cosmetic" className="bg-white">
                      Cosmetic Products
                    </option>
                    <option value="other" className="bg-white">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-950 text-sm placeholder-slate-400 focus:outline-none focus:border-[#1fb8e5]/60 transition-colors duration-200 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 font-bold text-sm tracking-wide hover:shadow-2xl hover:shadow-[#1fb8e5]/30 transition-shadow duration-300"
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
