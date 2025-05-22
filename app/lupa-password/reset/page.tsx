"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!token) {
      setErrorMsg("⚠️ Token tidak ditemukan di URL");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!token) {
      setErrorMsg("⚠️ Token reset password tidak valid");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("⚠️ Password minimal 6 karakter");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("⚠️ Konfirmasi password tidak cocok");
      return;
    }

    try {
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

      // Handle non-JSON response
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Invalid response: ${text.slice(0, 50)}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal reset password");
      }

      setSuccessMsg("✅ Password berhasil direset...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      let message = "Terjadi kesalahan sistem";

      if (err.message.includes("Failed to fetch")) {
        message = "Gagal terhubung ke server";
      } else if (err.message.includes("Invalid response")) {
        message = "Response server tidak valid";
      } else {
        message = err.message.replace(/^⚠️\s*/, "");
      }

      setErrorMsg(`⚠️ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titleLeft="Reset Password"
      descLeft="Masukkan password baru untuk akunmu"
    >
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
          />

          <PasswordInput
            id="confirmPassword"
            label="Konfirmasi Password"
            placeholder="Konfirmasi password baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Feedback messages */}
        {errorMsg && (
          <p className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            ⚠️ {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
            ✅ {successMsg}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
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
            "Reset Password"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
