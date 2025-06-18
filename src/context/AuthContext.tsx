"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "@/components/ui/sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAdmin: boolean;
  logout: () => void;
  isLoading: boolean;
  handleApiCall: (url: string, options?: RequestInit) => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = user?.role === "ADMIN";

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    document.cookie =
      "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleApiCall = async (url: string, options: RequestInit = {}) => {
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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);

          const tokenExpiry = localStorage.getItem("tokenExpiry");
          if (tokenExpiry && new Date() > new Date(tokenExpiry)) {
            throw new Error("Token expired locally");
          }

          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        logout,
        isLoading,
        handleApiCall,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
