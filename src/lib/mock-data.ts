
export const FAQ_DATA = [
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
