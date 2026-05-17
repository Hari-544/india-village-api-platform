import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
