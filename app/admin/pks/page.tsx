"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const dummyPKS = [
  {
    id: 1,
    user: "John Doe",
    companyName: "ABC Corporation",
    filename: "agreement_abc_2024.pdf",
    status: "Pending",
    submittedAt: "2024-05-10",
    type: "Renewal",
  },
  {
    id: 2,
    user: "Jane Smith",
    companyName: "XYZ Ltd",
    filename: "contract_xyz_2024.pdf",
    status: "Approved",
    submittedAt: "2024-05-05",
    approvedAt: "2024-05-07",
    type: "New",
  },
  {
    id: 3,
    user: "Robert Johnson",
    companyName: "123 Industries",
    filename: "pks_123_2024.pdf",
    status: "Rejected",
    submittedAt: "2024-05-01",
    rejectedAt: "2024-05-03",
    reason: "Incomplete documentation",
    type: "New",
  },
  {
    id: 4,
    user: "Emily Davis",
    companyName: "Tech Solutions",
    filename: "agreement_tech_2024.pdf",
    status: "Pending",
    submittedAt: "2024-05-12",
    type: "Amendment",
  },
  {
    id: 5,
    user: "Michael Brown",
    companyName: "Global Services",
    filename: "contract_global_2024.pdf",
    status: "Approved",
    submittedAt: "2024-04-28",
    approvedAt: "2024-05-01",
    type: "Renewal",
  },
];

export default function PKSPage() {
  const router = useRouter();
  const [pksList, setPksList] = useState(dummyPKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPKS, setSelectedPKS] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isAdmin) router.push("/admin");
  }, [router]);

  const handleApprove = (id) => {
    setPksList((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Approved",
              approvedAt: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
    setIsApproveDialogOpen(false);
  };

  const handleReject = (id) => {
    setPksList((list) =>
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Rejected",
              rejectedAt: new Date().toISOString().split("T")[0],
              reason: rejectReason,
            }
          : item
      )
    );
    setIsRejectDialogOpen(false);
    setRejectReason("");
  };

  // Filter PKS based on search term and active tab
  const filteredPKS = pksList.filter((pks) => {
    const matchesSearch =
      pks.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pks.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pks.companyName.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return (
      matchesSearch && pks.status.toLowerCase() === activeTab.toLowerCase()
    );
  });

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <Badge
            className="bg-green-100 text-green-800 hover:bg-green-200"
            variant="outline"
          >
            Approved
          </Badge>
        );
      case "Rejected":
        return (
          <Badge
            className="bg-red-100 text-red-800 hover:bg-red-200"
            variant="outline"
          >
            Rejected
          </Badge>
        );
      case "Pending":
        return (
          <Badge
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            variant="outline"
          >
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get counts for tabs
  const counts = {
    all: pksList.length,
    pending: pksList.filter((pks) => pks.status === "Pending").length,
    approved: pksList.filter((pks) => pks.status === "Approved").length,
    rejected: pksList.filter((pks) => pks.status === "Rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">PKS Approvals</h1>
        <p className="text-gray-500">
          Review and manage PKS (Perjanjian Kerja Sama) documents
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>PKS Documents</CardTitle>
              <CardDescription>
                Showing {filteredPKS.length} documents
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-2">
                <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({counts.pending})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({counts.approved})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected ({counts.rejected})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="pt-2">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPKS.map((pks) => (
                        <TableRow key={pks.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            {pks.filename}
                          </TableCell>
                          <TableCell>{pks.companyName}</TableCell>
                          <TableCell>{pks.user}</TableCell>
                          <TableCell>{pks.type}</TableCell>
                          <TableCell>{getStatusBadge(pks.status)}</TableCell>
                          <TableCell>{pks.submittedAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedPKS(pks);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {pks.status === "Pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => {
                                      setSelectedPKS(pks);
                                      setIsApproveDialogOpen(true);
                                    }}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => {
                                      setSelectedPKS(pks);
                                      setIsRejectDialogOpen(true);
                                    }}
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
                </div>
              </TabsContent>

              {/* Other tabs content will be identical to "all" but filtered by status */}
              <TabsContent value="pending" className="pt-2">
                {/* Same table structure as "all" tab */}
              </TabsContent>
              <TabsContent value="approved" className="pt-2">
                {/* Same table structure as "all" tab */}
              </TabsContent>
              <TabsContent value="rejected" className="pt-2">
                {/* Same table structure as "all" tab */}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredPKS.length} of {pksList.length} documents
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* View PKS Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>PKS Document Details</DialogTitle>
            <DialogDescription>
              View the complete information for this PKS document
            </DialogDescription>
          </DialogHeader>

          {selectedPKS && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Document
                  </h3>
                  <p className="text-sm">{selectedPKS.filename}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="text-sm">
                    {getStatusBadge(selectedPKS.status)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="text-sm">{selectedPKS.companyName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">User</h3>
                  <p className="text-sm">{selectedPKS.user}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="text-sm">{selectedPKS.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Submitted
                  </h3>
                  <p className="text-sm">{selectedPKS.submittedAt}</p>
                </div>

                {selectedPKS.status === "Approved" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Approved On
                    </h3>
                    <p className="text-sm">{selectedPKS.approvedAt}</p>
                  </div>
                )}

                {selectedPKS.status === "Rejected" && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Rejected On
                      </h3>
                      <p className="text-sm">{selectedPKS.rejectedAt}</p>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Reason for Rejection
                      </h3>
                      <p className="text-sm">
                        {selectedPKS.reason || "No reason provided"}
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
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            <Button>
              <Eye className="h-4 w-4 mr-2" />
              View Full Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve PKS Dialog */}
      <AlertDialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve PKS Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this PKS document? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedPKS && (
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="text-sm mb-1">
                <span className="font-medium">Document:</span>{" "}
                {selectedPKS.filename}
              </p>
              <p className="text-sm">
                <span className="font-medium">Company:</span>{" "}
                {selectedPKS.companyName}
              </p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-600 hover:bg-green-700"
              onClick={() => selectedPKS && handleApprove(selectedPKS.id)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject PKS Dialog */}
      <AlertDialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject PKS Document</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this PKS document.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedPKS && (
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="text-sm mb-1">
                <span className="font-medium">Document:</span>{" "}
                {selectedPKS.filename}
              </p>
              <p className="text-sm">
                <span className="font-medium">Company:</span>{" "}
                {selectedPKS.companyName}
              </p>
            </div>
          )}

          <div className="mb-4">
            <Textarea
              placeholder="Enter reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-24"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => selectedPKS && handleReject(selectedPKS.id)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
