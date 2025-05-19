import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/CodeBlock";
import { ApiEndpoint } from "@/types/api";

export default function CodeExamples({ endpoint }: { endpoint: ApiEndpoint }) {
  function toPascalCase(str: string) {
    return str.replace(/(^\w|-\w)/g, (match) =>
      match.replace("-", "").toUpperCase()
    );
  }

  function generateJSExample(endpoint: ApiEndpoint): string {
    const baseUrl = "https://api.bpjs-kesehatan.go.id/v1";
    const url = `${baseUrl}${endpoint.path}`;
    const hasBody =
      endpoint.method !== "GET" &&
      Object.keys(endpoint.requestExample).length > 0;

    return `// Using fetch API
async function call${toPascalCase(endpoint.id)}() {
  const response = await fetch("${url}", {
    method: "${endpoint.method}",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_ACCESS_TOKEN"
    }${
      hasBody
        ? `,
    body: JSON.stringify(${JSON.stringify(
      endpoint.requestExample,
      null,
      6
    ).replace(/"([^"]+)":/g, "$1:")})`
        : ""
    }
  });
  
  const data = await response.json();
  console.log(data);
  return data;
}

// Call the function
call${toPascalCase(endpoint.id)}().catch(error => console.error(error));`;
  }

  function toSnakeCase(str: string) {
    return str
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/^_/, "");
  }

  function generatePythonExample(endpoint: ApiEndpoint): string {
    const baseUrl = "https://api.bpjs-kesehatan.go.id/v1";
    const url = `${baseUrl}${endpoint.path}`;
    const hasBody =
      endpoint.method !== "GET" &&
      Object.keys(endpoint.requestExample).length > 0;

    return `import requests

url = "${url}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
${
  hasBody ? `payload = ${JSON.stringify(endpoint.requestExample, null, 4)}` : ""
}
response = requests.${endpoint.method.toLowerCase()}(url, headers=headers${
      hasBody ? ", json=payload" : ""
    })

print(response.json())`;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Code Examples</h2>

      <Tabs defaultValue="javascript" className="w-full">
        <TabsList>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
        </TabsList>

        <TabsContent value="javascript">
          <CodeBlock code={generateJSExample(endpoint)} language="javascript" />
        </TabsContent>

        <TabsContent value="python">
          <CodeBlock code={generatePythonExample(endpoint)} language="python" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
