"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import EmailInput from "@/components/auth/EmailInput";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      titleLeft="Lupa Password?"
      descLeft="Masukkan emailmu dan kami akan kirimkan link untuk reset password"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
          Reset Password
        </h1>
        <p className="mt-2 text-gray-600">
          Masukkan email yang terdaftar untuk menerima link reset
        </p>
      </div>

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          {/* Email input */}
          <EmailInput />
        </div>

        <Button
          type="submit"
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
        >
          Kirim Link Reset
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-[rgb(73,163,90)] hover:underline"
          >
            Kembali ke halaman login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
