import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
        alt="Airplane over clouds"
        fill
        sizes="100vw"
        className="object-cover pointer-events-none"
      />
      
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 px-4 text-center max-w-3xl mx-auto flex flex-col items-center gap-8">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white text-balance leading-tight">
          Looking for a Custom Family Package?
        </h2>
        
        <a
          href="https://wa.me/923132204483?text=Assalam%20o%20Alaikum%2C%20I%20am%20looking%20for%20a%20custom%20family%20travel%20package."
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg md:text-xl py-8 px-10 gap-3 rounded-xl shadow-xl shadow-[#25D366]/20 transition-transform active:scale-95"
          >
            <MessageCircle size={24} />
            Message Us for Custom Plans
          </Button>
        </a>
      </div>
    </section>
  );
}
