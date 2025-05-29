"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Alert from "@/components/ui/Alert";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token verifikasi tidak ditemukan");
        setShowAlert(true);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/api/users/verify-email?token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Verifikasi email gagal");
        }

        setStatus("success");
        setMessage("Email berhasil diverifikasi! Akun Anda sudah aktif.");
        setShowAlert(true);

        setTimeout(() => {
          router.push("/login?verified=true");
        }, 3000);
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Terjadi kesalahan saat verifikasi email");
        setShowAlert(true);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <AuthLayout
      titleLeft="Verifikasi Email"
      descLeft="Kami sedang memverifikasi email Anda"
    >
      {showAlert && (
        <Alert
          type={status === "success" ? "success" : "error"}
          message={message}
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
          Verifikasi Email
        </h1>

        {status === "loading" && (
          <div className="mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(73,163,90)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Memverifikasi email Anda...</p>
          </div>
        )}

        {status === "success" && (
          <div className="mt-8 space-y-4">
            <div className="text-green-600 text-6xl">✓</div>
            <p className="text-gray-600">
              Email Anda berhasil diverifikasi! Anda akan diarahkan ke halaman
              login dalam beberapa detik.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white"
            >
              Login Sekarang
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="mt-8 space-y-4">
            <div className="text-red-600 text-6xl">✗</div>
            <p className="text-red-600">{message}</p>
            <div className="space-x-4">
              <Button
                onClick={() => router.push("/registrasi")}
                className="bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white"
              >
                Daftar Ulang
              </Button>
              <Link
                href="/login"
                className="inline-block px-4 py-2 text-[rgb(39,68,124)] border border-[rgb(39,68,124)] rounded hover:bg-[rgb(39,68,124)] hover:text-white transition-colors"
              >
                Kembali ke Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
