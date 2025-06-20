"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import EmailInput from "@/components/auth/EmailInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthRedirectText from "@/components/auth/AuthRedirectText";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/sonner";
import Loader from "@/components/ui/loading";
import { RegisterSchema } from "@/lib/schemas";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validasi dengan Zod (termasuk konfirmasi password)
      const result = RegisterSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      });

      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const path = err.path[0];
          newErrors[path] = err.message;
        });
        setErrors(newErrors);

        // Tampilkan toast error pertama
        const firstError = result.error.errors[0];
        toast.error(`⚠️ ${firstError.message}`);
        return;
      }

      // Jika validasi sukses, reset error
      setErrors({});

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
      {/* Overlay loader */}
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
          Buat Akun Baru
        </h1>
        <AuthRedirectText
          text="Sudah punya akun?"
          linkText="Login disini"
          href="/login"
        />
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
              className={`w-full px-3 py-2 border rounded-md mt-1 pr-10 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)] ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 karakter)"
            error={errors.password}
          />

          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi Password"
            error={errors.confirmPassword}
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
        >
          Daftar Sekarang
        </Button>
      </form>
    </AuthLayout>
  );
}
