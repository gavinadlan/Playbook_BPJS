"use client";

import { User } from "@/types/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteUser } from "@/utils/api";
import { toast } from "sonner";
import { EditUserModal } from "./UserModal";

// Fungsi helper untuk format tanggal
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Fungsi helper untuk format last visited
const formatLastVisited = (lastVisited: string | null) => {
  if (!lastVisited) return "Tidak pernah";

  const date = new Date(lastVisited);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Hari ini";
  if (diffDays <= 7) return `${diffDays} hari yang lalu`;
  return formatDate(lastVisited);
};

// Fungsi helper untuk menentukan status berdasarkan lastVisited
const getUserStatus = (lastVisited: string | null): "Active" | "Inactive" => {
  if (!lastVisited) return "Inactive";

  const date = new Date(lastVisited);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 30 ? "Active" : "Inactive";
};

// Fungsi helper untuk menentukan role badge
const getRoleBadge = (role: string): "ADMIN" | "USER" => {
  return role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER";
};

interface UsersTableProps {
  data: User[];
  onUserUpdated?: () => void; // Callback untuk refresh data setelah update
}

export const UsersTable = ({ data, onUserUpdated }: UsersTableProps) => {
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (user: User) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus user "${user.name}"?\nTindakan ini tidak dapat dibatalkan.`
    );

    if (!isConfirmed) return;

    try {
      setLoadingDelete(user.id);

      await deleteUser(user.id);

      toast.success(`User "${user.name}" berhasil dihapus`);

      // Refresh data
      if (onUserUpdated) {
        onUserUpdated();
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Gagal menghapus user. Silakan coba lagi.");
    } finally {
      setLoadingDelete(null);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terakhir Dikunjungi</TableHead>
              <TableHead>Dibuat Pada</TableHead>
              <TableHead className="w-[70px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Tidak ada user yang ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <StatusBadge status={getRoleBadge(user.role)} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={getUserStatus(user.lastVisited)} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatLastVisited(user.lastVisited)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditUser(user)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Ubah
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 cursor-pointer"
                          disabled={loadingDelete === user.id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {loadingDelete === user.id ? "Menghapus..." : "Hapus"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        user={editingUser}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingUser(null);
        }}
        onUserUpdated={() => {
          if (onUserUpdated) {
            onUserUpdated();
          }
        }}
      />
    </>
  );
};
