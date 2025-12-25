import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Mountain, MapPin, Ruler, Info, ChevronLeft, Globe } from "lucide-react";

const API_BASE_URL = "http://localhost:5000";

export default function MountainPage() {
  const { mountainId } = useParams(); 
  const [mountain, setMountain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMountainDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/mountains/${mountainId}`);
        setMountain(response.data);
      } catch (error) {
        console.error("Error fetching mountain details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMountainDetails();
  }, [mountainId]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-stone-50">
      <div className="animate-pulse text-green-900 font-bold tracking-widest uppercase">Consulting Maps...</div>
    </div>
  );
  
  if (!mountain) return <div className="p-20 text-center">Mountain not found.</div>;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      {/* Back Button */}
      <div className="absolute top-24 left-8 z-20">
        <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
          <ChevronLeft className="w-4 h-4" /> Back to Timeline
        </Link>
      </div>

      {/* --- HERO HEADER --- */}
      <div 
        className="relative h-[65vh] w-full bg-cover bg-center flex items-end overflow-hidden"
        style={{ backgroundImage: `url(${mountain.image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent"></div>
        
        <div className="relative w-full max-w-7xl mx-auto px-10 pb-16">
          <div className="flex items-center gap-3 text-green-400 font-bold tracking-[0.2em] uppercase text-sm mb-4">
             <Globe className="w-4 h-4" /> International Expedition
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic">
            {mountain.name}
          </h1>
          <div className="flex flex-wrap gap-6 mt-6 text-white/90">
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
              <Ruler className="w-5 h-5 text-green-400" /> <span className="font-mono text-xl">{mountain.height}</span>
            </span>
            <span className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
              <MapPin className="w-5 h-5 text-green-400" /> <span className="text-xl">{mountain.country}</span>
            </span>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12 px-6 relative z-10">
        
        {/* Main Column: Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-green-800 mb-6 flex items-center gap-2">
              <Info className="w-5 h-5" /> Expedition Overview
            </h2>
            
            {/* Summary Highlight */}
            <p className="text-2xl font-bold text-stone-800 leading-snug mb-8 border-l-4 border-green-700 pl-6 italic">
               "{mountain.summary}"
            </p>

            {/* Detailed Description */}
            <div className="prose prose-stone lg:prose-xl max-w-none">
               <p className="text-lg leading-relaxed text-stone-600 whitespace-pre-line first-letter:text-6xl first-letter:font-black first-letter:text-green-900 first-letter:mr-3 first-letter:float-left">
                {mountain.description}
               </p>
            </div>
          </div>
        </div>

        {/* Sidebar Column: Stats Card */}
        <div className="space-y-6">
          <div className="bg-stone-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <Mountain className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
            
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 border-b border-stone-700 pb-4">
              Peak Profile
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end border-b border-stone-800 pb-4">
                <span className="text-stone-400 text-sm uppercase font-bold tracking-tighter">Official Height</span>
                <span className="text-2xl font-mono text-green-400">{mountain.height}</span>
              </div>
              <div className="flex justify-between items-end border-b border-stone-800 pb-4">
                <span className="text-stone-400 text-sm uppercase font-bold tracking-tighter">Region</span>
                <span className="text-lg">{mountain.country}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-stone-400 text-sm uppercase font-bold tracking-tighter">Status</span>
                <span className="px-3 py-1 bg-green-900/50 text-green-400 text-xs rounded-full border border-green-500/30 font-bold uppercase tracking-widest">
                  Confirmed
                </span>
              </div>
            </div>
            
            <button className="w-full mt-10 bg-green-700 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/50">
               View Climbing Routes
            </button>
          </div>

          <div className="p-6 bg-stone-200/50 rounded-2xl border border-dashed border-stone-300">
             <p className="text-stone-500 text-sm italic leading-relaxed text-center">
               Data provided by the Global Mountain Database. Elevations measured from mean sea level.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}