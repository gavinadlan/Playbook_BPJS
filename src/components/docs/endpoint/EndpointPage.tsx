"use client";

import type { ApiEndpoint } from "@/lib/api-docs-loader";

interface EndpointPageProps {
  endpoint: ApiEndpoint;
}

// Komponen untuk menampilkan parameter
const ParameterItem = ({ param }: { param: any }) => (
  <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 mb-2">
    <div className="flex items-center gap-2 mb-1">
      <span className="font-medium text-gray-900">{param.name}</span>
      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{param.in}</span>
      {param.required && (
        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
          Required
        </span>
      )}
    </div>
    <p className="text-sm text-gray-600 mb-1">{param.description}</p>
    {param.schema && (
      <div className="text-xs text-gray-500">
        Type: {param.schema.type}
        {param.schema.format && ` (${param.schema.format})`}
        {param.schema.example && ` | Example: ${param.schema.example}`}
      </div>
    )}
  </div>
);

export default function EndpointPage({ endpoint }: EndpointPageProps) {
  // Parse description untuk extract informasi BPJS format
  const parseDescription = (description: string) => {
    const info = {
      fungsi: "",
      method: "",
      format: "",
      contentType: "",
      contohRequest: "",
      contohResponse: "",
    };

    // Gunakan regex untuk penanganan yang lebih robust
    const fungsiMatch = description.match(/\*\*Fungsi:\*\*\s*(.*?)(\n|$)/);
    const methodMatch = description.match(/\*\*Method:\*\*\s*(.*?)(\n|$)/);
    const formatMatch = description.match(/\*\*Format:\*\*\s*(.*?)(\n|$)/);
    const contentTypeMatch = description.match(
      /\*\*Content-Type:\*\*\s*(.*?)(\n|$)/
    );

    if (fungsiMatch) info.fungsi = fungsiMatch[1].trim();
    if (methodMatch) info.method = methodMatch[1].trim();
    if (formatMatch) info.format = formatMatch[1].trim();
    if (contentTypeMatch) info.contentType = contentTypeMatch[1].trim();

    // Extract JSON examples dari description
    const jsonMatches = description.match(/```json\n([\s\S]*?)\n```/g);

    if (jsonMatches) {
      try {
        // Contoh request (biasanya pertama)
        if (jsonMatches.length > 0) {
          const jsonText = jsonMatches[0].replace(/```json\n|\n```/g, "");
          try {
            info.contohRequest = JSON.stringify(JSON.parse(jsonText), null, 2);
          } catch {
            info.contohRequest = jsonText;
          }
        }

        // Contoh response (biasanya kedua)
        if (jsonMatches.length > 1) {
          const jsonText = jsonMatches[1].replace(/```json\n|\n```/g, "");
          try {
            info.contohResponse = JSON.stringify(JSON.parse(jsonText), null, 2);
          } catch {
            info.contohResponse = jsonText;
          }
        }
      } catch (e) {
        console.error("Error parsing JSON examples", e);
      }
    }

    return info;
  };

  const descInfo = parseDescription(endpoint.description);
  const baseUrl = "https://apijkn-dev.bpjs-kesehatan.go.id";

  // Prioritaskan contoh dari loader, fallback ke description
  const contohRequest = endpoint.requestExample
    ? JSON.stringify(endpoint.requestExample, null, 2)
    : descInfo.contohRequest;

  const contohResponse = endpoint.responseExample
    ? JSON.stringify(endpoint.responseExample, null, 2)
    : descInfo.contohResponse;

  return (
    <section className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto">
      {/* Header dengan nama endpoint */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">{endpoint.name}</h1>

        {/* URL dengan styling khusus */}
        <div className="mb-4 bg-gray-50 p-3 rounded-md">
          <div className="flex items-center gap-2">
            <span className="font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {endpoint.method}
            </span>
            <span className="text-gray-900 font-mono">
              {baseUrl}
              {endpoint.path}
            </span>
          </div>
        </div>
      </div>

      {/* Informasi detail dalam format yang diminta */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-gray-700 block mb-1">Fungsi: </span>
          <span className="text-gray-900 font-medium">
            {descInfo.fungsi || endpoint.name}
          </span>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-gray-700 block mb-1">Method: </span>
          <span className="font-bold text-gray-900">
            {descInfo.method || endpoint.method.toUpperCase()}
          </span>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-gray-700 block mb-1">Format: </span>
          <span className="font-bold text-gray-900">
            {descInfo.format || "JSON"}
          </span>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <span className="text-gray-700 block mb-1">Content-Type: </span>
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
              <ParameterItem key={index} param={param} />
            ))}
          </div>
        </div>
      )}

      {/* Contoh Request jika ada */}
      {contohRequest && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Contoh Request</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{contohRequest}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Response example jika ada */}
      {contohResponse && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Contoh Response</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{contohResponse}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
