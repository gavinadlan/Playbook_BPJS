"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";

export const useAdminAuth = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // mounted loading
    if (!isMounted || isLoading) return;

    if (!user) {
      router.push("/login");
    } else if (!isAdmin) {
      router.push("/");
      toast.error(
        "Akses ditolak: Hanya admin yang dapat mengakses halaman ini"
      );
    }

    setChecking(false);
  }, [user, isAdmin, isLoading, isMounted, router]);

  return {
    user,
    isAdmin,
    checking: !isMounted || isLoading || checking,
  };
};
