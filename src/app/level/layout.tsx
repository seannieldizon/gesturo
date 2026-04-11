"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function LevelLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-full w-full flex-1">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-full min-w-0 flex-1 flex-col">
        <div className="sticky top-[calc(var(--gesturo-header-offset,3.25rem))] z-30 flex items-center border-b border-slate-200 bg-white/90 px-4 py-2 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Menu className="h-4 w-4" />
            Levels
          </button>
        </div>
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
