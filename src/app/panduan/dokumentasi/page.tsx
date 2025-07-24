"use client";
import React from "react";
import Link from "next/link";
import { bpjsDocs } from "@/lib/bpjs-docs";
import { FileText, ArrowLeft, KeyRound, Lock, Info } from "lucide-react";

export default function DokumentasiTeknisPage() {
  const mainDocs = bpjsDocs.filter((doc) => doc.id !== "decrypt");
  const decryptDoc = bpjsDocs.find((doc) => doc.id === "decrypt");
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#E1EAF9] px-4 md:px-8 py-12 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-center">
          <Link
            href="/panduan"
            className="inline-flex items-center text-[rgb(73,163,90)] hover:text-[#3a7a4d] transition-colors font-medium group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-[rgb(73,163,90)] group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-transparent group-hover:border-[rgb(73,163,90)]">
              Kembali ke Panduan
            </span>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-md border border-[#E0E7FF] mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(39,68,124)] opacity-5 rounded-full -m-8"></div>
          <div className="flex items-start gap-5 mb-5">
            <div className="p-3 bg-[#EFF6FF] rounded-lg text-[rgb(39,68,124)] border border-[#DBEAFE] flex-shrink-0 mt-1">
              <FileText className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[rgb(39,68,124)] mb-2 tracking-tight">
                Dokumentasi Teknis: Signature & Decrypt
              </h1>
              <p className="text-gray-600 max-w-3xl leading-relaxed">
                Panduan teknis generate signature, authorization, dan decrypt response untuk seluruh layanan BPJS Kesehatan.
                <br />
                <span className="inline-block mt-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                  Catatan: Ini hanya dokumentasi teknis, bukan endpoint API sungguhan
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {mainDocs.map((doc) => (
            <Section key={doc.id} doc={doc} />
          ))}
        </div>

        {decryptDoc && <DecryptSection doc={decryptDoc} />}
      </div>
    </div>
  );
}

function Section({ doc }: { doc: typeof bpjsDocs[0] }) {
  const [selectedLang, setSelectedLang] = React.useState(
    doc.codeExamples && doc.codeExamples.length > 0 ? doc.codeExamples[0].language : null
  );
  const [selectedCompressLang, setSelectedCompressLang] = React.useState(
    doc.compressExamples && doc.compressExamples.length > 0 ? doc.compressExamples[0].language : null
  );
  const [selectedEncryptLang, setSelectedEncryptLang] = React.useState(
    doc.encryptExamples && doc.encryptExamples.length > 0 ? doc.encryptExamples[0].language : null
  );

  // Info box for decrypt note
  const decryptNote = doc.description && doc.description.includes("Untuk proses decrypt response")
    ? doc.description.split("Untuk proses decrypt response")[1]
      ? "Untuk proses decrypt response" + doc.description.split("Untuk proses decrypt response")[1]
      : "Untuk proses decrypt response, lihat panduan umum di bagian bawah halaman ini."
    : null;

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
      
      {doc.description && (
        <p className="text-gray-700 mb-5 leading-relaxed">
          {doc.description.replace(decryptNote || "", "").trim()}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-[rgb(73,163,90)] mb-2 flex items-center gap-2">
            <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            Required Headers
          </h3>
          <ul className="space-y-2">
            {doc.headers.map((h) => (
              <li key={h} className="flex items-center">
                <span className="mr-2 text-indigo-500">•</span>
                <span className="font-mono bg-gray-100 px-3 py-1.5 rounded-md text-[rgb(39,68,124)] text-sm">{h}</span>
              </li>
            ))}
          </ul>
        </div>

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
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[rgb(73,163,90)] flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
              Contoh Pembuatan Signature
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {doc.codeExamples.map((ex) => (
                <button
                  key={ex.language}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedLang === ex.language
                      ? 'bg-[rgb(39,68,124)] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedLang(ex.language)}
                  type="button"
                >
                  {ex.language}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            {doc.codeExamples.map((ex) =>
              ex.language === selectedLang ? (
                <pre 
                  key={ex.language} 
                  className="p-4 text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto"
                >
                  {ex.code}
                </pre>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Multi-language code example: Kompresi GZip */}
      {doc.compressExamples && doc.compressExamples.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[rgb(73,163,90)] flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
              Contoh Pembuatan Kompressi GZip
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {doc.compressExamples.map((ex) => (
                <button
                  key={ex.language}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCompressLang === ex.language
                      ? 'bg-[rgb(39,68,124)] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCompressLang(ex.language)}
                  type="button"
                >
                  {ex.language}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            {doc.compressExamples.map((ex) =>
              ex.language === selectedCompressLang ? (
                <pre 
                  key={ex.language} 
                  className="p-4 text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto"
                >
                  {ex.code}
                </pre>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Multi-language code example: Enkripsi AES */}
      {doc.encryptExamples && doc.encryptExamples.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[rgb(73,163,90)] flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">6</span>
              Contoh Pembuatan Enkripsi AES
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {doc.encryptExamples.map((ex) => (
                <button
                  key={ex.language}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedEncryptLang === ex.language
                      ? 'bg-[rgb(39,68,124)] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedEncryptLang(ex.language)}
                  type="button"
                >
                  {ex.language}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            {doc.encryptExamples.map((ex) =>
              ex.language === selectedEncryptLang ? (
                <pre 
                  key={ex.language} 
                  className="p-4 text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto"
                >
                  {ex.code}
                </pre>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DecryptSection({ doc }: { doc: typeof bpjsDocs[0] }) {
  const [selectedLang, setSelectedLang] = React.useState(
    doc.codeExamples && doc.codeExamples.length > 0 ? doc.codeExamples[0].language : null
  );
  
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

      {doc.codeExamples && doc.codeExamples.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-[rgb(73,163,90)] flex items-center gap-2">
              <span className="bg-indigo-200 text-indigo-900 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Contoh Kode Decrypt
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {doc.codeExamples.map((ex) => (
                <button
                  key={ex.language}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedLang === ex.language
                      ? 'bg-[rgb(39,68,124)] text-white shadow-sm'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                  onClick={() => setSelectedLang(ex.language)}
                  type="button"
                >
                  {ex.language}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            {doc.codeExamples.map((ex) =>
              ex.language === selectedLang ? (
                <pre 
                  key={ex.language} 
                  className="p-4 text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto"
                >
                  {ex.code}
                </pre>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}