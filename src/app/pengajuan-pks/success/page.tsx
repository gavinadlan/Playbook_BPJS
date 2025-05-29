"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-[#f7fafc] to-[#ebf4f8]">
      <Card className="w-full max-w-xl shadow-xl rounded-xl border-0 bg-white p-8 text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
          <h1 className="text-3xl font-bold text-[#27447C]">
            Pengajuan Berhasil!
          </h1>
          <p className="text-gray-600">
            Dokumen PKS Anda telah berhasil diajukan dan akan segera diproses
            oleh admin. Status saat ini:{" "}
            <span className="font-semibold text-yellow-600">PENDING</span>.
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="rounded-lg border-gray-300 hover:bg-gray-100"
          >
            Kembali ke Home
          </Button>
          <Button
            className="bg-[#27447C] hover:bg-[#1D3566] text-white rounded-lg"
            onClick={() => router.push("/pengajuan-saya")}
          >
            Lihat Status Pengajuan
          </Button>
        </div>
      </Card>
    </div>
  );
}
