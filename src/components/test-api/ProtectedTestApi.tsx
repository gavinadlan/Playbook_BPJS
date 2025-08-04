'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert-dialog';
import { Info, Lock, LogIn, FileText, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { usePKSStatus } from '@/hooks/usePKSStatus';

interface ProtectedTestApiProps {
  children: React.ReactNode;
}

export default function ProtectedTestApi({ children }: ProtectedTestApiProps) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const { status: pksStatus, loading: pksLoading, pksData } = usePKSStatus();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Debug log
  if (typeof window !== 'undefined') {
    console.log('[PKS DEBUG] user:', user);
    console.log('[PKS DEBUG] isAdmin:', isAdmin);
    console.log('[PKS DEBUG] pksData:', pksData);
    console.log('[PKS DEBUG] pksStatus:', pksStatus);
  }

  if (isLoading || pksLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-600" />
              Akses Terbatas
            </CardTitle>
            <CardDescription>
              Halaman Test API hanya dapat diakses oleh pengguna yang telah login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Anda harus login terlebih dahulu untuk mengakses halaman Test API
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/login')}
              className="w-full"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login Sekarang
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dapat langsung mengakses Test API tanpa perlu PKS
  if (isAdmin) {
    return <>{children}</>;
  }

  // Cek status PKS hanya untuk user non-admin
  if (pksStatus === 'no_submission' || !pksData || pksData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              PKS Belum Diajukan
            </CardTitle>
            <CardDescription>
              Anda harus mengajukan PKS terlebih dahulu untuk mengakses Test API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Untuk mengakses Test API, Anda perlu mengajukan PKS (Perjanjian Kerja Sama) terlebih dahulu.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/pengajuan-pks')}
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Ajukan PKS Sekarang
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pksStatus === 'PENDING') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              PKS Sedang Diproses
            </CardTitle>
            <CardDescription>
              PKS Anda sedang dalam proses review oleh admin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                PKS Anda sedang dalam proses review. Anda akan dapat mengakses Test API setelah PKS disetujui.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/pengajuan-saya')}
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Lihat Status PKS
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pksStatus === 'REJECTED') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              PKS Ditolak
            </CardTitle>
            <CardDescription>
              PKS Anda telah ditolak oleh admin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                PKS Anda telah ditolak. Silakan ajukan ulang PKS dengan informasi yang benar.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/pengajuan-pks')}
              className="w-full"
            >
              <FileText className="h-4 w-4 mr-2" />
              Ajukan Ulang PKS
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Jika PKS APPROVED, tampilkan konten
  if (pksStatus === 'APPROVED') {
    return <>{children}</>;
  }

  // Fallback untuk status yang tidak dikenal
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-600" />
            Akses Terbatas
            </CardTitle>
          <CardDescription>
            Terjadi kesalahan dalam memverifikasi status PKS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Silakan coba lagi atau hubungi administrator.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => router.push('/')}
            className="w-full"
          >
            Kembali ke Beranda
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 