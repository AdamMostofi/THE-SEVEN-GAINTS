import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://the-seven-gaints.onrender.com/api/login', formData);
            // Store user data so we can use their ID for messages
            localStorage.setItem('user', JSON.stringify(res.data.user));
            alert("Login Successful!");
            navigate('/');
            window.location.reload(); // Refresh to update navbar
        } catch (err) {
            alert(err.response?.data?.error || "Invalid Credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-stone-200">
                <h2 className="text-3xl font-black text-stone-900 mb-6 uppercase tracking-tighter">Login</h2>
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
                <button type="submit" className="w-full bg-green-800 text-white p-4 rounded-xl font-bold hover:bg-green-700 transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;