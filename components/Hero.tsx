import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa"
        alt="The Kaaba in Mecca"
        fill
        className="object-cover"
        priority
        fetchPriority="high"
        sizes="100vw"
      />
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight text-balance">
          Your Journey of a Lifetime Begins Here
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl text-pretty">
          Experience premium, hand-crafted packages for Hajj, Umrah, and International Tours tailored for your spiritual and travel needs.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="#hajj-umrah"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold transition-colors shadow-lg shadow-amber-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black touch-manipulation"
          >
            View Hajj & Umrah Packages
          </Link>
          <Link
            href="#international-tours"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold border border-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black touch-manipulation"
          >
            Explore International Tours
          </Link>
        </div>
      </div>
    </section>
  );
}
