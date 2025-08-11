"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/utils/api";
import { toast } from "sonner";
import { UpdateUserSchema } from "@/lib/schemas";

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export const EditUserModal = ({
  user,
  isOpen,
  onClose,
  onUserUpdated,
}: EditUserModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "USER" as "USER" | "ADMIN",
    isVerified: false,
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form ketika user berubah
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        password: "",
      });
      setErrors({});
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      // Validasi dengan Zod
      const result = UpdateUserSchema.safeParse(formData);

      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          const path = err.path[0];
          newErrors[path] = err.message;
        });
        setErrors(newErrors);

        // Tampilkan toast error pertama
        const firstError = result.error.errors[0];
        toast.error(`⚠️ ${firstError.message}`);
        return;
      }

      // Jika validasi sukses, reset error
      setErrors({});

      setIsLoading(true);

      // Siapkan data untuk update (hanya yang berubah)
      const updateData: any = {};

      if (formData.name !== user.name) updateData.name = formData.name;
      if (formData.email !== user.email) updateData.email = formData.email;
      if (formData.role !== user.role) updateData.role = formData.role;
      if (formData.isVerified !== user.isVerified) updateData.isVerified = formData.isVerified;
      if (formData.password.trim()) updateData.password = formData.password;

      // Jika tidak ada perubahan
      if (Object.keys(updateData).length === 0) {
        toast.info("Tidak ada perubahan yang disimpan");
        onClose();
        return;
      }

      await updateUser(user.id, updateData);

      toast.success("User berhasil diupdate");
      onUserUpdated();
      onClose();
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(error.message || "Gagal mengupdate user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      // Reset form
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          role: "USER",
          isVerified: false,
          password: "",
        });
        setErrors({});
      }, 200);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              disabled={isLoading}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={isLoading}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "USER" | "ADMIN") =>
                setFormData({ ...formData, role: value })
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isVerified">Status Verifikasi Email</Label>
            <Select
              value={formData.isVerified ? "true" : "false"}
              onValueChange={(value: string) =>
                setFormData({ ...formData, isVerified: value === "true" })
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Terverifikasi</SelectItem>
                <SelectItem value="false">Belum Terverifikasi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password Baru (Opsional)</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Kosongkan jika tidak ingin mengubah password"
              disabled={isLoading}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
