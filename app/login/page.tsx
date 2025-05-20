import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthRedirectText from "@/components/auth/AuthRedirectText";
import EmailInput from "@/components/auth/EmailInput";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function LoginPage() {
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

      <form className="mt-8 space-y-6">
        <div className="space-y-4">
          <EmailInput />

          <PasswordInput
            id="password"
            label="Password"
            placeholder="Password"
            className="mt-1 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)]"
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
          className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-2 px-4 rounded-md transition-colors"
        >
          Masuk
        </Button>
      </form>
    </AuthLayout>
  );
}
