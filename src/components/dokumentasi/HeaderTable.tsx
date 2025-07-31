import React from "react";

interface HeaderInfo {
  name: string;
  value: string;
  description: string;
}

interface HeaderTableProps {
  headers: HeaderInfo[];
  title?: string;
}

export default function HeaderTable({ headers, title = "Required Headers" }: HeaderTableProps) {
  return (
    <div>
      <h3 className="font-semibold text-[rgb(73,163,90)] mb-3 flex items-center gap-2">
        <span className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
        {title}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 w-12">
                #
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Nama Header
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Nilai
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            {headers.map((header, index) => (
              <tr key={header.name} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600 font-medium">
                  {index + 1}
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className="font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                    {header.name}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3">
                  <span className="font-mono bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm break-all">
                    {header.value}
                  </span>
                </td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">
                  {header.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 