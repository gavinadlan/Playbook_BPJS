"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Lock,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function PanduanPage() {
  const steps = [
    {
      number: "1",
      title: "Pengajuan PKS",
      desc: "Ajukan Perjanjian Kerja Sama (PKS) melalui mitra resmi kami",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      number: "2",
      title: "Verifikasi PKS",
      desc: "Tim kami akan memverifikasi dokumen dalam 1-3 hari kerja",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      number: "3",
      title: "Buat Aplikasi",
      desc: "Buat aplikasi baru di dashboard developer setelah PKS aktif",
      icon: <ClipboardList className="w-6 h-6" />,
    },
    {
      number: "4",
      title: "Dapatkan Kredensial",
      desc: "Generate API Key dan Security Key di dashboard aplikasi",
      icon: <Lock className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EFF4FB] px-4 md:px-8 py-16 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#27447C] mb-4">
            Panduan Integrasi API
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mulai integrasi sistem Anda dengan API kami setelah menyelesaikan
            proses Perjanjian Kerja Sama (PKS)
          </p>
        </motion.div>

        {/* PKS Requirement Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg border border-[#E5E7EB]">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-100 rounded-lg text-red-600">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Persyaratan Akses API
            </h2>
          </div>

          <p className="text-gray-600 mb-8">
            Untuk mengakses API kami, Anda wajib memiliki Perjanjian Kerja Sama
            (PKS) yang aktif. Proses verifikasi membutuhkan waktu 1-3 hari kerja
            setelah dokumen lengkap diterima.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#F8FAFC] p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4 text-[#27447C]">
                Dokumen yang Dibutuhkan
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Surat Permohonan Kerja Sama
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Proposal Teknis Integrasi
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Dokumen Legal Perusahaan
                </li>
              </ul>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4 text-[#27447C]">
                Alur Pengajuan PKS
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    1
                  </span>
                  Unduh template PKS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    2
                  </span>
                  Upload dokumen lengkap
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    3
                  </span>
                  Verifikasi oleh tim kami
                </li>
              </ol>
            </div>
          </div>

          <Link
            href="/pengajuan-pks"
            className="inline-flex items-center px-6 py-3 bg-[#27447C] text-white rounded-lg hover:bg-[#1A335F] transition gap-2 shadow-md font-medium"
          >
            Ajukan PKS Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Integration Steps */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            Alur Integrasi Setelah PKS Aktif
          </h2>

          <div className="relative">
            {/* Timeline */}
            <div className="hidden md:block absolute left-8 top-0 h-full w-0.5 bg-gray-200" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  {/* Icon Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#27447C] text-white flex items-center justify-center font-semibold text-lg relative">
                    <div className="absolute -left-[18px] top-5 w-4 h-4 bg-white border-4 border-[#27447C] rounded-full hidden md:block" />
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#27447C] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/docs"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#27447C] to-[#3A5D9C] text-white rounded-xl hover:opacity-90 transition gap-3 shadow-lg font-medium"
            >
              Mulai Integrasi API
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
