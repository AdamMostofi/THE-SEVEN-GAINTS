import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert, Lock, Trash2, Mail, Clock, User } from "lucide-react";

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const user = JSON.parse(savedUser);

      // SECURITY CHECK: Only allow your specific email
      if (user.email === "adammostofi@gmail.com") {
        setAuthorized(true);
        fetchMessages();
      } else {
        setAuthorized(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-900"></div>
      </div>
    );
  }

  // 403 FORBIDDEN UI: Shown if user is not Adam
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-red-100 text-center">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-black text-stone-900 mb-2 uppercase tracking-tighter">
            Access Denied
          </h1>
          <p className="text-stone-500 mb-8">
            This area is restricted to expedition administrators. Your
            credentials do not grant access to the Command Center.
          </p>
          <a
            href="/"
            className="inline-block bg-stone-900 text-white px-8 py-3 rounded-full font-bold hover:bg-stone-800 transition-all"
          >
            Return to Base
          </a>
        </div>
      </div>
    );
  }

  // AUTHORIZED ADMIN UI
  return (
    <div className="min-h-screen bg-stone-50 p-6 md:p-12 lg:p-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-black text-green-700 uppercase tracking-[0.3em]">
                System Live
              </span>
            </div>
            <h1 className="text-5xl font-black text-stone-900 uppercase tracking-tighter">
              Command <span className="text-green-800">Center</span>
            </h1>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-stone-200 flex items-center gap-3">
            <div className="bg-stone-100 p-2 rounded-lg">
              <User className="w-5 h-5 text-stone-600" />
            </div>
            <div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">
                Admin User
              </p>
              <p className="text-sm font-bold text-stone-900">Adam Mostofi</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-stone-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-900 text-stone-400 uppercase text-[10px] font-black tracking-[0.2em]">
                  <th className="p-6">Sender Details</th>
                  <th className="p-6">Message Content</th>
                  <th className="p-6">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-stone-50/50 transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-black text-stone-900 text-lg tracking-tight uppercase">
                          {msg.username}
                        </span>
                        <span className="text-sm text-stone-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {msg.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 max-w-md">
                      <div className="bg-stone-50 p-4 rounded-2xl text-stone-700 text-sm leading-relaxed border border-stone-100 group-hover:bg-white transition-colors">
                        {msg.message}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-stone-400 text-xs font-bold">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {messages.length === 0 && (
            <div className="p-20 text-center">
              <ShieldAlert className="w-12 h-12 text-stone-200 mx-auto mb-4" />
              <p className="text-stone-400 font-medium">
                No incoming transmissions found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
