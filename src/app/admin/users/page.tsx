"use client";

import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { adminData } from "@/lib/adminData";
import { PageHeader } from "@/components/shared/PageHeader";
import { UsersTable } from "@/components/admin/users/UsersTable";
import { UsersSearch } from "@/components/admin/users/UsersSearch";
import { UserPlus } from "lucide-react";

export default function UsersPage() {
  useAdminAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredUsers = adminData.users.filter((user) => {
    const matchesSearch = Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesFilter = filter === "all" || user.status === filter;

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

        <UsersTable data={filteredUsers} />
      </div>
    </div>
  );
}
