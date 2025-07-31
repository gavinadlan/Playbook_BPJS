# Dokumentasi Components

Struktur component yang telah di-refactor untuk halaman dokumentasi teknis BPJS Kesehatan.

## Struktur Component

```
src/components/dokumentasi/
├── index.ts                    # Export semua component
├── README.md                   # Dokumentasi ini
├── DokumentasiHeader.tsx       # Header halaman dokumentasi
├── DokumentasiSection.tsx      # Section untuk setiap layanan
├── DecryptSection.tsx          # Section khusus decrypt
├── CodeBlock.tsx              # Block kode dengan language selector
└── CopyButton.tsx             # Tombol copy untuk kode
```

## Component Breakdown

### 1. DokumentasiHeader
- **Fungsi**: Header utama halaman dokumentasi
- **Props**: `title`, `description`, `backUrl`, `backText`
- **Fitur**: Navigasi kembali, judul, dan deskripsi

### 2. DokumentasiSection
- **Fungsi**: Section untuk setiap layanan BPJS (VClaim, PCare, dll)
- **Props**: `doc` (BpjsDocSection)
- **Fitur**: 
  - Required Headers
  - Signature Formula
  - Authorization Formula
  - Code examples dengan copy button

### 3. DecryptSection
- **Fungsi**: Section khusus untuk decrypt response
- **Props**: `doc` (BpjsDocSection)
- **Fitur**: Decrypt formula dan contoh kode decrypt

### 4. CodeBlock
- **Fungsi**: Block kode dengan language selector dan copy button
- **Props**: `title`, `stepNumber`, `examples`, `className`
- **Fitur**: 
  - Language selector (Java, PHP, C#, dll)
  - Copy button dengan feedback visual
  - Syntax highlighting

### 5. CopyButton
- **Fungsi**: Tombol copy untuk kode
- **Props**: `text`, `className`
- **Fitur**: 
  - Copy ke clipboard
  - Icon feedback (Copy → Check)
  - Error handling

## Keuntungan Refactoring

### ✅ **Maintainability**
- Setiap component memiliki tanggung jawab spesifik
- Mudah untuk update atau fix bug
- Kode lebih terorganisir

### ✅ **Reusability**
- Component dapat digunakan di halaman lain
- CopyButton bisa digunakan di seluruh aplikasi
- CodeBlock bisa untuk dokumentasi lain

### ✅ **Readability**
- Main page hanya 30 baris (dari 429 baris)
- Setiap component mudah dipahami
- Separation of concerns yang jelas

### ✅ **Type Safety**
- Menggunakan type dari `BpjsDocSection`
- Interface yang konsisten
- TypeScript error handling

## Usage Example

```tsx
import { 
  DokumentasiHeader, 
  DokumentasiSection, 
  DecryptSection 
} from "@/components/dokumentasi";

// Main page menjadi sangat sederhana
export default function DokumentasiPage() {
  return (
    <div>
      <DokumentasiHeader 
        title="Judul Dokumentasi"
        description="Deskripsi dokumentasi"
        backUrl="/panduan"
        backText="Kembali ke Panduan"
      />
      
      <DokumentasiSection doc={vclaimDoc} />
      <DecryptSection doc={decryptDoc} />
    </div>
  );
}
```

## Fitur Copy Button

Setiap blok kode sekarang memiliki:
- ✅ Tombol copy di pojok kanan atas
- ✅ Icon visual (Copy → Check)
- ✅ Feedback 2 detik setelah copy
- ✅ Error handling untuk clipboard
- ✅ Hover effects dan transitions 