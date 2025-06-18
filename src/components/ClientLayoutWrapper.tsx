"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin") ?? false;

  return (
    <div className={isAdminPage ? "admin-layout" : "main-layout"}>
      {children}
    </div>
  );
}
