"use client";

import Link from "next/link";
import {
  Calendar,
  Users,
  MessageSquare,
  TrendingUp,
  Plus,
  FileText,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";

export default function AdminDashboard() {
  const { events, teamMembers, messages, stats } = useStore();
  const { user } = useAuth();

  const unreadMessages = messages.filter((m) => m.status === "unread").length;
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length;

  const statCards = [
    {
      label: "Total Events",
      value: events.length,
      icon: Calendar,
      trend: `${upcomingEvents} upcoming`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Team Members",
      value: teamMembers.length,
      icon: Users,
      trend: `${teamMembers.filter((m) => m.category === "executive").length} executives`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Unread Messages",
      value: unreadMessages,
      icon: MessageSquare,
      trend: `${messages.length} total`,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Total Followers",
      value: stats.followers.toLocaleString(),
      icon: TrendingUp,
      trend: `${stats.partners} partners`,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  // Build recent activity from actual data
  const recentActivity: { text: string; time: string; type: string }[] = [];

  // Latest events by updatedAt
  const sortedEvents = [...events]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);
  for (const ev of sortedEvents) {
    recentActivity.push({
      text: `Event "${ev.title}" - ${ev.status}`,
      time: new Date(ev.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      type: "event",
    });
  }

  // Latest messages
  const sortedMessages = [...messages]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  for (const msg of sortedMessages) {
    recentActivity.push({
      text: `Message from ${msg.name}: "${msg.subject}"`,
      time: new Date(msg.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      type: "message",
    });
  }

  // Sort all activity by time descending (most recent first)
  recentActivity.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name ?? "Admin"}
        </h1>
        <p className="text-muted-foreground">
          Here is what is happening with BUP EIC today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <stat.icon className={`size-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              )}
              {recentActivity.slice(0, 6).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 flex size-2 shrink-0 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.time}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                className="justify-between gap-2"
                variant="outline"
                asChild
              >
                <Link href="/admin/events">
                  <span className="flex items-center gap-2">
                    <Plus className="size-4" />
                    Manage Events
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                className="justify-between gap-2"
                variant="outline"
                asChild
              >
                <Link href="/admin/team">
                  <span className="flex items-center gap-2">
                    <UserPlus className="size-4" />
                    Manage Team
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                className="justify-between gap-2"
                variant="outline"
                asChild
              >
                <Link href="/admin/messages">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    View Messages
                  </span>
                  {unreadMessages > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {unreadMessages}
                    </Badge>
                  )}
                </Link>
              </Button>
              <Button
                className="justify-between gap-2"
                variant="outline"
                asChild
              >
                <Link href="/admin/settings">
                  <span className="flex items-center gap-2">
                    <FileText className="size-4" />
                    Site Settings
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
