"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoadingOverlay } from "@/contexts/LoadingOverlayContext";

/**
 * Clears the loading overlay whenever the URL (pathname or query) updates,
 * including after default Next.js `<Link>` soft navigations.
 */
function NavigationRouteSync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { hide } = useLoadingOverlay();
  const search = searchParams.toString();

  useEffect(() => {
    hide();
  }, [pathname, search, hide]);

  return null;
}

/**
 * Shows the overlay as soon as the user activates an in-app `<a href="...">`
 * (capture phase, before handlers run). Programmatic `router.push` still uses
 * `useAppNavigation`; this covers every `next/link` without custom onClick.
 */
function NavigationLinkCapture() {
  const { show } = useLoadingOverlay();

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      if (anchor.dataset.skipNavLoading !== undefined) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.protocol === "mailto:" || url.protocol === "tel:") return;
      if (url.origin !== window.location.origin) return;

      const next = `${url.pathname}${url.search}${url.hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (next === current) return;

      show();
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [show]);

  return null;
}

export function NavigationLoadingListener() {
  return (
    <>
      <NavigationLinkCapture />
      <Suspense fallback={null}>
        <NavigationRouteSync />
      </Suspense>
    </>
  );
}
