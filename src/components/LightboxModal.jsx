import React from 'react';

export default function LightboxModal({ isOpen, onClose, imageSrc, alt }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm transition-all">
      <button
        onClick={onClose}
        className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Back to gallery"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-accent">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span className="font-medium text-accent">Back to gallery</span>
      </button>
      <img
        src={imageSrc}
        alt={alt}
        className="max-h-[90vh] max-w-[92vw] rounded-2xl shadow-xl border-4 border-white object-contain"
      />
    </div>
  );
}



