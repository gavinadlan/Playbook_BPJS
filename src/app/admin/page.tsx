"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminPksPage() {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Memeriksa akses...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Halaman Admin PKS</h1>
      <p>Ini adalah halaman khusus admin</p>
    </div>
  );
}
