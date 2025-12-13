// Frontend/src/Pages/Home.jsx

import React from "react";

const mountains = [
  {
    name: "Mount Everest",
    height: "8,849 m",
    country: "Nepal/China",
    img: "/public/everest.jpg",
    link: "/everest",
  },
  {
    name: "K2",
    height: "8,611 m",
    country: "Pakistan/China",
    img: "/public/k2.webp",
    link: "/k2",
  },
  {
    name: "Kangchenjunga",
    height: "8,586 m",
    country: "Nepal/India",
    img: "/public/Kangchenjunga.webp",
    link: "/kangchenjunga",
  },
  {
    name: "Lhotse",
    height: "8,516 m",
    country: "Nepal/China",
    img: "/public/Lhotse.jpeg",
    link: "/lhotse",
  },
  {
    name: "Makalu",
    height: "8,485 m",
    country: "Nepal/China",
    img: "/public/Makalu.jpeg",
    link: "/makalu",
  },
  {
    name: "Cho Oyu",
    height: "8,188 m",
    country: "Nepal/China",
    img: "/public/Cho Oyu.jpg",
    link: "/chooyu",
  },
  {
    name: "Dhaulagiri",
    height: "8,167 m",
    country: "Nepal",
    img: "/public/Dhaulagiri.jpeg",
    link: "/dhaulagiri",
  },
];

export default function HomePage() {
  return (
    <main className="w-full flex flex-col">
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/public/Hero.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl font-bold drop-shadow-lg">The Seven Giants</h1>
          <p className="text-xl drop-shadow-md">
            A journey through the Earth&apos;s highest wonders
          </p>
          <a
            href="#timeline"
            className="mt-4 inline-block rounded-md bg-green-800/80 px-6 py-3 text-white font-medium hover:bg-green-900 transition"
          >
            Explore Mountains
          </a>
        </div>
      </section>

      {/* VERTICAL TIMELINE */}
      <section
        id="timeline"
        className="relative w-full flex flex-col items-center my-16"
      >
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-green-900/50 -translate-x-1/2"></div>

        {/* Mountain Sections */}
        {mountains.map((mountain, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={mountain.name}
              className="relative w-full max-w-6xl flex flex-col md:flex-row my-16 items-center"
            >
              {/* Marker on the vertical line */}
              <div className="absolute left-1/2 -translate-x-1/2 bg-green-700 w-6 h-6 rounded-full z-10 border-2 border-white"></div>

              {/* Mountain Info */}
              <div
                className={`flex-1 p-6 bg-black/40 text-white backdrop-blur-sm rounded-md shadow-lg ${
                  isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
                }`}
                style={{
                  backgroundImage: `url(${mountain.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h2 className="text-2xl font-bold drop-shadow-md">{mountain.name}</h2>
                <p className="drop-shadow-sm">
                  Height: {mountain.height} <br /> Country: {mountain.country}
                </p>
                <a
                  href={mountain.link}
                  className="mt-2 inline-block rounded-md bg-brown-800/60 px-4 py-2 text-white font-medium hover:bg-brown-900/80 transition"
                >
                  Learn More →
                </a>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
