"use client";

import { usePathname } from "next/navigation";
import MinimalHeader from "./MinimalHeader";
import Footer from "./Footer";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = pathname.startsWith("/prive") || pathname.startsWith("/presentation");
  return (
    <>
      {!hideShell && <MinimalHeader />}
      {children}
      {!hideShell && <Footer />}
    </>
  );
}
