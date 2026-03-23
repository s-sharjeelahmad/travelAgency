import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm shrink-0"
        >
          <span className="text-xl font-serif font-bold tracking-tight">Premium Travels</span>
        </Link>

        {/* Center nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#destinations"
            className="text-sm font-medium text-emerald-900/80 hover:text-amber-500 transition-colors focus:outline-none focus-visible:text-amber-500"
          >
            Destinations
          </a>
          <a
            href="#packages"
            className="text-sm font-medium text-emerald-900/80 hover:text-amber-500 transition-colors focus:outline-none focus-visible:text-amber-500"
          >
            Packages
          </a>
          <a
            href="#why-us"
            className="text-sm font-medium text-emerald-900/80 hover:text-amber-500 transition-colors focus:outline-none focus-visible:text-amber-500"
          >
            Why Us
          </a>
        </nav>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/923132204483"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold gap-2 shadow-sm">
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </Button>
        </a>
      </div>
    </header>
  );
}

