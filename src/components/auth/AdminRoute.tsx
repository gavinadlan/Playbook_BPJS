"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/components/ui/sonner";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (!isAdmin) {
      router.push("/");
      toast.error(
        "Akses ditolak: Hanya admin yang dapat mengakses halaman ini"
      );
    }
  }, [user, isAdmin, router]);

  if (!user || !isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Memeriksa akses...</p>
      </div>
    );
  }

  return <>{children}</>;
}
