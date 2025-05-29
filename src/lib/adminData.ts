import { UsersRound, FileCheck, BarChart, UserPlus } from "lucide-react";

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  role: string;
  status: "Active" | "Inactive" | "Pending";
};

export type PKS = {
  id: number;
  user: string;
  companyName: string;
  filename: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
  type: string;
  approvedAt?: string;
  rejectedAt?: string;
  reason?: string;
};

export const adminData = {
  pks: [
    {
      id: 1,
      user: "John Doe",
      companyName: "ABC Corporation",
      filename: "agreement_abc_2024.pdf",
      status: "Pending",
      submittedAt: "2024-05-10",
      type: "Renewal",
    },
    {
      id: 2,
      user: "Jane Smith",
      companyName: "XYZ Ltd",
      filename: "contract_xyz_2024.pdf",
      status: "Approved",
      submittedAt: "2024-05-05",
      approvedAt: "2024-05-07",
      type: "New",
    },
    {
      id: 3,
      user: "Robert Johnson",
      companyName: "123 Industries",
      filename: "pks_123_2024.pdf",
      status: "Rejected",
      submittedAt: "2024-05-01",
      rejectedAt: "2024-05-03",
      reason: "Incomplete documentation",
      type: "New",
    },
    {
      id: 4,
      user: "Emily Davis",
      companyName: "Tech Solutions",
      filename: "agreement_tech_2024.pdf",
      status: "Pending",
      submittedAt: "2024-05-12",
      type: "Amendment",
    },
    {
      id: 5,
      user: "Michael Brown",
      companyName: "Global Services",
      filename: "contract_global_2024.pdf",
      status: "Approved",
      submittedAt: "2024-04-28",
      approvedAt: "2024-05-01",
      type: "Renewal",
    },
  ] as PKS[],

  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      createdAt: "2024-01-15",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      createdAt: "2024-02-20",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      createdAt: "2024-03-05",
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      createdAt: "2024-04-10",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      createdAt: "2024-05-01",
      role: "User",
      status: "Pending",
    },
  ] as User[],

  dashboard: {
    stats: [
      {
        title: "Total Users",
        value: "1,234",
        change: "+12%",
        description: "Compared to last month",
        icon: UsersRound,
        link: "/admin/users",
      },
      {
        title: "Pending PKS",
        value: "42",
        change: "-8%",
        description: "Compared to last month",
        icon: FileCheck,
        link: "/admin/pks",
      },
      {
        title: "Approved PKS",
        value: "187",
        change: "+24%",
        description: "Compared to last month",
        icon: BarChart,
        link: "/admin/pks",
      },
    ],
    activities: [
      {
        user: "John Doe",
        action: "approved PKS document",
        time: "2 hours ago",
      },
      {
        user: "Sarah Johnson",
        action: "rejected PKS application",
        time: "5 hours ago",
      },
      { user: "Admin", action: "added new user", time: "Yesterday" },
    ],
  },
};
