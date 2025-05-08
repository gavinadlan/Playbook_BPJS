"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
            <h2 className="text-4xl font-bold mb-4">Selamat Datang Kembali</h2>
            <p className="text-xl">
              Kelola layanan kesehatan dengan lebih mudah dan efisien
            </p>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[rgb(39,68,124)]">
              Masuk ke Akun
            </h1>
            <p className="mt-2 text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/registrasi"
                className="font-medium text-[rgb(73,163,90)] hover:underline"
              >
                Daftar disini
              </Link>
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

              <div>
                <Label htmlFor="password" className="text-[rgb(39,68,124)]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="mt-1 border-[rgb(39,68,124)] pr-10 focus:ring-2 focus:ring-[rgb(73,163,90)]"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

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
              className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
            >
              Masuk
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  atau lanjutkan dengan
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="w-full border-[rgb(39,68,124)] text-[rgb(39,68,124)] hover:bg-[rgb(39,68,124)] hover:text-white"
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
