"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Switch from "@/components/ui/switch";
import { Circle } from "lucide-react";
import { Parameter, ParameterType, ApiEndpoint } from "@/types/api";
import CodeBlock from "@/components/CodeBlock";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  // Generate Zod schema dari parameter
  const generateSchema = () => {
    const schema: Record<string, z.ZodTypeAny> = {};

    endpoint.parameters.forEach((param: Parameter) => {
      let validator: z.ZodTypeAny;

      switch (param.type) {
        case ParameterType.INTEGER:
          validator = z.coerce.number().int();
          break;
        case ParameterType.NUMBER:
          validator = z.coerce.number();
          break;
        case ParameterType.BOOLEAN:
          validator = z.boolean();
          break;
        case ParameterType.ARRAY:
          validator = z.array(z.string());
          break;
        default:
          validator = z.string();
      }

      if (!param.required) {
        validator = validator.optional();
      }

      schema[param.name] = validator;
    });

    return z.object(schema);
  };

  const schema = generateSchema();
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: paramValues,
  });

  useEffect(() => {
    const initialParams: Record<string, any> = {};
    endpoint.parameters.forEach((param: Parameter) => {
      if (param.defaultValue) {
        initialParams[param.name] = param.defaultValue;
      } else if (param.type === ParameterType.BOOLEAN) {
        initialParams[param.name] = false;
      } else {
        initialParams[param.name] = "";
      }
    });
    setParamValues(initialParams);

    // Set form values to initialParams
    Object.entries(initialParams).forEach(([key, value]) => {
      setValue(key, value);
    });

    if (endpoint.method !== "GET" && endpoint.requestExample) {
      setRequestBody(JSON.stringify(endpoint.requestExample, null, 2));
    }
  }, [endpoint, setValue]);

  const handleParamChange = (name: string, value: any) => {
    setParamValues((prev) => ({ ...prev, [name]: value }));
    setValue(name, value);
  };

  const onSubmit = (data: any) => {
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
      <form onSubmit={formSubmit(onSubmit)} className="space-y-6">
        {/* Path Params */}
        {endpoint.parameters.some((p: Parameter) => p.in === "path") && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Path Parameters</h2>
            <div className="grid gap-4">
              {endpoint.parameters
                .filter((p: Parameter) => p.in === "path")
                .map((param: Parameter) => (
                  <ParamInput
                    key={param.name}
                    param={param}
                    value={watch(param.name)}
                    onChange={handleParamChange}
                    register={register}
                    error={errors[param.name]}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Query Params */}
        {endpoint.parameters.some((p: Parameter) => p.in !== "path") && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Query Parameters</h2>
            <div className="grid gap-4">
              {endpoint.parameters
                .filter((p: Parameter) => p.in !== "path")
                .map((param: Parameter) => (
                  <ParamInput
                    key={param.name}
                    param={param}
                    value={watch(param.name)}
                    onChange={handleParamChange}
                    register={register}
                    error={errors[param.name]}
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
                      statusCode >= 200 && statusCode < 300
                        ? "text-green-600"
                        : "text-red-600"
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
  register: any;
  error: any;
}

const ParamInput: React.FC<ParamInputProps> = ({
  param,
  value,
  onChange,
  register,
  error,
}) => {
  if (param.type === ParameterType.BOOLEAN) {
    return (
      <div className="flex justify-between items-center">
        <Label>
          {param.name}
          {param.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div>
          <Switch
            checked={Boolean(value)}
            onToggle={(checked: boolean) => onChange(param.name, checked)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  }

  if (param.type === ParameterType.ARRAY) {
    return (
      <div className="space-y-2">
        <Label htmlFor={param.name}>
          {param.name}
          {param.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Textarea
          id={param.name}
          placeholder="Enter values separated by commas"
          value={value}
          onChange={(e) => onChange(param.name, e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={param.name}>
        {param.name}
        {param.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
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
        {...register(param.name)}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default EndpointTryOut;
