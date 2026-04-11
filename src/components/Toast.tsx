"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

type ToastData = {
  id: number;
  message: string;
  type: ToastType;
};

let toastId = 0;
const listeners = new Set<(toast: ToastData) => void>();

export function showToast(message: string, type: ToastType = "info") {
  const toast: ToastData = { id: ++toastId, message, type };
  listeners.forEach((fn) => fn(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler = (toast: ToastData) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4000);
    };
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  const dismiss = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm animate-fade-in-up ${
            toast.type === "success"
              ? "bg-emerald-50/95 text-emerald-900 dark:bg-emerald-900/90 dark:text-emerald-100"
              : toast.type === "error"
                ? "bg-rose-50/95 text-rose-900 dark:bg-rose-900/90 dark:text-rose-100"
                : "bg-white/95 text-slate-900 dark:bg-slate-800/95 dark:text-slate-100"
          }`}
        >
          {toast.type === "success" && (
            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          )}
          {toast.type === "error" && (
            <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
          )}
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="ml-2 shrink-0 rounded p-1 hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
