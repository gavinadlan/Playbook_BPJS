import MethodBadge from "./MethodBadge";
import ParametersTable from "./ParametersTable";
import RequestResponseAccordion from "./RequestResponseAccordion";
import CodeExamples from "./CodeExamples";
import { ApiEndpoint } from "@/types/api";

export default function EndpointDetails({
  endpoint,
}: {
  endpoint: ApiEndpoint;
}) {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">{endpoint.name}</h1>
        <p className="mt-2 text-gray-700">{endpoint.description}</p>
        <div className="mt-3">
          <MethodBadge method={endpoint.method} />
        </div>
      </header>

      <ParametersTable parameters={endpoint.parameters} />

      <RequestResponseAccordion endpoint={endpoint} />

      <CodeExamples endpoint={endpoint} />
    </article>
  );
}
