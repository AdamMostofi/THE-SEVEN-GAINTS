import React from "react";

function About() {
  return (
    <div className="w-full">
      {/* Mini Hero */}
      <div className="bg-stone-900 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">About The Seven Giants</h1>
        <p className="text-xl text-stone-400">Honoring the world's most formidable peaks.</p>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6 leading-relaxed">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-4">Our Mission</h2>
          <p className="text-lg text-stone-700">
            The Seven Giants project was created to provide a digital home for the world's highest wonders. 
            Beyond just heights and coordinates, we aim to showcase the raw beauty and the technical 
            challenges involved in conquering the 8,000-meter peaks.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-4">The Challenge</h2>
            <p className="text-stone-700">
              Climbing these mountains is not just a physical feat, but a mental and logistical one. 
              Our "Recommended" section provides insights into the high-altitude gear required to 
              survive the world's most extreme environments.
            </p>
          </div>
          <div className="bg-stone-200 h-64 rounded-xl flex items-center justify-center text-stone-500 italic">
            [Insert Image of Mountain Climber]
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;