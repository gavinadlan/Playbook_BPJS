"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { PageHeader } from "@/components/shared/PageHeader";
import { PKSTable } from "@/components/admin/pks/PKSTable";
import { PKSSearch } from "@/components/admin/pks/PKSSearch";
import { PKSFilterTabs } from "@/components/admin/pks/PKSFilterTabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchPKSData } from "@/utils/api";
import { PKS } from "@/types/api";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton"; // Import skeleton
import { useSocket } from "@/hooks/useSocket";
import { io as socketIOClient } from "socket.io-client";

export default function PKSPage() {
  useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [pksData, setPksData] = useState<PKS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ambil data dari backend
  useEffect(() => {
    const loadPKSData = async () => {
      try {
        const data = await fetchPKSData();
        setPksData(data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data PKS");
        setLoading(false);
        toast({ title: "Error", description: "Gagal memuat data PKS", variant: "destructive" });
      }
    };

    loadPKSData();
  }, []);

  // Listen real-time update PKS (untuk admin, bisa gunakan userId admin jika ingin notifikasi personal)
  useSocket(
    null, // admin tidak perlu join room user, kecuali ingin notifikasi personal
    (data) => {
      // Refetch data PKS saat status update
      setLoading(true);
      fetchPKSData().then((data) => {
        setPksData(data);
        setLoading(false);
      });
      toast({ title: "Status PKS Update", description: `Status: ${data.status}` });
    },
    (notif) => {
      toast({ title: "Notifikasi", description: notif.message });
    }
  );

  // Listen event new_pks_submission agar admin dapat data PKS baru secara real-time
  useEffect(() => {
    const socket = socketIOClient("http://localhost:3001", { withCredentials: true });
    socket.on("new_pks_submission", (data) => {
      setLoading(true);
      fetchPKSData().then((data) => {
        setPksData(data);
        setLoading(false);
      });
      toast({ title: "New PKS Submission", description: "A new PKS has been submitted." });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // Handle update status dari komponen anak
  const handleStatusUpdate = async () => {
    try {
      setLoading(true);
      const data = await fetchPKSData();
      setPksData(data);
      setLoading(false);
    } catch (err) {
      setError("Gagal memuat data PKS");
      setLoading(false);
      toast({ title: "Error", description: "Gagal memuat data PKS", variant: "destructive" });
    }
  };

  // Filter data
  const filteredPKS = pksData.filter((pks) => {
    const userName = pks.user?.name?.toLowerCase() || "unknown";

    const matchesSearch =
      pks.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pks.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userName.includes(searchTerm.toLowerCase());

    return activeTab === "all"
      ? matchesSearch
      : matchesSearch && pks.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Hitung jumlah per status
  const counts = {
    all: pksData.length,
    pending: pksData.filter((p) => p.status === "PENDING").length,
    approved: pksData.filter((p) => p.status === "APPROVED").length,
    rejected: pksData.filter((p) => p.status === "REJECTED").length,
  };

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen PKS"
        description="Kelola perjanjian kerjasama dan persetujuan"
      />

      <Card>
        <CardHeader className="pb-3">
          {loading ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Dokumen PKS</h2>
                <p className="text-sm text-muted-foreground">
                  Menampilkan {filteredPKS.length} dokumen
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <PKSSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
                <PKSFilterTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  counts={counts}
                />
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {/* Header tabel */}
              <div className="flex gap-4">
                <Skeleton className="h-8 w-1/5" />
                <Skeleton className="h-8 w-1/5" />
                <Skeleton className="h-8 w-1/5" />
                <Skeleton className="h-8 w-1/5" />
                <Skeleton className="h-8 w-1/5" />
              </div>

              {/* Baris data */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-12 w-1/5" />
                  <Skeleton className="h-12 w-1/5" />
                  <Skeleton className="h-12 w-1/5" />
                  <Skeleton className="h-12 w-1/5" />
                  <Skeleton className="h-12 w-1/5" />
                </div>
              ))}
            </div>
          ) : (
            <PKSTable data={filteredPKS} onStatusUpdate={handleStatusUpdate} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
