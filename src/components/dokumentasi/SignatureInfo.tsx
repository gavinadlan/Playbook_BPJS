import React from "react";
import { Info, Key, Clock, Shield } from "lucide-react";
import { bpjsDocs } from "@/lib/bpjs-docs";

interface SignatureInfoProps {
  serviceName: string;
}

export default function SignatureInfo({ serviceName }: SignatureInfoProps) {
  // Get service from bpjs-docs.ts
  const service = bpjsDocs.find(doc => 
    doc.title.toLowerCase() === serviceName.toLowerCase() ||
    doc.id.toLowerCase() === serviceName.toLowerCase()
  );

  // If no signature info available, don't render
  if (!service?.signatureInfo) {
    return null;
  }
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-800">
          Informasi Signature untuk {serviceName}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-blue-700 whitespace-pre-line">
          {service.signatureInfo}
        </div>
      </div>
    </div>
  );
} 