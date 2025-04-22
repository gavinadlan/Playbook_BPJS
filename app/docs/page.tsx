import Link from "next/link";
import { ChevronRight, BookOpen, Code, Database, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Dokumentasi API</h1>
          <p className="text-lg text-gray-600">
            Selamat datang di dokumentasi API BPJS Kesehatan. Di sini Anda akan
            menemukan panduan lengkap dan materi referensi untuk membantu Anda
            mengintegrasikan platform kami.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>Dokumentasi</span>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Memulai</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="h-8 w-8 rounded-md bg-blue-50 p-1.5 mb-2">
                    <BookOpen className="h-full w-full text-blue-600" />
                  </div>
                  <CardTitle>Pengenalan</CardTitle>
                  <CardDescription>
                    Pelajari tentang API BPJS Kesehatan, bagaimana cara
                    kerjanya, dan apa yang dapat Anda bangun dengan itu.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/introduction" passHref>
                    <Button
                      variant="ghost"
                      className="flex justify-between w-full"
                    >
                      Baca Panduan
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="h-8 w-8 rounded-md bg-blue-50 p-1.5 mb-2">
                    <Code className="h-full w-full text-blue-600" />
                  </div>
                  <CardTitle>Autentikasi</CardTitle>
                  <CardDescription>
                    Pelajari bagaimana cara mengautentikasi permintaan Anda ke
                    API BPJS Kesehatan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/authentication/login" passHref>
                    <Button
                      variant="ghost"
                      className="flex justify-between w-full"
                    >
                      Lihat Autentikasi
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Referensi API</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="h-8 w-8 rounded-md bg-blue-50 p-1.5 mb-2">
                    <Server className="h-full w-full text-blue-600" />
                  </div>
                  <CardTitle>Anggota</CardTitle>
                  <CardDescription>
                    Kelola informasi dan status anggota
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/members/get-member" passHref>
                    <Button
                      variant="ghost"
                      className="flex justify-between w-full"
                    >
                      Lihat Endpoints
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="h-8 w-8 rounded-md bg-blue-50 p-1.5 mb-2">
                    <Database className="h-full w-full text-blue-600" />
                  </div>
                  <CardTitle>Klaim</CardTitle>
                  <CardDescription>
                    Kirim dan lacak klaim kesehatan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/claims/submit-claim" passHref>
                    <Button
                      variant="ghost"
                      className="flex justify-between w-full"
                    >
                      Lihat Endpoints
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="h-8 w-8 rounded-md bg-blue-50 p-1.5 mb-2">
                    <Server className="h-full w-full text-blue-600" />
                  </div>
                  <CardTitle>Penyedia</CardTitle>
                  <CardDescription>
                    Akses informasi penyedia layanan kesehatan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/docs/providers/list-providers" passHref>
                    <Button
                      variant="ghost"
                      className="flex justify-between w-full"
                    >
                      Lihat Endpoints
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Sumber Daya Pengembang</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-md bg-blue-50 p-2 flex-shrink-0">
                      <Code className="h-full w-full text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Contoh Kode</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Temukan potongan kode dan contoh dalam berbagai bahasa
                        pemrograman
                      </p>
                      <Link
                        href="/docs/examples"
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Jelajahi Contoh
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-md bg-blue-50 p-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full text-blue-600"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M4 8h16" />
                        <path d="M6 12h4" />
                        <path d="M14 12h4" />
                        <path d="M6 16h4" />
                        <path d="M14 16h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Status API</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Periksa status terkini dari API dan layanan-layanannya
                      </p>
                      <Link
                        href="/docs/status"
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Lihat Status
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-md bg-blue-50 p-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full text-blue-600"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">FAQ</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Temukan jawaban untuk pertanyaan yang sering diajukan
                      </p>
                      <Link
                        href="/docs/faq"
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Baca FAQ
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-md bg-blue-50 p-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-full w-full text-blue-600"
                      >
                        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dukungan</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Dapatkan bantuan dari tim dukungan pengembang kami
                      </p>
                      <Link
                        href="/docs/support"
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Hubungi Dukungan
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
