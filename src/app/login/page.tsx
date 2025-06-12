"use client";

import { useState } from "react"; // Tambahkan impor ini
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthRedirectText from "@/components/auth/AuthRedirectText";
import EmailInput from "@/components/auth/EmailInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schemas";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false); // Gunakan useState di sini

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "USER" as "USER" | "ADMIN",
    },
  });

  const role = watch("role");

  const onSubmit = async (formData: any) => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.dismiss();
        toast.error(data.message || "Login gagal.");
        setLoading(false);
        return;
      }

      // Verifikasi role yang dipilih sesuai dengan role di database
      if (data.user.role !== formData.role) {
        toast.error(
          `Anda tidak memiliki akses sebagai ${
            formData.role === "ADMIN" ? "admin" : "user"
          }`
        );
        setLoading(false);
        return;
      }

      // Simpan token dan user
      if (data.token) {
        localStorage.setItem("token", data.token);
        document.cookie = "isAuthenticated=true; path=/;";

        // Optional: Set token expiry reminder
        const expiryTime = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours
        localStorage.setItem("tokenExpiry", expiryTime.toISOString());
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      toast.dismiss();
      toast.success("Login berhasil!");

      // Redirect berdasarkan role
      setTimeout(() => {
        if (formData.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err) {
      toast.dismiss();
      toast.error("Terjadi kesalahan. Coba lagi nanti.");
      console.error("Login error:", err);
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="role">Login sebagai</Label>
            <Select
              value={role}
              onValueChange={(value) =>
                setValue("role", value as "USER" | "ADMIN")
              }
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

          <EmailInput {...register("email")} error={errors.email?.message} />

          <PasswordInput
            {...register("password")}
            error={errors.password?.message}
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
