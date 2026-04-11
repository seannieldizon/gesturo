"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { ProgressBar } from "@/components/ProgressBar";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Home, BookOpen, Zap, Info, Menu, X } from "lucide-react";

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
  const { push } = useAppNavigation(300);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const onNavClick =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (routeMatches(href, pathname)) {
        setMobileOpen(false);
        return;
      }
      e.preventDefault();
      setMobileOpen(false);
      void push(href);
    };

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/85"
      role="banner"
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">
        {/* Logo */}
        <Link
          href="/"
          onClick={onNavClick("/")}
          className="flex min-w-0 shrink-0 items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:gap-3"
          aria-label="GesTURO Home"
        >
          <Image
            src="/logo/logo.png"
            alt=""
            width={160}
            height={40}
            className="h-8 w-auto max-h-9 shrink-0 object-contain object-left sm:h-10 sm:max-h-10"
            priority
          />
          <span className="hidden text-xs leading-tight text-slate-500 dark:text-slate-400 min-[480px]:block sm:text-[13px]">
            Filipino Sign Language
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 sm:flex sm:gap-1.5"
          aria-label="Main navigation"
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = routeMatches(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                onClick={onNavClick(href)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <ProgressBar />
          </div>
          <DarkModeToggle />
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] sm:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <nav
            className="absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white px-4 pb-4 pt-2 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:hidden"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = routeMatches(href, pathname);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onNavClick(href)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
              <ProgressBar />
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
