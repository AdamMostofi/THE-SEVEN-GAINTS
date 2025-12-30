import React from "react";
import { ShieldCheck, Mountain, Zap, Database, Globe, Cpu } from "lucide-react";

function About() {
  const achievements = [
    { year: "1953", peak: "Everest", hero: "Hillary & Norgay", icon: <Mountain className="w-6 h-6"/> },
    { year: "1954", peak: "K2", hero: "Lacedelli & Compagnoni", icon: <ShieldCheck className="w-6 h-6"/> },
    { year: "1955", peak: "Kangchenjunga", hero: "Band & Brown", icon: <Zap className="w-6 h-6"/> }
  ];

  const stack = [
    { name: "React", icon: <Cpu className="text-cyan-500" /> },
    { name: "Node.js", icon: <Globe className="text-green-500" /> },
    { name: "MySQL", icon: <Database className="text-orange-500" /> }
  ];

  return (
    <div className="w-full bg-stone-50">
      {/* Hero Section with Overlap */}
      <div className="bg-stone-900 pt-24 pb-40 text-center text-white relative px-6">
        <h1 className="text-6xl font-black mb-4 tracking-tighter uppercase">The Seven Giants</h1>
        <p className="text-xl text-stone-400 max-w-2xl mx-auto">
          Honoring the fourteen 8,000m peaks, starting with the seven most formidable.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        {/* Mission & Image Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 flex flex-col justify-center">
            <h2 className="text-sm font-black text-green-700 tracking-[0.2em] uppercase mb-4">Our Mission</h2>
            <p className="text-2xl font-bold text-stone-900 leading-tight">
              A digital home for high-altitude exploration. We showcase the raw beauty and technical challenges of the world's highest wonders.
            </p>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl relative group">
             <img 
              src="https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Climber"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
          </div>
        </div>

        {/* Milestone Section (The 14 Club) */}
        <div className="bg-green-900 rounded-[3rem] p-12 mb-20 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
                <h3 className="text-3xl font-bold mb-2">The "14 Club" Milestone</h3>
                <p className="text-green-100">Only 14 peaks on Earth pierce the "Death Zone" above 8,000 meters. We are documenting the first 7 giants.</p>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-8xl font-black leading-none">07</span>
                <span className="text-2xl font-bold text-green-400 mb-2">/ 14</span>
            </div>
        </div>

        {/* Achievement Gallery */}
        <h2 className="text-center text-3xl font-black text-stone-900 mb-10 uppercase tracking-tighter">Historic Ascents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {achievements.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-stone-200 hover:border-green-600 transition-colors group">
              <div className="bg-stone-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                {item.icon}
              </div>
              <p className="text-stone-400 font-bold text-sm mb-1">{item.year}</p>
              <h4 className="text-xl font-black text-stone-900 mb-2">{item.peak}</h4>
              <p className="text-stone-600 text-sm leading-relaxed">{item.hero}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="border-t border-stone-200 py-20 text-center">
            <p className="text-xs font-black text-stone-400 tracking-[0.3em] uppercase mb-8">Developed with precision using</p>
            <div className="flex justify-center gap-12">
                {stack.map((tech, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                            {tech.icon}
                        </div>
                        <span className="text-xs font-bold text-stone-600 uppercase">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default About;