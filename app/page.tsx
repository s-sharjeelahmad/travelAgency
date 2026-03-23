import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroGateway from "@/components/HeroGateway";
import PackageGrid from "@/components/PackageGrid";
import GridSkeleton from "@/components/GridSkeleton";
import TrustSection from "@/components/TrustSection";
import CTABanner from "@/components/CTABanner";
import { fetchActivePackages } from "@/services/packageService";

export const dynamic = 'force-dynamic';

type Tab = "hajj" | "international";

// -─── Server Component: fetches & streams Hajj packages ───────────────────
async function HajjPackages() {
  const packages = await fetchActivePackages("hajj_umrah");
  return <PackageGrid packages={packages} />;
}

// -─── Static Server Component: Coming Soon UI ─────────────────────────────
function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <span className="text-6xl mb-6">🌍</span>
      <h2 className="text-3xl font-serif font-bold text-emerald-900 text-balance">
        Expanding Our Horizons
      </h2>
      <p className="text-slate-500 text-lg mt-4 max-w-lg text-pretty">
        International Tours launching soon. We are carefully crafting breathtaking experiences across the globe — stay tuned!
      </p>
    </div>
  );
}

// -─── Page ─────────────────────────────────────────────────────────────────
export default function Home({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  // "URL reflects state" (Vercel guideline: Navigation & State)
  const tab: Tab =
    searchParams?.tab === "international" ? "international" : "hajj";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Gateway Selection — with subtle amber glow */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/5 blur-[120px] -z-10" />
          <HeroGateway activeTab={tab} />
        </div>

        {/* Brand Trust Signals */}
        <TrustSection />

        {/* Dynamic Package Content Area */}
        <section id="packages" className="bg-slate-50 py-16 px-4 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            {/* Section heading */}
            <div className="mb-10 text-center">
              {tab === "hajj" ? (
                <>
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight text-emerald-900">
                    Latest Packages
                  </h2>
                  <p className="text-slate-600 mt-2 text-lg leading-relaxed">
                    Click any package to view the full brochure and enquire on WhatsApp.
                  </p>
                </>
              ) : (
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-emerald-900">
                  International Tours
                </h2>
              )}
            </div>

            {/* Tab content — Suspense streams HajjPackages while GridSkeleton shows */}
            {tab === "hajj" ? (
              <Suspense fallback={<GridSkeleton />}>
                <HajjPackages />
              </Suspense>
            ) : (
              <ComingSoon />
            )}
          </div>
        </section>

        {/* Custom Plan Call to Action */}
        <CTABanner />

      </main>

      <Footer />
    </div>
  );
}
