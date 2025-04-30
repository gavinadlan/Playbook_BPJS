import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FiturApi() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-12">
        <section>
          <h1 className="text-4xl font-bold mb-6">
            Tentang Platform API BPJS Kesehatan
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Platform API BPJS Kesehatan menyediakan seperangkat alat lengkap
            bagi pengembang untuk mengintegrasikan dengan sistem asuransi
            kesehatan nasional Indonesia. API kami memungkinkan pengembang untuk
            membuat aplikasi yang dapat berinteraksi dengan layanan BPJS
            Kesehatan, meningkatkan penyampaian layanan kesehatan, dan
            memperbaiki pengalaman pasien.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Apakah Anda sedang mengembangkan sistem manajemen rumah sakit,
            aplikasi klinik, atau solusi kesehatan mobile, platform API kami
            menawarkan kemampuan yang Anda perlukan untuk terhubung dengan
            jaringan luas BPJS Kesehatan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Misi Kami</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Kami bertujuan untuk meningkatkan aksesibilitas dan efisiensi
            layanan kesehatan di Indonesia dengan menyediakan solusi API yang
            kuat, andal, dan aman yang menghubungkan penyedia layanan kesehatan,
            sistem asuransi, dan pasien. Melalui platform API kami, kami
            berusaha mendukung tujuan nasional untuk cakupan kesehatan universal
            dengan memungkinkan integrasi yang mulus dengan layanan BPJS
            Kesehatan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Manfaat Platform API</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">
                Untuk Penyedia Layanan Kesehatan
              </h3>
              <ul className="space-y-2 text-gray-600 list-disc ml-5">
                <li>Mempercepat verifikasi pasien</li>
                <li>Menyederhanakan pengajuan klaim dan pelacakan</li>
                <li>Meningkatkan efisiensi administrasi</li>
                <li>Mengurangi pekerjaan kertas dan proses manual</li>
                <li>Akses informasi kelayakan secara real-time</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">
                Untuk Pengembang Perangkat Lunak
              </h3>
              <ul className="space-y-2 text-gray-600 list-disc ml-5">
                <li>API yang komprehensif dan terdokumentasi dengan baik</li>
                <li>Mechanisme autentikasi yang aman</li>
                <li>Endpoint yang konsisten dan dapat diandalkan</li>
                <li>Lingkungan sandbox untuk pengujian</li>
                <li>Dukungan untuk berbagai skenario integrasi</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Cara Memulai</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Dokumentasi kami menyediakan semua informasi yang Anda butuhkan
            untuk mulai mengintegrasikan dengan API BPJS Kesehatan. Mulailah
            dengan menjelajahi referensi API kami, panduan, dan contoh untuk
            memahami bagaimana platform kami dapat memenuhi kebutuhan Anda.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild>
              <Link href="/docs">Lihat Dokumentasi</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/docs/authentication">Panduan Autentikasi</Link>
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Hubungi Kami</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Jika Anda memiliki pertanyaan atau memerlukan bantuan terkait
            platform API kami, tim dukungan pengembang kami siap membantu.
            Hubungi kami melalui saluran berikut:
          </p>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="space-y-3 text-gray-600">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                api-support@bpjs-kesehatan.go.id
              </p>
              <p>
                <span className="font-semibold">Telepon:</span> +62 21 424-6063
              </p>
              <p>
                <span className="font-semibold">Jam Dukungan:</span>{" "}
                Senin-Jumat, 08:00-16:00 WIB
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
