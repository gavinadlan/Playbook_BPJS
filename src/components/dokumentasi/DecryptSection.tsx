import React from "react";
import { KeyRound } from "lucide-react";
import CodeBlock from "./CodeBlock";
import { BpjsDocSection } from "@/lib/bpjs-docs";

interface DecryptSectionProps {
  doc: BpjsDocSection;
}

export default function DecryptSection({ doc }: DecryptSectionProps) {
  return (
    <div className="bg-gradient-to-r from-[#EFF6FF] to-[#EBF4FF] rounded-xl p-8 border border-[#C7D2FE] mt-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-[rgb(39,68,124)] opacity-5 rounded-full -m-10"></div>
      
      <div className="flex items-start gap-5 mb-6">
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-700 flex-shrink-0">
          <KeyRound className="w-6 h-6" strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[rgb(39,68,124)] mb-3">{doc.title}</h2>
          {doc.description && <p className="text-gray-700 max-w-3xl">{doc.description}</p>}
        </div>
      </div>

      {doc.decryptFormula && (
        <div className="mb-6">
          <h3 className="font-semibold text-[rgb(73,163,90)] mb-3 flex items-center gap-2">
            <span className="bg-indigo-200 text-indigo-900 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            Decrypt Formula
          </h3>
          <pre className="bg-indigo-50 rounded-md p-4 text-sm text-indigo-900 font-mono whitespace-pre-wrap border border-indigo-200">
            {doc.decryptFormula}
          </pre>
        </div>
      )}

      {doc.decryptExamples && doc.decryptExamples.length > 0 && (
        <CodeBlock
          title="Contoh Kode Decrypt"
          stepNumber={2}
          examples={doc.decryptExamples}
        />
      )}
    </div>
  );
} 