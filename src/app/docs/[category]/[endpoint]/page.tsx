"use client";

import { useParams } from "next/navigation";
import { loadEndpointsForCategory } from "@/lib/api-docs-loader";
import { useEffect, useState } from "react";
import EndpointPage from "@/components/docs/endpoint/EndpointPage";
import Loader from "@/components/ui/loading";
import type { ApiEndpoint } from "@/lib/api-docs-loader";

export default function Page() {
  const params = useParams();
  const categoryId = params.category as string;
  const endpointId = params.endpoint as string;

  const [endpoint, setEndpoint] = useState<ApiEndpoint | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const endpoints = await loadEndpointsForCategory(categoryId);
        const foundEndpoint = endpoints.find((e) => e.id === endpointId);
        setEndpoint(foundEndpoint || null);
      } catch (error) {
        console.error("Failed to load endpoint data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [categoryId, endpointId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!endpoint) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Endpoint tidak ditemukan</h1>
          <p className="text-gray-600 mt-2">
            Dokumentasi untuk endpoint ini tidak tersedia
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto my-10">
      <EndpointPage endpoint={endpoint} />
    </main>
  );
}
