"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    // Jika sudah selesai loading context dan user tidak ada
    if (!contextLoading && !user) {
      setIsRedirecting(true);
      toast.error("Anda harus login untuk mengakses dokumentasi");
      router.replace("/login");
    }
  }, [user, contextLoading, router]);

  // Jika sedang loading context atau sedang redirect
  if (contextLoading || isRedirecting) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  // Hanya render konten jika user ada
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

  // Fallback: tidak render apa-apa (seharusnya tidak sampai di sini)
  return null;
}
