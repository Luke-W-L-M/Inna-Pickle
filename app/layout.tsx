import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inna Pickle — A little coast at your table",
  description: "Kelp pickles for good food and long evenings. Explore Inna Pickle, recipes and pairings. Our first jars are coming soon.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
