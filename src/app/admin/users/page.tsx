"use client";

import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { PageHeader } from "@/components/shared/PageHeader";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UsersSearch } from "@/components/admin/users/UsersSearch";
import { UserPlus } from "lucide-react";
import { authFetch } from "@/utils/api";
import { User } from "@/types/api";
import { toast } from "@/components/ui/sonner";

export default function UsersPage() {
  useAdminAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch users dari backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await authFetch(
          "http://localhost:3001/api/admin/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Gagal mengambil data user");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users berdasarkan search dan filter
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
      <PageHeader
        title="User Management"
        description="Manage system users and permissions"
        action={{
          text: "Add User",
          href: "/admin/users/new",
          icon: <UserPlus className="h-4 w-4" />,
        }}
      />

      <div className="space-y-4">
        <UsersSearch
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilter={setFilter}
        />

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-muted-foreground">Loading users...</div>
          </div>
        ) : (
          <UsersTable data={filteredUsers} />
        )}
      </div>
    </div>
  );
}
