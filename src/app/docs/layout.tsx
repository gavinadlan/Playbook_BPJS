"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import DocsSidebar from "@/components/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden p-4 border-b flex items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md mr-2"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-semibold">Dokumentasi API</span>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white z-50">
            <DocsSidebar onCloseMobile={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-80 flex-shrink-0 border-r">
          <DocsSidebar />
        </div>

        {/* Konten Utama */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
