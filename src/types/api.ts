export enum ParameterType {
  STRING = "string",
  INTEGER = "integer",
  NUMBER = "number",
  BOOLEAN = "boolean",
  ARRAY = "array",
  OBJECT = "object"
}

export interface Parameter {
  name: string;
  type: ParameterType;
  required: boolean;
  description: string;
  defaultValue?: string;
  in?: "path" | "query" | "header" | "body";
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  parameters: Parameter[];
  requestExample: Record<string, any>;
  responseExample: Record<string, any>;
  categoryId?: string;
  categoryName?: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  description: string;
  endpoints: ApiEndpoint[];
}