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
  Terminal,
  Code2,
  Key,
  Server,
} from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Home() {
  const features = [
    // Existing features...
  ];

  const quickStartSteps = [
    {
      title: "Dapatkan API Key",
      description: "Buat akun developer untuk mendapatkan kredensial API",
      icon: <Key className="w-6 h-6" />,
    },
    {
      title: "Autentikasi",
      description: "Gunakan token Bearer untuk mengakses endpoint",
      icon: <LockKeyhole className="w-6 h-6" />,
    },
    {
      title: "Eksekusi Request",
      description: "Kirim request ke endpoint API kami",
      icon: <Terminal className="w-6 h-6" />,
    },
  ];

  const codeExample = `curl --location 'https://api.bpjs-kesehatan.go.id/v1/peserta' \\
--header 'Authorization: Bearer YOUR_API_KEY' \\
--header 'Content-Type: application/json' \\
--data '{
  "nomorKartu": "0001234567890",
  "nik": "1234560101010001"
}'`;

  return (
    <div className="bg-gradient-to-b from-[#27447C]/5 to-white">
      <section className="min-h-screen flex items-center px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[#27447C] mb-6 leading-tight">
              Integrasikan Layanan Kesehatan Nasional
              <span className="block text-3xl mt-4 text-[#27447C]/80">
                API Resmi BPJS Kesehatan
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Akses data peserta, pembayaran premi, dan layanan kesehatan
              melalui API terintegrasi
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/test-api"
                className="inline-flex items-center px-6 py-3 bg-[#27447C] text-white rounded-lg hover:bg-[#1A335F] gap-2"
              >
                <Terminal className="w-5 h-5" />
                Mulai Integrasi
              </Link>
              <Link
                href="/pengajuan-pks"
                className="inline-flex items-center px-6 py-3 border border-[#27447C] text-[#27447C] rounded-lg hover:bg-[#27447C]/10 gap-2"
              >
                <Key className="w-5 h-5" />
                Dapatkan API Key
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            <div className="bg-[#27447C] p-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-white text-sm">Contoh Request</span>
            </div>
            <SyntaxHighlighter
              language="bash"
              style={atomOneDark}
              customStyle={{ padding: "1.5rem", fontSize: "0.9rem" }}
            >
              {codeExample}
            </SyntaxHighlighter>
          </motion.div>
        </div>
      </section>

      {/* New Quick Start Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#27447C] mb-4">
              Mulai Cepat dalam 3 Langkah
            </h2>
            <p className="text-gray-600">
              Integrasikan API kami dalam hitungan menit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-6 bg-[#27447C]/5 rounded-xl border border-[#27447C]/10"
              >
                <div className="w-12 h-12 bg-[#27447C] rounded-lg flex items-center justify-center mb-4 text-white">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#27447C] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Authentication Section */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#27447C]">
              Autentikasi Aman
            </h2>
            <p className="text-gray-600">
              Gunakan OAuth 2.0 untuk mengamankan integrasi Anda. Dapatkan token
              akses dan refresh token dengan mudah melalui endpoint autentikasi
              kami.
            </p>
            <Link
              href="/test-api"
              className="inline-flex items-center text-[#27447C] font-semibold hover:text-[#1A335F]"
            >
              Pelajari Lebih Lanjut
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <SyntaxHighlighter
              language="javascript"
              style={atomOneDark}
              customStyle={{ padding: "1.5rem", fontSize: "0.9rem" }}
            >
              {`// Contoh Autentikasi dengan Node.js
const getToken = async () => {
  const response = await fetch('https://api.bpjs-kesehatan.go.id/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: 'CLIENT_ID',
      client_secret: 'CLIENT_SECRET',
      grant_type: 'client_credentials'
    })
  });
  return await response.json();
};`}
            </SyntaxHighlighter>
          </div>
        </div>
      </section>
    </div>
  );
}
