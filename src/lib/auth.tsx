"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Role } from "./types";
import { defaultUsers } from "./data";
import { hasPermission } from "./types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  checkPermission: (permission: string) => boolean;
  getAllUsers: () => User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

type AuthContext = AuthState & AuthActions;

const AuthCtx = createContext<AuthContext | null>(null);

const AUTH_KEY = "bupeic_auth";
const USERS_KEY = "bupeic_users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(defaultUsers);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(USERS_KEY);
      if (storedUsers) setUsers(JSON.parse(storedUsers));

      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (users !== defaultUsers) {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }, [users]);

  const login = useCallback(
    (email: string, password: string) => {
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) {
        return { success: false, error: "Invalid email or password" };
      }
      setUser(found);
      localStorage.setItem(AUTH_KEY, JSON.stringify(found));
      return { success: true };
    },
    [users]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const checkPermission = useCallback(
    (permission: string) => {
      if (!user) return false;
      return hasPermission(user.role, permission);
    },
    [user]
  );

  const getAllUsers = useCallback(() => users, [users]);

  const addUser = useCallback((newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  return (
    <AuthCtx.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkPermission,
        getAllUsers,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth(): AuthContext {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useRequireAuth() {
  const auth = useAuth();
  return auth;
}

export function getRoleBadgeColor(role: Role): string {
  switch (role) {
    case "super_admin":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "admin":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "editor":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  }
}

export function getRoleLabel(role: Role): string {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "admin":
      return "Admin";
    case "editor":
      return "Editor";
  }
}
