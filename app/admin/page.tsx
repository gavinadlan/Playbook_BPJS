"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgba(39,68,124,0.1)] to-[rgba(73,163,90,0.1)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-[rgba(39,68,124,0.1)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[rgb(39,68,124)] mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Silakan masuk dengan akun admin Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[rgb(39,68,124)] mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)] focus:border-transparent"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgb(39,68,124)] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-[rgb(39,68,124)] focus:ring-2 focus:ring-[rgb(73,163,90)] focus:border-transparent pr-12"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[rgb(39,68,124)] hover:text-[rgb(73,163,90)]"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[rgb(73,163,90)] hover:bg-[rgb(63,143,80)] text-white py-3 px-4 rounded-lg transition-colors font-semibold text-lg"
          >
            Masuk
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
