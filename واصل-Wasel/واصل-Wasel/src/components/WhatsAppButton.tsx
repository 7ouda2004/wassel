
import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/201119056895"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="تواصل عبر واتساب"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-25 animate-ping" />
      
      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl shadow-green-500/30 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.6 6.3A8.3 8.3 0 0 0 3.3 15.6L2 22l6.5-1.7a8.3 8.3 0 0 0 4 1 8.3 8.3 0 0 0 5.3-14.7zM12.4 19a6.9 6.9 0 0 1-3.5-1l-.3-.1-2.7.7.7-2.7-.1-.3a6.9 6.9 0 0 1-1-3.5 6.9 6.9 0 0 1 11.9-4.7A6.9 6.9 0 0 1 12.4 19z"/>
          <path d="M17.4 14.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.4.1-.1.2-.6.7-.7.9-.1.1-.2.1-.4 0-.6-.3-1.2-.5-1.7-1.2-.4-.4-.8-.9-1-1.3 0-.2 0-.3.1-.3l.4-.3.2-.4c.1-.1 0-.3 0-.4l-.6-1.5c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.5.2-.6.7-.9 1.4-.9 2.2a3.8 3.8 0 0 0 .8 2c1 1.2 1.7 1.5 2.8 2 .4.1.8.2 1.2.2.3.1.7 0 1-.1.3-.1.9-.4 1.1-.8.2-.3.2-.7.1-.8 0-.2-.2-.1-.4-.2z"/>
        </svg>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
        تواصل معنا عبر واتساب
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1" />
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
