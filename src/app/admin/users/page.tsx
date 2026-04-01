"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ShieldAlert,
  Shield,
  Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useAuth, getRoleBadgeColor, getRoleLabel } from "@/lib/auth";
import { canManageUsers } from "@/lib/types";
import type { User, Role } from "@/lib/types";

const ROLES: Role[] = ["super_admin", "admin", "editor"];

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "editor" as Role,
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UsersPage() {
  const { user, getAllUsers, addUser, updateUser, deleteUser } = useAuth();

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const allUsers = getAllUsers();

  // Access check
  if (!user || !canManageUsers(user.role)) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage system users and roles</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShieldAlert className="size-16 text-red-400 mb-4" />
            <h2 className="text-xl font-semibold">Access Denied</h2>
            <p className="text-sm text-muted-foreground mt-2 text-center max-w-sm">
              Only Super Admins can manage users. Please contact a Super Admin
              if you need access.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filtered = allUsers.filter((u) => {
    if (!search) return true;
    return (
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
    );
  });

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setErrorMsg("");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function showError(msg: string) {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 4000);
  }

  function openAddDialog() {
    setEditingUser(null);
    setForm(emptyForm);
    setErrorMsg("");
    setDialogOpen(true);
  }

  function openEditDialog(u: User) {
    setEditingUser(u);
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
    });
    setErrorMsg("");
    setDialogOpen(true);
  }

  function openDeleteDialog(u: User) {
    setDeletingUser(u);
    setDeleteDialogOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;

    if (editingUser) {
      // Check for email duplicates excluding current user
      const duplicate = allUsers.find(
        (u) => u.email === form.email && u.id !== editingUser.id
      );
      if (duplicate) {
        showError("A user with this email already exists.");
        return;
      }
      const updates: Partial<User> = {
        name: form.name,
        email: form.email,
        role: form.role,
      };
      if (form.password) {
        updates.password = form.password;
      }
      updateUser(editingUser.id, updates);
      showSuccess("User updated successfully!");
    } else {
      if (!form.password) {
        showError("Password is required for new users.");
        return;
      }
      // Check for email duplicates
      const duplicate = allUsers.find((u) => u.email === form.email);
      if (duplicate) {
        showError("A user with this email already exists.");
        return;
      }
      const newUser: User = {
        id: crypto.randomUUID(),
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };
      addUser(newUser);
      showSuccess("User created successfully!");
    }
    setDialogOpen(false);
  }

  function handleDelete() {
    if (!deletingUser) return;
    if (!user) return;
    if (deletingUser.id === user.id) {
      showError("You cannot delete your own account.");
      setDeleteDialogOpen(false);
      return;
    }
    deleteUser(deletingUser.id);
    setDeleteDialogOpen(false);
    setDeletingUser(null);
    showSuccess("User deleted successfully!");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage system users ({allUsers.length} total)
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="size-4" />
          Add User
        </Button>
      </div>

      {successMsg && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMsg}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">User</th>
                    <th className="px-4 py-3 text-left font-medium">Email</th>
                    <th className="px-4 py-3 text-left font-medium">Role</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-muted-foreground"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                  {filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarImage src={u.avatar} alt={u.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                              {getInitials(u.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{u.name}</span>
                          {u.id === user.id && (
                            <Badge variant="secondary" className="text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {u.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleBadgeColor(u.role)}`}
                        >
                          <Shield className="size-3" />
                          {getRoleLabel(u.role)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(u)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          {u.id !== user.id && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => openDeleteDialog(u)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No users found.
          </p>
        )}
        {filtered.map((u) => (
          <Card key={u.id}>
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={u.avatar} alt={u.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {getInitials(u.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{u.name}</h3>
                    {u.id === user.id && (
                      <Badge variant="secondary" className="text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                    <Mail className="size-3" />
                    {u.email}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleBadgeColor(u.role)}`}
                    >
                      <Shield className="size-3" />
                      {getRoleLabel(u.role)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(u)}
                      className="gap-1"
                    >
                      <Pencil className="size-3" />
                      Edit
                    </Button>
                    {u.id !== user.id && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => openDeleteDialog(u)}
                      >
                        <Trash2 className="size-3" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="userName"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="userEmail"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPassword">
                Password{" "}
                {!editingUser && <span className="text-red-500">*</span>}
              </Label>
              <Input
                id="userPassword"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required={!editingUser}
                placeholder={
                  editingUser
                    ? "Leave empty to keep current"
                    : "Enter password"
                }
              />
              {editingUser && (
                <p className="text-xs text-muted-foreground">
                  Leave empty to keep the current password.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="userRole">Role</Label>
              <select
                id="userRole"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value as Role })
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {getRoleLabel(r)}
                  </option>
                ))}
              </select>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {editingUser ? "Save Changes" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{deletingUser?.name}&quot;? This action
            cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
