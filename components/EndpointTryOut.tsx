"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Circle } from "lucide-react";
import { ApiEndpoint, Parameter, ParameterType } from "@/types/api";
import CodeBlock from "@/components/CodeBlock";

interface EndpointTryOutProps {
  endpoint: ApiEndpoint;
}

const EndpointTryOut: React.FC<EndpointTryOutProps> = ({ endpoint }) => {
  const [paramValues, setParamValues] = useState<Record<string, any>>({});
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initialParams: Record<string, any> = {};
    endpoint.parameters.forEach((param) => {
      if (param.defaultValue) {
        initialParams[param.name] = param.defaultValue;
      } else if (param.type === ParameterType.BOOLEAN) {
        initialParams[param.name] = false;
      } else {
        initialParams[param.name] = "";
      }
    });
    setParamValues(initialParams);

    if (endpoint.method !== "GET" && endpoint.requestExample) {
      setRequestBody(JSON.stringify(endpoint.requestExample, null, 2));
    }
  }, [endpoint]);

  const handleParamChange = (name: string, value: any) => {
    setParamValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const start = Date.now();
    // Simulate request
    setTimeout(() => {
      setResponse(JSON.stringify(endpoint.responseExample, null, 2));
      setStatusCode(200);
      setResponseTime(Date.now() - start);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Path Params */}
        {endpoint.parameters.some((p) => p.in === "path") && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Path Parameters</h2>
            <div className="grid gap-4">
              {endpoint.parameters
                .filter((p) => p.in === "path")
                .map((param) => (
                  <ParamInput
                    key={param.name}
                    param={param}
                    value={paramValues[param.name]}
                    onChange={handleParamChange}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Query Params */}
        {endpoint.parameters.some((p) => p.in !== "path") && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Query Parameters</h2>
            <div className="grid gap-4">
              {endpoint.parameters
                .filter((p) => p.in !== "path")
                .map((param) => (
                  <ParamInput
                    key={param.name}
                    param={param}
                    value={paramValues[param.name]}
                    onChange={handleParamChange}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Body */}
        {endpoint.method !== "GET" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Request Body</h2>
            <Textarea
              className="font-mono h-64"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder="Enter request JSON body..."
            />
          </div>
        )}

        {/* Submit */}
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Circle className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Request"
            )}
          </Button>
        </div>
      </form>

      {/* Response */}
      {response && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Response</h2>
            <div className="flex items-center gap-4 text-sm">
              {statusCode && (
                <div>
                  Status:{" "}
                  <span
                    className={
                      statusCode >= 200 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {statusCode}
                  </span>
                </div>
              )}
              {responseTime && (
                <div>
                  Time: <span className="font-medium">{responseTime} ms</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-100 rounded-md p-4">
            <CodeBlock code={response} language="json" />
          </div>
        </div>
      )}
    </div>
  );
};

interface ParamInputProps {
  param: Parameter;
  value: any;
  onChange: (name: string, value: any) => void;
}

const ParamInput: React.FC<ParamInputProps> = ({ param, value, onChange }) => {
  if (param.type === ParameterType.BOOLEAN) {
    return (
      <div className="flex justify-between items-center">
        <Label htmlFor={param.name}>{param.name}</Label>
        <Switch
          id={param.name}
          checked={Boolean(value)}
          onCheckedChange={(checked) => onChange(param.name, checked)}
        />
      </div>
    );
  }

  if (param.type === ParameterType.ARRAY) {
    return (
      <div className="space-y-2">
        <Label htmlFor={param.name}>{param.name}</Label>
        <Textarea
          id={param.name}
          placeholder="Enter values separated by commas"
          value={value}
          onChange={(e) => onChange(param.name, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={param.name}>{param.name}</Label>
      <Input
        id={param.name}
        type={
          param.type === ParameterType.INTEGER ||
          param.type === ParameterType.NUMBER
            ? "number"
            : "text"
        }
        placeholder={param.description || ""}
        value={value}
        onChange={(e) => onChange(param.name, e.target.value)}
      />
    </div>
  );
};

export default EndpointTryOut;
