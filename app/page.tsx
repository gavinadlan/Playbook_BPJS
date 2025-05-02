"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  BookOpen,
  LockKeyhole,
  LifeBuoy,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Mudah Digunakan",
      icon: <ChevronRight className="w-6 h-6 text-[#27447C]" />,
      description:
        "API kami dirancang agar mudah dipahami dan cepat diimplementasikan.",
    },
    {
      title: "Dokumentasi Lengkap",
      icon: <BookOpen className="w-6 h-6 text-[#27447C]" />,
      description:
        "Kami menyediakan dokumentasi dan contoh penggunaan untuk semua endpoint.",
    },
    {
      title: "Dukungan Developer",
      icon: <LifeBuoy className="w-6 h-6 text-[#27447C]" />,
      description:
        "Tim kami siap membantu kendala teknis Anda selama integrasi berlangsung.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#27447C]/5 to-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#27447C] mb-6 leading-tight">
            Platform API Resmi <br />
            <span className="text-[#27447C]">BPJS Kesehatan</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Integrasikan layanan asuransi kesehatan nasional Indonesia ke
            aplikasi Anda dengan API yang andal dan terpercaya.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fitur-api"
              className="inline-flex items-center px-8 py-4 bg-[#27447C] text-white rounded-xl hover:bg-[#1A335F] transition-colors gap-2 shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
              <span className="font-semibold">Jelajahi Fitur API</span>
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center px-8 py-4 border-2 border-[#27447C] text-[#27447C] rounded-xl hover:bg-[#27447C]/10 transition-colors gap-2 shadow-sm hover:shadow-md"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">Baca Dokumentasi</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#27447C] mb-4">
              Keunggulan Platform Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Solusi terintegrasi untuk pengembangan aplikasi kesehatan berbasis
              BPJS Kesehatan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#27447C]/20"
              >
                <div className="w-12 h-12 bg-[#27447C]/10 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#27447C] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-24 px-4 bg-[#27447C]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Mulai Integrasi Sekarang
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Bergabunglah dengan ratusan developer yang sudah menggunakan API
              kami
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center px-8 py-4 bg-white text-[#27447C] rounded-xl hover:bg-opacity-90 transition-all gap-2 shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Dokumentasi API</span>
              </Link>
              <Link
                href="/docs/authentication"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-colors gap-2"
              >
                <LockKeyhole className="w-5 h-5" />
                <span className="font-semibold">Panduan Keamanan</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#27447C] mb-4">
              Butuh Bantuan?
            </h2>
            <p className="text-lg text-gray-600">
              Tim support kami siap membantu Anda 24/7
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-[#27447C]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#27447C] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      api-support@bpjs-kesehatan.go.id
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#27447C] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Telepon
                    </h3>
                    <p className="text-gray-600">+62 21 424-6063</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#27447C] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Jam Operasional
                    </h3>
                    <p className="text-gray-600">
                      Senin-Jumat, 08:00 - 16:00 WIB
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#27447C]/5 rounded-xl p-6 border border-[#27447C]/10">
                <h3 className="text-lg font-semibold text-[#27447C] mb-4">
                  Kirim Pesan Langsung
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full px-4 py-3 rounded-lg border border-[#27447C]/20 focus:ring-2 focus:ring-[#27447C] outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg border border-[#27447C]/20 focus:ring-2 focus:ring-[#27447C] outline-none"
                  />
                  <textarea
                    placeholder="Pesan Anda"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-[#27447C]/20 focus:ring-2 focus:ring-[#27447C] outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#27447C] text-white py-3 rounded-lg hover:bg-[#1A335F] transition-colors"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
