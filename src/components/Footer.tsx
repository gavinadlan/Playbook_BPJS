"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#27447C] text-white py-8 px-4 md:py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-10">
        {/* Kolom Kiri: Logo, Alamat, dan Sosial Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
          <div className="max-w-[300px]">
            <Image
              src="/images/logo-white.svg"
              alt="BPJS Kesehatan"
              width={300}
              height={51.15}
              className="w-full h-auto"
              priority
            />
          </div>
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2">
              Kantor Pusat BPJS Kesehatan
            </h4>
            <p className="text-xs md:text-sm opacity-90 leading-relaxed">
              Jl. Letjen Suprapto Kav. 20 No.14
              <br />
              Jakarta Pusat 10510
              <br />
              Phone: (021) 421 2938
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2 mt-1">
            <p className="font-medium text-sm md:text-base">
              Kunjungi Sosial Media Kami
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="https://www.tiktok.com/@bpjskesehatan_ri?lang=id-ID"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <img
                  src="/images/tiktok.svg"
                  alt="Tiktok"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://web.facebook.com/BPJSKesehatanRI?_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <img
                  src="/images/facebook.svg"
                  alt="Facebook"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://x.com/BPJSKesehatanRI"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <img
                  src="/images/x.svg"
                  alt="Twitter / X"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://www.instagram.com/bpjskesehatan_ri/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <img
                  src="/images/instagram.svg"
                  alt="Instagram"
                  width={40}
                  height={40}
                />
              </a>
              <a
                href="https://www.youtube.com/@BPJSKesehatan_RI"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
              >
                <img
                  src="/images/youtube.svg"
                  alt="YouTube"
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Menu Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm md:grid-cols-3 md:gap-8 text-center md:text-left">
          {/* APIs */}
          <div className="space-y-2">
            <h5 className="font-semibold text-sm md:text-base mb-1">APIs</h5>
            <ul className="space-y-1 opacity-90">
              <li>
                <a href="/fitur-api" className="hover:text-blue-200">
                  Produk API
                </a>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div className="space-y-2">
            <h5 className="font-semibold text-sm md:text-base mb-1">Bantuan</h5>
            <ul className="space-y-1 opacity-90">
              <li>
                <a href="/panduan" className="hover:text-blue-200">
                  panduan
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-blue-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-200">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div className="space-y-2 sm:col-span-2 md:col-span-1">
            <h5 className="font-semibold text-sm md:text-base mb-1">
              Ikuti Kami
            </h5>
            <ul className="space-y-1 opacity-90">
              <li>
                <a
                  href="https://www.bpjs-kesehatan.go.id/#/"
                  target="blank"
                  className="break-words hover:text-blue-200"
                >
                  bpjs-kesehatan.go.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/20">
        <p className="text-xs text-center opacity-80">
          © {new Date().getFullYear()} BPJS Kesehatan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
