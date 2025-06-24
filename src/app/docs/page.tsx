"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loading";
import { toast } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import DocsSidebar from "@/components/DocsSidebar";
import { Menu } from "lucide-react";

const SwaggerUI = dynamic(
  () => import("swagger-ui-react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="p-8">
        <Loader />
      </div>
    ),
  }
);

export default function DocsPage() {
  const { user, isLoading: contextLoading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toastShown = useRef(false);

  useEffect(() => {
    if (!contextLoading && !user && !toastShown.current) {
      toastShown.current = true;
      setIsRedirecting(true);
      toast.error("Akses memerlukan login");
      router.replace("/login");
    }
  }, [user, contextLoading, router]);

  if (contextLoading || isRedirecting) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row">
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

      {/* Mobile Sidebar */}
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

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DocsSidebar />
      </div>

      {/* Konten Utama */}
      <main className="container mx-auto px-4 py-12 min-h-screen flex-1">
        <SwaggerUI
          url="/api-docs/bpjs-kesehatan.yaml"
          docExpansion="list"
          defaultModelExpandDepth={1}
          persistAuthorization={true}
          supportedSubmitMethods={["get", "post", "put", "delete", "patch"]}
          tryItOutEnabled={true}
        />
      </main>
    </div>
  );
}
