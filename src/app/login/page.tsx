"use client";

import { useState } from "react";
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
import Loader from "@/components/ui/loading";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
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
    const startTime = Date.now();
    const MIN_LOADING_TIME = 600;

    try {
      // Kirim data login tanpa role ke backend
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal.");
      }

      // PERBAIKAN: Pindahkan pengecekan role SETELAH berhasil login
      if (data.user.role !== formData.role) {
        // Simpan user data sementara untuk penanganan khusus
        const tempUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        };

        // Clear token karena role tidak sesuai
        localStorage.removeItem("token");
        document.cookie =
          "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Reset form role
        reset({ ...formData, role: data.user.role });

        throw new Error(
          `Akun Anda adalah ${
            data.user.role === "ADMIN" ? "Admin" : "User"
          }, ` +
            `tetapi Anda mencoba login sebagai ${
              formData.role === "ADMIN" ? "Admin" : "User"
            }. ` +
            `Role telah disesuaikan, silakan coba login kembali.`
        );
      }

      // Lanjutkan jika role sesuai
      if (data.token) {
        localStorage.setItem("token", data.token);
        document.cookie = "isAuthenticated=true; path=/;";

        // Set token expiry reminder
        const expiryTime = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours
        localStorage.setItem("tokenExpiry", expiryTime.toISOString());
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      toast.success("Login berhasil!");

      // Hitung sisa waktu minimal loading
      const elapsed = Date.now() - startTime;
      const remaining = MIN_LOADING_TIME - elapsed;

      // Tunggu sisa waktu jika proses terlalu cepat
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      // Redirect berdasarkan role
      setTimeout(() => {
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err: any) {
      // Hitung sisa waktu minimal loading untuk error
      const elapsed = Date.now() - startTime;
      const remaining = MIN_LOADING_TIME - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      // Tampilkan toast dengan tombol action
      toast.error(err.message || "Terjadi kesalahan. Coba lagi nanti.", {
        action: {
          label: "Coba Lagi",
          onClick: () => {
            // Tidak perlu reset form, cukup aktifkan kembali
            setLoading(false);
          },
        },
        duration: 10000,
      });

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
      {/* Overlay loading di tengah halaman */}
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
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>
    </AuthLayout>
  );
}
