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
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <DocsSidebar />
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
