"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronDown, Search } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Bagaimana cara mendaftar akun?",
    answer:
      "Anda bisa mendaftar melalui halaman registrasi dengan mengisi formulir yang tersedia dan verifikasi email.",
  },
  {
    question: "Bagaimana cara reset password?",
    answer:
      "Klik 'Lupa Password' di halaman login dan ikuti instruksi yang dikirim ke email Anda.",
  },
  {
    question: "Apa syarat pengajuan klaim asuransi?",
    answer:
      "Silakan siapkan dokumen identitas, bukti transaksi, dan formulir klaim yang sudah diisi lengkap.",
  },
  {
    question: "Bagaimana cara mendapatkan token akses untuk API BPJS?",
    answer:
      "Anda perlu mengirimkan permintaan POST ke endpoint OAuth2 dengan grant_type 'client_credentials', menggunakan client_id dan client_secret yang telah diberikan.",
  },
  {
    question: "Apa itu resource 'Coverage' dalam integrasi SATUSEHAT?",
    answer:
      "Resource 'Coverage' digunakan untuk merepresentasikan data kepesertaan BPJS Kesehatan dalam format FHIR, termasuk informasi status aktif, jenis kepesertaan, dan identifikasi peserta.",
  },
  {
    question: "Bagaimana cara mengirimkan data klaim ke BPJS melalui API?",
    answer:
      "Data klaim dikirimkan dalam bentuk bundle FHIR yang mencakup resource seperti Claim, Account, ChargeItem, dan Invoice, sesuai dengan alur integrasi yang ditentukan.",
  },
  {
    question: "Apa itu proses purifikasi klaim dalam modul klaim BPJS?",
    answer:
      "Purifikasi klaim adalah proses verifikasi dan validasi klaim yang dilakukan oleh BPJS Kesehatan untuk memastikan kebenaran dan kelengkapan data sebelum klaim disetujui.",
  },
  {
    question: "Bagaimana cara mendapatkan hasil verifikasi klaim dari BPJS?",
    answer:
      "Setelah klaim diverifikasi, hasilnya dapat diakses melalui endpoint ClaimResponse dengan parameter yang sesuai, seperti nomor SEP atau ID klaim.",
  },
  {
    question: "Apa itu resource 'ClaimResponse' dalam integrasi SATUSEHAT?",
    answer:
      "Resource 'ClaimResponse' digunakan untuk merepresentasikan hasil verifikasi klaim dari BPJS Kesehatan, termasuk status klaim dan informasi pembayaran.",
  },
  {
    question: "Bagaimana cara mengirimkan data billing ke BPJS melalui API?",
    answer:
      "Data billing dikirimkan menggunakan resource 'ChargeItem' yang mencakup informasi layanan atau tindakan medis yang diberikan kepada peserta.",
  },
];

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleQuestion = (question: string) => {
    setOpenQuestion((prev) => (prev === question ? null : question));
  };

  const filteredQuestions = FAQ_DATA.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="w-full relative h-96 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://img.freepik.com/free-vector/gradient-faq-banner-template_23-2149382422.jpg"
            alt="FAQ Banner"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto h-full px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Temukan jawaban atas pertanyaan umum seputar layanan dan produk
              kami.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search */}
      <div className="w-full border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
            <h2 className="text-3xl font-bold text-[#27447C]">
              Pertanyaan Populer
            </h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 ring-[#27447C]/50 outline-none transition-all bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-7xl mx-auto px-4 space-y-4 pb-12">
        {filteredQuestions.map(({ question, answer }) => (
          <motion.div layout key={question}>
            <Card
              onClick={() => toggleQuestion(question)}
              className="cursor-pointer overflow-hidden transition-shadow border border-gray-200 hover:shadow-md"
            >
              <motion.div
                layout
                className="p-6 flex items-start justify-between"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {question}
                </h3>
                <ChevronDown
                  className={`ml-4 mt-1 h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    openQuestion === question ? "rotate-180" : ""
                  }`}
                />
              </motion.div>

              <AnimatePresence initial={false}>
                {openQuestion === question && (
                  <motion.div
                    layout
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-gray-600 leading-relaxed"
                  >
                    {answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
