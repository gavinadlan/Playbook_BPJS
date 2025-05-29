"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DocsIntro from "@/components/docs/DocsIntro";
import DocsBreadcrumb from "@/components/docs/DocsBreadcrumb";
import DocsGettingStarted from "@/components/docs/DocsGettingStarted";
import DocsReferenceSection from "@/components/docs/DocsReferenceSection";
import DocsDeveloperResources from "@/components/docs/DocsDeveloperResources";

export default function DocsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

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
