"use client";

import type { ApiEndpoint } from "@/lib/api-docs-loader";

interface EndpointPageProps {
  endpoint: ApiEndpoint;
}

export default function EndpointPage({ endpoint }: EndpointPageProps) {
  // Parse description untuk extract informasi BPJS format
  const parseDescription = (description: string) => {
    const info = {
      fungsi: "",
      method: "",
      format: "",
      contentType: "",
      contohResponse: "",
    };

    // Split by lines dan cari informasi
    const lines = description.split("\n");

    lines.forEach((line) => {
      if (line.includes("**Fungsi:**")) {
        info.fungsi = line.replace("**Fungsi:**", "").trim();
      }
      if (line.includes("**Method:**")) {
        info.method = line.replace("**Method:**", "").trim();
      }
      if (line.includes("**Format:**")) {
        info.format = line.replace("**Format:**", "").trim();
      }
      if (line.includes("**Content-Type:**")) {
        info.contentType = line.replace("**Content-Type:**", "").trim();
      }
    });

    // Extract JSON example dari description
    const jsonMatch = description.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      try {
        // Format JSON dengan proper indentation
        const jsonObj = JSON.parse(jsonMatch[1]);
        info.contohResponse = JSON.stringify(jsonObj, null, 2);
      } catch (e) {
        info.contohResponse = jsonMatch[1];
      }
    }

    return info;
  };

  const descInfo = parseDescription(endpoint.description);
  const baseUrl = "{Base URL}"; // Anda bisa ganti dengan base URL sebenarnya

  return (
    <section className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto">
      {/* Header dengan nama endpoint */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">{endpoint.name}</h1>

        {/* URL dengan styling khusus */}
        <div className="mb-4">
          <span className="text-gray-600 italic">{baseUrl}</span>
          <span className="text-black font-bold">{endpoint.path}</span>
        </div>
      </div>

      {/* Informasi detail dalam format yang diminta */}
      <div className="mb-6 space-y-2">
        <div>
          <span className="text-gray-700">Fungsi : </span>
          <span className="text-gray-900">
            {descInfo.fungsi || endpoint.name}
          </span>
        </div>

        <div>
          <span className="text-gray-700">Method : </span>
          <span className="font-bold text-gray-900">
            {descInfo.method || endpoint.method.toUpperCase()}
          </span>
        </div>

        <div>
          <span className="text-gray-700">Format : </span>
          <span className="font-bold text-gray-900">
            {descInfo.format || "JSON"}
          </span>
        </div>

        <div>
          <span className="text-gray-700">Content-Type: </span>
          <span className="font-bold text-gray-900">
            {descInfo.contentType || "application/json"}
          </span>
        </div>
      </div>

      {/* Parameters jika ada */}
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Parameters</h2>
          <div className="space-y-2">
            {endpoint.parameters.map((param, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {param.name}
                  </span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {param.in}
                  </span>
                  {/* Assuming parameter has required property */}
                  {param.required !== false && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{param.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response example jika ada */}
      {descInfo.contohResponse && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Contoh Response</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{descInfo.contohResponse}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
