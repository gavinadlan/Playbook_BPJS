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

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user); // Update context
      router.push("/");
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi nanti.");
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

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
        >
          {loading ? "Loading..." : "Masuk"}
        </Button>
      </form>
    </AuthLayout>
  );
}
