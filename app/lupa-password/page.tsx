"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Decorative Panel */}
      <div
        className="hidden lg:block w-1/2 bg-gradient-to-br from-[rgb(39,68,124)] to-[rgb(73,163,90)]"
        style={{
          background: `linear-gradient(135deg, rgba(39,68,124,1) 0%, rgba(73,163,90,1) 100%)`,
        }}
      >
        <div className="h-full flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Lupa Password?</h2>
            <p className="text-xl">
              Masukkan emailmu dan kami akan kirimkan link untuk reset password
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
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
              <div>
                <Label htmlFor="email" className="text-[rgb(39,68,124)]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="mt-1 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]"
                  required
                />
              </div>
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
        </div>
      </div>
    </div>
  );
}
