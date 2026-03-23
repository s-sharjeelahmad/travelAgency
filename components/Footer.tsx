import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-12">
        {/* About Us */}
        <div>
          <h3 className="font-serif text-xl font-bold mb-4 text-white">Premium Travels</h3>
          <p className="text-emerald-200 text-sm leading-relaxed">
            Your trusted partner for Hajj, Umrah, and International Tours. We craft meaningful journeys and unforgettable experiences tailored to every traveler.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-xl font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/?tab=hajj" className="text-emerald-200 text-sm hover:text-amber-400 transition-colors focus:outline-none focus-visible:text-amber-400">
                Hajj & Umrah Packages
              </Link>
            </li>
            <li>
              <Link href="/?tab=international" className="text-emerald-200 text-sm hover:text-amber-400 transition-colors focus-visible:text-amber-400">
                International Tours
              </Link>
            </li>
            <li>
              <a href="https://wa.me/923132204483" target="_blank" rel="noopener noreferrer" className="text-emerald-200 text-sm hover:text-amber-400 transition-colors">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-xl font-bold mb-4 text-white">Contact Info</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 mt-0.5 text-amber-400" />
              <span className="text-emerald-200 text-sm leading-relaxed">
                123 Travel Lane, Saddar, Karachi, Pakistan
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-amber-400" />
              <a href="tel:+923132204483" className="text-emerald-200 text-sm hover:text-amber-400 transition-colors">
                +92 313 2204483
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-amber-400" />
              <a href="mailto:info@premiumtravels.pk" className="text-emerald-200 text-sm hover:text-amber-400 transition-colors">
                info@premiumtravels.pk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-800 text-center py-5 text-emerald-400 text-xs">
        © {new Date().getFullYear()} Premium Travels. All rights reserved.
      </div>
    </footer>
  );
}
