"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const dummyPKS = [
  { id: 1, user: "John Doe", filename: "document_1.pdf", status: "Pending" },
  { id: 2, user: "Jane Smith", filename: "agreement.pdf", status: "Approved" },
];

export default function PKSPage() {
  const router = useRouter();
  const [pksList, setPksList] = useState(dummyPKS);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isAdmin) router.push("/admin");
  }, [router]);

  const handleApprove = (id: number) => {
    setPksList((list) =>
      list.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handleReject = (id: number) => {
    setPksList((list) =>
      list.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">PKS Approvals</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Filename</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pksList.map((pks) => (
              <tr key={pks.id}>
                <td className="px-6 py-4">{pks.filename}</td>
                <td className="px-6 py-4">{pks.user}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      pks.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : pks.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {pks.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleApprove(pks.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(pks.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
