import { fetchAllPackages } from "@/services/packageService";
import PackagesTable from "@/components/admin/PackagesTable";
import { LayoutDashboard } from "lucide-react";

export default async function AdminDashboardPage() {
  const packages = await fetchAllPackages();

  const activeCount = packages.filter((p) => p.is_active).length;
  const hajjCount = packages.filter((p) => p.category === "hajj_umrah").length;
  const travelCount = packages.filter((p) => p.category === "general_travel").length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-600/20">
          <LayoutDashboard size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm">Manage your travel package listings.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Packages", value: packages.length, color: "text-slate-900", bg: "bg-white" },
          { label: "Active", value: activeCount, color: "text-emerald-700", bg: "bg-emerald-50" },
          { label: "Hajj & Umrah", value: hajjCount, color: "text-amber-700", bg: "bg-amber-50" },
        ].map(({ label, value, color, bg }) => (
          <div
            key={label}
            className={`${bg} rounded-xl border border-slate-200 p-5 shadow-sm`}
          >
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
            <p className={`text-4xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Packages Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">All Packages</h2>
        <PackagesTable initialPackages={packages} />
      </div>
    </div>
  );
}
