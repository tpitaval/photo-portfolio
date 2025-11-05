import React, { useState } from 'react';
import LightboxModal from './LightboxModal.jsx';

export default function GalleryWithPopup({ images = [], alt }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);

  function openModal(src) {
    setCurrentImg(src);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => setCurrentImg(null), 300);
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((src) => (
          <img
            key={src}
            src={src}
            alt={alt}
            className="rounded-2xl shadow-soft w-full h-auto block cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
            loading="lazy"
            tabIndex={0}
            onClick={() => openModal(src)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') openModal(src);
            }}
            aria-label='Open image fullscreen'
          />
        ))}
      </div>
      <LightboxModal
        isOpen={modalOpen}
        onClose={closeModal}
        imageSrc={currentImg}
        alt={alt}
      />
    </>
  );
}



