import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent! (Check the console to see the data)");
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-green-900 mb-4">Contact the Expedition Team</h1>
      <p className="text-stone-600 mb-8 text-lg">
        Have questions about the Seven Giants? Or perhaps you have gear recommendations? Reach out to us below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-stone-200">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name</label>
          <input 
            type="text" 
            className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-green-800 outline-none"
            placeholder="John Doe"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Email Address</label>
          <input 
            type="email" 
            className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-green-800 outline-none"
            placeholder="john@example.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-2">Your Message</label>
          <textarea 
            rows="5"
            className="w-full p-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-green-800 outline-none"
            placeholder="Tell us what's on your mind..."
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-green-900 text-white font-bold py-3 rounded-md hover:bg-green-800 transition duration-300">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;