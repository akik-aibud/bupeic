"use client";

import { useState } from "react";
import { Mail, MailOpen, Trash2, Reply, Eye, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { canDelete } from "@/lib/types";
import type { Message } from "@/lib/types";

type Tab = "all" | "unread" | "read" | "replied" | "archived";

export default function MessagesPage() {
  const { messages, updateMessage, deleteMessage } = useStore();
  const { user } = useAuth();

  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [viewMessage, setViewMessage] = useState<Message | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [success, setSuccess] = useState("");

  const filtered = messages
    .filter((m) => tab === "all" || m.status === tab)
    .filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  function openMessage(msg: Message) {
    setViewMessage(msg);
    if (msg.status === "unread") {
      updateMessage(msg.id, { status: "read" });
    }
  }

  function markAs(id: string, status: Message["status"]) {
    updateMessage(id, {
      status,
      ...(status === "replied" ? { repliedAt: new Date().toISOString(), repliedBy: user?.id } : {}),
    });
    setSuccess(`Message marked as ${status}!`);
    setTimeout(() => setSuccess(""), 3000);
    if (viewMessage?.id === id) {
      setViewMessage({ ...viewMessage, status });
    }
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  }

  function handleDelete() {
    if (deletingId) {
      deleteMessage(deletingId);
      setSuccess("Message deleted!");
      setTimeout(() => setSuccess(""), 3000);
      if (viewMessage?.id === deletingId) setViewMessage(null);
    }
    setDeleteDialogOpen(false);
    setDeletingId(null);
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "All", count: messages.length },
    { key: "unread", label: "Unread", count: unreadCount },
    { key: "read", label: "Read", count: messages.filter((m) => m.status === "read").length },
    { key: "replied", label: "Replied", count: messages.filter((m) => m.status === "replied").length },
    { key: "archived", label: "Archived", count: messages.filter((m) => m.status === "archived").length },
  ];

  const STATUS_COLORS: Record<string, string> = {
    unread: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    read: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    replied: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    archived: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          {unreadCount} unread message{unreadCount !== 1 && "s"} from the contact form.
        </p>
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
            {t.key === "unread" && unreadCount > 0 ? (
              <Badge className="ml-1.5 bg-red-500 text-white text-xs">{t.count}</Badge>
            ) : (
              <Badge variant="secondary" className="ml-1.5 text-xs">{t.count}</Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Messages list */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 px-4 py-4 cursor-pointer hover:bg-muted/50",
                  msg.status === "unread" && "bg-primary/[0.03]"
                )}
                onClick={() => openMessage(msg)}
              >
                <div className="mt-0.5 shrink-0 text-muted-foreground">
                  {msg.status === "unread" ? (
                    <Mail className="size-4 text-primary" />
                  ) : (
                    <MailOpen className="size-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cn("text-sm truncate", msg.status === "unread" ? "font-semibold" : "font-medium")}>
                        {msg.name}
                      </span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${STATUS_COLORS[msg.status]}`}>
                        {msg.status}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className={cn("text-sm truncate", msg.status === "unread" ? "font-medium" : "text-muted-foreground")}>
                    {msg.subject}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{msg.message}</p>
                </div>
                {/* Quick actions on desktop */}
                <div className="hidden sm:flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {msg.status === "unread" && (
                    <Button variant="ghost" size="sm" onClick={() => markAs(msg.id, "read")} title="Mark as read">
                      <Eye className="size-3.5" />
                    </Button>
                  )}
                  {msg.status !== "replied" && (
                    <Button variant="ghost" size="sm" onClick={() => markAs(msg.id, "replied")} title="Mark as replied">
                      <Reply className="size-3.5" />
                    </Button>
                  )}
                  {user && canDelete(user.role) && (
                    <Button variant="ghost" size="sm" onClick={() => confirmDelete(msg.id)} title="Delete">
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-muted-foreground">No messages found.</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={!!viewMessage} onOpenChange={(open) => !open && setViewMessage(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewMessage?.subject}</DialogTitle>
          </DialogHeader>
          {viewMessage && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">From: </span>
                  <span className="font-medium">{viewMessage.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email: </span>
                  <a href={`mailto:${viewMessage.email}`} className="text-primary hover:underline">{viewMessage.email}</a>
                </div>
                <div>
                  <span className="text-muted-foreground">Date: </span>
                  <span>{new Date(viewMessage.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-sm whitespace-pre-wrap">{viewMessage.message}</div>
              {viewMessage.repliedAt && (
                <p className="text-xs text-muted-foreground">
                  Replied on {new Date(viewMessage.repliedAt).toLocaleString()}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {viewMessage.status !== "replied" && (
                  <Button size="sm" onClick={() => markAs(viewMessage.id, "replied")}>
                    <Reply className="size-3.5 mr-1" /> Mark as Replied
                  </Button>
                )}
                {viewMessage.status === "unread" && (
                  <Button variant="outline" size="sm" onClick={() => markAs(viewMessage.id, "read")}>
                    <Eye className="size-3.5 mr-1" /> Mark as Read
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => markAs(viewMessage.id, "archived")}>
                  Archive
                </Button>
                {user && canDelete(user.role) && (
                  <Button variant="outline" size="sm" onClick={() => { setViewMessage(null); confirmDelete(viewMessage.id); }}>
                    <Trash2 className="size-3.5 mr-1 text-destructive" /> Delete
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this message? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
