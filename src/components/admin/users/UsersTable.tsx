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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper function untuk format tanggal
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper function untuk format last visited
const formatLastVisited = (lastVisited: string | null) => {
  if (!lastVisited) return "Never";

  const date = new Date(lastVisited);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Today";
  if (diffDays <= 7) return `${diffDays} days ago`;
  return formatDate(lastVisited);
};

// Helper function untuk status badge berdasarkan lastVisited
const getStatusBadge = (lastVisited: string | null) => {
  if (!lastVisited) {
    return <Badge variant="secondary">Never Logged In</Badge>;
  }

  const date = new Date(lastVisited);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return (
      <Badge variant="default" className="bg-green-500">
        Active
      </Badge>
    );
  } else if (diffDays <= 30) {
    return <Badge variant="secondary">Recently Active</Badge>;
  } else {
    return <Badge variant="outline">Inactive</Badge>;
  }
};

export const UsersTable = ({ data }: { data: User[] }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Visited</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-[70px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No users found.
            </TableCell>
          </TableRow>
        ) : (
          data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "ADMIN" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{getStatusBadge(user.lastVisited)}</TableCell>
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
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        // TODO: Implement edit user functionality
                        console.log("Edit user", user.id);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        // TODO: Implement delete user functionality
                        console.log("Delete user", user.id);
                      }}
                      className="text-red-600"
                    >
                      Delete
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
);
