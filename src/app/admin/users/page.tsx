"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { PageHeader } from "@/components/shared/PageHeader";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UsersSearch } from "@/components/admin/users/UsersSearch";
import { User } from "@/types/api";
import { fetchUsersData } from "@/utils/api";
import { toast } from "@/components/ui/sonner";

export default function UsersPage() {
  useAdminAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Fungsi untuk memuat data user
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsersData();
      setUsers(data);
    } catch (error) {
      console.error("Error memuat data user:", error);
      toast.error("Gagal memuat data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter user berdasarkan pencarian dan filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || user.role === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Manajemen User" description="Kelola user sistem" />

      <div className="space-y-4">
        <UsersSearch
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilter={setFilter}
        />

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground">Memuat data user...</div>
          </div>
        ) : (
          <UsersTable data={filteredUsers} onUserUpdated={loadUsers} />
        )}
      </div>
    </div>
  );
}
