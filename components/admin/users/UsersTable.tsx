"use client";

import { User } from "@/lib/adminData";
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

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

export const UsersTable = ({ data }: { data: User[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Created At</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>
            <StatusBadge status={user.status} />
          </TableCell>
          <TableCell>{user.createdAt}</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="btn-ghost p-1 rounded">•••</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={() => {
                    // aksi edit user, misal redirect ke halaman edit
                    console.log("Edit user", user.id);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // aksi delete user, misal show konfirmasi hapus
                    console.log("Delete user", user.id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
