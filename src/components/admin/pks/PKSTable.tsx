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
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";

interface PKSTableProps {
  data: PKS[];
  onStatusUpdate: (updatedPKS: PKS) => void;
}

export const PKSTable = ({ data, onStatusUpdate }: PKSTableProps) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPKS, setSelectedPKS] = useState<PKS | null>(null);

  // State untuk dialog konfirmasi
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentPksId, setCurrentPksId] = useState<number | null>(null);

  const handleView = (pks: PKS) => {
    setSelectedPKS(pks);
    setIsViewDialogOpen(true);
  };

  // Buka dialog setujui
  const openApproveDialog = (id: number) => {
    setCurrentPksId(id);
    setShowApproveDialog(true);
  };

  // Buka dialog tolak
  const openRejectDialog = (id: number) => {
    setCurrentPksId(id);
    setRejectReason(""); // Reset alasan setiap kali dibuka
    setShowRejectDialog(true);
  };

  // Konfirmasi setujui
  const handleConfirmApprove = async () => {
    if (!currentPksId) return;

    try {
      const updated = await updatePKSStatus(currentPksId, "APPROVED");
      onStatusUpdate(updated);
      toast.success("PKS berhasil disetujui");
      setShowApproveDialog(false);
    } catch (error) {
      toast.error("Gagal menyetujui PKS", {
        description: "Silakan coba lagi",
      });
    }
  };

  // Konfirmasi tolak
  const handleConfirmReject = async () => {
    if (!currentPksId) return;

    try {
      const updated = await updatePKSStatus(
        currentPksId,
        "REJECTED",
        rejectReason
      );
      onStatusUpdate(updated);
      toast.success("PKS berhasil ditolak");
      setShowRejectDialog(false);
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
                        onClick={() => openApproveDialog(pks.id)}
                        aria-label={`Setujui ${pks.filename}`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => openRejectDialog(pks.id)}
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

      {/* Dialog Konfirmasi Setujui */}
      <ConfirmationDialog
        open={showApproveDialog}
        onOpenChange={setShowApproveDialog}
        type="APPROVE"
        onConfirm={handleConfirmApprove}
      />

      {/* Dialog Konfirmasi Tolak */}
      <ConfirmationDialog
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        type="REJECT"
        reason={rejectReason}
        onReasonChange={setRejectReason}
        onConfirm={handleConfirmReject}
      />
    </>
  );
};
