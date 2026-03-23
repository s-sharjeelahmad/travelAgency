"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import type { Package } from "@/types/database";

interface PackageGridProps {
  packages: Package[];
}

export default function PackageGrid({ packages }: PackageGridProps) {
  if (packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 px-6">
        <span className="text-5xl mb-4">📦</span>
        <h3 className="text-2xl font-serif font-bold text-emerald-900">
          New Packages Arriving Soon…
        </h3>
        <p className="text-slate-500 mt-2 max-w-sm text-pretty">
          We are curating our offerings for the upcoming season. Please check back shortly!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => {
        const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923132204483";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          `Assalam o Alaikum, I want details about ${pkg.title}`
        )}`;

        return (
          /*
           * Each Dialog is self-contained — its trigger (View Details button)
           * and content (full-brochure lightbox) are co-located per card.
           * No external state management is needed.
           */
          <Dialog key={pkg.id}>
            <Card className="overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-500 bg-white rounded-2xl flex flex-col group">
              {/* Brochure thumbnail */}
              <CardContent className="p-0 flex-1">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={pkg.image_url}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Trust Badge */}
                  <Badge className="absolute top-3 right-3 bg-amber-500 hover:bg-amber-500 text-white border-0 font-semibold text-xs shadow-md pointer-events-none">
                    Top Rated
                  </Badge>
                </div>
                <div className="p-5 pb-3">
                  <h3 className="font-serif font-semibold tracking-tight text-lg text-emerald-900 line-clamp-2 leading-snug">
                    {pkg.title}
                  </h3>
                </div>
              </CardContent>

              {/* Trigger button */}
              <CardFooter className="px-5 pb-5 pt-2">
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg font-semibold transition-all focus-visible:ring-amber-500"
                  >
                    View Brochure
                  </Button>
                </DialogTrigger>
              </CardFooter>
            </Card>

            {/* Full-brochure lightbox */}
            <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] p-0 gap-0 overflow-hidden">
              <DialogHeader className="px-6 pt-6 pb-4">
                <DialogTitle className="font-serif text-xl text-emerald-900">
                  {pkg.title}
                </DialogTitle>
                <DialogDescription>
                  View the full brochure below. Tap the button to enquire directly on WhatsApp.
                </DialogDescription>
              </DialogHeader>

              {/* Full-res brochure image (quality 100 for text readability) */}
              <div className="relative w-full h-[50vh] md:h-[62vh] bg-slate-100">
                <Image
                  src={pkg.image_url}
                  alt={`Full brochure for ${pkg.title}`}
                  fill
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>

              {/* Massive WhatsApp conversion button */}
              <div className="px-6 py-5 border-t border-slate-100 bg-white">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base py-7 gap-3 shadow-sm shadow-[#25D366]/30 transition-transform active:scale-[0.98]">
                    <MessageCircle size={22} />
                    Chat on WhatsApp about This Package
                  </Button>
                </a>
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
