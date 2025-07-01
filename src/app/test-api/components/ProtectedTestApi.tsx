'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert-dialog';
import { Info, Lock, LogIn } from 'lucide-react';

interface ProtectedTestApiProps {
  children: React.ReactNode;
}

export default function ProtectedTestApi({ children }: ProtectedTestApiProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
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

  return <>{children}</>;
} 