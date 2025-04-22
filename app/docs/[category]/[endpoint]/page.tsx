"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Copy, CheckCheck, PlayCircle, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import EndpointTryOut from "@/components/EndpointTryOut";
import { findEndpoint, findCategory } from "@/lib/mock-data";
import { ApiEndpoint, Parameter, ParameterType } from "@/types/api";
import CodeBlock from "@/components/CodeBlock";

export default function EndpointPage() {
  const params = useParams();
  const categoryId = params?.category as string;
  const endpointId = params?.endpoint as string;

  const [endpoint, setEndpoint] = useState<ApiEndpoint | null>(null);
  const [category, setCategory] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (categoryId && endpointId) {
      const foundEndpoint = findEndpoint(categoryId, endpointId);
      const foundCategory = findCategory(categoryId);

      if (foundEndpoint) setEndpoint(foundEndpoint);
      if (foundCategory) setCategory(foundCategory);
    }
  }, [categoryId, endpointId]);

  const copyToClipboard = () => {
    if (!endpoint) return;

    navigator.clipboard.writeText(endpoint.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!endpoint || !category) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Alert>
          <AlertDescription>
            Endpoint not found. Please check the URL and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/docs" className="hover:text-blue-600 transition-colors">
          Documentation
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span>{category.name}</span>
        <ChevronRight className="h-4 w-4" />
        <span>{endpoint.name}</span>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">{endpoint.name}</h1>
          <Badge variant="outline" className="text-gray-700 border-gray-300">
            {category.name}
          </Badge>
        </div>
        <p className="text-gray-600">{endpoint.description}</p>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md mb-8">
        <div className="flex items-center space-x-3">
          <Badge
            className={`text-sm py-1 px-3 ${getMethodBadgeStyle(
              endpoint.method
            )}`}
          >
            {endpoint.method}
          </Badge>
          <span className="font-mono text-sm">{endpoint.path}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckCheck className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Tabs defaultValue="documentation">
        <TabsList className="mb-6">
          <TabsTrigger value="documentation">
            <Code className="h-4 w-4 mr-2" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="try-it-out">
            <PlayCircle className="h-4 w-4 mr-2" />
            Try It Out
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="space-y-8">
          {endpoint.parameters.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold">Parameters</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-2 border text-sm font-semibold">
                        Name
                      </th>
                      <th className="px-4 py-2 border text-sm font-semibold">
                        Type
                      </th>
                      <th className="px-4 py-2 border text-sm font-semibold">
                        Required
                      </th>
                      <th className="px-4 py-2 border text-sm font-semibold">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param: Parameter) => (
                      <tr key={param.name} className="border-b">
                        <td className="px-4 py-3 border text-sm font-mono">
                          {param.name}
                          {param.in === "path" && (
                            <Badge variant="outline" className="ml-2">
                              path
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 border text-sm">
                          {param.type}
                        </td>
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
          )}

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
                    <CodeBlock
                      code={generateCurlExample(endpoint)}
                      language="bash"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold">Code Examples</h2>

            <Tabs defaultValue="javascript">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="java">Java</TabsTrigger>
                <TabsTrigger value="php">PHP</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <CodeBlock
                    code={generateJSExample(endpoint)}
                    language="javascript"
                  />
                </div>
              </TabsContent>

              <TabsContent value="python" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <CodeBlock
                    code={generatePythonExample(endpoint)}
                    language="python"
                  />
                </div>
              </TabsContent>

              <TabsContent value="java" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <CodeBlock
                    code={generateJavaExample(endpoint)}
                    language="java"
                  />
                </div>
              </TabsContent>

              <TabsContent value="php" className="mt-4">
                <div className="p-4 bg-gray-50 rounded-md">
                  <CodeBlock
                    code={generatePHPExample(endpoint)}
                    language="php"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </TabsContent>

        <TabsContent value="try-it-out">
          <EndpointTryOut endpoint={endpoint} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper functions

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

function generateCurlExample(endpoint: ApiEndpoint): string {
  const baseUrl = "https://api.bpjs-kesehatan.go.id/v1";
  const url = `${baseUrl}${endpoint.path}`;

  let curlCmd = `curl -X ${endpoint.method} "${url}"`;

  // Add headers
  curlCmd += ` \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`;

  // Add body for non-GET requests
  if (
    endpoint.method !== "GET" &&
    Object.keys(endpoint.requestExample).length > 0
  ) {
    curlCmd += ` \\\n  -d '${JSON.stringify(endpoint.requestExample)}'`;
  }

  return curlCmd;
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

function generatePythonExample(endpoint: ApiEndpoint): string {
  const baseUrl = "https://api.bpjs-kesehatan.go.id/v1";
  const url = `${baseUrl}${endpoint.path}`;
  const hasBody =
    endpoint.method !== "GET" &&
    Object.keys(endpoint.requestExample).length > 0;

  return `import requests
import json

def call_${toSnakeCase(endpoint.id)}():
    url = "${url}"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_ACCESS_TOKEN"
    }
    ${
      hasBody
        ? `
    payload = ${JSON.stringify(endpoint.requestExample, null, 4)}
    response = requests.${endpoint.method.toLowerCase()}(url, headers=headers, json=payload)`
        : `
    response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`
    }
    
    data = response.json()
    print(data)
    return data

# Call the function
if __name__ == "__main__":
    call_${toSnakeCase(endpoint.id)}()`;
}

function generateJavaExample(endpoint: ApiEndpoint): string {
  const baseUrl = "https://api.bpjs-kesehatan.go.id/v1";
  const url = `${baseUrl}${endpoint.path}`;
  const hasBody =
    endpoint.method !== "GET" &&
    Object.keys(endpoint.requestExample).length > 0;

  return `import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ${toPascalCase(endpoint.id)}Example {

    public static void main(String[] args) {
        try {
            call${toPascalCase(endpoint.id)}();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void call${toPascalCase(
      endpoint.id
    )}() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        ${
          hasBody
            ? `
        String requestBody = "${JSON.stringify(endpoint.requestExample).replace(
          /"/g,
          '\\"'
        )}";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${url}"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer YOUR_ACCESS_TOKEN")
                .${endpoint.method.toLowerCase()}(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();`
            : `
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${url}"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer YOUR_ACCESS_TOKEN")
                .${endpoint.method.toLowerCase()}(HttpRequest.BodyPublishers.noBody())
                .build();`
        }

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`;
}

function generatePHPExample(endpoint: ApiEndpoint): string {
  const baseUrl = "https://api.bpjs-kesehatan.go.id/v1";
  const url = `${baseUrl}${endpoint.path}`;
  const hasBody =
    endpoint.method !== "GET" &&
    Object.keys(endpoint.requestExample).length > 0;

  return `<?php
function call${toPascalCase(endpoint.id)}() {
    $url = "${url}";
    
    $headers = array(
        "Content-Type: application/json",
        "Authorization: Bearer YOUR_ACCESS_TOKEN"
    );
    
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "${endpoint.method}",
        CURLOPT_HTTPHEADER => $headers,${
          hasBody
            ? `
        CURLOPT_POSTFIELDS => json_encode(${JSON.stringify(
          endpoint.requestExample,
          null,
          12
        )}),`
            : ""
        }
    ));
    
    $response = curl_exec($curl);
    $error = curl_error($curl);
    
    curl_close($curl);
    
    if ($error) {
        echo "cURL Error: " . $error;
        return false;
    }
    
    return json_decode($response, true);
}

// Call the function
$response = call${toPascalCase(endpoint.id)}();
print_r($response);
?>`;
}

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toSnakeCase(str: string): string {
  return str.replace(/-/g, "_");
}
