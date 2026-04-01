"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Trash2,
  Mail,
  MailOpen,
  Reply,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { canDelete } from "@/lib/types";
import type { Message } from "@/lib/types";

type MessageStatus = Message["status"];

const STATUS_COLORS: Record<MessageStatus, string> = {
  unread: "bg-red-100 text-red-800",
  read: "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-800",
};

const STATUS_ICONS: Record<MessageStatus, typeof Mail> = {
  unread: Mail,
  read: MailOpen,
  replied: Reply,
  archived: MailOpen,
};

export default function MessagesPage() {
  const { messages, updateMessage, deleteMessage } = useStore();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<Message | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const filtered = useMemo(() => {
    return messages
      .filter((m) => {
        const matchesSearch =
          !search ||
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.subject.toLowerCase().includes(search.toLowerCase()) ||
          m.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || m.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [messages, search, statusFilter]);

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function openViewDialog(message: Message) {
    setSelectedMessage(message);
    setViewDialogOpen(true);
    // Auto-mark as read when opening
    if (message.status === "unread") {
      updateMessage(message.id, { status: "read" });
    }
  }

  function markAs(id: string, status: MessageStatus) {
    const updates: Partial<Message> = { status };
    if (status === "replied") {
      updates.repliedAt = new Date().toISOString();
      updates.repliedBy = user?.id;
    }
    updateMessage(id, updates);
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, ...updates });
    }
    showSuccess(`Message marked as ${status}!`);
  }

  function openDeleteDialog(message: Message) {
    setDeletingMessage(message);
    setDeleteDialogOpen(true);
  }

  function handleDelete() {
    if (!deletingMessage) return;
    deleteMessage(deletingMessage.id);
    setDeleteDialogOpen(false);
    setDeletingMessage(null);
    if (selectedMessage?.id === deletingMessage.id) {
      setViewDialogOpen(false);
      setSelectedMessage(null);
    }
    showSuccess("Message deleted successfully!");
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">
            {messages.length} messages total
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500 text-white">{unreadCount} unread</Badge>
            )}
          </p>
        </div>
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
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 min-w-5 px-1 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="replied">Replied</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No messages found.
          </p>
        )}
        {filtered.map((message) => {
          const StatusIcon = STATUS_ICONS[message.status];
          return (
            <Card
              key={message.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                message.status === "unread" ? "border-l-4 border-l-primary" : ""
              }`}
              onClick={() => openViewDialog(message)}
            >
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <StatusIcon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-sm truncate ${
                              message.status === "unread"
                                ? "font-bold"
                                : "font-medium"
                            }`}
                          >
                            {message.name}
                          </h3>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[message.status]}`}
                          >
                            {message.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {message.email}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        message.status === "unread" ? "font-semibold" : ""
                      }`}
                    >
                      {message.subject}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {message.message}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* View Message Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMessage.email}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(selectedMessage.createdAt)}
                </span>
              </div>
              <Separator />
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
              {selectedMessage.repliedAt && (
                <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                  Replied on {formatDate(selectedMessage.repliedAt)}
                </div>
              )}
              <Separator />
              <div className="flex flex-wrap items-center gap-2">
                {selectedMessage.status !== "unread" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAs(selectedMessage.id, "unread")}
                    className="gap-1"
                  >
                    <Mail className="size-3" />
                    Mark Unread
                  </Button>
                )}
                {selectedMessage.status !== "read" &&
                  selectedMessage.status !== "replied" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAs(selectedMessage.id, "read")}
                      className="gap-1"
                    >
                      <MailOpen className="size-3" />
                      Mark Read
                    </Button>
                  )}
                {selectedMessage.status !== "replied" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAs(selectedMessage.id, "replied")}
                    className="gap-1"
                  >
                    <Reply className="size-3" />
                    Mark Replied
                  </Button>
                )}
                {user && canDelete(user.role) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600 border-red-200 hover:bg-red-50 ml-auto"
                    onClick={() => openDeleteDialog(selectedMessage)}
                  >
                    <Trash2 className="size-3" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this message from &quot;{deletingMessage?.name}&quot;?
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
