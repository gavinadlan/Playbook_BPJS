import { PKS } from "@/types/api";

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
    url.startsWith("/api/pks") || url.startsWith("/api/admin");

  const finalUrl = isBackendAPI ? `${BACKEND_BASE_URL}${url}` : url;

  return fetch(finalUrl, {
    ...options,
    headers,
    credentials: "include",
  });
};

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
      body: JSON.stringify({ status, reason }), // Kirim reason ke backend
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
