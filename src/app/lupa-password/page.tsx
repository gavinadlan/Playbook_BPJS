"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import EmailInput from "@/components/auth/EmailInput";
import Link from "next/link";
import { toast } from "@/components/ui/sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3001/api/users/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim email reset password.");
      }

      toast.success("Link reset password telah dikirim ke email kamu.");
      setEmail("");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titleLeft="Lupa Password?"
      descLeft="Masukkan email kamu untuk menerima link reset password"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
          Reset Password
        </h1>
        <p className="mt-2 text-gray-600">
          Masukkan email yang terdaftar. Kami akan kirimkan link untuk reset
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
        >
          {loading ? "Mengirim..." : "Kirim Link Reset"}
        </Button>

        <div className="text-center text-sm mt-4">
          Kembali ke{" "}
          <Link href="/login" className="text-[rgb(73,163,90)] hover:underline">
            Halaman Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
