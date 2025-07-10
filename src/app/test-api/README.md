# Test API - PKS Middleware

## Overview

Halaman Test API dilindungi dengan middleware PKS (Perjanjian Kerja Sama) yang memastikan hanya pengguna dengan PKS yang disetujui yang dapat mengakses fitur testing API.

## Sistem Middleware PKS

### Status PKS yang Didukung

1. **Belum Diajukan** (`no_submission`)
   - User belum pernah mengajukan PKS
   - Akan diarahkan ke halaman pengajuan PKS
   - Tidak dapat mengakses Test API

2. **Sedang Diproses** (`PENDING`)
   - PKS telah diajukan dan sedang dalam review admin
   - Akan diarahkan ke halaman status pengajuan
   - Tidak dapat mengakses Test API

3. **Ditolak** (`REJECTED`)
   - PKS telah ditolak oleh admin
   - Akan diarahkan ke halaman pengajuan ulang PKS
   - Tidak dapat mengakses Test API

4. **Disetujui** (`APPROVED`)
   - PKS telah disetujui oleh admin
   - Dapat mengakses Test API secara penuh

### Komponen yang Terlibat

#### 1. `ProtectedTestApi` Component
- **Lokasi**: `frontend/src/app/test-api/components/ProtectedTestApi.tsx`
- **Fungsi**: Middleware utama yang mengecek status PKS user
- **Logika**: 
  - Fetch data PKS user dari backend
  - Cek status PKS terbaru
  - Tampilkan UI sesuai status
  - Redirect ke halaman yang sesuai

#### 2. `usePKSStatus` Hook
- **Lokasi**: `frontend/src/hooks/usePKSStatus.ts`
- **Fungsi**: Hook untuk mengecek status PKS user
- **Return Value**:
  ```typescript
  {
    pksData: PKS[],
    loading: boolean,
    error: string | null,
    status: PKSStatus,
    latestPKS: PKS | null,
    refetch: () => void
  }
  ```

#### 3. `PKSStatusBadge` Component
- **Lokasi**: `frontend/src/components/shared/PKSStatusBadge.tsx`
- **Fungsi**: Menampilkan badge status PKS di UI
- **Penggunaan**: Header dropdown menu

### Flow Akses Test API

```
User Login → Cek PKS Status → Decision
    ↓
┌─────────────────────────────────────┐
│ Status PKS                         │
├─────────────────────────────────────┤
│ no_submission → Redirect ke        │
│                /pengajuan-pks      │
├─────────────────────────────────────┤
│ PENDING → Redirect ke              │
│          /pengajuan-saya           │
├─────────────────────────────────────┤
│ REJECTED → Redirect ke             │
│           /pengajuan-pks           │
├─────────────────────────────────────┤
│ APPROVED → Akses Test API          │
└─────────────────────────────────────┘
```

### API Endpoint yang Digunakan

- **GET** `/api/pks?userId={userId}`
  - Mengambil data PKS user
  - Requires authentication token
  - Returns array of PKS objects

### Middleware Next.js

Halaman `/test-api` telah ditambahkan ke dalam middleware Next.js untuk memastikan hanya user yang terautentikasi yang dapat mengakses halaman ini.

**File**: `frontend/middleware.ts`
```typescript
const protectedRoutes = [
  "/docs",
  "/pengajuan-saya", 
  "/pengajuan-pks",
  "/admin",
  "/test-api", // ← Ditambahkan
];
```

### Error Handling

1. **Network Error**: Menampilkan pesan error dan tombol retry
2. **Unauthorized**: Redirect ke halaman login
3. **Token Expired**: Logout dan redirect ke login
4. **Server Error**: Tampilkan pesan error generik

### UI/UX Features

1. **Loading State**: Skeleton loading saat fetch data
2. **Status Badge**: Visual indicator di header
3. **Clear Messaging**: Pesan yang jelas untuk setiap status
4. **Action Buttons**: Tombol yang relevan untuk setiap status
5. **Responsive Design**: Works on mobile dan desktop

### Testing

Untuk testing sistem ini, Anda dapat:

1. **Test sebagai user baru**: Pastikan diarahkan ke pengajuan PKS
2. **Test dengan PKS pending**: Pastikan tidak bisa akses Test API
3. **Test dengan PKS rejected**: Pastikan diarahkan untuk ajukan ulang
4. **Test dengan PKS approved**: Pastikan bisa akses Test API

### Security Considerations

1. **Authentication Required**: Semua request memerlukan valid token
2. **Authorization Check**: Hanya user dengan PKS approved yang dapat akses
3. **Token Validation**: Automatic logout jika token expired
4. **Server-side Validation**: Backend juga memvalidasi status PKS

### Future Enhancements

1. **Real-time Updates**: WebSocket untuk update status PKS real-time
2. **Email Notifications**: Notifikasi email saat status PKS berubah
3. **Audit Log**: Log semua akses ke Test API
4. **Rate Limiting**: Batasi request API berdasarkan status PKS 