"use client";

import { useRouter } from "next/navigation";

/** Matches Next.js App Router `router.push` / `replace` options */
type AppRouterNavigateOptions = { scroll?: boolean };
import { useCallback, useMemo } from "react";
import { useLoadingOverlay } from "@/contexts/LoadingOverlayContext";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Minimum time the overlay stays visible for programmatic navigations */
const DEFAULT_MIN_NAV_MS = 320;

/**
 * Same as Next.js `useRouter` for `push` / `replace` / `back` / `forward`, but each
 * runs behind the global loading overlay. Use this instead of `useRouter` when
 * navigating from buttons or imperative code.
 */
export function useAppNavigation(minNavMs: number = DEFAULT_MIN_NAV_MS) {
  const router = useRouter();
  const { withLoading } = useLoadingOverlay();

  const push = useCallback(
    (href: string, options?: AppRouterNavigateOptions) =>
      withLoading(async () => {
        await delay(minNavMs);
        router.push(href, options);
      }),
    [router, withLoading, minNavMs]
  );

  const replace = useCallback(
    (href: string, options?: AppRouterNavigateOptions) =>
      withLoading(async () => {
        await delay(minNavMs);
        router.replace(href, options);
      }),
    [router, withLoading, minNavMs]
  );

  const back = useCallback(
    () =>
      withLoading(async () => {
        await delay(minNavMs);
        router.back();
      }),
    [router, withLoading, minNavMs]
  );

  const forward = useCallback(
    () =>
      withLoading(async () => {
        await delay(minNavMs);
        router.forward();
      }),
    [router, withLoading, minNavMs]
  );

  return useMemo(
    () => ({
      push,
      replace,
      back,
      forward,
      prefetch: router.prefetch.bind(router),
      refresh: router.refresh.bind(router),
    }),
    [router, push, replace, back, forward]
  );
}
