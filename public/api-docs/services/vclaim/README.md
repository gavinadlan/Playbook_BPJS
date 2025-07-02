# VClaim API Documentation

Dokumentasi API VClaim untuk pengelolaan klaim BPJS Kesehatan telah dipecah menjadi beberapa file untuk menghindari error pada Swagger UI akibat file yang terlalu besar.

## Struktur File

### File Utama
- `vclaim.yaml` - File utama yang berisi informasi umum dan contoh endpoint
- `index.yaml` - File index yang menggabungkan semua dokumentasi

### File Terpisah berdasarkan Kategori
- `authentication.yaml` - Header authentication dan signature untuk VClaim
- `lpk.yaml` - Lembar Pengajuan Klaim (LPK)
- `monitoring.yaml` - Monitoring data klaim dan kunjungan
- `peserta.yaml` - Data peserta BPJS Kesehatan
- `prb.yaml` - Pembuatan Rujuk Balik (PRB)
- `rencana-kontrol.yaml` - Pembuatan Rencana Kontrol/SPRI

## Authentication

Semua endpoint memerlukan header authentication:
- `X-cons-id`: Consumer ID dari BPJS Kesehatan
- `X-timestamp`: Generated unix-based timestamp
- `X-signature`: Generated signature dengan pola HMAC-256
- `user_key`: User key untuk akses webservice

## Signature Generation

```javascript
signature = HMAC-SHA256(consId + "&" + timestamp, secretKey)
```

## Decryption

Response yang dienkripsi menggunakan AES-256-CBC dengan:
- Key: 16 karakter pertama dari secretKey
- IV: 16 karakter terakhir dari secretKey

## Endpoint Categories

### 1. Authentication
- Header authentication dan signature untuk VClaim

### 2. LPK (Lembar Pengajuan Klaim)
- Insert LPK
- Update LPK
- Delete LPK
- Data LPK berdasarkan tanggal masuk dan jenis pelayanan

### 3. Monitoring
- Data Kunjungan berdasarkan tanggal SEP dan jenis pelayanan
- Data Klaim berdasarkan tanggal pulang, jenis pelayanan, dan status
- Data Histori Pelayanan Peserta berdasarkan nomor kartu dan rentang tanggal
- Data Klaim Jaminan Jasa Raharja berdasarkan jenis pelayanan dan rentang tanggal

### 4. Peserta
- Data Peserta berdasarkan No.Kartu BPJS
- Data Peserta berdasarkan NIK

### 5. PRB (Program Rujuk Balik)
- Insert PRB
- Update PRB
- Delete PRB
- Pencarian Data PRB berdasarkan Nomor SRB
- Pencarian Data PRB berdasarkan Tanggal SRB

### 6. Rencana Kontrol/SPRI
- Insert Rencana Kontrol
- Update Rencana Kontrol
- Delete Rencana Kontrol
- Insert SPRI
- Update SPRI
- Cari SEP
- Cari Nomor Surat Kontrol
- Data Nomor Surat Kontrol berdasarkan No Kartu
- Data Nomor Surat Kontrol
- Data Poli/Spesialistik
- Data Dokter

## Penggunaan

Untuk menggunakan dokumentasi ini di Swagger UI, gunakan file `vclaim.yaml` yang sudah dioptimasi untuk menghindari error pada browser.

## Server

- Development: `https://apijkn-dev.bpjs-kesehatan.go.id`
- Production: `https://apijkn.bpjs-kesehatan.go.id` 