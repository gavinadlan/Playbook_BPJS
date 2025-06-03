import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, UserCheck, UserX } from "lucide-react";

type StatusType =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Active"
  | "Inactive";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
    icon: React.ReactNode;
  }
> = {
  // Format uppercase dari API
  PENDING: {
    label: "Menunggu",
    className: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4 mr-1" />,
  },
  APPROVED: {
    label: "Disetujui",
    className: "bg-green-100 text-green-800",
    icon: <CheckCircle className="h-4 w-4 mr-1" />,
  },
  REJECTED: {
    label: "Ditolak",
    className: "bg-red-100 text-red-800",
    icon: <XCircle className="h-4 w-4 mr-1" />,
  },

  // Backward compatibility
  Pending: {
    label: "Menunggu",
    className: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4 mr-1" />,
  },
  Approved: {
    label: "Disetujui",
    className: "bg-green-100 text-green-800",
    icon: <CheckCircle className="h-4 w-4 mr-1" />,
  },
  Rejected: {
    label: "Ditolak",
    className: "bg-red-100 text-red-800",
    icon: <XCircle className="h-4 w-4 mr-1" />,
  },

  // Status tambahan
  Active: {
    label: "Aktif",
    className: "bg-green-100 text-green-800",
    icon: <UserCheck className="h-4 w-4 mr-1" />,
  },
  Inactive: {
    label: "Tidak Aktif",
    className: "bg-gray-100 text-gray-800",
    icon: <UserX className="h-4 w-4 mr-1" />,
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusInfo = statusConfig[status] || {
    label: status,
    className: "bg-gray-100 text-gray-800",
    icon: <Clock className="h-4 w-4 mr-1" />,
  };

  return (
    <Badge
      className={cn(
        "flex items-center font-semibold rounded-md px-2 py-1 text-xs",
        "hover:opacity-90 transition-opacity shadow-sm",
        statusInfo.className,
        className
      )}
      variant="outline"
    >
      {statusInfo.icon}
      {statusInfo.label}
    </Badge>
  );
};
