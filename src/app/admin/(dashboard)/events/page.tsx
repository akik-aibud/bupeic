import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "Startup Bootcamp 2026",
    date: "April 15, 2026",
    status: "upcoming" as const,
    attendees: 120,
  },
  {
    id: 2,
    title: "Innovation Hackathon",
    date: "April 28, 2026",
    status: "upcoming" as const,
    attendees: 80,
  },
  {
    id: 3,
    title: "Entrepreneurship Workshop",
    date: "March 20, 2026",
    status: "completed" as const,
    attendees: 65,
  },
  {
    id: 4,
    title: "Business Pitch Night",
    date: "March 10, 2026",
    status: "completed" as const,
    attendees: 45,
  },
  {
    id: 5,
    title: "Tech Talk: AI in Business",
    date: "February 25, 2026",
    status: "completed" as const,
    attendees: 90,
  },
  {
    id: 6,
    title: "Networking Mixer",
    date: "May 5, 2026",
    status: "draft" as const,
    attendees: 0,
  },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  upcoming: "default",
  completed: "secondary",
  draft: "outline",
};

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Events</h1>
          <p className="text-muted-foreground">
            Create and manage club events.
          </p>
        </div>
        <Button>
          <Plus className="size-4 mr-1.5" />
          Add Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Attendees
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{event.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {event.date}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[event.status]}>
                        {event.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {event.attendees || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="size-3.5" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon-sm">
                          <Trash2 className="size-3.5 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
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
  );
}
