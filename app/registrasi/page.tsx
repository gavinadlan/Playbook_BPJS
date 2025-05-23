"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import EmailInput from "@/components/auth/EmailInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      toast.success("Registrasi berhasil! Silakan cek email untuk verifikasi");

      // Kosongkan form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Delay redirect 3 detik biar user sempat baca toast
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 3000);
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titleLeft="Daftar Akun Baru"
      descLeft="Bergabung dengan komunitas kami untuk pengalaman terbaik"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
          Buat Akun Baru
        </h1>
        <p className="mt-2 text-gray-600">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-[rgb(73,163,90)] hover:underline">
            Login disini
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name">Nama Lengkap</label>
            <input
              id="name"
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md mt-1 pr-10 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]"
            />
          </div>

          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 karakter)"
          />

          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi Password"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
        >
          {loading ? "Memproses..." : "Daftar Sekarang"}
        </Button>
      </form>
    </AuthLayout>
  );
}
