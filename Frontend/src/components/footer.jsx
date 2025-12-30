import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand/Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-white font-black tracking-tighter text-xl mb-2 uppercase">
            The Seven Giants
          </h2>
          <p className="text-sm">
            © {new Date().getFullYear()} Expedition Team. All rights reserved.
          </p>
        </div>

        {/* Contact Email */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <Mail className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
          <a 
            href="mailto:adammostofi@gmail.com" 
            className="hover:text-white transition-colors font-medium"
          >
            adammostofi@gmail.com
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/AdamMostofi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/adam-mostofi-a25082361/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-all transform hover:-translate-y-1"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;