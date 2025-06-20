"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DocsIntro from "@/components/docs/DocsIntro";
import DocsBreadcrumb from "@/components/docs/DocsBreadcrumb";
import DocsGettingStarted from "@/components/docs/DocsGettingStarted";
import DocsReferenceSection from "@/components/docs/DocsReferenceSection";
import DocsDeveloperResources from "@/components/docs/DocsDeveloperResources";
import Loader from "@/components/ui/loading";
import { toast } from "@/components/ui/sonner";

export default function DocsPage() {
  const { user, isLoading: contextLoading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const toastShown = useRef(false);

  useEffect(() => {
    // Redirect jika user tidak terautentikasi
    if (!contextLoading && !user && !toastShown.current) {
      toastShown.current = true;
      setIsRedirecting(true);
      toast.error("Akses memerlukan login");
      router.replace("/login");
    }
  }, [user, contextLoading, router]);

  // Menampilkan loader selama pengecekan
  if (contextLoading || isRedirecting) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  // Menampilkan konten hanya jika user terautentikasi
  if (user) {
    return (
      <main className="container mx-auto px-4 py-12">
        <DocsBreadcrumb />
        <DocsIntro />
        <DocsGettingStarted />
        <DocsReferenceSection />
        <DocsDeveloperResources />
      </main>
    );
  }

  return null;
}
