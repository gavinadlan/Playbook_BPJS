import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#27447C]">
          Platform API BPJS Kesehatan
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Selamat datang di platform API BPJS Kesehatan. Temukan alat,
          dokumentasi, dan panduan lengkap untuk mengintegrasikan layanan
          asuransi kesehatan nasional.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/fitur-api"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Fitur API
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Dokumentasi
          </Link>
        </div>
      </div>
    </div>
  );
}
