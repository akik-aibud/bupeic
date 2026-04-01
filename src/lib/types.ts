export type Role = "super_admin" | "admin" | "editor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  password: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "ongoing" | "completed" | "draft";
  category: "competition" | "workshop" | "seminar" | "networking" | "fest";
  image?: string;
  attendees: number;
  maxAttendees?: number;
  registrationLink?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
  social: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  order: number;
  category: "executive" | "committee" | "advisor";
  status: "active" | "alumni";
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
  repliedAt?: string;
  repliedBy?: string;
}

export interface SiteSettings {
  siteName: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    twitter: string;
  };
  announcement?: string;
}

export interface Stats {
  followers: number;
  events: number;
  members: number;
  partners: number;
}

// Role permissions
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  super_admin: [
    "manage_users",
    "manage_roles",
    "manage_events",
    "manage_team",
    "manage_messages",
    "manage_settings",
    "delete_anything",
    "view_dashboard",
  ],
  admin: [
    "manage_events",
    "manage_team",
    "manage_messages",
    "manage_settings",
    "view_dashboard",
  ],
  editor: [
    "manage_events",
    "manage_team",
    "view_messages",
    "view_dashboard",
  ],
};

export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canDelete(role: Role): boolean {
  return role === "super_admin" || role === "admin";
}

export function canManageUsers(role: Role): boolean {
  return role === "super_admin";
}
