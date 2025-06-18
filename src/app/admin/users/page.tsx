"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { PageHeader } from "@/components/shared/PageHeader";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UsersSearch } from "@/components/admin/users/UsersSearch";
import { User } from "@/types/api";
import { fetchUsersData } from "@/utils/api";
import { toast } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton"; // Import skeleton

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
        {/* Loading state untuk search bar */}
        {loading ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-full sm:w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : (
          <UsersSearch
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            onFilter={setFilter}
          />
        )}

        {/* Loading state untuk tabel */}
        {loading ? (
          <div className="space-y-4">
            {/* Header tabel */}
            <div className="flex gap-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-1/4" />
            </div>

            {/* Baris data */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-12 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <UsersTable data={filteredUsers} onUserUpdated={loadUsers} />
        )}
      </div>
    </div>
  );
}
