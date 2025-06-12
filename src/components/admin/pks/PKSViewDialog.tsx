import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PKS } from "@/types/api";
import { FileText, Eye } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface PKSViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pks: PKS | null;
}

export const PKSViewDialog = ({
  open,
  onOpenChange,
  pks,
}: PKSViewDialogProps) => {
  if (!pks) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail Dokumen PKS</DialogTitle>
          <DialogDescription>
            Lihat informasi lengkap untuk dokumen PKS ini
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Dokumen</h3>
              <p className="text-sm">{pks.filename}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <div className="text-sm">
                <StatusBadge status={pks.status} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Perusahaan</h3>
              <p className="text-sm">{pks.company}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Pengguna</h3>
              <p className="text-sm">{pks.user?.name || "Unknown"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Tanggal Pengajuan
              </h3>
              <p className="text-sm">
                {new Date(pks.submittedAt).toLocaleString("id-ID")}
              </p>
            </div>

            {pks.status === "APPROVED" && pks.approvedAt && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Disetujui Pada
                </h3>
                <p className="text-sm">
                  {new Date(pks.approvedAt).toLocaleString("id-ID")}
                </p>
              </div>
            )}

            {pks.status === "REJECTED" && pks.rejectedAt && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Ditolak Pada
                  </h3>
                  <p className="text-sm">
                    {new Date(pks.rejectedAt).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Alasan Penolakan
                  </h3>
                  <p className="text-sm">
                    {pks.reason || "Tidak ada alasan yang diberikan"}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Pratinjau Dokumen
            </h3>
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded">
              <FileText className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Pratinjau dokumen tidak tersedia. Klik tombol di bawah untuk
              melihat dokumen lengkap.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button
            onClick={() => {
              const finalUrl = pks.path.startsWith("http")
                ? pks.path
                : `${process.env.NEXT_PUBLIC_API_URL}${pks.path}`;
              window.open(finalUrl, "_blank");
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            Lihat Dokumen Lengkap
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
