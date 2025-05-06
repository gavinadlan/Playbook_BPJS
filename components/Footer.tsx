"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#27447C] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Kolom Kiri: Logo dan Alamat */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Image
            src="/images/logo-white.svg"
            alt="BPJS Kesehatan"
            width={300}
            height={51.15}
            className="mb-4"
            priority
          />
          <div>
            <h4 className="text-lg font-semibold">
              BPJS Kesehatan Head Office
            </h4>
            <p className="text-sm opacity-90 leading-relaxed">
              Jl. Letjen Suprapto Kav. 20 No.14
              <br />
              Jakarta Pusat 10510
              <br />
              Phone: (021) 421 2938
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Menu Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-center md:text-left">
          {/* APIs */}
          <div>
            <h5 className="font-semibold text-base mb-2">APIs</h5>
            <ul className="space-y-1 opacity-90">
              <li>
                <a href="#">Produk API</a>
              </li>
              <li>
                <a href="#">Dokumentasi</a>
              </li>
              <li>
                <a href="#">Sandbox</a>
              </li>
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h5 className="font-semibold text-base mb-2">Bantuan</h5>
            <ul className="space-y-1 opacity-90">
              <li>
                <a href="#">Layanan Pengguna</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div>
            <h5 className="font-semibold text-base mb-2">Ikuti Kami</h5>
            <ul className="space-y-1 opacity-90">
              <li>
                <a href="https://www.bpjs-kesehatan.go.id/#/">
                  bpjs-kesehatan.go.id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
