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
import { toast } from "@/components/ui/sonner";

export default function PKSPage() {
  useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [pksData, setPksData] = useState<PKS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data dari backend
  useEffect(() => {
    const loadPKSData = async () => {
      try {
        const data = await fetchPKSData();
        setPksData(data);
        setLoading(false);
      } catch (err) {
        setError("Gagal memuat data PKS");
        setLoading(false);
        toast.error("Gagal memuat data PKS", {
          description: "Silakan coba lagi nanti",
        });
      }
    };

    loadPKSData();
  }, []);

  // Handle update status dari child component
  const handleStatusUpdate = (updatedPKS: PKS) => {
    setPksData((prev) =>
      prev.map((pks) => (pks.id === updatedPKS.id ? updatedPKS : pks))
    );
  };

  // Filter data
  const filteredPKS = pksData.filter((pks) => {
    const userName = pks.user?.name?.toLowerCase() || "unknown";

    const matchesSearch =
      pks.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  if (loading) {
    return <div className="text-center py-8">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="PKS Management"
        description="Manage partnership agreements and approvals"
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">PKS Documents</h2>
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
        </CardHeader>

        <CardContent>
          <PKSTable data={filteredPKS} onStatusUpdate={handleStatusUpdate} />
        </CardContent>
      </Card>
    </div>
  );
}
