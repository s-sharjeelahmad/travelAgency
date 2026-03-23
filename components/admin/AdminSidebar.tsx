"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UploadCloud,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Add Package",
    href: "/admin/add-package",
    icon: UploadCloud,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col z-30">
      {/* Logo / Brand */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-600/20">
            <span className="text-white font-bold text-sm tracking-wide">TA</span>
          </div>
          <div>
            <p className="text-slate-100 font-semibold text-sm leading-tight tracking-wide">Travel Agency</p>
            <p className="text-slate-400 text-xs font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-amber-600/10 text-amber-500 self-center"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${isActive ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <a
          href="/api/logout"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
        >
          <LogOut size={18} className="shrink-0 text-slate-500 group-hover:text-red-400 transition-colors" />
          Logout
        </a>
      </div>
    </aside>
  );
}
