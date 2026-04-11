import type { ComponentProps } from "react";

export function Footer({ className = "", ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={`border-t border-slate-200/60 bg-white/80 py-4 dark:border-slate-700/60 dark:bg-slate-900/80 sm:py-6 ${className}`}
      role="contentinfo"
      {...props}
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6">
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          © 2026 GesTURO. Making Filipino Sign Language accessible to everyone.
        </p>
        <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-500">
          Built with accessibility and inclusivity in mind
        </p>
      </div>
    </footer>
  );
}
