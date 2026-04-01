import {
  Calendar,
  Users,
  MessageSquare,
  Eye,
  Plus,
  FileText,
  UserPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Events", value: "12", icon: Calendar, trend: "+2 this month" },
  { label: "Team Members", value: "25", icon: Users, trend: "+3 this month" },
  { label: "Messages", value: "8", icon: MessageSquare, trend: "5 unread" },
  { label: "Page Views", value: "1.2K", icon: Eye, trend: "+12% this week" },
];

const recentActivity = [
  { text: "New event \"Startup Bootcamp 2026\" created", time: "2 hours ago", type: "event" },
  { text: "Rafiq Ahmed joined as Marketing Lead", time: "5 hours ago", type: "team" },
  { text: "New message from Tanvir Hasan", time: "1 day ago", type: "message" },
  { text: "Event \"Innovation Hackathon\" updated", time: "2 days ago", type: "event" },
  { text: "Settings updated by admin", time: "3 days ago", type: "settings" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Admin</h1>
        <p className="text-muted-foreground">
          Here is what is happening with BUP EIC today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="size-4 text-primary" />
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
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-2 shrink-0 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
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
              <Button className="justify-start gap-2" variant="outline">
                <Plus className="size-4" />
                Create Event
              </Button>
              <Button className="justify-start gap-2" variant="outline">
                <UserPlus className="size-4" />
                Add Team Member
              </Button>
              <Button className="justify-start gap-2" variant="outline">
                <MessageSquare className="size-4" />
                View Messages
              </Button>
              <Button className="justify-start gap-2" variant="outline">
                <FileText className="size-4" />
                Edit Site Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
