import React from "react";
import { Lock, Info } from "lucide-react";
import CodeBlock from "./CodeBlock";
import HeaderTable from "./HeaderTable";
import SignatureInfo from "./SignatureInfo";
import HeaderDetails from "./HeaderDetails";

import { BpjsDocSection } from "@/lib/bpjs-docs";

interface DokumentasiSectionProps {
  doc: BpjsDocSection;
}

export default function DokumentasiSection({ doc }: DokumentasiSectionProps) {
  // Info box for decrypt note
  const decryptNote = doc.description && doc.description.includes("Untuk proses decrypt response")
    ? doc.description.split("Untuk proses decrypt response")[1]
      ? "Untuk proses decrypt response" + doc.description.split("Untuk proses decrypt response")[1]
      : "Untuk proses decrypt response, lihat panduan umum di bagian bawah halaman ini."
    : null;



  // Get general description
  const getGeneralDescription = () => {
    return doc.description;
  };

  // Get header information from doc.headerTable
  const getHeaderInfo = () => {
    if (doc.headerTable) {
      return doc.headerTable;
    }
    // Fallback to headers array if headerTable is not available
    return doc.headers.map(header => ({
      name: header,
      value: "nilai_header",
      description: "Deskripsi header"
    }));
  };

  const headerExplanations = doc.headerExplanations || null;
  const generalDescription = getGeneralDescription();

  return (
    <div className="bg-white rounded-xl p-7 shadow-sm border border-[#E5E7EB] relative group hover:shadow-md transition-shadow">
      <div className="absolute -left-1 top-6 w-1.5 h-16 bg-[rgb(73,163,90)] rounded-r-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-start gap-4 mb-5">
        <div className="p-2.5 bg-indigo-50 rounded-lg text-indigo-700 mt-0.5 flex-shrink-0">
          <Lock className="w-5 h-5" strokeWidth={1.8} />
        </div>
        <h2 className="text-xl font-bold text-[rgb(39,68,124)] mt-1">{doc.title}</h2>
      </div>
      
      {decryptNote && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-5 text-[rgb(39,68,124)]">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
          <span className="text-sm font-medium">{decryptNote}</span>
        </div>
      )}
      
      {generalDescription && (
        <div className="text-gray-700 mb-5 leading-relaxed">
          <p className="whitespace-pre-line">{generalDescription}</p>
        </div>
      )}

      <div className="mb-6">
        <HeaderTable headers={getHeaderInfo()} />
      </div>

      {headerExplanations && (
        <HeaderDetails serviceName={doc.title} explanations={headerExplanations} />
      )}

      

      <SignatureInfo serviceName={doc.title} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {doc.signatureFormula && (
          <div>
            <h3 className="font-semibold text-[rgb(73,163,90)] mb-2 flex items-center gap-2">
              <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Signature Formula
            </h3>
            <pre className="bg-gray-50 rounded-md p-4 text-sm text-gray-800 font-mono whitespace-pre-wrap border border-gray-200">
              {doc.signatureFormula}
            </pre>
          </div>
        )}

        {doc.authorizationFormula && (
          <div className="md:col-span-2">
            <h3 className="font-semibold text-[rgb(73,163,90)] mb-2 flex items-center gap-2">
              <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
              Authorization Formula
            </h3>
            <pre className="bg-gray-50 rounded-md p-4 text-sm text-gray-800 font-mono whitespace-pre-wrap border border-gray-200">
              {doc.authorizationFormula}
            </pre>
          </div>
        )}
      </div>

      {/* Multi-language code example: Signature */}
      {doc.codeExamples && doc.codeExamples.length > 0 && (
        <CodeBlock
          title="Contoh Pembuatan Signature"
          stepNumber={4}
          examples={doc.codeExamples}
        />
      )}

      {/* Multi-language code example: Kompresi GZip */}
      {doc.compressExamples && doc.compressExamples.length > 0 && (
        <CodeBlock
          title="Contoh Pembuatan Kompressi GZip"
          stepNumber={5}
          examples={doc.compressExamples}
        />
      )}

      {/* Multi-language code example: Enkripsi AES */}
      {doc.encryptExamples && doc.encryptExamples.length > 0 && (
        <CodeBlock
          title="Contoh Pembuatan Enkripsi AES"
          stepNumber={6}
          examples={doc.encryptExamples}
        />
      )}
    </div>
  );
} 