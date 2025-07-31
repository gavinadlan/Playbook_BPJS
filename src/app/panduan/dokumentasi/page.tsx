"use client";
import React from "react";
import { bpjsDocs } from "@/lib/bpjs-docs";
import { 
  DokumentasiHeader, 
  DokumentasiSection, 
  DecryptSection 
} from "@/components/dokumentasi";

export default function DokumentasiTeknisPage() {
  const mainDocs = bpjsDocs.filter((doc) => doc.id !== "decrypt");
  const decryptDoc = bpjsDocs.find((doc) => doc.id === "decrypt");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#E1EAF9] px-4 md:px-8 py-12 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <DokumentasiHeader
          title="Dokumentasi Teknis: Signature & Decrypt"
          description="Panduan teknis generate signature, authorization, dan decrypt response untuk seluruh layanan BPJS Kesehatan."
          backUrl="/panduan"
          backText="Kembali ke Panduan"
        />

        <div className="space-y-8">
          {mainDocs.map((doc) => (
            <DokumentasiSection key={doc.id} doc={doc} />
          ))}
        </div>

        {decryptDoc && <DecryptSection doc={decryptDoc} />}
      </div>
    </div>
  );
}