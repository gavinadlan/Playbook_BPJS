"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: (isAdminPage: boolean) => ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return <>{children(isAdminPage)}</>;
}
