import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Recommended() {
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    // 🌍 LIVE Render backend URL
    axios.get("https://the-seven-giants.onrender.com/api/products")
      .then(res => setGroupedProducts(res.data))
      .catch(err => console.error("Error fetching gear:", err));
  }, []);

  return (
    <div className="p-8 bg-stone-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-green-900">Gear Recommendations</h1>
      
      {groupedProducts.map(group => (
        <div key={group.mountain_id} className="mb-16">
          <h2 className="text-2xl font-bold border-b-2 border-green-700 mb-6 pb-2">
            For {group.mountain_name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {group.products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={product.product_image_url} alt={product.product_name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <span className="text-xs font-bold uppercase text-green-700">{product.category}</span>
                  <h3 className="text-xl font-bold mt-1">{product.product_name}</h3>
                  <p className="text-stone-600 font-semibold">{product.price}</p>
                  <a 
                    href={product.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 block text-center bg-stone-800 text-white py-2 rounded hover:bg-stone-900 transition"
                  >
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}