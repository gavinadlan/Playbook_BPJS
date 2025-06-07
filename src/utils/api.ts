import { PKS, DashboardData, User } from "@/types/api";

const BACKEND_BASE_URL = "http://localhost:3001";

export const authFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const isBackendAPI =
    url.startsWith("/api/pks") ||
    url.startsWith("/api/admin") ||
    url.startsWith("/api/users");

  const finalUrl = isBackendAPI ? `${BACKEND_BASE_URL}${url}` : url;

  return fetch(finalUrl, {
    ...options,
    headers,
    credentials: "include",
  });
};

// PKS Functions
export const fetchPKSData = async (): Promise<PKS[]> => {
  try {
    const response = await authFetch("/api/admin/pks", { method: "GET" });

    if (!response.ok) {
      throw new Error("Gagal mengambil data PKS");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching PKS data:", error);
    throw error;
  }
};

export const updatePKSStatus = async (
  id: number,
  status: "APPROVED" | "REJECTED",
  reason?: string
): Promise<PKS> => {
  try {
    const response = await authFetch(`/api/admin/pks/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, reason }),
    });

    if (!response.ok) {
      throw new Error("Gagal mengupdate status PKS");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating PKS status:", error);
    throw error;
  }
};

// Dashboard Functions
export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await authFetch("/api/admin/dashboard", { method: "GET" });

    if (!response.ok) {
      throw new Error("Gagal mengambil data dashboard");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

// User Management Functions
export const fetchUsersData = async (): Promise<User[]> => {
  try {
    const response = await authFetch("/api/admin/users", { method: "GET" });

    if (!response.ok) {
      throw new Error("Gagal mengambil data users");
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await authFetch(`/api/admin/users/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data user");
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  userData: Partial<
    Pick<User, "name" | "email" | "role"> & { password?: string }
  >
): Promise<User> => {
  try {
    const response = await authFetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengupdate user");
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const response = await authFetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal menghapus user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
