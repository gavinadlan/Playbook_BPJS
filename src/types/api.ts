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
  lastVisited: string | null; // ISO string dari backend
  createdAt: string; // ISO string dari backend
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
