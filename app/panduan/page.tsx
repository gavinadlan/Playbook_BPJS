"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PanduanPage() {
  const steps = [
    {
      number: "1",
      title: "Log in",
      desc: "Login atau daftar akun di platform Developer API kami.",
    },
    {
      number: "2",
      title: "Buat Aplikasi",
      desc: "Buat aplikasi baru pada menu 'My Application'.",
    },
    {
      number: "3",
      title: "Tambahkan Layanan API",
      desc: "Pilih layanan API yang ingin diuji coba.",
    },
    {
      number: "4",
      title: "Dapatkan API Key / Security Key",
      desc: "Gunakan API Key dari halaman aplikasi untuk mulai pengujian.",
    },
    {
      number: "5",
      title: "Generate Token & Signature",
      desc: "Gunakan endpoint autentikasi dan signature jika diperlukan.",
    },
    {
      number: "6",
      title: "Lakukan Pengujian API",
      desc: "Lakukan uji coba ke endpoint API melalui Sandbox/Docs.",
    },
  ];

  return (
    <div className="bg-white min-h-screen px-4 md:px-8 py-16 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold text-[#27447C] mb-6"
        >
          Panduan Proses Integrasi APImu
        </motion.h1>
        <p className="text-lg text-gray-600 mb-12">
          Pelajari langkah-langkah untuk mulai menggunakan layanan API kami dan
          kembangkan bisnismu lebih cepat.
        </p>

        <div className="space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#27447C] text-white flex items-center justify-center font-semibold text-lg">
                {step.number}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#27447C]">
                  {step.title}
                </h2>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <p className="text-xl font-semibold text-center mb-6">
            Jadilah mitra kami dan siap integrasi bisnis lebih baik
          </p>
          <Link
            href="/docs"
            className="inline-flex items-center px-6 py-3 bg-[#27447C] text-white rounded-xl hover:bg-[#1A335F] transition gap-2 shadow-md"
          >
            Daftar API Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
