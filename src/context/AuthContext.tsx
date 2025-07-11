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
  isAdmin?: boolean;
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

  // Hitung isAdmin berdasarkan role
  const isAdmin = user?.role === "ADMIN";

  const logout = async () => {
    setUser(null);
    // Hapus session di backend
    await fetch("http://localhost:3001/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    document.cookie =
      "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handleApiCall = async (url: string, options: RequestInit = {}) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
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
    // Saat mount, cek session user dari backend
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.data?.user) {
          setUser(data.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
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
