"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  qualification: string;
  type: string;
  description: string;
  requirements: string[];
}

const jobOpenings: Job[] = [
  {
    id: "sales-coordinator",
    title: "Sales Co-ordinator",
    department: "Sales & Marketing",
    location: "Kaushambi, Ghaziabad",
    experience: "1 - 2 Years",
    qualification: "B.Sc./ B.Pharma With 1-2 Years of Experience",
    type: "Full-Time",
    description: "Responsible for coordinating between our sales executives, clients, and manufacturing facilities to track orders, manage schedules, prepare quotes, and maintain high satisfaction levels.",
    requirements: [
      "B.Sc. / B.Pharma degree or equivalent science background.",
      "1 - 2 years of experience in sales coordination or administrative support in the pharmaceutical industry.",
      "Excellent organization skills and proficiency in MS Excel and ERP inventory systems.",
      "Polished verbal and written communication."
    ]
  },
  {
    id: "bd-executive",
    title: "Business Development Executive",
    department: "Sales & Marketing",
    location: "Kaushambi, Ghaziabad",
    experience: "4 - 6 Years",
    qualification: "B.Sc./ M.Sc. /B.Pharma With 4-6 years of Experience",
    type: "Full-Time",
    description: "Drive sales expansion, identify new market opportunities, handle business acquisitions, manage distributors, and coordinate product registrations for domestic or export markets.",
    requirements: [
      "B.Sc. / M.Sc. / B.Pharma degree.",
      "4 - 6 years of experience in pharmaceutical business development.",
      "Proven capability to meet sales targets, identify pharmaceutical market trends, and onboard new clients.",
      "Effective negotiation, presentation, and contract drafting skills."
    ]
  },
  {
    id: "qms-executive-qa",
    title: "QMS Executive for Q.A. Department",
    department: "Quality Assurance",
    location: "Sidcul Haridwar",
    experience: "6 - 8 Years",
    qualification: "B.Sc./ M.Sc. /B.Pharma With 6-8 years of Experience",
    type: "Full-Time",
    description: "Manage Quality Management Systems (QMS) protocols inside our Haridwar manufacturing facility. Lead deviation management, change controls, CAPAs, and risk assessments to ensure WHO-cGMP standards.",
    requirements: [
      "B.Sc. / M.Sc. / B.Pharma degree.",
      "6 - 8 years of experience in QA Operations with a strong focus on QMS documentation.",
      "Hands-on expertise in investigations, root cause analysis (RCA), and compliance audit responses.",
      "Solid understanding of pharmaceutical validation and qualification parameters."
    ]
  },
  {
    id: "front-desk-admin",
    title: "Front Desk Cum Admin Executive",
    department: "Administration",
    location: "Kaushambi, Ghaziabad",
    experience: "3 - 4 Years",
    qualification: "Graduation/ Master's With 3-4 Years of Experience",
    type: "Full-Time",
    description: "Manage our front desk reception area, greet visitors, handle incoming telephonic queries, manage schedules, handle administrative tasks, and coordinate with corporate partners.",
    requirements: [
      "Graduation or Master's degree in any discipline.",
      "3 - 4 years of experience as a receptionist, front office executive, or admin assistant.",
      "Polished communication, telephone etiquette, and greeting skills.",
      "Proficiency in basic office software (Outlook, Word, PowerPoint)."
    ]
  },
  {
    id: "website-marketplace",
    title: "Website & Marketplace Management",
    department: "IT & Digital",
    location: "Kaushambi, Ghaziabad",
    experience: "7+ Years",
    qualification: "Graduate or Masters in any discipline With 7+ years of Experience",
    type: "Full-Time",
    description: "Lead the management of the corporate website and all sister brand e-commerce stores (Amazon, Flipkart, Myntra, Nykaa, Macaron, etc.). Manage cataloging, pricing, promotions, SEO, and inventory synchronization.",
    requirements: [
      "Graduate or Master's degree in IT, Marketing, or any discipline.",
      "7+ years of hands-on experience in managing e-commerce brand stores and websites.",
      "Expertise in marketplace advertisement, search ranking optimization, and catalog management.",
      "Analytical mindset to track online sales, user engagement, and marketing ROI."
    ]
  },
  {
    id: "qms-executive",
    title: "QMS Executive",
    department: "Quality Assurance",
    location: "Sidcul Haridwar",
    experience: "6 - 8 Years",
    qualification: "B.Sc. / B.Pharma/ M. Pharma With 6-8 years of Experience",
    type: "Full-Time",
    description: "Conduct standard operating procedure (SOP) reviews, support internal audits, draft compliance dossiers, and manage document controls across all manufacturing lines in our Haridwar facility.",
    requirements: [
      "B.Sc. / B.Pharma / M.Pharma degree.",
      "6 - 8 years of core experience in pharmaceutical QA/QMS.",
      "Excellent understanding of standard operating procedures, documentation safety, and validation protocols.",
      "Detail-oriented team player with strong analytical problem-solving skills."
    ]
  }
];

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>(jobOpenings);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [submitted, setSubmitted] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: ""
  });

  const departments = ["All", "Quality Assurance", "Sales & Marketing", "Administration", "IT & Digital"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        if (querySnapshot.empty) {
          // If the Firestore jobs collection is empty, populate it with our default 6 job openings!
          for (const job of jobOpenings) {
            await setDoc(doc(db, "jobs", job.id), job);
          }
          setJobs(jobOpenings);
        } else {
          const list: Job[] = [];
          querySnapshot.forEach((doc) => {
            list.push({ ...doc.data() } as Job);
          });
          setJobs(list);
        }
      } catch (err) {
        console.error("Error fetching jobs from firestore, using static defaults:", err);
        setJobs(jobOpenings);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = selectedDept === "All" 
    ? jobs 
    : jobs.filter(job => job.department === selectedDept);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setApplyError(null);

    try {
      let resumeUrl = "";
      let resumeBase64 = "";
      let resumeFileName = "";

      if (file) {
        resumeFileName = file.name;
        // Try uploading to Firebase Storage first
        try {
          const storageRef = ref(storage, `resumes/${Date.now()}_${file.name}`);
          // Add a 4-second timeout race to prevent hanging on slow connections or unconfigured Storage
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firebase Storage upload timeout (4s)")), 4000)
          );
          const uploadResult = await Promise.race([
            uploadBytes(storageRef, file),
            timeoutPromise
          ]);
          resumeUrl = await getDownloadURL(uploadResult.ref);
        } catch (storageErr) {
          console.warn("Firebase Storage upload failed or timed out, falling back to Base64 in Firestore:", storageErr);
          // Fallback to Base64 with safe event handler registration order
          resumeBase64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          });
        }
      }

      // Save application document to Firestore
      await addDoc(collection(db, "resumes"), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position,
        experience: form.experience,
        message: form.message,
        resumeUrl,
        resumeBase64,
        resumeFileName,
        timestamp: new Date().toISOString(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      setApplyError("Something went wrong while submitting your application. Please try again or email us directly.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 pb-20 lg:pb-0">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-tr from-[#1fb8e5]/10 via-white to-[#f6b11b]/10 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1fb8e5]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#f6b11b]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3.5 py-1.5 rounded-full border border-[#1fb8e5]/30 bg-[#1fb8e5]/5 text-[#f6b11b] text-xs font-semibold tracking-wider uppercase mb-6">
              Join the Rivpra Family
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight mb-6">
              Build the Future of <br />
              <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
                Global Healthcare
              </span>
            </h1>
            <p className="text-slate-500 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
              At Rivpra Formulations, we blend pioneering formulation research, WHO-cGMP manufacturing, and a collaborative work culture to deliver quality medicine.
            </p>
            <button
              onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 font-bold hover:shadow-xl hover:shadow-[#1fb8e5]/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Openings
            </button>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              Why Choose Rivpra?
            </h2>
            <p className="text-slate-400 font-light text-base max-w-lg mx-auto">
              We empower our employees with the tools, mentorship, and support they need to make an impact on global health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Innovation-Driven",
                desc: "Work on cutting-edge dosage forms, complex formulations, and pioneering drug delivery systems in our dedicated R&D division.",
                color: "#1fb8e5",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "WHO-cGMP Excellence",
                desc: "Immerse yourself in top-tier international standards of regulatory compliance, safety, and rigorous quality operations.",
                color: "#f6b11b",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              },
              {
                title: "Global Exposure",
                desc: "Gain international operational exposure serving our exports across 20+ countries and global pharmaceutical distribution networks.",
                color: "#ddd82a",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )
              },
              {
                title: "Growth & Wellness",
                desc: "We support continuous learning paths, pharmacy symposia access, comprehensive medical coverage, and a positive, caring work environment.",
                color: "#e28743",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((value) => (
              <div key={value.title} className="p-6 rounded-2xl border border-slate-200 bg-[#f8fafc]/40 hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: `${value.color}15`, color: value.color }}>
                  {value.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Accordion Section */}
      <section id="openings" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              Current Job Openings
            </h2>
            <p className="text-slate-400 font-light text-base">
              Filter openings by department and click on any position to view details and requirements.
            </p>
          </div>

          {/* Department filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedDept === dept
                    ? "bg-[#1fb8e5] text-white shadow-md shadow-[#1fb8e5]/20"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Openings list */}
          <div className="space-y-4">
            {loadingJobs ? (
              <div className="p-10 text-center rounded-2xl border border-slate-200 bg-white">
                <div className="w-8 h-8 border-4 border-[#1fb8e5] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-slate-400 text-sm font-medium mt-4">Loading current opportunities...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-10 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
                <p className="text-slate-400 text-sm font-medium">No open positions in this department currently.</p>
                <button 
                  onClick={() => setSelectedDept("All")}
                  className="mt-4 px-5 py-2 text-xs font-bold text-[#1fb8e5] hover:underline"
                >
                  View All Departments
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isOpen = activeJob === job.id;
                return (
                  <div
                    key={job.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <button
                      onClick={() => setActiveJob(isOpen ? null : job.id)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 items-center mb-2">
                          <span className="px-2.5 py-1 rounded bg-[#1fb8e5]/10 text-[#1fb8e5] text-[10px] font-bold uppercase tracking-wider">
                            {job.department}
                          </span>
                          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                            {job.location}
                          </span>
                        </div>
                        <h3 className="text-slate-900 font-extrabold text-lg sm:text-xl">
                          {job.title}
                        </h3>
                        <div className="flex flex-col gap-1 mt-2 text-xs text-slate-500 font-light">
                          <div>
                            <span className="font-semibold text-slate-700">Qualification:</span> {job.qualification}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-700">Job Type:</span> {job.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-slate-100 bg-[#f8fafc]/50"
                        >
                          <div className="p-6 space-y-6">
                            <div>
                              <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-2">Role Overview</h4>
                              <p className="text-slate-600 text-sm leading-relaxed font-light">{job.description}</p>
                            </div>

                            {job.requirements && job.requirements.length > 0 && (
                              <div>
                                <h4 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-2">Key Requirements</h4>
                                <ul className="space-y-2">
                                  {job.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-light">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#f6b11b] mt-2 flex-shrink-0" />
                                      <span>{req}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-xs text-slate-400">
                                Standard response time is 3-5 business days.
                              </span>
                              <button
                                onClick={() => {
                                  setForm(prev => ({ ...prev, position: job.title }));
                                  document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all duration-300"
                              >
                                Apply For Role
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              Apply Now
            </h2>
            <p className="text-slate-400 font-light text-base">
              Submit your resume directly to our HR team and initiate your journey with Rivpra.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-100">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h3 className="text-slate-950 font-black text-2xl">Application Received!</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for applying to Rivpra Formulations. Our Human Resources division will review your profile against requirements and contact you shortly.
                </p>
                <p className="text-xs text-slate-400">
                  Confirmation sent to <span className="font-semibold">{form.email}</span>
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", position: "", experience: "", message: "" });
                    setFile(null);
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-600 transition-colors"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {applyError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
                    {applyError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Desired Position *</label>
                    <select
                      name="position"
                      required
                      value={form.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300 bg-white"
                    >
                      <option value="">Select a position</option>
                      {jobs.map(j => (
                        <option key={j.id} value={j.title}>{j.title}</option>
                      ))}
                      <option value="Other / General Application">Other / General Application</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Total Experience *</label>
                  <select
                    name="experience"
                    required
                    value={form.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300 bg-white"
                  >
                    <option value="">Select your experience range</option>
                    <option value="Fresher">Fresher / Graduate</option>
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5-8 Years">5 - 8 Years</option>
                    <option value="8+ Years">8+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Resume / CV (PDF, DOC) *</label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-2xl p-6 text-center cursor-pointer transition-colors">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <svg className="w-8 h-8 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <p className="text-slate-600 text-sm font-medium">
                        {file ? file.name : "Click to select or drag your CV here"}
                      </p>
                      <p className="text-slate-400 text-xs">PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Cover Message (Optional)</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Tell us a little bit about yourself and why you'd like to join Rivpra..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="text-slate-400 text-xs text-center sm:text-left font-light leading-relaxed">
                    By submitting, you consent to our database storage for future reference. <br />
                    Direct inquiries: <a href="mailto:career@rivpraformulation.com" className="text-[#1fb8e5] hover:underline font-semibold">career@rivpraformulation.com</a>
                  </div>
                  <button
                    type="submit"
                    disabled={isApplying}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isApplying && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {isApplying ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* General Inquiry CTA */}
      <section className="py-20 bg-gradient-to-tr from-[#1fb8e5]/5 to-[#f6b11b]/5 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-black text-slate-950">Don't See a Matching Role?</h2>
          <p className="text-slate-500 font-light text-base max-w-xl mx-auto">
            We are always on the lookout for talented, passionate pharmaceutical professionals. Send your resume directly to our database and we will reach out when a suitable vacancy opens up.
          </p>
          <a
            href="mailto:career@rivpraformulation.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-300 hover:border-slate-400 text-slate-700 bg-white hover:shadow-md transition-all duration-300 font-bold text-sm"
          >
            Email Resume to career@rivpraformulation.com
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
