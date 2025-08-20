# Playbook_BPJS

Frontend untuk **API Playbook BPJS Kesehatan** — sebuah platform dokumentasi dan interaksi API modern.

## ✨ Fitur Utama

- 📚 **Kategori API Terstruktur**: Authentication, Members, Claims, Providers
- 🔐 **Fitur Autentikasi Lengkap**:
  - Login untuk admin/mitra
  - Register akun mitra
  - Verifikasi email via token (aktivasi akun)
  - Lupa password + reset password via token
- 📄 **Form Pengajuan PKS** (Perjanjian Kerja Sama) setelah login
- ⚡ **Animasi halus** menggunakan Framer Motion
- 🎨 **UI modern dan responsif** dengan shadcn/ui + Tailwind CSS
- 🧭 **Komponen interaktif** berbasis Radix UI
- 🧩 **Komponen reusable**: Dialog, Accordion, Tabs, Tooltip, Toast, dsb.
- 🔍 **Pencarian cepat** & dokumentasi kode (dengan react-syntax-highlighter)
- 🌐 **Switch bahasa** (multibahasa: Indonesia / Inggris)

## 🧱 Tech Stack

### Frontend

- **Next.js 15.3.2 (App Router)**
- **React 18 + TypeScript**
- **Tailwind CSS 3 + Tailwind CSS Animate**
- **shadcn/ui** (dibangun di atas Radix UI)
- **Framer Motion** (animasi interaktif)
- **React Hook Form** + **Zod** (validasi form)
- **Lucide-react** (ikon modern)
- **Styled Components** (styling fleksibel tambahan)
- **Embla Carousel**, **React Resizable Panels** (komponen UI tambahan)
- **React Syntax Highlighter** (dokumentasi kode)
- **Sonner** (toast notification)

### Backend (Terhubung)

- **Node.js + Express**
- **PostgreSQL**
- **Email Service (SMTP)** untuk kirim token
- **Token Verifikasi (JWT / UUID)** untuk aktivasi akun & reset password
- **Role-based Auth** (admin/mitra)

## 🚀 Cara Menjalankan

1. Clone repo:
   ```bash
   git clone https://github.com/username/Playbook_BPJS.git
   cd Playbook_BPJS/frontend
   ```
