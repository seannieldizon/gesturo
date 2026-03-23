"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLoadingOverlay } from "@/contexts/LoadingOverlayContext";
import {
  Home,
  BookOpen,
  Zap,
  Info,
  Hand,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Zap },
  { href: "/about", label: "About", icon: Info },
];

function routeMatches(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { withLoading } = useLoadingOverlay();

  const onNavClick =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (routeMatches(href, pathname)) return;
      e.preventDefault();
      void withLoading(async () => {
        await new Promise((r) => setTimeout(r, 300));
        router.push(href);
      });
    };

  return (
    <header
      className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/85 shadow-sm shadow-sky-100/40 backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          onClick={onNavClick("/")}
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
          aria-label="GesTURO Home"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-primary-400 text-white shadow-sm"
            aria-hidden
          >
            <Hand className="h-6 w-6" strokeWidth={2.5} />
          </span>
          <div>
            <span className="block text-lg font-bold tracking-tight text-slate-800">
              GesTURO
            </span>
            <span className="block text-xs text-slate-500">
              Filipino Sign Language
            </span>
          </div>
        </Link>

        <nav
          className="flex items-center gap-1 sm:gap-2"
          aria-label="Main navigation"
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavClick(href)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary-100 text-primary-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
