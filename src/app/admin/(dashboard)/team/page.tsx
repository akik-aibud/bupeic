"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { canDelete } from "@/lib/types";
import type { TeamMember } from "@/lib/types";

type Tab = "all" | "executive" | "committee" | "advisor";

const emptyMember: Omit<TeamMember, "id"> = {
  name: "",
  position: "",
  department: "",
  email: "",
  phone: "",
  bio: "",
  social: { facebook: "", linkedin: "", instagram: "" },
  order: 99,
  category: "committee",
  status: "active",
};

export default function TeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useStore();
  const { user } = useAuth();

  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyMember);
  const [success, setSuccess] = useState("");

  const filtered = teamMembers
    .filter((m) => tab === "all" || m.category === tab)
    .filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.position.toLowerCase().includes(search.toLowerCase()) ||
        m.department.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.order - b.order);

  function openCreate() {
    setEditing(null);
    setForm(emptyMember);
    setDialogOpen(true);
  }

  function openEdit(member: TeamMember) {
    setEditing(member);
    setForm({
      name: member.name,
      position: member.position,
      department: member.department,
      email: member.email,
      phone: member.phone || "",
      bio: member.bio || "",
      social: { ...member.social },
      order: member.order,
      category: member.category,
      status: member.status,
    });
    setDialogOpen(true);
  }

  function handleSave() {
    if (!form.name || !form.position) return;

    if (editing) {
      updateTeamMember(editing.id, form);
      setSuccess("Member updated successfully!");
    } else {
      const newMember: TeamMember = {
        ...form,
        id: `t${Date.now()}`,
      };
      addTeamMember(newMember);
      setSuccess("Member added successfully!");
    }
    setDialogOpen(false);
    setTimeout(() => setSuccess(""), 3000);
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  function handleDelete() {
    if (deletingId) {
      deleteTeamMember(deletingId);
      setSuccess("Member removed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: teamMembers.length },
    { key: "executive", label: "Executive", count: teamMembers.filter((m) => m.category === "executive").length },
    { key: "committee", label: "Committee", count: teamMembers.filter((m) => m.category === "committee").length },
    { key: "advisor", label: "Advisor", count: teamMembers.filter((m) => m.category === "advisor").length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Team</h1>
          <p className="text-muted-foreground">Add and manage club members.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4 mr-1.5" />
          Add Member
        </Button>
      </div>

      {/* Success */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Button key={t.key} variant={tab === t.key ? "default" : "outline"} size="sm" onClick={() => setTab(t.key)}>
            {t.label}
            <Badge variant="secondary" className="ml-1.5 text-xs">{t.count}</Badge>
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Members grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription>{member.position}</CardDescription>
                  </div>
                </div>
                <Badge variant={member.status === "active" ? "default" : "secondary"}>
                  {member.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{member.department}</p>
                <p className="truncate">{member.email}</p>
                {member.phone && <p>{member.phone}</p>}
              </div>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs capitalize">{member.category}</Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(member)}>
                  <Pencil className="size-3 mr-1" /> Edit
                </Button>
                {user && canDelete(user.role) && (
                  <Button variant="outline" size="sm" onClick={() => confirmDelete(member.id)}>
                    <Trash2 className="size-3 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">No members found.</p>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Member" : "Add Member"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input id="position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input id="order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as TeamMember["category"] })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="executive">Executive</option>
                  <option value="committee">Committee</option>
                  <option value="advisor">Advisor</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as TeamMember["status"] })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="active">Active</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Social Links</Label>
              <div className="grid gap-2">
                <Input placeholder="Facebook URL" value={form.social.facebook} onChange={(e) => setForm({ ...form, social: { ...form.social, facebook: e.target.value } })} />
                <Input placeholder="LinkedIn URL" value={form.social.linkedin} onChange={(e) => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} />
                <Input placeholder="Instagram URL" value={form.social.instagram} onChange={(e) => setForm({ ...form, social: { ...form.social, instagram: e.target.value } })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.name || !form.position}>
              {editing ? "Update" : "Add"} Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to remove this team member? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
