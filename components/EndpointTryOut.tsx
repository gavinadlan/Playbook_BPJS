"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ApiEndpoint, Parameter, ParameterType } from "@/types/api";
import CodeBlock from "@/components/CodeBlock";
import { Circle as CircleNotch } from "lucide-react";

interface EndpointTryOutProps {
  endpoint: ApiEndpoint;
}

const EndpointTryOut: React.FC<EndpointTryOutProps> = ({ endpoint }) => {
  const [paramValues, setParamValues] = useState<Record<string, any>>({});
  const [requestBody, setRequestBody] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  useEffect(() => {
    // Initialize request body with example
    if (endpoint.method !== "GET" && Object.keys(endpoint.requestExample).length > 0) {
      setRequestBody(JSON.stringify(endpoint.requestExample, null, 2));
    }
    
    // Initialize parameter values with defaults
    const initialValues: Record<string, any> = {};
    endpoint.parameters.forEach(param => {
      if (param.defaultValue) {
        initialValues[param.name] = param.defaultValue;
      } else if (param.type === ParameterType.BOOLEAN) {
        initialValues[param.name] = false;
      } else if (param.in !== "path") {
        initialValues[param.name] = "";
      }
    });
    setParamValues(initialValues);
  }, [endpoint]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponse(JSON.stringify(endpoint.responseExample, null, 2));
      setStatusCode(200);
      setResponseTime(Math.floor(Math.random() * 500) + 100); // Random time between 100-600ms
      setLoading(false);
    }, 800);
  };

  const handleParamChange = (name: string, value: any) => {
    setParamValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Request Parameters</h2>
          
          {endpoint.parameters.length > 0 ? (
            <div className="grid gap-4">
              {endpoint.parameters
                .filter(param => param.in === "path")
                .map(param => (
                  <div key={param.name} className="space-y-2">
                    <Label htmlFor={param.name} className="flex items-center">
                      {param.name}
                      {param.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <Input
                      id={param.name}
                      placeholder={param.description}
                      value={paramValues[param.name] || ""}
                      onChange={(e) => handleParamChange(param.name, e.target.value)}
                      required={param.required}
                    />
                    <p className="text-xs text-gray-500">{param.description}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No path parameters required.</p>
          )}
        </div>

        {endpoint.parameters.some(param => param.in !== "path") && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Query Parameters</h2>
            <div className="grid gap-4">
              {endpoint.parameters
                .filter(param => param.in !== "path")
                .map(param => renderParamInput(param, paramValues, handleParamChange))}
            </div>
          </div>
        )}

        {endpoint.method !== "GET" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Request Body</h2>
            <Textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="font-mono h-60"
              placeholder="Enter JSON request body"
            />
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                Sending Request...
              </>
            ) : (
              "Send Request"
            )}
          </Button>
        </div>
      </form>

      {(response || loading) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Response</h2>
            {statusCode && (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  Status: <span className={statusCode >= 200 && statusCode < 300 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{statusCode}</span>
                </div>
                {responseTime && (
                  <div className="text-sm">
                    Time: <span className="text-gray-600 font-medium">{responseTime}ms</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center p-12">
              <CircleNotch className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-md">
              <CodeBlock code={response || ""} language="json" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function renderParamInput(
  param: Parameter, 
  values: Record<string, any>, 
  onChange: (name: string, value: any) => void
) {
  switch (param.type) {
    case ParameterType.BOOLEAN:
      return (
        <div key={param.name} className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor={param.name} className="flex items-center">
              {param.name}
              {param.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <p className="text-xs text-gray-500">{param.description}</p>
          </div>
          <Switch
            id={param.name}
            checked={values[param.name] || false}
            onCheckedChange={(checked) => onChange(param.name, checked)}
          />
        </div>
      );
      
    case ParameterType.INTEGER:
    case ParameterType.NUMBER:
      return (
        <div key={param.name} className="space-y-2">
          <Label htmlFor={param.name} className="flex items-center">
            {param.name}
            {param.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id={param.name}
            type="number"
            placeholder={param.description}
            value={values[param.name] || ""}
            onChange={(e) => onChange(param.name, e.target.value)}
            required={param.required}
          />
          <p className="text-xs text-gray-500">{param.description}</p>
        </div>
      );
      
    case ParameterType.ARRAY:
      return (
        <div key={param.name} className="space-y-2">
          <Label htmlFor={param.name} className="flex items-center">
            {param.name}
            {param.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Textarea
            id={param.name}
            placeholder={`Enter comma-separated values (e.g. value1,value2,value3)`}
            value={values[param.name] || ""}
            onChange={(e) => onChange(param.name, e.target.value)}
            required={param.required}
          />
          <p className="text-xs text-gray-500">{param.description}</p>
        </div>
      );
      
    default:
      return (
        <div key={param.name} className="space-y-2">
          <Label htmlFor={param.name} className="flex items-center">
            {param.name}
            {param.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id={param.name}
            placeholder={param.description}
            value={values[param.name] || ""}
            onChange={(e) => onChange(param.name, e.target.value)}
            required={param.required}
          />
          <p className="text-xs text-gray-500">{param.description}</p>
        </div>
      );
  }
}

export default EndpointTryOut;