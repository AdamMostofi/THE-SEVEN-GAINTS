import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Contact() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Check if a user is logged in when the page loads
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to send a message.");
      return;
    }

    try {
      // We send the message AND the userId to create the database relationship
      const response = await axios.post("https://the-seven-gaints.onrender.com/api/contact", {
        userId: user.id,
        message: message
      });

      alert(response.data.message);
      setMessage(""); // Clear message
      setSubmitted(true);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error saving message. Make sure your backend is running.");
    }
  };

  // If not logged in, show a "Login Required" message instead of the form
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-stone-900 mb-6">Want to get in touch?</h1>
        <p className="text-xl text-stone-600 mb-8">
          Please log in or create an account to send a message to the team.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="bg-green-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800">Login</Link>
          <Link to="/signup" className="border border-stone-300 px-8 py-3 rounded-xl font-bold hover:bg-stone-100">Sign Up</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-green-900 mb-2">Message the Giants</h1>
        <p className="text-stone-600 text-lg">
          Logged in as <span className="font-bold text-stone-900">{user.username}</span> ({user.email})
        </p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h2>
          <p className="text-green-700">Thank you for reaching out. We've saved this to your account.</p>
          <button onClick={() => setSubmitted(false)} className="mt-4 text-green-900 font-bold underline">Send another?</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-[2rem] shadow-xl border border-stone-100">
          <div>
            <label className="block text-sm font-black uppercase tracking-widest text-stone-400 mb-3">Your Message</label>
            <textarea 
              rows="6"
              className="w-full p-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-green-800 outline-none transition-all"
              placeholder="Tell us what's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-2xl hover:bg-green-800 transition duration-300 shadow-lg">
            Submit Message
          </button>
        </form>
      )}
    </div>
  );
}

export default Contact;