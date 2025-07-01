# Test API Page

Halaman ini menyediakan interface untuk testing API BPJS Kesehatan secara langsung menggunakan Swagger UI.

## Fitur

### 1. Swagger UI Integration
- Menampilkan dokumentasi API dari file YAML yang ada di `public/api-docs/`
- Mendukung testing langsung endpoint API
- Interface yang interaktif dan user-friendly

### 2. API Service Selection
- Sidebar untuk memilih layanan API yang berbeda
- Status indicator untuk setiap layanan (Active/Inactive)
- Deskripsi singkat untuk setiap layanan

### 3. API Information
- Informasi detail tentang API yang dipilih
- Base URL yang dapat di-copy
- Statistik endpoint dan versi

### 4. API Statistics
- Dashboard statistik API
- Informasi uptime dan response time
- Status layanan secara real-time

## Struktur File

```
src/app/test-api/
├── page.tsx                 # Halaman utama test API
├── swagger-custom.css       # Custom styling untuk Swagger UI
├── README.md               # Dokumentasi ini
└── components/
    ├── ApiInfoCard.tsx     # Komponen untuk menampilkan info API
    └── ApiStats.tsx        # Komponen untuk menampilkan statistik
```

## Penggunaan

### Menambahkan Layanan API Baru

1. Tambahkan file YAML di `public/api-docs/services/`
2. Update array `apiServices` di `page.tsx`:

```typescript
const apiServices: ApiService[] = [
  {
    name: 'NamaLayanan',
    file: '/api-docs/services/namalayanan.yaml',
    description: 'Deskripsi layanan',
    status: 'active' // atau 'inactive'
  }
];
```

### Customizing Swagger UI

Untuk mengubah tampilan Swagger UI, edit file `swagger-custom.css`. File ini berisi:
- Custom styling untuk operation blocks
- Warna dan typography yang sesuai dengan tema aplikasi
- Responsive design untuk mobile

### Menambahkan Komponen Baru

1. Buat komponen baru di folder `components/`
2. Import dan gunakan di `page.tsx`
3. Pastikan komponen mengikuti design system yang ada

## Dependencies

- `swagger-ui-react`: Untuk menampilkan Swagger UI
- `swagger-ui-dist`: CSS dan assets untuk Swagger UI
- `@/components/ui/*`: Komponen UI dari design system

## API Endpoints

Halaman ini membaca file YAML dari:
- `public/api-docs/bpjs-kesehatan.yaml` (file utama)
- `public/api-docs/services/*.yaml` (layanan individual)
- `public/api-docs/components/*.yaml` (komponen shared)

## Development

### Menjalankan Development Server

```bash
npm run dev
```

Kemudian buka `http://localhost:3000/test-api`

### Build untuk Production

```bash
npm run build
```

## Troubleshooting

### Swagger UI Tidak Muncul
1. Pastikan file YAML ada di folder `public/api-docs/`
2. Periksa console browser untuk error
3. Pastikan URL file YAML benar

### Styling Tidak Sesuai
1. Periksa file `swagger-custom.css`
2. Pastikan CSS di-import dengan benar
3. Clear browser cache

### Error Loading YAML
1. Periksa format YAML file
2. Pastikan file dapat diakses via HTTP
3. Periksa CORS settings jika diperlukan 