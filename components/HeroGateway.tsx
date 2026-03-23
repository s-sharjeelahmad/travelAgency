import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Moon, Compass, CheckCircle } from "lucide-react";

type Tab = "hajj" | "international";

interface HeroGatewayProps {
  activeTab: Tab;
}

export default function HeroGateway({ activeTab }: HeroGatewayProps) {
  return (
    <section id="destinations" className="relative overflow-hidden bg-slate-50 py-16 md:py-24 px-4 border-b border-slate-200">
      {/* World map background texture */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1706823871410-ed8b01faef7e?q=80&w=929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"     //https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70"
          priority={false}
        />
        {/* Gradient fade into the section below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/60 to-slate-50" />
      </div>

      {/* Headline */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-emerald-900 leading-tight text-balance">
          Your Journey of a Lifetime Begins Here
        </h1>
        <p className="mt-5 text-slate-600 text-lg text-pretty">
          Choose your path and explore our carefully curated travel packages.
        </p>
      </div>

      {/* Two-path Cards */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

        {/* Hajj & Umrah Card */}
        <Link href="/?tab=hajj" className="group block focus:outline-none">
          <Card
            className={`h-full flex flex-col overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:shadow-emerald-900/5 group-focus-visible:ring-2 group-focus-visible:ring-emerald-700 group-focus-visible:ring-offset-2 ${
              activeTab === "hajj"
                ? "border-emerald-700 shadow-md ring-2 ring-emerald-700/20"
                : "border-slate-200"
            }`}
          >
            {/* Image Header */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1565019001609-0e34a6a22189?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Hajj & Umrah Journey"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <CardContent className="flex-1 flex flex-col items-center text-center px-8 pb-8 pt-0 gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors shadow-md relative -mt-8 z-10 ${
                  activeTab === "hajj" ? "bg-emerald-900" : "bg-white border text-emerald-800 group-hover:bg-emerald-50"
                }`}
              >
                <Moon
                  size={28}
                  className={activeTab === "hajj" ? "text-amber-400" : ""}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-2xl font-serif font-bold tracking-tight text-emerald-900">Hajj & Umrah</h2>
                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                  Deeply guided spiritual journeys to the holy cities of Makkah & Madinah.
                </p>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-7 pt-0 justify-center">
              <Button
                className={`w-full font-semibold pointer-events-none ${
                  activeTab === "hajj"
                    ? "bg-emerald-900 hover:bg-emerald-800 text-white"
                    : "bg-transparent border border-emerald-800 text-emerald-900 hover:bg-emerald-50"
                }`}
                variant={activeTab === "hajj" ? "default" : "outline"}
              >
                {activeTab === "hajj" ? (
                  <><CheckCircle size={16} className="mr-2" /> Viewing Packages</>
                ) : (
                  "View Packages"
                )}
              </Button>
            </CardFooter>
          </Card>
        </Link>

        {/* International Tours Card */}
        <Link href="/?tab=international" className="group block focus:outline-none">
          <Card
            className={`h-full flex flex-col overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:shadow-emerald-900/5 group-focus-visible:ring-2 group-focus-visible:ring-amber-500 group-focus-visible:ring-offset-2 ${
              activeTab === "international"
                ? "border-amber-500 shadow-md ring-2 ring-amber-500/20"
                : "border-slate-200"
            }`}
          >
            {/* Image Header */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100">
              <Image
                src="https://images.unsplash.com/flagged/photo-1559717865-a99cac1c95d8?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="International Tours Showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <CardContent className="flex-1 flex flex-col items-center text-center px-8 pb-8 pt-0 gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors shadow-md relative -mt-8 z-10 ${
                  activeTab === "international" ? "bg-amber-500" : "bg-white border text-amber-600 group-hover:bg-amber-50"
                }`}
              >
                <Compass
                  size={28}
                  className={activeTab === "international" ? "text-white" : ""}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-2xl font-serif font-bold tracking-tight text-emerald-900">International Tours</h2>
                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                  Luxury worldwide experiences crafted for the modern explorer and adventurer.
                </p>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-7 pt-0 justify-center">
              <Button
                className={`w-full font-semibold pointer-events-none ${
                  activeTab === "international"
                    ? "bg-amber-500 hover:bg-amber-600 text-white border-0"
                    : "bg-transparent border border-amber-500 text-amber-600 hover:bg-amber-50"
                }`}
                variant={activeTab === "international" ? "default" : "outline"}
              >
                {activeTab === "international" ? (
                  <><CheckCircle size={16} className="mr-2" /> Viewing Tours</>
                ) : (
                  "Explore Tours"
                )}
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </section>
  );
}
