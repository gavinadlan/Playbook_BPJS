import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PKS } from "@/lib/adminData";
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
          <DialogTitle>PKS Document Details</DialogTitle>
          <DialogDescription>
            View the complete information for this PKS document
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Document</h3>
              <p className="text-sm">{pks.filename}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="text-sm">
                <StatusBadge status={pks.status} />
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Company</h3>
              <p className="text-sm">{pks.companyName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">User</h3>
              <p className="text-sm">{pks.user}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="text-sm">{pks.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Submitted</h3>
              <p className="text-sm">{pks.submittedAt}</p>
            </div>

            {pks.status === "Approved" && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Approved On
                </h3>
                <p className="text-sm">{pks.approvedAt}</p>
              </div>
            )}

            {pks.status === "Rejected" && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Rejected On
                  </h3>
                  <p className="text-sm">{pks.rejectedAt}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Reason for Rejection
                  </h3>
                  <p className="text-sm">
                    {pks.reason || "No reason provided"}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Document Preview
            </h3>
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded">
              <FileText className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Document preview not available. Click below to view the full
              document.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            View Full Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
