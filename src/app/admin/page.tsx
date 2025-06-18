"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, FileCheck, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const { isAdmin, user, checking } = useAdminAuth();

  if (checking) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="w-1/3 h-8" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-2/3 h-6" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
          Portal Admin BPJS Kesehatan
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Selamat datang, {user?.name || "Admin"}. Gunakan portal ini untuk
          mengelola sistem secara menyeluruh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-[rgb(39,68,124)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Manajemen User</CardTitle>
            <Users className="h-6 w-6 text-[rgb(39,68,124)]" />
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              Kelola seluruh pengguna sistem, termasuk admin dan mitra BPJS
              Kesehatan.
            </p>
            <Link href="/admin/users" className="text-blue-600 hover:underline">
              Akses Manajemen User →
            </Link>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-[rgb(73,163,90)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Manajemen PKS</CardTitle>
            <FileCheck className="h-6 w-6 text-[rgb(73,163,90)]" />
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              Pantau dan kelola seluruh Perjanjian Kerja Sama (PKS) mitra BPJS
              Kesehatan.
            </p>
            <Link href="/admin/pks" className="text-blue-600 hover:underline">
              Akses Manajemen PKS →
            </Link>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-[rgb(220,38,38)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Dashboard Sistem</CardTitle>
            <LayoutDashboard className="h-6 w-6 text-[rgb(220,38,38)]" />
          </CardHeader>
          <CardContent>
            <p className="mb-3">
              Pantau statistik dan aktivitas terbaru dalam sistem secara
              real-time.
            </p>
            <Link
              href="/admin/dashboard"
              className="text-blue-600 hover:underline"
            >
              Akses Dashboard →
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-[rgb(39,68,124)]">
          Fitur Utama Portal Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Manajemen User</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Lihat daftar semua pengguna sistem</li>
              <li>Verifikasi akun mitra baru</li>
              <li>Kelola peran dan hak akses pengguna</li>
              <li>Nonaktifkan akun yang tidak diperlukan</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Manajemen PKS</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Pantau pengajuan PKS baru</li>
              <li>Verifikasi dokumen perjanjian</li>
              <li>Kelola status persetujuan PKS</li>
              <li>Pantau masa berlaku perjanjian</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Monitoring Sistem</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Statistik penggunaan sistem</li>
              <li>Aktivitas terbaru pengguna</li>
              <li>Log sistem dan audit trail</li>
              <li>Notifikasi penting</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Pengaturan</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Konfigurasi sistem</li>
              <li>Manajemen API keys</li>
              <li>Pengaturan notifikasi</li>
              <li>Backup data</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Portal Admin BPJS Kesehatan</p>
        <p className="mt-1">
          © {new Date().getFullYear()} BPJS Kesehatan. All rights reserved.
        </p>
      </div>
    </div>
  );
}
