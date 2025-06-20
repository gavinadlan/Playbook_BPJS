"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import Loader from "@/components/ui/loading";
import { PengajuanPKSSchema } from "@/lib/schemas";

export default function PengajuanPksPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validasi dengan Zod
      const result = PengajuanPKSSchema.safeParse({
        company,
        file: file as File,
      });

      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const path = err.path[0];
          newErrors[path] = err.message;
        });
        setErrors(newErrors);

        // Tampilkan toast error pertama
        const firstError = result.error.errors[0];
        toast.error(`⚠️ ${firstError.message}`);
        return;
      }

      // Jika validasi sukses, reset error
      setErrors({});

      const startTime = Date.now();
      const MIN_LOADING_TIME = 1000;

      const formData = new FormData();
      formData.append("company", company);
      formData.append("file", file as File);
      formData.append("userId", String(user?.id));

      setLoading(true);
      const res = await fetch("http://localhost:3001/api/pks", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Handle non-JSON responses
      let data;
      try {
        data = await res.json();
      } catch (error) {
        data = { message: await res.text() };
      }

      if (!res.ok) {
        toast.error(data.message || "Gagal mengajukan PKS.");
      } else {
        // Hitung sisa waktu minimal loading
        const elapsedTime = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsedTime;

        // Tunggu sisa waktu jika proses terlalu cepat
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }

        toast.success("Pengajuan PKS berhasil dikirim!");
        router.push("/pengajuan-pks/success");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan jaringan atau server tidak merespon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-[#f7fafc] to-[#ebf4f8]">
      {/* Overlay loader */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <Loader />
            <p className="mt-4 text-white text-lg font-medium">Mengirim...</p>
          </div>
        </div>
      )}

      <Card className="w-full max-w-2xl shadow-xl rounded-xl border-0 bg-white">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#27447C]">Pengajuan PKS</h1>
            <p className="text-gray-600">
              Isi form berikut untuk mengajukan kerjasama
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Nama Pengaju */}
              <div>
                <Label className="text-gray-700 font-medium">
                  Nama Pengaju
                </Label>
                <Input
                  value={user?.name || ""}
                  disabled
                  className="mt-1 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>

              {/* Instansi/Perusahaan */}
              <div>
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  Instansi/Perusahaan
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Contoh: PT. Contoh Perusahaan"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`mt-1 focus:border-[#27447C] focus:ring-1 focus:ring-[#27447C] ${
                    errors.company ? "border-red-500" : ""
                  }`}
                />
                {errors.company ? (
                  <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                ) : (
                  !company && (
                    <p className="mt-1 text-sm text-red-500">
                      Harap masukkan nama instansi/perusahaan
                    </p>
                  )
                )}
              </div>

              {/* File Upload */}
              <div>
                <Label className="text-gray-700 font-medium flex items-center gap-1">
                  Dokumen PKS
                  <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1">
                  <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#27447C] transition-colors">
                    <div className="text-center space-y-2">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-[#27447C]">
                          Klik untuk upload
                        </span>{" "}
                        atau drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Format file: PDF, DOC, DOCX (Maks. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFile(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                  {file && (
                    <div className="mt-2 flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <span className="text-sm text-gray-600">{file.name}</span>

                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Hapus
                      </button>
                    </div>
                  )}
                  {errors.file ? (
                    <p className="mt-1 text-sm text-red-500">{errors.file}</p>
                  ) : (
                    !file && (
                      <p className="mt-1 text-sm text-red-500">
                        Harap upload dokumen PKS
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#27447C] hover:bg-[#1D3566] text-white font-medium rounded-lg transition-all"
            >
              Ajukan PKS
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
