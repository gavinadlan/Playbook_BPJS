"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { authFetch } from "@/utils/api";
import { Download, Eye } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { toast } from "@/hooks/use-toast";

interface PksSubmission {
  id: number;
  company: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  filename: string;
  path: string;
  reason?: string;
}

export default function PengajuanSayaPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<PksSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      authFetch(`http://localhost:3001/api/pks?userId=${user.id}`)
        .then((res: Response) => {
          if (res.status === 401) {
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then((data: PksSubmission[]) => {
          // Ambil array dari data.data jika ada, fallback ke data
          const arr = Array.isArray((data as any).data) ? (data as any).data : Array.isArray(data) ? data : [];
          setSubmissions(arr);
          setLoading(false);
        })
        .catch((error: Error) => {
          if (error.message === "Unauthorized") {
            window.location.href = "/login";
          }
          setLoading(false);
        });
    }
  }, [user?.id]);

  useSocket(
    user?.id ?? null,
    (data) => {
      // Refetch data PKS saat status update
      if (user?.id) {
        authFetch(`http://localhost:3001/api/pks?userId=${user.id}`)
          .then((res: Response) => res.json())
          .then((data: PksSubmission[]) => {
            const arr = Array.isArray((data as any).data) ? (data as any).data : Array.isArray(data) ? data : [];
            setSubmissions(arr);
          });
      }
      toast({ title: "Status PKS Update", description: `Status: ${data.status}` });
    },
    (notif) => {
      toast({ title: "Notifikasi", description: notif.message });
    }
  );

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <Card className="p-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#f7fafc] to-[#ebf4f8]">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-[#27447C] mb-6">
          Daftar Pengajuan PKS
        </h1>

        {!Array.isArray(submissions) || submissions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Belum ada pengajuan PKS
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{submission.company}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleDateString(
                      "id-ID"
                    )}
                  </p>

                  {submission.status === "REJECTED" && submission.reason && (
                    <p className="text-sm text-red-600">
                      Alasan ditolak: {submission.reason}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <StatusBadge status={submission.status} />

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const url = submission.path.startsWith("http")
                        ? submission.path
                        : `http://localhost:3001${submission.path}`;
                      window.open(url, "_blank");
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Dokumen
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
