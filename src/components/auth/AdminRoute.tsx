"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!isAdmin) {
      router.push("/");
      toast.error(
        "Akses ditolak: Hanya admin yang dapat mengakses halaman ini"
      );
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="p-8 animate-pulse">
        <Skeleton className="w-full h-10 mb-4" />
        <Skeleton className="w-3/4 h-6 mb-2" />
        <Skeleton className="w-1/2 h-6 mb-4" />
        <Skeleton className="w-full h-32 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
