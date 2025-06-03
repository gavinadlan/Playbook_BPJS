import { useState } from "react";
import { PKS } from "@/types/api";
import { FileText, Eye, CheckCircle, XCircle } from "lucide-react";
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
import { updatePKSStatus } from "@/utils/api";
import { toast } from "@/components/ui/sonner";

interface PKSTableProps {
  data: PKS[];
  onStatusUpdate: (updatedPKS: PKS) => void;
}

export const PKSTable = ({ data, onStatusUpdate }: PKSTableProps) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPKS, setSelectedPKS] = useState<PKS | null>(null);

  const handleView = (pks: PKS) => {
    setSelectedPKS(pks);
    setIsViewDialogOpen(true);
  };

  const handleApprove = async (id: number) => {
    try {
      const updated = await updatePKSStatus(id, "APPROVED");
      onStatusUpdate(updated);
      toast.success("PKS berhasil disetujui");
    } catch (error) {
      toast.error("Gagal menyetujui PKS", {
        description: "Silakan coba lagi",
      });
    }
  };

  const handleReject = async (id: number) => {
    try {
      const updated = await updatePKSStatus(id, "REJECTED");
      onStatusUpdate(updated);
      toast.success("PKS berhasil ditolak");
    } catch (error) {
      toast.error("Gagal menolak PKS", {
        description: "Silakan coba lagi",
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dokumen</TableHead>
            <TableHead>Perusahaan</TableHead>
            <TableHead>Pengguna</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal Pengajuan</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((pks) => (
            <TableRow key={pks.id}>
              <TableCell className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {pks.filename}
              </TableCell>
              <TableCell>{pks.company}</TableCell>
              <TableCell>{pks.user?.name || "Unknown"}</TableCell>
              {/* Perbaikan disini */}
              <TableCell>
                <StatusBadge status={pks.status} />
              </TableCell>
              <TableCell>
                {new Date(pks.submittedAt).toLocaleDateString("id-ID")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(pks)}
                    aria-label={`Lihat detail ${pks.filename}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {pks.status === "PENDING" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600"
                        onClick={() => handleApprove(pks.id)}
                        aria-label={`Setujui ${pks.filename}`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleReject(pks.id)}
                        aria-label={`Tolak ${pks.filename}`}
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

      <PKSViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        pks={selectedPKS}
      />
    </>
  );
};
