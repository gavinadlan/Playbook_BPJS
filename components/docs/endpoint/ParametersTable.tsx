import { Badge } from "@/components/ui/badge";
import { Parameter } from "@/types/api";

export default function ParametersTable({
  parameters,
}: {
  parameters: Parameter[];
}) {
  if (!parameters || parameters.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Parameters</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-2 border text-sm font-semibold">Name</th>
              <th className="px-4 py-2 border text-sm font-semibold">Type</th>
              <th className="px-4 py-2 border text-sm font-semibold">
                Required
              </th>
              <th className="px-4 py-2 border text-sm font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param) => (
              <tr key={param.name} className="border-b">
                <td className="px-4 py-3 border text-sm font-mono">
                  {param.name}
                  {param.in === "path" && (
                    <Badge variant="outline" className="ml-2">
                      path
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-3 border text-sm">{param.type}</td>
                <td className="px-4 py-3 border text-sm">
                  {param.required ? (
                    <Badge
                      variant="default"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                      Required
                    </Badge>
                  ) : (
                    <Badge variant="outline">Optional</Badge>
                  )}
                </td>
                <td className="px-4 py-3 border text-sm">
                  {param.description}
                  {param.defaultValue && (
                    <div className="mt-1 text-xs text-gray-500">
                      Default:{" "}
                      <code className="bg-gray-100 px-1 py-0.5 rounded">
                        {param.defaultValue}
                      </code>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
