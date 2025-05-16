import { useState } from "react";
import { PKS } from "@/lib/adminData";
import { FileText, CheckCircle, Eye, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PKSViewDialog } from "./PKSViewDialog";
import { useEffect } from "react";

interface PKSTableProps {
  data: PKS[];
}

export const PKSTable = ({ data }: PKSTableProps) => {
  const [pksList, setPksList] = useState(data);
  useEffect(() => {
    setPksList(data);
  }, [data]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPKS, setSelectedPKS] = useState<PKS | null>(null);
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  const handleView = (pks: PKS) => {
    setSelectedPKS(pks);
    setIsViewDialogOpen(true);
  };

  const handleApprove = (id: number) => {
    setPksList((prev) =>
      prev.map((pks) => (pks.id === id ? { ...pks, status: "Approved" } : pks))
    );
  };

  const handleReject = (id: number) => {
    setPksList((prev) =>
      prev.map((pks) => (pks.id === id ? { ...pks, status: "Rejected" } : pks))
    );
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pksList.map((pks) => (
            <TableRow key={pks.id}>
              <TableCell className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {pks.filename}
              </TableCell>
              <TableCell>{pks.companyName}</TableCell>
              <TableCell>{pks.user}</TableCell>
              <TableCell>{pks.type}</TableCell>
              <TableCell>
                <StatusBadge status={pks.status} />
              </TableCell>
              <TableCell>{pks.submittedAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(pks)}
                    aria-label={`View details of ${pks.filename}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {pks.status === "Pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600"
                        onClick={() => handleApprove(pks.id)}
                        aria-label={`Approve ${pks.filename}`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleReject(pks.id)}
                        aria-label={`Reject ${pks.filename}`}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog PKS View */}
      <PKSViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        pks={selectedPKS}
      />
    </>
  );
};
