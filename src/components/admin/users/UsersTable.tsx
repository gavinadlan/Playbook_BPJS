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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Loader from "@/components/ui/loading";

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

  // State untuk konfirmasi penghapusan
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setLoadingDelete(userToDelete.id);
      setShowDeleteDialog(false);

      await deleteUser(userToDelete.id);

      toast.success(`User "${userToDelete.name}" berhasil dihapus`);

      // Refresh data
      if (onUserUpdated) {
        onUserUpdated();
      }
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Gagal menghapus user. Silakan coba lagi.");
    } finally {
      setLoadingDelete(null);
      setUserToDelete(null);
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
                          onClick={() => handleDeleteClick(user)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              Konfirmasi Penghapusan
            </AlertDialogTitle>
            <AlertDialogDescription>
              <>
                Apakah Anda yakin ingin menghapus user{" "}
                <span className="font-semibold text-foreground">
                  {userToDelete?.name}
                </span>
                ?<br />
                <span className="text-red-500 block mt-2">
                  Tindakan ini tidak dapat dibatalkan. Semua data yang terkait
                  dengan user ini akan dihapus secara permanen.
                </span>
              </>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 hover:bg-gray-100">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Overlay loader untuk penghapusan */}
      {loadingDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <Loader />
            <p className="mt-4 text-white text-lg font-medium">
              Menghapus user...
            </p>
          </div>
        </div>
      )}
    </>
  );
};
