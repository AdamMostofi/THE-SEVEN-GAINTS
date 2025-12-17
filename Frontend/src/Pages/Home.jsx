// Frontend/src/Pages/Home.jsx
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

// Define the base URL for your backend API
// This should be the port where your Express server is running (e.g., 5000)
// You should set up a proxy in your vite.config.js or package.json for development
// For now, we'll use the direct URL:
const API_BASE_URL = "http://localhost:5000"; 

export default function HomePage() {
  const [mountains, setMountains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMountains = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/mountains`);
        setMountains(response.data);
      } catch (err) {
        console.error("Failed to fetch mountains:", err);
        setError("Failed to load mountain data. Please check the server connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchMountains();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading majestic peaks...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600 text-xl">{error}</div>;
  }
  
  return (
    <main className="w-full flex flex-col">
      {/* HERO SECTION - UNCHANGED */}
      {/* ... your Hero Section code ... */}

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
              key={mountain.id} // Use the unique ID from the database
              className="relative w-full max-w-6xl flex flex-col md:flex-row my-16 items-center"
            >
              {/* Marker on the vertical line */}
              <div className="absolute left-1/2 -translate-x-1/2 bg-green-700 w-6 h-6 rounded-full z-10 border-2 border-white"></div>

              {/* Mountain Info */}
              <div
                className={`flex-1 p-6 bg-black/40 text-white backdrop-blur-sm rounded-md shadow-lg 
                  ${isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"}
                `}
                // WARNING: In a real project, use <img /> element. 
                // Using inline style with `background-image` is okay for a quick demo.
                style={{
                  backgroundImage: `url(${mountain.image_url})`, // Using database field
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h2 className="text-2xl font-bold drop-shadow-md">{mountain.name}</h2>
                <p className="drop-shadow-sm">
                  Height: {mountain.height} <br /> Country: {mountain.country}
                </p>
                <p className="mt-2 italic max-w-lg mx-auto">{mountain.summary}</p> {/* Using database field */}
                <a
                  href={`/mountains/${mountain.id}`} // Link using the ID
                  className="mt-4 inline-block rounded-md bg-brown-800/60 px-4 py-2 text-white font-medium hover:bg-brown-900/80 transition"
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