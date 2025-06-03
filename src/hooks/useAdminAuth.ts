"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";

export const useAdminAuth = () => {
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

  return { user, isAdmin };
};
