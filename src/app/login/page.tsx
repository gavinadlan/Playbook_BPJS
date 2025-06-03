"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthRedirectText from "@/components/auth/AuthRedirectText";
import EmailInput from "@/components/auth/EmailInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.dismiss();
        toast.error(data.message || "Login gagal.");
        setLoading(false);
        return;
      }

      // Verifikasi role yang dipilih sesuai dengan role di database
      if (data.user.role !== role) {
        toast.error(
          `Anda tidak memiliki akses sebagai ${
            role === "ADMIN" ? "admin" : "user"
          }`
        );
        setLoading(false);
        return;
      }

      // Simpan token dan user
      if (data.token) {
        localStorage.setItem("token", data.token);
        document.cookie = "isAuthenticated=true; path=/;";
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      toast.dismiss();
      toast.success("Login berhasil!");

      // Redirect berdasarkan role
      setTimeout(() => {
        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err) {
      toast.dismiss();
      toast.error("Terjadi kesalahan. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titleLeft="Selamat Datang Kembali"
      descLeft="Silakan Masuk untuk mulai mengakses"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
          Masuk ke Akun
        </h1>
        <AuthRedirectText
          text="Belum punya akun?"
          linkText="Daftar disini"
          href="/registrasi"
        />
      </div>

      <form onSubmit={handleLogin} className="mt-8 space-y-6">
        <div className="space-y-4">
          {/* Tambahkan pemilihan role */}
          <div>
            <Label htmlFor="role">Login sebagai</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as "USER" | "ADMIN")}
            >
              <SelectTrigger className="w-full mt-1 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]">
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Password"
            className="mt-1 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember" className="border-[rgb(39,68,124)]" />
              <Label htmlFor="remember" className="ml-2 text-gray-600">
                Ingat saya
              </Label>
            </div>
            <Link
              href="/lupa-password"
              className="text-sm text-[rgb(73,163,90)] hover:underline"
            >
              Lupa password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Memproses...
            </span>
          ) : (
            "Masuk"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
