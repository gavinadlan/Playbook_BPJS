import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "APPROVE" | "REJECT";
  onConfirm: () => void;
  reason?: string;
  onReasonChange?: (reason: string) => void;
}

export const ConfirmationDialog = ({
  open,
  onOpenChange,
  type,
  onConfirm,
  reason = "",
  onReasonChange,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "APPROVE" ? "Setujui PKS" : "Tolak PKS"}
          </DialogTitle>
          <DialogDescription>
            Apakah yakin {type === "APPROVE" ? "menyetujui" : "menolak"} dokumen
            ini?
          </DialogDescription>
        </DialogHeader>

        {type === "REJECT" && (
          <div className="grid gap-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Alasan Penolakan
            </label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => onReasonChange?.(e.target.value)}
              placeholder="Masukkan alasan penolakan"
              required
            />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tidak
          </Button>
          <Button
            onClick={onConfirm}
            variant={type === "APPROVE" ? "default" : "destructive"}
            disabled={type === "REJECT" && !reason.trim()}
          >
            Ya
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
