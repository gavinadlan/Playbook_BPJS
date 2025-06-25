"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loading";
import { toast } from "@/components/ui/sonner";
import dynamic from "next/dynamic";

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
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <SwaggerUI
        url="/api-docs/bpjs-kesehatan.yaml"
        docExpansion="list"
        defaultModelExpandDepth={1}
        persistAuthorization={true}
        supportedSubmitMethods={["get", "post", "put", "delete", "patch"]}
        tryItOutEnabled={true}
      />
    </div>
  );
}
