import { Metadata } from "next";
import DocsSidebar from "@/components/DocsSidebar";

export const metadata: Metadata = {
  title: "Dokumentasi | BPJS Kesehatan API",
  description: "API documentation for BPJS Kesehatan developers",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DocsSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
