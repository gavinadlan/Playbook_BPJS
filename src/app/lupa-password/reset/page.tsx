"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import Loader from "@/components/ui/loading";
import { ResetPasswordSchema } from "@/lib/schemas";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!token) {
      toast.error("⚠️ Token tidak ditemukan di URL");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("⚠️ Token reset password tidak valid");
      return;
    }

    // Deklarasikan di sini agar bisa diakses di seluruh blok
    const MIN_LOADING_TIME = 600;
    const startTime = Date.now();

    try {
      // Validasi dengan Zod
      const result = ResetPasswordSchema.safeParse({
        newPassword,
        confirmPassword,
      });

      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const path = err.path[0];
          newErrors[path] = err.message;
        });
        setErrors(newErrors);

        const firstError = result.error.errors[0];
        toast.error(`⚠️ ${firstError.message}`);
        return;
      }

      setErrors({});
      setLoading(true);

      const response = await fetch(
        "http://localhost:3001/api/users/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: encodeURIComponent(token),
            newPassword,
          }),
        }
      );

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Invalid response: ${text.slice(0, 50)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal reset password");
      }

      // Hitung sisa waktu minimal loading
      const elapsed = Date.now() - startTime;
      const remaining = MIN_LOADING_TIME - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      toast.success("✅ Password berhasil direset...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      // Hitung sisa waktu minimal loading untuk error
      const elapsed = Date.now() - startTime;
      const remaining = MIN_LOADING_TIME - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      let message = "Terjadi kesalahan sistem";

      if (err.message.includes("Failed to fetch")) {
        message = "Gagal terhubung ke server";
      } else if (err.message.includes("Invalid response")) {
        message = "Response server tidak valid";
      } else {
        message = err.message.replace(/^⚠️\s*/, "");
      }

      toast.error(`⚠️ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titleLeft="Reset Password"
      descLeft="Masukkan password baru untuk akunmu"
    >
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <Loader />
            <p className="mt-4 text-white text-lg font-medium">Memproses...</p>
          </div>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
          Atur Ulang Password
        </h1>
        <p className="mt-2 text-gray-600">
          Masukkan password baru untuk mengganti password lama
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <PasswordInput
            id="newPassword"
            label="Password Baru"
            placeholder="Masukkan password baru (minimal 6 karakter)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.newPassword}
          />

          <PasswordInput
            id="confirmPassword"
            label="Konfirmasi Password"
            placeholder="Konfirmasi password baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
