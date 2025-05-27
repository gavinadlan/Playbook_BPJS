"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Download, Clock, CheckCircle2, XCircle } from "lucide-react";

interface PksSubmission {
  id: number;
  company: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  filename: string;
  path: string;
}

export default function PengajuanSayaPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<PksSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3001/api/pks?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setSubmissions(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

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

        {submissions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Belum ada pengajuan PKS
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">{submission.company}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      submission.status === "APPROVED"
                        ? "success"
                        : submission.status === "REJECTED"
                        ? "destructive"
                        : "warning"
                    }
                    className="flex items-center gap-2"
                  >
                    {getStatusIcon(submission.status)}
                    {submission.status}
                  </Badge>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(
                        `http://localhost:3001${submission.path}`,
                        "_blank"
                      )
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
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
