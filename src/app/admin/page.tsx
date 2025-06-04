"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPksPage() {
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
      <h1 className="text-2xl font-bold mb-4">Halaman Admin PKS</h1>
      <p className="text-muted-foreground">Ini adalah halaman khusus admin</p>
    </div>
  );
}
