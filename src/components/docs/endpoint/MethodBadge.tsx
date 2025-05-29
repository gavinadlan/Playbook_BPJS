import { Badge } from "@/components/ui/badge";

export default function MethodBadge({ method }: { method: string }) {
  function getMethodBadgeStyle(method: string) {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-800";
      case "POST":
        return "bg-blue-100 text-blue-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <Badge className={`text-sm py-1 px-3 ${getMethodBadgeStyle(method)}`}>
      {method}
    </Badge>
  );
}
