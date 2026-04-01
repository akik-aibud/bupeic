"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  setUser,
  logout as logoutAction,
  addUser as addUserAction,
  updateUser as updateUserAction,
  deleteUser as deleteUserAction,
  setLoading,
} from "./redux/slices/authSlice";
import type { User, Role } from "./types";
import { hasPermission } from "./types";

interface AuthHook {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  checkPermission: (permission: string) => boolean;
  getAllUsers: () => User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export function useAuth(): AuthHook {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const users = useAppSelector((state) => state.auth.users);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const login = useCallback(
    (email: string, password: string) => {
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) {
        return { success: false, error: "Invalid email or password" };
      }
      dispatch(setUser(found));
      return { success: true };
    },
    [users, dispatch]
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const checkPermission = useCallback(
    (permission: string) => {
      if (!user) return false;
      return hasPermission(user.role, permission);
    },
    [user]
  );

  const getAllUsers = useCallback(() => users, [users]);

  const addUser = useCallback(
    (newUser: User) => dispatch(addUserAction(newUser)),
    [dispatch]
  );

  const updateUser = useCallback(
    (id: string, updates: Partial<User>) =>
      dispatch(updateUserAction({ id, updates })),
    [dispatch]
  );

  const deleteUser = useCallback(
    (id: string) => dispatch(deleteUserAction(id)),
    [dispatch]
  );

  return {
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
  };
}

export function useRequireAuth() {
  return useAuth();
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

// Keep AuthProvider as a no-op wrapper for backward compat
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
