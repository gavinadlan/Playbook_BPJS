"use client";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Lock,
  ShieldCheck,
  UserPlus,
  MailCheck,
  LogIn,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PanduanPage() {
  const steps = [
    {
      number: "1",
      title: "Registrasi Akun",
      desc: "Buat akun baru jika Anda belum memiliki akun.",
      icon: <UserPlus className="w-8 h-8 text-[#27447C]" />,
    },
    {
      number: "2",
      title: "Verifikasi Email",
      desc: "Cek email Anda dan lakukan verifikasi untuk mengaktifkan akun.",
      icon: <MailCheck className="w-8 h-8 text-[#27447C]" />,
    },
    {
      number: "3",
      title: "Login ke Aplikasi",
      desc: "Masuk ke aplikasi menggunakan email dan password yang sudah diverifikasi.",
      icon: <LogIn className="w-8 h-8 text-[#27447C]" />,
    },
    {
      number: "4",
      title: "Ajukan PKS",
      desc: "Ajukan Perjanjian Kerja Sama (PKS) melalui menu pengajuan PKS.",
      icon: <FileText className="w-8 h-8 text-[#27447C]" />,
    },
    {
      number: "5",
      title: "Tunggu Persetujuan PKS",
      desc: "Admin akan memverifikasi dan menyetujui PKS Anda dalam 1-3 hari kerja.",
      icon: <ShieldCheck className="w-8 h-8 text-[#27447C]" />,
    },
    {
      number: "6",
      title: "Pelajari Dokumentasi Teknis",
      desc: "Pelajari panduan teknis untuk signature, authorization, dan decrypt response.",
      icon: <FileText className="w-8 h-8 text-[#27447C]" />,
    },
    {
      number: "7",
      title: "Akses API",
      desc: "Setelah PKS disetujui, Anda dapat mengakses API di menu Test API.",
      icon: <Lock className="w-8 h-8 text-[#27447C]" />,
    },
  ];

  // Animation variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  // Use string for 'ease' to fix framer-motion type error
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EFF4FB] px-4 md:px-8 py-16 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#27447C] mb-4">
            Panduan Penggunaan Aplikasi & Integrasi API
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ikuti langkah-langkah berikut untuk mulai menggunakan aplikasi dan mengintegrasikan sistem Anda dengan API kami.
          </p>
        </div>

        {/* Persyaratan Akses API Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg border border-[#E5E7EB]">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-lg text-[#27447C] border border-blue-100">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Persyaratan Akses API
            </h2>
          </div>

          <p className="text-gray-600 mb-8">
            Untuk dapat mengakses API, Anda wajib memiliki Perjanjian Kerja Sama (PKS) yang aktif. Proses verifikasi PKS membutuhkan waktu 1-3 hari kerja setelah dokumen PKS diajukan dan diterima oleh admin.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-blue-50">
              <h3 className="font-semibold text-lg mb-4 text-[#27447C]">
                Dokumen yang Dibutuhkan
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Perjanjian Kerja Sama (PKS)
                </li>
              </ul>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-blue-50">
              <h3 className="font-semibold text-lg mb-4 text-[#27447C]">
                Alur Pengajuan PKS
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    1
                  </span>
                  Upload dokumen PKS melalui menu pengajuan PKS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    2
                  </span>
                  Tunggu proses verifikasi dan persetujuan dari admin
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

        {/* Dokumentasi Teknis Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-lg border border-[#E5E7EB]">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-50 rounded-lg text-[#49A35A] border border-green-100">
              <FileText className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Dokumentasi Teknis
            </h2>
          </div>

          <p className="text-gray-600 mb-8">
            Setelah PKS disetujui, Anda akan membutuhkan dokumentasi teknis untuk mengintegrasikan API dengan sistem Anda. Dokumentasi ini mencakup panduan lengkap untuk signature, authorization, dan decrypt response.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-green-50">
              <h3 className="font-semibold text-lg mb-3 text-[#49A35A]">
                Signature Generation
              </h3>
              <p className="text-gray-600 text-sm">
                Panduan lengkap untuk membuat signature yang diperlukan untuk autentikasi API request.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-green-50">
              <h3 className="font-semibold text-lg mb-3 text-[#49A35A]">
                Authorization Header
              </h3>
              <p className="text-gray-600 text-sm">
                Cara membuat header authorization yang valid untuk mengakses endpoint API.
              </p>
            </div>

            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-green-50">
              <h3 className="font-semibold text-lg mb-3 text-[#49A35A]">
                Response Decrypt
              </h3>
              <p className="text-gray-600 text-sm">
                Panduan untuk mendecrypt response yang terenkripsi dari API BPJS Kesehatan.
              </p>
            </div>
          </div>

          <Link
            href="/panduan/dokumentasi"
            className="inline-flex items-center px-6 py-3 bg-[#49A35A] text-white rounded-lg hover:bg-[#3A7A4D] transition gap-2 shadow-md font-medium"
          >
            Lihat Dokumentasi Teknis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Creative Timeline Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB]">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
            Langkah-langkah Penggunaan Aplikasi & Integrasi API
          </h2>

          {/* Timeline Desktop */}
          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#27447C] to-[#3A5D9C] -translate-x-1/2 hidden md:block z-0" />
            {/* Steps Container */}
            <div className="space-y-16 md:space-y-24">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  variants={itemVariants}
                >
                  {/* Step Content */}
                  <div className={`w-full md:w-2/5 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="bg-white border-2 border-[#27447C] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border-2 border-[#27447C]">
                            {step.icon}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#27447C] mb-1">LANGKAH {step.number}</div>
                          <h3 className="text-xl font-bold text-[#27447C] mb-2">{step.title}</h3>
                          <p className="text-gray-700">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Timeline Point - perfectly center on the line */}
                  <div className="hidden md:block w-1/5 relative z-10">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2">
                      <div className="w-8 h-8 rounded-full bg-white border-4 border-[#27447C] flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#27447C]" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-1 h-16 bg-gradient-to-b from-[#27447C] to-[#3A5D9C] mx-auto" />
                      )}
                    </div>
                  </div>
                  {/* Empty Space for Zigzag */}
                  <div className="hidden md:block w-2/5" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="mt-16 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/test-api"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#27447C] to-[#3A5D9C] text-white rounded-xl hover:opacity-90 transition gap-3 shadow-lg font-medium"
              >
                Mulai Integrasi API
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/panduan/dokumentasi"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#49A35A] to-[#3A7A4D] text-white rounded-xl hover:opacity-90 transition gap-3 shadow-lg font-medium"
              >
                Dokumentasi Teknis
                <FileText className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Lihat panduan teknis untuk signature, authorization, dan decrypt response
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}