import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CodeBlock from "@/components/CodeBlock";
import { ApiEndpoint } from "@/types/api";

export default function RequestResponseAccordion({
  endpoint,
}: {
  endpoint: ApiEndpoint;
}) {
  function generateCurlExample(endpoint: ApiEndpoint): string {
    const baseUrl = "https://api.bpjs-kesehatan.go.id/v1";
    const url = `${baseUrl}${endpoint.path}`;

    let curlCmd = `curl -X ${endpoint.method} "${url}"`;

    curlCmd += ` \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`;

    if (
      endpoint.method !== "GET" &&
      Object.keys(endpoint.requestExample).length > 0
    ) {
      curlCmd += ` \\\n  -d '${JSON.stringify(endpoint.requestExample)}'`;
    }

    return curlCmd;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Request & Response</h2>

      <Accordion type="single" collapsible defaultValue="request-example">
        <AccordionItem value="request-example">
          <AccordionTrigger>Request Example</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 bg-gray-50 rounded-md">
              <CodeBlock
                code={JSON.stringify(endpoint.requestExample, null, 2)}
                language="json"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="response-example">
          <AccordionTrigger>Response Example</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 bg-gray-50 rounded-md">
              <CodeBlock
                code={JSON.stringify(endpoint.responseExample, null, 2)}
                language="json"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="curl-example">
          <AccordionTrigger>cURL Example</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 bg-gray-50 rounded-md">
              <CodeBlock code={generateCurlExample(endpoint)} language="bash" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
