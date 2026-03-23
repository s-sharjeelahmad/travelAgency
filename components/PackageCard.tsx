import Image from "next/image";
import { Maximize2 } from "lucide-react";

interface PackageCardProps {
  title: string;
  imageUrl: string;
  onClick: () => void;
}

export default function PackageCard({ title, imageUrl, onClick }: PackageCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative text-left w-full rounded-2xl overflow-hidden border border-white/10 bg-[#13151e] shadow-xl hover:border-amber-500/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1117] touch-manipulation"
      aria-label={`View details for ${title}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay hover effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Maximize2 size={20} className="text-white" />
          </div>
        </div>
      </div>
      <div className="p-5 border-t border-white/5">
        <h3 className="text-white font-semibold text-lg line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-amber-400 text-sm mt-2 font-medium">Click to view brochure</p>
      </div>
    </button>
  );
}
