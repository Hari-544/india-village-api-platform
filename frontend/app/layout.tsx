import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "India Village API Platform - Geographic Data Solutions",
  description: "Production-grade SaaS platform providing village-level geographical APIs for India. Search, autocomplete, and hierarchical address APIs for modern applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full">
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-[var(--line)] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-[var(--muted)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p>VillageAPI helps teams build reliable India address workflows.</p>
            <p>Secure API keys. Usage analytics. Clean geographic data.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
