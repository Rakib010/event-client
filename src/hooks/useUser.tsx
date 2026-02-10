"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface IUser {
  userId: string;
  role: "user" | "host" | "admin";
  email: string;
}

interface IUserContext {
  user: IUser | null;
  loading: boolean;
  reload: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/user/get-me");
      // Backend returns { success, statusCode, message, data }
      // The actual user data is in res.data.data
      const userData = res.data.data;

      // Map backend user data to frontend user structure
      setUser({
        userId: userData._id,
        role: userData.role,
        email: userData.email,
      });
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, reload: load }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
