"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { canDelete } from "@/lib/types";
import type { TeamMember } from "@/lib/types";

type MemberCategory = TeamMember["category"];

const emptyForm = {
  name: "",
  position: "",
  department: "",
  email: "",
  phone: "",
  bio: "",
  category: "committee" as MemberCategory,
  facebook: "",
  linkedin: "",
  instagram: "",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } =
    useStore();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  const filtered = useMemo(() => {
    return teamMembers.filter((m) => {
      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.position.toLowerCase().includes(search.toLowerCase()) ||
        m.department.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || m.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [teamMembers, search, categoryFilter]);

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function openAddDialog() {
    setEditingMember(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEditDialog(member: TeamMember) {
    setEditingMember(member);
    setForm({
      name: member.name,
      position: member.position,
      department: member.department,
      email: member.email,
      phone: member.phone ?? "",
      bio: member.bio ?? "",
      category: member.category,
      facebook: member.social.facebook ?? "",
      linkedin: member.social.linkedin ?? "",
      instagram: member.social.instagram ?? "",
    });
    setDialogOpen(true);
  }

  function openDeleteDialog(member: TeamMember) {
    setDeletingMember(member);
    setDeleteDialogOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.position || !form.email) return;

    if (editingMember) {
      updateTeamMember(editingMember.id, {
        name: form.name,
        position: form.position,
        department: form.department,
        email: form.email,
        phone: form.phone || undefined,
        bio: form.bio || undefined,
        category: form.category,
        social: {
          facebook: form.facebook || undefined,
          linkedin: form.linkedin || undefined,
          instagram: form.instagram || undefined,
        },
      });
      showSuccess("Team member updated successfully!");
    } else {
      const newMember: TeamMember = {
        id: crypto.randomUUID(),
        name: form.name,
        position: form.position,
        department: form.department,
        email: form.email,
        phone: form.phone || undefined,
        bio: form.bio || undefined,
        category: form.category,
        social: {
          facebook: form.facebook || undefined,
          linkedin: form.linkedin || undefined,
          instagram: form.instagram || undefined,
        },
        order: teamMembers.length + 1,
        status: "active",
      };
      addTeamMember(newMember);
      showSuccess("Team member added successfully!");
    }
    setDialogOpen(false);
  }

  function handleDelete() {
    if (!deletingMember) return;
    deleteTeamMember(deletingMember.id);
    setDeleteDialogOpen(false);
    setDeletingMember(null);
    showSuccess("Team member deleted successfully!");
  }

  const CATEGORY_COLORS: Record<MemberCategory, string> = {
    executive: "bg-purple-100 text-purple-800",
    committee: "bg-blue-100 text-blue-800",
    advisor: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">
            Manage BUP EIC team ({teamMembers.length} members)
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="size-4" />
          Add Member
        </Button>
      </div>

      {successMsg && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMsg}
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Tabs value={categoryFilter} onValueChange={setCategoryFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="executive">Executive</TabsTrigger>
            <TabsTrigger value="committee">Committee</TabsTrigger>
            <TabsTrigger value="advisor">Advisor</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Team Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">
            No team members found.
          </p>
        )}
        {filtered.map((member) => (
          <Card key={member.id} className="relative">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="size-16 mb-3">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {member.position}
                </p>
                <p className="text-xs text-muted-foreground">
                  {member.department}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${CATEGORY_COLORS[member.category]}`}
                  >
                    {member.category}
                  </span>
                </div>

                {/* Contact info */}
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-muted-foreground hover:text-foreground"
                      title={member.email}
                    >
                      <Mail className="size-4" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="text-muted-foreground hover:text-foreground"
                      title={member.phone}
                    >
                      <Phone className="size-4" />
                    </a>
                  )}
                  {member.social.facebook && (
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Facebook className="size-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Linkedin className="size-4" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Instagram className="size-4" />
                    </a>
                  )}
                </div>

                {/* Bio */}
                {member.bio && (
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {member.bio}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(member)}
                    className="gap-1"
                  >
                    <Pencil className="size-3" />
                    Edit
                  </Button>
                  {user && canDelete(user.role) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => openDeleteDialog(member)}
                    >
                      <Trash2 className="size-3" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">
                  Position <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                  required
                  placeholder="e.g. Director"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  placeholder="e.g. Marketing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as MemberCategory,
                    })
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="executive">Executive</option>
                  <option value="committee">Committee</option>
                  <option value="advisor">Advisor</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Short bio"
                rows={2}
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Social Links</Label>
              <div className="grid gap-3 sm:grid-cols-3">
                <Input
                  value={form.facebook}
                  onChange={(e) =>
                    setForm({ ...form, facebook: e.target.value })
                  }
                  placeholder="Facebook URL"
                />
                <Input
                  value={form.linkedin}
                  onChange={(e) =>
                    setForm({ ...form, linkedin: e.target.value })
                  }
                  placeholder="LinkedIn URL"
                />
                <Input
                  value={form.instagram}
                  onChange={(e) =>
                    setForm({ ...form, instagram: e.target.value })
                  }
                  placeholder="Instagram URL"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {editingMember ? "Save Changes" : "Add Member"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Team Member</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to remove &quot;{deletingMember?.name}&quot; from the team?
            This action cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
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
