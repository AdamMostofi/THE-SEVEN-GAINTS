import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mountain, ArrowDown, MapPin, Ruler } from "lucide-react";

const API_BASE_URL = "http://localhost:5000"; 

export default function HomePage() {
  const [mountains, setMountains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/mountains`)
      .then(res => setMountains(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-stone-50">
       <div className="animate-pulse flex flex-col items-center">
          <Mountain className="w-12 h-12 text-green-900 mb-4" />
          <p className="font-medium text-stone-500 tracking-widest uppercase">Approaching Basecamp...</p>
       </div>
    </div>
  );

  return (
    <main className="w-full">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Dark Overlay Background */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="/everest.jpg" 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
          alt="Hero"
        />
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">
            CONQUER <br/><span className="text-green-400">THE HEIGHTS</span>
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 font-light">
            An exploration of the world's seven highest peaks. Discover the data, the gear, and the spirit of high-altitude mountaineering.
          </p>
          <a href="#timeline" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-green-500 hover:text-white transition-all duration-300">
            Start Expedition <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Vertical timeline */}
      <section id="timeline" className="relative py-24 bg-stone-50">
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-stone-200 -translate-x-1/2 hidden md:block"></div>

        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {mountains.map((mountain, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={mountain.id} className={`flex flex-col md:flex-row items-center gap-12 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                
                {/* Image Side */}
                <div className="flex-1 w-full group overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src={mountain.image_url} 
                    alt={mountain.name} 
                    className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content Side */}
                <div className={`flex-1 space-y-4 ${isLeft ? 'text-left' : 'text-left md:text-right'}`}>
                  <div className={`flex items-center gap-2 text-green-700 font-bold uppercase tracking-widest text-sm ${isLeft ? '' : 'md:justify-end'}`}>
                    <MapPin className="w-4 h-4" /> {mountain.country}
                  </div>
                  <h2 className="text-5xl font-black text-stone-900">{mountain.name}</h2>
                  <div className={`flex items-center gap-4 text-stone-500 font-medium ${isLeft ? '' : 'md:justify-end'}`}>
                    <span className="flex items-center gap-1"><Ruler className="w-4 h-4" /> {mountain.height}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-lg max-w-xl">
                    {mountain.summary}
                  </p>
                  <div className={`pt-4 ${isLeft ? '' : 'md:text-right'}`}>
                    <a 
                      href={`/mountains/${mountain.id}`}
                      className="inline-block border-b-2 border-green-900 pb-1 font-bold text-green-900 hover:text-green-600 hover:border-green-600 transition-colors"
                    >
                      View Peak Details →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}