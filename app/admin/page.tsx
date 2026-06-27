"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


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

interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  resumeUrl: string;
  resumeBase64: string;
  resumeFileName: string;
  timestamp: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  url: string;
  fileName?: string;
  category: string;
  order: number;
  timestamp: string;
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"jobs" | "resumes" | "gallery">("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteResumeId, setPendingDeleteResumeId] = useState<string | null>(null);
  const [pendingDeleteGalleryId, setPendingDeleteGalleryId] = useState<string | null>(null);

  // Gallery CMS state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    description: "",
    type: "image" as "image" | "video",
    category: "Facility",
    sourceType: "upload" as "upload" | "url",
    url: "",
    order: 0,
  });
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [uploadingProgress, setUploadingProgress] = useState(false);

  const galleryCategories = ["Facility", "Machinery", "Events", "Exhibitions", "Products", "Other"];

  // Job form state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "Quality Assurance",
    location: "",
    experience: "",
    qualification: "",
    type: "Full-Time",
    description: "",
    requirementsText: ""
  });

  const departments = ["Quality Assurance", "Sales & Marketing", "Administration", "IT & Digital"];

  useEffect(() => {
    // Check local storage auth
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsLoggedIn(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Jobs
      const jobsSnapshot = await getDocs(collection(db, "jobs"));
      const jobsList: Job[] = [];
      jobsSnapshot.forEach((doc) => {
        jobsList.push({ ...doc.data() } as Job);
      });
      setJobs(jobsList);

      // Fetch Resumes
      const resumesSnapshot = await getDocs(collection(db, "resumes"));
      const resumesList: Resume[] = [];
      resumesSnapshot.forEach((doc) => {
        resumesList.push({ id: doc.id, ...doc.data() } as Resume);
      });
      // Sort resumes by timestamp desc
      resumesList.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setResumes(resumesList);

      // Fetch Gallery Items
      const gallerySnapshot = await getDocs(collection(db, "gallery"));
      const galleryList: GalleryItem[] = [];
      gallerySnapshot.forEach((doc) => {
        galleryList.push({ id: doc.id, ...doc.data() } as GalleryItem);
      });
      // Sort gallery items by order asc, then timestamp desc
      galleryList.sort((a, b) => {
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
      setGallery(galleryList);
    } catch (err) {
      console.error("Error loading data from firestore:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "rivpra" && password === "arpvir") {
      sessionStorage.setItem("adminAuth", "true");
      setIsLoggedIn(true);
      setAuthError("");
      fetchData();
    } else {
      setAuthError("Invalid username or password. Hint: check credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // Job Actions
  const handleOpenJobModal = (job: Job | null = null) => {
    if (job) {
      setEditingJob(job);
      setJobForm({
        title: job.title,
        department: job.department,
        location: job.location,
        experience: job.experience,
        qualification: job.qualification,
        type: job.type,
        description: job.description,
        requirementsText: job.requirements ? job.requirements.join("\n") : ""
      });
    } else {
      setEditingJob(null);
      setJobForm({
        title: "",
        department: "Quality Assurance",
        location: "",
        experience: "",
        qualification: "",
        type: "Full-Time",
        description: "",
        requirementsText: ""
      });
    }
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const jobId = editingJob ? editingJob.id : jobForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const finalJob: Job = {
        id: jobId,
        title: jobForm.title,
        department: jobForm.department,
        location: jobForm.location,
        experience: jobForm.experience,
        qualification: jobForm.qualification,
        type: jobForm.type,
        description: jobForm.description,
        requirements: jobForm.requirementsText.split("\n").filter(line => line.trim() !== "")
      };

      await setDoc(doc(db, "jobs", jobId), finalJob);
      setIsJobModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Error saving job:", err);
      setLoading(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "jobs", id));
      fetchData();
    } catch (err) {
      console.error("Error deleting job:", err);
      setLoading(false);
    }
  };

  // Resume Actions
  const handleDeleteResume = async (id: string) => {
    if (pendingDeleteResumeId !== id) {
      setPendingDeleteResumeId(id);
      return;
    }
    setPendingDeleteResumeId(null);
    setLoading(true);
    try {
      await deleteDoc(doc(db, "resumes", id));
      fetchData();
    } catch (err) {
      console.error("Error deleting resume:", err);
      setLoading(false);
    }
  };

  // Gallery Actions
  const handleOpenGalleryModal = (item: GalleryItem | null = null) => {
    if (item) {
      setEditingGalleryItem(item);
      setGalleryForm({
        title: item.title,
        description: item.description || "",
        type: item.type,
        category: item.category,
        sourceType: item.fileName ? "upload" : "url",
        url: item.url,
        order: item.order || 0,
      });
      setGalleryFile(null);
    } else {
      setEditingGalleryItem(null);
      setGalleryForm({
        title: "",
        description: "",
        type: "image",
        category: "Facility",
        sourceType: "upload",
        url: "",
        order: 0,
      });
      setGalleryFile(null);
    }
    setIsGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title.trim()) {
      alert("Title is required");
      return;
    }

    setUploadingProgress(true);
    try {
      let finalUrl = galleryForm.url;
      let finalFileName = editingGalleryItem?.fileName || "";

      // If uploading file
      if (galleryForm.sourceType === "upload" && galleryFile) {
        const fileRef = ref(storage, `gallery/${Date.now()}_${galleryFile.name}`);
        const uploadResult = await uploadBytes(fileRef, galleryFile);
        finalUrl = await getDownloadURL(uploadResult.ref);
        finalFileName = galleryFile.name;
      } else if (galleryForm.sourceType === "upload" && !finalUrl) {
        alert("Please select a file to upload or switch to external URL");
        setUploadingProgress(false);
        return;
      }

      if (galleryForm.sourceType === "url" && !galleryForm.url.trim()) {
        alert("Please enter a media URL");
        setUploadingProgress(false);
        return;
      }

      const itemId = editingGalleryItem ? editingGalleryItem.id : doc(collection(db, "gallery")).id;
      const galleryItemData: Omit<GalleryItem, "id"> = {
        title: galleryForm.title,
        description: galleryForm.description,
        type: galleryForm.type,
        url: finalUrl,
        category: galleryForm.category,
        order: Number(galleryForm.order),
        timestamp: editingGalleryItem ? editingGalleryItem.timestamp : new Date().toISOString(),
      };

      if (finalFileName) {
        (galleryItemData as any).fileName = finalFileName;
      }

      await setDoc(doc(db, "gallery", itemId), galleryItemData);
      setIsGalleryModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Error saving gallery item:", err);
      alert("Error saving gallery item");
    } finally {
      setUploadingProgress(false);
    }
  };

  const handleDeleteGalleryItem = async (item: GalleryItem) => {
    if (pendingDeleteGalleryId !== item.id) {
      setPendingDeleteGalleryId(item.id);
      return;
    }
    setPendingDeleteGalleryId(null);
    setLoading(true);
    try {
      if (item.fileName && item.url.includes("firebasestorage")) {
        try {
          const fileRef = ref(storage, item.url);
          await deleteObject(fileRef);
        } catch (storageErr) {
          console.warn("Could not delete file from Firebase Storage:", storageErr);
        }
      }
      await deleteDoc(doc(db, "gallery", item.id));
      fetchData();
    } catch (err) {
      console.error("Error deleting gallery item:", err);
      setLoading(false);
    }
  };

  const downloadBase64File = (base64Data: string, fileName: string) => {
    try {
      let contentType = "";
      let realData = "";

      // Check if the string is a Data URL (starts with "data:")
      const block = base64Data.split(";");
      if (block.length > 1 && block[0].startsWith("data:")) {
        contentType = block[0].split(":")[1]; // e.g. "application/pdf"
        realData = block[1].split(",")[1];    // raw base64 data
      } else {
        // Fallback for raw base64 strings
        realData = base64Data;
        if (fileName.endsWith(".pdf")) contentType = "application/pdf";
        else if (fileName.endsWith(".docx")) contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        else if (fileName.endsWith(".doc")) contentType = "application/msword";
        else if (fileName.endsWith(".txt")) contentType = "text/plain";
        else contentType = "application/octet-stream";
      }

      // Decode base64 to binary bytes
      const sliceSize = 1024;
      const byteCharacters = atob(realData);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      // Create a Blob and Object URL for download
      const blob = new Blob(byteArrays, { type: contentType });
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Revoke the Object URL to release memory
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (err) {
      console.error("Failed to decode and download base64 file:", err);
      alert("Failed to download CV file. The file data might be corrupted or in an unsupported format.");
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 p-6 relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1fb8e5]/20 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#f6b11b]/10 rounded-full blur-[160px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl relative"
        >
          <div className="text-center mb-8">
            <Image
              src="/Rivpra%20Logo.svg"
              alt="Rivpra Formulations"
              width={100}
              height={120}
              unoptimized
              className="h-16 w-auto mx-auto mb-4"
            />
            <h1 className="text-white text-2xl font-black tracking-tight">Admin Gateway</h1>
            <p className="text-slate-400 text-xs mt-1">Rivpra Formulations Portal Control Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold text-center">
                {authError}
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="rivpra"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300 placeholder-slate-600"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:border-[#1fb8e5] focus:ring-1 focus:ring-[#1fb8e5] outline-none transition-all duration-300 placeholder-slate-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 font-bold hover:shadow-lg hover:shadow-[#1fb8e5]/25 hover:-translate-y-0.5 transition-all duration-300 text-sm mt-2"
            >
              Authenticate Portal
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Image
            src="/Rivpra%20Logo.svg"
            alt="Rivpra Logo"
            width={80}
            height={100}
            unoptimized
            className="h-10 w-auto"
          />
          <div className="border-l border-white/10 pl-4">
            <h1 className="text-white font-black tracking-tight text-lg">Rivpra Control Panel</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Portal Management Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/careers"
            target="_blank"
            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-semibold transition-colors"
          >
            Careers ↗
          </Link>
          <Link
            href="/gallery"
            target="_blank"
            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-semibold transition-colors"
          >
            Gallery ↗
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              activeTab === "jobs"
                ? "border-[#1fb8e5] text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            CMS: Job Postings ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("resumes")}
            className={`px-6 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              activeTab === "resumes"
                ? "border-[#1fb8e5] text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Candidates & Resumes ({resumes.length})
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              activeTab === "gallery"
                ? "border-[#1fb8e5] text-white"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            CMS: Media Gallery ({gallery.length})
          </button>
        </div>

        {/* Contents */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center p-20">
            <div className="w-10 h-10 border-4 border-[#1fb8e5] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Processing database request...</p>
          </div>
        )}

        {!loading && activeTab === "jobs" && (
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Active Job Opportunities</h2>
                <p className="text-slate-400 text-xs font-light">Create, modify, or delete postings appearing on the live career site.</p>
              </div>
              <button
                onClick={() => handleOpenJobModal()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 text-xs font-bold hover:shadow-lg transition-shadow duration-300"
              >
                Create Job Posting +
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-6 rounded-2xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/60 transition-colors duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <span className="px-2.5 py-1 rounded bg-[#1fb8e5]/10 text-[#1fb8e5] text-[10px] font-bold uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-white font-extrabold text-lg mb-1">{job.title}</h3>
                    <p className="text-slate-400 text-xs font-light mb-4">
                      {job.experience} | {job.type}
                    </p>
                    <div className="space-y-2 text-xs text-slate-300 mb-6 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                      <p>
                        <span className="font-semibold text-slate-400">Quals:</span> {job.qualification}
                      </p>
                      <p className="font-light line-clamp-2">
                        <span className="font-semibold text-slate-400">Desc:</span> {job.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 border-t border-white/5 pt-4">
                    <button
                      onClick={() => handleOpenJobModal(job)}
                      className="flex-1 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 text-xs font-bold transition-all"
                    >
                      Edit Details
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="px-4 py-2 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && activeTab === "resumes" && (
          <div className="space-y-4 flex-1">
            <div>
              <h2 className="text-xl font-extrabold text-white">Candidates Applications Database</h2>
              <p className="text-slate-400 text-xs font-light">Manage submitted resumes, cover messages, and details received from applicants.</p>
            </div>

            <div className="space-y-4">
              {resumes.length === 0 ? (
                <div className="p-16 text-center rounded-2xl border border-dashed border-white/10 bg-slate-950/20">
                  <p className="text-slate-400 text-sm">No job applications have been submitted yet.</p>
                </div>
              ) : (
                resumes.map((res) => (
                  <div
                    key={res.id}
                    className="p-6 rounded-2xl border border-white/5 bg-slate-950/30 hover:bg-slate-950/50 transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
                  >
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex flex-wrap gap-2 items-center mb-1">
                          <span className="px-2.5 py-0.5 rounded bg-[#f6b11b]/10 text-[#f6b11b] text-[9px] font-bold uppercase tracking-wider">
                            Applied: {res.position}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-white/5 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                            Exp: {res.experience}
                          </span>
                          <span className="text-slate-500 text-[10px] ml-auto md:ml-2">
                            {new Date(res.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <h3 className="text-white font-extrabold text-lg">{res.name}</h3>
                      </div>

                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5 text-xs font-light text-slate-300">
                        <p>
                          <span className="font-semibold text-slate-500">Email:</span>{" "}
                          <a href={`mailto:${res.email}`} className="text-[#1fb8e5] hover:underline">
                            {res.email}
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold text-slate-500">Phone:</span>{" "}
                          <a href={`tel:${res.phone}`} className="text-[#1fb8e5] hover:underline">
                            {res.phone}
                          </a>
                        </p>
                        {res.resumeFileName && (
                          <p className="truncate">
                            <span className="font-semibold text-slate-500">CV:</span> {res.resumeFileName}
                          </p>
                        )}
                      </div>

                      {res.message && (
                        <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 text-slate-400 text-xs leading-relaxed font-light italic">
                          "{res.message}"
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-row md:flex-col gap-2 w-full md:w-auto flex-shrink-0">
                      {res.resumeUrl ? (
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch(res.resumeUrl);
                              const blob = await response.blob();
                              const blobUrl = URL.createObjectURL(blob);
                              const link = document.createElement("a");
                              link.href = blobUrl;
                              link.download = res.resumeFileName || "resume.pdf";
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                            } catch (err) {
                              console.error("Failed to download resume:", err);
                              // Fallback: open URL directly
                              window.open(res.resumeUrl, "_blank");
                            }
                          }}
                          className="flex-1 md:w-40 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold text-center transition-colors cursor-pointer"
                        >
                          Download CV
                        </button>
                      ) : res.resumeBase64 ? (
                        <button
                          onClick={() => downloadBase64File(res.resumeBase64, res.resumeFileName)}
                          className="flex-1 md:w-40 py-2.5 rounded-lg bg-[#1fb8e5] hover:bg-[#1fb8e5]/90 text-slate-950 text-xs font-bold transition-colors"
                        >
                          Download CV
                        </button>
                      ) : (
                        <span className="flex-1 md:w-40 py-2.5 rounded-lg border border-white/5 bg-slate-900/20 text-slate-500 text-xs font-bold text-center cursor-not-allowed">
                          No Resume File
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteResume(res.id)}
                        onBlur={() => { if (pendingDeleteResumeId === res.id) setPendingDeleteResumeId(null); }}
                        className={`py-2.5 px-4 rounded-lg text-xs font-bold transition-colors ${
                          pendingDeleteResumeId === res.id
                            ? "bg-rose-600 border border-rose-500 text-white hover:bg-rose-700 animate-pulse"
                            : "bg-rose-950/20 border border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
                        }`}
                      >
                        {pendingDeleteResumeId === res.id ? "Confirm Delete?" : "Delete"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {!loading && activeTab === "gallery" && (
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white">Media Gallery Management</h2>
                <p className="text-slate-400 text-xs font-light">Upload, organize, edit, and delete photo/video files for the public Gallery page.</p>
              </div>
              <button
                onClick={() => handleOpenGalleryModal()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 text-xs font-bold hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                Add Gallery Item +
              </button>
            </div>

            {gallery.length === 0 ? (
              <div className="text-center py-20 bg-slate-950/20 border border-white/5 rounded-3xl">
                <svg className="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-slate-400 text-sm font-medium">No media items found</p>
                <p className="text-slate-500 text-xs mt-1">Click the button above to add your first photo or video!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden hover:bg-slate-950/60 transition-all duration-300"
                  >
                    {/* Media Thumbnail */}
                    <div className="aspect-video w-full bg-slate-900 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                      {item.type === "video" ? (
                        <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-950/30">
                          <div className="w-10 h-10 rounded-full bg-slate-950/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                            <svg className="w-5 h-5 ml-0.5 fill-current" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      ) : null}

                      <img
                        src={item.url}
                        alt={item.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as any).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600";
                        }}
                      />

                      {/* Category Tag */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-wider text-[#1fb8e5]">
                        {item.category}
                      </span>

                      {/* Display Order Tag */}
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#f6b11b]/20 border border-[#f6b11b]/30 text-[9px] font-bold text-[#f6b11b]">
                        Order: {item.order}
                      </span>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-white font-extrabold text-sm line-clamp-1">{item.title}</h3>
                        <p className="text-slate-400 text-[11px] font-light mt-1 line-clamp-2 min-h-[32px]">
                          {item.description || "No description provided."}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleOpenGalleryModal(item)}
                          className="flex-1 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 text-[11px] font-bold transition-all cursor-pointer"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryItem(item)}
                          onBlur={() => { if (pendingDeleteGalleryId === item.id) setPendingDeleteGalleryId(null); }}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            pendingDeleteGalleryId === item.id
                              ? "bg-rose-600 border border-rose-500 text-white hover:bg-rose-700 animate-pulse"
                              : "bg-rose-950/20 border border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
                          }`}
                        >
                          {pendingDeleteGalleryId === item.id ? "Confirm?" : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Save/Edit Job Modal */}
      <AnimatePresence>
        {isJobModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-start sm:items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="my-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl relative"
              data-lenis-prevent
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-extrabold text-xl">
                  {editingJob ? "Modify Job Posting" : "Publish New Opportunity"}
                </h3>
                <button
                  onClick={() => setIsJobModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveJob} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Left Column — Basic Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Job Title *</label>
                      <input
                        type="text"
                        required
                        value={jobForm.title}
                        onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Sales Co-ordinator"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Department *</label>
                        <select
                          value={jobForm.department}
                          onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                        >
                          {departments.map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Job Type *</label>
                        <select
                          value={jobForm.type}
                          onChange={(e) => setJobForm(prev => ({ ...prev, type: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                        >
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Location *</label>
                        <input
                          type="text"
                          required
                          value={jobForm.location}
                          onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="e.g. Kaushambi, Ghaziabad"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Experience Range *</label>
                        <input
                          type="text"
                          required
                          value={jobForm.experience}
                          onChange={(e) => setJobForm(prev => ({ ...prev, experience: e.target.value }))}
                          placeholder="e.g. 1 - 2 Years"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Qualification Specification *</label>
                      <input
                        type="text"
                        required
                        value={jobForm.qualification}
                        onChange={(e) => setJobForm(prev => ({ ...prev, qualification: e.target.value }))}
                        placeholder="e.g. B.Sc./ B.Pharma With 1-2 Years of Experience"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                      />
                    </div>
                  </div>

                  {/* Right Column — Descriptions & Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Role Description *</label>
                      <textarea
                        required
                        rows={4}
                        data-lenis-prevent
                        value={jobForm.description}
                        onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Provide overview of the role..."
                        className="w-full h-[106px] px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none resize-y overflow-y-auto"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Key Requirements (One requirement per line)
                      </label>
                      <textarea
                        rows={5}
                        data-lenis-prevent
                        value={jobForm.requirementsText}
                        onChange={(e) => setJobForm(prev => ({ ...prev, requirementsText: e.target.value }))}
                        placeholder="Requirement line 1&#10;Requirement line 2&#10;Requirement line 3..."
                        className="w-full h-[130px] px-4 py-3 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none resize-y overflow-y-auto"
                      />
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 text-xs font-bold hover:shadow-lg"
                  >
                    Save Posting
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Save/Edit Gallery Item Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-start sm:items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="my-auto w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl relative animate-in"
              data-lenis-prevent
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-extrabold text-xl">
                  {editingGalleryItem ? "Modify Gallery Item" : "Add New Media Item"}
                </h3>
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveGalleryItem} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Item Title *</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter descriptive title"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Description / Caption</label>
                  <textarea
                    rows={2}
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Provide context or a brief caption"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Category *</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                    >
                      {galleryCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Media Type */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Media Type *</label>
                    <select
                      value={galleryForm.type}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, type: e.target.value as "image" | "video" }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>

                {/* Source Selection */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Media Source *</label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="sourceType"
                        checked={galleryForm.sourceType === "upload"}
                        onChange={() => setGalleryForm(prev => ({ ...prev, sourceType: "upload" }))}
                        className="accent-[#1fb8e5]"
                      />
                      Upload File
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="sourceType"
                        checked={galleryForm.sourceType === "url"}
                        onChange={() => setGalleryForm(prev => ({ ...prev, sourceType: "url" }))}
                        className="accent-[#1fb8e5]"
                      />
                      External URL
                    </label>
                  </div>

                  {galleryForm.sourceType === "upload" ? (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept={galleryForm.type === "video" ? "video/*" : "image/*"}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setGalleryFile(e.target.files[0]);
                          }
                        }}
                        className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1fb8e5]/10 file:text-[#1fb8e5] file:cursor-pointer hover:file:bg-[#1fb8e5]/20"
                      />
                      {editingGalleryItem?.fileName && !galleryFile && (
                        <p className="text-[10px] text-slate-500">
                          Current file: <span className="font-semibold text-slate-400">{editingGalleryItem.fileName}</span> (Leave empty to keep current file)
                        </p>
                      )}
                    </div>
                  ) : (
                    <input
                      type="url"
                      value={galleryForm.url}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, url: e.target.value }))}
                      placeholder={galleryForm.type === "video" ? "https://youtube.com/embed/... or direct MP4 URL" : "https://images.unsplash.com/... or direct image URL"}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                    />
                  )}
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Display Order (Lower values shown first)</label>
                  <input
                    type="number"
                    value={galleryForm.order}
                    onChange={(e) => setGalleryForm(prev => ({ ...prev, order: Number(e.target.value) }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-slate-950 text-white text-sm focus:border-[#1fb8e5] outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingProgress}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] text-slate-950 text-xs font-bold hover:shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {uploadingProgress ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Save Item"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer info */}
      <footer className="border-t border-white/5 py-4 text-center text-slate-500 text-[10px] font-semibold tracking-wider uppercase">
        Rivpra Formulations Portal Panel Control Panel © {new Date().getFullYear()}
      </footer>
    </main>
  );
}
