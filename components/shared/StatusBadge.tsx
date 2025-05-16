import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, UserCheck, UserX } from "lucide-react";

type StatusType = "Pending" | "Approved" | "Rejected" | "Active" | "Inactive";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { color: string; icon: React.ReactNode }
> = {
  Pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-4 w-4 mr-1" />,
  },
  Approved: {
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle className="h-4 w-4 mr-1" />,
  },
  Rejected: {
    color: "bg-red-100 text-red-800",
    icon: <XCircle className="h-4 w-4 mr-1" />,
  },
  Active: {
    color: "bg-green-100 text-green-800",
    icon: <UserCheck className="h-4 w-4 mr-1" />,
  },
  Inactive: {
    color: "bg-gray-100 text-gray-800",
    icon: <UserX className="h-4 w-4 mr-1" />,
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const { color, icon } = statusConfig[status];

  return (
    <Badge
      className={cn(
        color,
        "flex items-center font-semibold rounded-md px-2 py-1",
        "hover:opacity-90 transition-opacity shadow-sm",
        className
      )}
      variant="outline"
    >
      {icon}
      {status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
    </Badge>
  );
};
