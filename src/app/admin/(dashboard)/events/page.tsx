"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Calendar,
  MapPin,
  Users,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import type { Event } from "@/lib/types";

type Tab = "all" | "upcoming" | "ongoing" | "completed" | "draft";

const STATUS_COLORS: Record<string, string> = {
  upcoming: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  ongoing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
};

const CATEGORIES = ["competition", "workshop", "seminar", "networking", "fest"] as const;

const emptyEvent: Omit<Event, "id" | "createdAt" | "updatedAt" | "createdBy"> = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  status: "draft",
  category: "competition",
  attendees: 0,
  maxAttendees: 100,
  registrationLink: "",
};

export default function EventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useStore();
  const { user } = useAuth();

  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyEvent);
  const [success, setSuccess] = useState("");

  const filtered = events
    .filter((e) => tab === "all" || e.status === tab)
    .filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  function openCreate() {
    setEditingEvent(null);
    setForm(emptyEvent);
    setDialogOpen(true);
  }

  function openEdit(event: Event) {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      status: event.status,
      category: event.category,
      attendees: event.attendees,
      maxAttendees: event.maxAttendees,
      registrationLink: event.registrationLink || "",
    });
    setDialogOpen(true);
  }

  function handleSave() {
    if (!form.title || !form.date) return;

    if (editingEvent) {
      updateEvent(editingEvent.id, form);
      setSuccess("Event updated successfully!");
    } else {
      const newEvent: Event = {
        ...form,
        id: `e${Date.now()}`,
        createdBy: user?.id ?? "unknown",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addEvent(newEvent);
      setSuccess("Event created successfully!");
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
      deleteEvent(deletingId);
      setSuccess("Event deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: events.length },
    { key: "upcoming", label: "Upcoming", count: events.filter((e) => e.status === "upcoming").length },
    { key: "ongoing", label: "Ongoing", count: events.filter((e) => e.status === "ongoing").length },
    { key: "completed", label: "Completed", count: events.filter((e) => e.status === "completed").length },
    { key: "draft", label: "Draft", count: events.filter((e) => e.status === "draft").length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Events</h1>
          <p className="text-muted-foreground">Create and manage club events.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4 mr-1.5" />
          Add Event
        </Button>
      </div>

      {/* Success message */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Button
            key={t.key}
            variant={tab === t.key ? "default" : "outline"}
            size="sm"
            onClick={() => setTab(t.key)}
          >
            {t.label}
            <Badge variant="secondary" className="ml-1.5 text-xs">
              {t.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Location</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Attendees</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((event) => (
                  <tr key={event.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground capitalize">{event.category}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{event.location}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[event.status]}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(event)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        {user && canDelete(user.role) && (
                          <Button variant="ghost" size="sm" onClick={() => confirmDelete(event.id)}>
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile cards */}
      <div className="grid gap-3 md:hidden">
        {filtered.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{event.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3" />
                      {event.attendees}
                    </span>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[event.status]}`}>
                  {event.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(event)}>
                  <Pencil className="size-3 mr-1" /> Edit
                </Button>
                {user && canDelete(user.role) && (
                  <Button variant="outline" size="sm" onClick={() => confirmDelete(event.id)}>
                    <Trash2 className="size-3 text-destructive" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No events found.</p>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Create Event"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Event description" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 10:00 AM" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Event venue" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Event["category"] })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="capitalize">{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Event["status"] })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="attendees">Current Attendees</Label>
                <Input id="attendees" type="number" value={form.attendees} onChange={(e) => setForm({ ...form, attendees: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input id="maxAttendees" type="number" value={form.maxAttendees ?? ""} onChange={(e) => setForm({ ...form, maxAttendees: parseInt(e.target.value) || undefined })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationLink">Registration Link</Label>
              <Input id="registrationLink" value={form.registrationLink ?? ""} onChange={(e) => setForm({ ...form, registrationLink: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.title || !form.date}>
              {editingEvent ? "Update" : "Create"} Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this event? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
