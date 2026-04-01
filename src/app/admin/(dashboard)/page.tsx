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
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      label: "Team Members",
      value: teamMembers.length,
      icon: Users,
      trend: `${teamMembers.filter((m) => m.category === "executive").length} executives`,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      label: "Unread Messages",
      value: unreadMessages,
      icon: MessageSquare,
      trend: `${messages.length} total`,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
    {
      label: "Total Followers",
      value: stats.followers.toLocaleString(),
      icon: TrendingUp,
      trend: `${stats.partners} partners`,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
  ];

  // Build recent activity from actual data
  const recentActivity: { text: string; time: string; type: string }[] = [];

  const sortedEvents = [...events]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
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

  const sortedMessages = [...messages]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
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

  recentActivity.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const activityTypeColors: Record<string, string> = {
    event: "bg-blue-500",
    message: "bg-orange-500",
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-xl border border-primary/10 bg-primary/5 px-6 py-5">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.name ?? "Admin"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here is what is happening with BUP EIC today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${stat.iconBg}`}
              >
                <stat.icon className={`size-5 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <Card className="rounded-xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No recent activity.
                </p>
              )}
              {recentActivity.slice(0, 6).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`mt-1.5 flex size-2 shrink-0 rounded-full ${activityTypeColors[item.type] ?? "bg-muted-foreground"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug text-foreground">
                      {item.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.time}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground capitalize">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card className="rounded-xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/admin/events">
                <Button
                  className="justify-between gap-2 w-full h-11 rounded-lg"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="size-4" />
                    Manage Events
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Button>
              </Link>
              <Link href="/admin/team">
                <Button
                  className="justify-between gap-2 w-full h-11 rounded-lg"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <UserPlus className="size-4" />
                    Manage Team
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Button>
              </Link>
              <Link href="/admin/messages">
                <Button
                  className="justify-between gap-2 w-full h-11 rounded-lg"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="size-4" />
                    View Messages
                  </span>
                  <span className="flex items-center gap-2">
                    {unreadMessages > 0 && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {unreadMessages}
                      </span>
                    )}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </span>
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button
                  className="justify-between gap-2 w-full h-11 rounded-lg"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="size-4" />
                    Site Settings
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
