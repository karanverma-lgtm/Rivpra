"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All"); // "All" | "Images" | "Videos"
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const list: GalleryItem[] = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as GalleryItem);
        });
        // Sort by order asc, then timestamp desc
        list.sort((a, b) => {
          if (a.order !== b.order) {
            return a.order - b.order;
          }
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        setItems(list);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  // Dynamically extract categories from available items
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  // Filter items based on criteria
  const filteredItems = items.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const typeMatch = selectedType === "All" || item.type === selectedType.toLowerCase().replace(/s$/, ""); // normalize Images->image, Videos->video
    return categoryMatch && typeMatch;
  });

  // Lightbox keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const activeMedia = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  // Helper to parse YouTube URLs for embedding
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : url;
    }
    return url;
  };

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 pb-20 lg:pb-0 pt-20">
      <Navbar />

      {/* Page Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[150px] bg-[#1fb8e5]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full border border-[#1fb8e5]/30 bg-[#1fb8e5]/5 text-[#1fb8e5] text-xs font-bold tracking-widest uppercase mb-4">
            Visual Gallery
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-none mb-6">
            Rivpra{" "}
            <span className="text-transparent bg-gradient-to-r from-[#1fb8e5] to-[#f6b11b] bg-clip-text">
              Media Hub
            </span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Take a visual tour of our state-of-the-art pharmaceutical manufacturing units, research labs, team activities, exhibitions, and product catalogs.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Filtering Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-slate-200 pb-8 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1fb8e5] text-white shadow-md shadow-[#1fb8e5]/20"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-[#1fb8e5] hover:text-[#1fb8e5]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Media Types */}
          <div className="flex bg-slate-200/50 p-1 rounded-xl gap-1">
            {["All", "Images", "Videos"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedType === type
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-10 h-10 border-4 border-[#1fb8e5] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-sm">Loading media gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-32 bg-white border border-slate-200 rounded-3xl">
            <svg className="w-12 h-12 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-600 text-sm font-semibold">No Media Items Found</p>
            <p className="text-slate-400 text-xs mt-1">There are no items matching the selected filters at the moment.</p>
          </div>
        ) : (
          /* Gallery Grid */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-950 flex items-center justify-center">
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-950/20">
                        <div className="w-12 h-12 rounded-full bg-white/95 text-slate-950 shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 ml-1 fill-current text-[#1fb8e5]" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <img
                      src={item.url}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as any).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600";
                      }}
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-white">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-slate-950 font-bold text-base leading-tight mb-2 group-hover:text-[#1fb8e5] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs font-light line-clamp-2 min-h-[32px]">
                      {item.description || "Take a closer look at Rivpra Formulation facilities."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Immersive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between"
          >
            {/* Close Button */}
            <div className="w-full flex justify-between items-center px-6 py-4">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                {activeMedia.category} ({lightboxIndex + 1} / {filteredItems.length})
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xl transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Media Content Area */}
            <div className="flex-1 relative flex items-center justify-center p-4">
              {/* Navigation: Prev */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
                }}
                className="absolute left-6 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Media Element */}
              <div className="max-w-5xl max-h-[70vh] w-full h-full flex items-center justify-center relative rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {activeMedia.type === "video" ? (
                  activeMedia.url.includes("youtube.com") || activeMedia.url.includes("youtu.be") ? (
                    <iframe
                      src={getEmbedUrl(activeMedia.url)}
                      title={activeMedia.title}
                      className="w-full h-full aspect-video rounded-xl shadow-2xl border-0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={activeMedia.url}
                      controls
                      autoPlay
                      className="max-w-full max-h-full rounded-xl shadow-2xl"
                    />
                  )
                ) : (
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                    onError={(e) => {
                      (e.target as any).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200";
                    }}
                  />
                )}
              </div>

              {/* Navigation: Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-6 z-10 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Info Footer */}
            <div className="w-full text-center p-6 bg-slate-900 border-t border-white/5">
              <h2 className="text-white font-extrabold text-lg tracking-wide mb-1">{activeMedia.title}</h2>
              <p className="text-slate-400 text-xs font-light max-w-xl mx-auto">
                {activeMedia.description || "A glimpse into Rivpra Formulation's high quality standards."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
