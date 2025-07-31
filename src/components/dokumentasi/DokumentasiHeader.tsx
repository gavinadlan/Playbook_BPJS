import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

interface DokumentasiHeaderProps {
  title: string;
  description: string;
  backUrl: string;
  backText: string;
}

export default function DokumentasiHeader({
  title,
  description,
  backUrl,
  backText,
}: DokumentasiHeaderProps) {
  return (
    <>
      <div className="mb-10 flex items-center">
        <Link
          href={backUrl}
          className="inline-flex items-center text-[rgb(73,163,90)] hover:text-[#3a7a4d] transition-colors font-medium group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-[rgb(73,163,90)] group-hover:-translate-x-1 transition-transform" />
          <span className="border-b border-transparent group-hover:border-[rgb(73,163,90)]">
            {backText}
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
              {title}
            </h1>
            <p className="text-gray-600 max-w-3xl leading-relaxed">
              {description}
              <br />
              <span className="inline-block mt-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                Catatan: Ini hanya dokumentasi teknis, bukan endpoint API sungguhan
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 