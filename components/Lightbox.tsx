"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface LightboxProps {
  title: string;
  imageUrl: string;
  onClose: () => void;
}

export default function Lightbox({ title, imageUrl, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // WhatsApp Link Math
  const phoneNumber = "923132204483"; // Dummy string, replace with client's number
  const message = `Assalam o Alaikum, I am interested in your package: ${title}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll on body
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Escape hatch: click backdrop
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
      // Prevent overscrolling the body beneath the modal
      style={{ overscrollBehavior: 'contain' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
        <h2 id="lightbox-title" className="text-white font-semibold text-lg drop-shadow-md line-clamp-1 pr-4 pointer-events-auto">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full max-w-4xl max-h-[85vh] flex-1 mt-12 mb-24 lg:mb-20 rounded-lg overflow-hidden flex items-center justify-center pointer-events-none">
        {/* Pointer events bound to the image so clicking it doesn't trigger overlay close */}
        <div className="relative w-full h-full pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <Image
            src={imageUrl}
            alt={`Brochure for ${title}`}
            fill
            sizes="100vw"
            quality={100} // Perfect readability for text
            className="object-contain"
            priority // Modal image needs to load instantly
          />
        </div>
      </div>

      {/* Massive Sticky WhatsApp Button */}
      <div className="absolute bottom-6 inset-x-0 px-4 flex justify-center pointer-events-none">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg md:text-xl py-5 px-8 rounded-2xl shadow-2xl shadow-[#25D366]/30 transition-transform active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black touch-manipulation"
        >
          {/* WhatsApp SVG Icon */}
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
