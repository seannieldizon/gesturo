import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  // Avoid Chrome warning: preloaded unicode-range slice may not match first paint
  preload: false,
});

export const metadata: Metadata = {
  title: "GesTURO | Filipino Sign Language",
  description:
    "Learn Filipino Sign Language through interactive lessons designed for both deaf and hearing communities.",
  icons: {
    icon: [{ url: "/logo/logo.ico", type: "image/x-icon" }],
    shortcut: "/logo/logo.ico",
    apple: "/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <body className="font-sans antialiased dark:bg-slate-900 dark:text-slate-100">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex min-h-0 w-full flex-1 flex-col">{children}</main>
            <Footer className="shrink-0" />
          </div>
        </Providers>
      </body>
    </html>
  );
}
