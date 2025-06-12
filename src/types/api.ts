import { z } from "zod";

export enum ParameterType {
  STRING = "string",
  INTEGER = "integer",
  NUMBER = "number",
  BOOLEAN = "boolean",
  ARRAY = "array",
  OBJECT = "object",
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

export interface User {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  lastVisited: string | null;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: any;
}

export interface PKS {
  id: number;
  filename: string;
  path: string;
  company: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  reason?: string;
  userId: number;
  user: {
    id: number;
    name?: string;
    email: string;
  } | null;
}

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  description: string;
  link: string;
}

export interface DashboardActivity {
  user: string;
  action: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  activities: DashboardActivity[];
  summary: {
    totalUsers: number;
    totalPks: number;
    pendingPks: number;
    approvedPks: number;
    rejectedPks: number;
  };
}

// Skema untuk response login
export const LoginResponseSchema = z.object({
  message: z.string().optional(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(["USER", "ADMIN"]),
  }),
  token: z.string(),
});

// Type untuk LoginResponse
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Skema untuk response registrasi
export const RegisterResponseSchema = z.object({
  message: z.string(),
});

// Skema untuk response error umum
export const ErrorResponseSchema = z.object({
  message: z.string(),
  error: z.any().optional(),
});

// Skema untuk response PKS
export const PKSResponseSchema = z.object({
  id: z.number(),
  filename: z.string(),
  path: z.string(),
  company: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  submittedAt: z.string(),
  approvedAt: z.string().optional(),
  rejectedAt: z.string().optional(),
  reason: z.string().optional(),
  userId: z.number(),
});

// Skema untuk response user
export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  lastVisited: z.string().nullable(),
  createdAt: z.string(),
});
