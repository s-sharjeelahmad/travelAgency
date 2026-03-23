import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function TrustSection() {
  const points = [
    "Visa Processing",
    "Premium Accommodation",
    "Dedicated Ground Support",
  ];

  return (
    <section id="why-us" className="bg-white py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Image */}
        <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-slate-200 border border-slate-100">
          <Image
            src="https://images.unsplash.com/photo-1724230758718-406bab979e67?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Masjid al-Nabawi"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right Side: Text & Checkmarks */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-emerald-900 text-balance leading-tight">
            Excellence in Every Journey
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed text-pretty">
            With years of experience handling sacred and international travel, we ensure your trip is seamless, spiritual, and stress-free.
          </p>

          <ul className="space-y-4 pt-2">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <CheckCircle size={20} className="text-amber-500" />
                </div>
                <span className="text-slate-800 font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
