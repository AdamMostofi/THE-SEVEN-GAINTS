import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export default function MountainPage() {
  const { mountainId } = useParams(); // Grabs the ID from the URL
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

  if (loading) return <div className="p-20 text-center">Loading Peak Details...</div>;
  if (!mountain) return <div className="p-20 text-center">Mountain not found.</div>;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      {/* Header Section with Image */}
      <div 
        className="h-[60vh] w-full bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${mountain.image_url})` }}
      >
        <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-10 text-white">
          <h1 className="text-6xl font-bold">{mountain.name}</h1>
          <p className="text-2xl opacity-90">{mountain.height} | {mountain.country}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
          <h2 className="text-3xl font-semibold mb-4 text-green-900">Overview</h2>
          <p className="text-lg leading-relaxed text-stone-700 whitespace-pre-line">
            {mountain.description}
          </p>
        </div>
      </div>
    </div>
  );
}