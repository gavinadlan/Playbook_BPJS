import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";

export const useApi = () => {
  const { logout } = useAuth();

  const apiCall = async (url: string, options: RequestInit = {}) => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      // Handle expired token globally
      if (response.status === 401 && data.expired) {
        toast.error("Session expired after 12 hours. Please login again.");
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return null;
      }

      return { response, data };
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  };

  return { apiCall };
};
