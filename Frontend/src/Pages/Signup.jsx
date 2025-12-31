import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://the-seven-gaints.onrender.com/api/signup', formData);
            alert(res.data.message);
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-stone-200">
                <h2 className="text-3xl font-black text-stone-900 mb-6 uppercase tracking-tighter">Create Account</h2>
                <input 
                    type="text" placeholder="Username" required
                    className="w-full p-4 mb-4 bg-stone-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-green-600"
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <input 
                    type="email" placeholder="Email" required
                    className="w-full p-4 mb-4 bg-stone-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-green-600"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                    type="password" placeholder="Password" required
                    className="w-full p-4 mb-6 bg-stone-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-green-600"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button type="submit" className="w-full bg-stone-900 text-white p-4 rounded-xl font-bold hover:bg-green-700 transition-colors">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;