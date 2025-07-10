"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  PlusCircle,
  Edit,
  Trash,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Endpoint {
  path: string;
  method: string;
  description: string;
  api: string; // add api property
}

interface ApiCategoryCardProps {
  endpoint: Endpoint;
}

const methodColors: { [key: string]: string } = {
  GET: "bg-green-100 text-green-800",
  POST: "bg-blue-100 text-blue-800",
  PUT: "bg-yellow-100 text-yellow-800",
  DELETE: "bg-red-100 text-red-800",
};

export default function ApiCategoryCard({ endpoint }: ApiCategoryCardProps) {
  const router = useRouter();
  const handleViewDetails = () => {
    router.push(`/test-api?api=${encodeURIComponent(endpoint.api)}&path=${encodeURIComponent(endpoint.path)}&method=${encodeURIComponent(endpoint.method)}`);
  };
  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 group relative overflow-hidden"
      key={endpoint.path}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              methodColors[endpoint.method] || "bg-gray-100 text-gray-800"
            }`}
          >
            {endpoint.method === "GET" && (
              <CheckCircle className="w-4 h-4 mr-2" />
            )}
            {endpoint.method === "POST" && (
              <PlusCircle className="w-4 h-4 mr-2" />
            )}
            {endpoint.method === "PUT" && <Edit className="w-4 h-4 mr-2" />}
            {endpoint.method === "DELETE" && <Trash className="w-4 h-4 mr-2" />}
            {endpoint.method}
          </span>
          <span className="text-xs text-gray-500">v1.0</span>
        </div>
        <code className="font-mono text-sm text-[#27447C] mb-4 break-words">
          /api/v1{endpoint.path}
        </code>
        <p className="text-gray-600 text-sm mb-4 flex-1">
          {endpoint.description}
        </p>
        <hr className="mb-4 border-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">Secure</span>
          </div>
          <Button
            variant="outline"
            className="text-[#27447C] border-[#27447C] hover:bg-[#27447C]/10"
            size="sm"
            onClick={handleViewDetails}
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#27447C]/5 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </CardContent>
    </Card>
  );
}
