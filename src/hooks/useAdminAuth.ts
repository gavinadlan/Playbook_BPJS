"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";

export const useAdminAuth = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [accessChecked, setAccessChecked] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const checkAccess = useCallback(() => {
    if (isLoading) return false;

    if (!user) {
      if (!redirecting) {
        setRedirecting(true);
        router.push("/login");
      }
      return false;
    }

    if (!isAdmin) {
      if (!redirecting) {
        setRedirecting(true);
        toast.error(
          "Akses ditolak: Hanya admin yang dapat mengakses halaman ini"
        );
        router.push("/");
      }
      return false;
    }

    return true;
  }, [user, isAdmin, isLoading, router, redirecting]);

  useEffect(() => {
    const isValid = checkAccess();

    if (isValid && !accessChecked) {
      setAccessChecked(true);
    }
  }, [checkAccess, accessChecked]);

  return {
    user,
    isAdmin,
    checking: !accessChecked,
  };
};
