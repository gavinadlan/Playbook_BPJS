"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Handle mouse movement for aurora effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Aurora Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Green-blue gradient blob */}
        <div
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(circle, rgba(73,163,90,0.8) 0%, rgba(39,68,124,0.5) 70%)",
            top: `${mousePosition.y / 10}px`,
            left: `${mousePosition.x / 10}px`,
            transform: "translate(-50%, -50%)",
            transition: "all 0.3s ease-out",
          }}
        />

        {/* Blue blob */}
        <div
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: "50%",
            height: "50%",
            background:
              "radial-gradient(circle, rgba(39,68,124,0.8) 0%, rgba(39,68,124,0.3) 70%)",
            bottom: `${mousePosition.y / 20}px`,
            right: `${mousePosition.x / 20}px`,
            transition: "all 0.5s ease-out",
          }}
        />

        {/* Green blob */}
        <div
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: "40%",
            height: "40%",
            background:
              "radial-gradient(circle, rgba(73,163,90,0.8) 0%, rgba(73,163,90,0.3) 70%)",
            top: `${-mousePosition.y / 30 + 300}px`,
            left: `${-mousePosition.x / 30 + 300}px`,
            transition: "all 0.7s ease-out",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/20 z-10"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[rgb(73,163,90)] w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
          <FaUserShield size={30} className="text-white" />
        </div>

        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-300">Silakan masuk dengan akun admin Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[rgb(73,163,90)] focus:border-transparent"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-[rgb(73,163,90)] focus:border-transparent pr-12"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[rgb(73,163,90)]"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[rgb(73,163,90)] to-[rgb(39,68,124)] hover:from-[rgb(83,173,100)] hover:to-[rgb(49,78,134)] text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg"
          >
            Masuk
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-gray-400"
          >
            © {new Date().getFullYear()} Management System
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
