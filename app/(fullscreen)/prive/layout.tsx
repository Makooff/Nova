import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio",
  openGraph: {
    title: "Portfolio",
    description: "Portfolio",
    siteName: "Portfolio",
  },
  twitter: {
    title: "Portfolio",
    description: "Portfolio",
  },
};

export default function PriveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
