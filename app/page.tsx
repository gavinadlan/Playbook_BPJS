"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Section 1: Hero (Full Screen) */}
      <section className="min-h-screen flex items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-[#27447C] mb-6">
            Platform API BPJS Kesehatan
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Selamat datang di platform API BPJS Kesehatan. Temukan alat,
            dokumentasi, dan panduan lengkap untuk mengintegrasikan layanan
            asuransi kesehatan nasional Indonesia ke aplikasi Anda.
          </p>
          <div className="space-x-4">
            <Link
              href="/fitur-api"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Fitur API
            </Link>
            <Link
              href="/docs"
              className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Dokumentasi
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Kenapa Memilih */}
      <section className="py-24 px-4 text-center bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">
            Kenapa Memilih API BPJS Kesehatan?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Dengan API BPJS Kesehatan, pengembang dapat mengakses berbagai
            layanan dan data terkait sistem asuransi kesehatan nasional yang
            siap diintegrasikan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#27447C] mb-4">
                Mudah Digunakan
              </h3>
              <p className="text-gray-600">
                API kami dirancang agar mudah dipahami dan cepat
                diimplementasikan.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#27447C] mb-4">
                Dokumentasi Lengkap
              </h3>
              <p className="text-gray-600">
                Kami menyediakan dokumentasi dan contoh penggunaan untuk semua
                endpoint.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#27447C] mb-4">
                Dukungan Developer
              </h3>
              <p className="text-gray-600">
                Tim kami siap membantu kendala teknis Anda selama integrasi
                berlangsung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cara Memulai */}
      <section className="py-24 px-4 text-center bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Cara Memulai</h2>
          <p className="text-lg text-gray-600 mb-10">
            Ikuti langkah-langkah berikut untuk mulai menggunakan API BPJS
            Kesehatan.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/docs"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Lihat Dokumentasi
            </Link>
            <Link
              href="/docs/authentication"
              className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Panduan Autentikasi
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Kontak */}
      <section className="py-24 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">Hubungi Kami</h2>
          <p className="text-lg text-gray-600 mb-10">
            Jika Anda memiliki pertanyaan atau membutuhkan bantuan teknis,
            jangan ragu untuk menghubungi kami.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md inline-block text-left">
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Email:</span>{" "}
              api-support@bpjs-kesehatan.go.id
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Telepon:</span> +62 21 424-6063
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Jam Dukungan:</span> Senin–Jumat,
              08:00–16:00 WIB
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
