"use client";

import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { adminData } from "@/lib/adminData";
import { PageHeader } from "@/components/shared/PageHeader";
import { PKSTable } from "@/components/admin/pks/PKSTable";
import { PKSSearch } from "@/components/admin/pks/PKSSearch";
import { PKSFilterTabs } from "@/components/admin/pks/PKSFilterTabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PKSPage() {
  useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredPKS = adminData.pks.filter((pks) => {
    const matchesSearch = Object.values(pks).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return activeTab === "all"
      ? matchesSearch
      : matchesSearch && pks.status.toLowerCase() === activeTab.toLowerCase();
  });

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
                Showing {filteredPKS.length} documents
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <PKSSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
              <PKSFilterTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={{
                  all: adminData.pks.length,
                  pending: adminData.pks.filter((p) => p.status === "Pending")
                    .length,
                  approved: adminData.pks.filter((p) => p.status === "Approved")
                    .length,
                  rejected: adminData.pks.filter((p) => p.status === "Rejected")
                    .length,
                }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <PKSTable data={filteredPKS} />
        </CardContent>
      </Card>
    </div>
  );
}
