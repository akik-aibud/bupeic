import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const members = [
  {
    id: 1,
    name: "Arif Rahman",
    role: "President",
    department: "BBA",
    email: "arif@bupeic.org",
    status: "active" as const,
  },
  {
    id: 2,
    name: "Fatima Akter",
    role: "Vice President",
    department: "Economics",
    email: "fatima@bupeic.org",
    status: "active" as const,
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "General Secretary",
    department: "CSE",
    email: "tanvir@bupeic.org",
    status: "active" as const,
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    role: "Treasurer",
    department: "Accounting",
    email: "nusrat@bupeic.org",
    status: "active" as const,
  },
  {
    id: 5,
    name: "Rafiq Ahmed",
    role: "Marketing Lead",
    department: "Marketing",
    email: "rafiq@bupeic.org",
    status: "active" as const,
  },
  {
    id: 6,
    name: "Sumaiya Islam",
    role: "Event Coordinator",
    department: "English",
    email: "sumaiya@bupeic.org",
    status: "inactive" as const,
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Team</h1>
          <p className="text-muted-foreground">
            Add and manage club members.
          </p>
        </div>
        <Button>
          <Plus className="size-4 mr-1.5" />
          Add Member
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    member.status === "active" ? "default" : "secondary"
                  }
                >
                  {member.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Department: {member.department}</p>
                <p>{member.email}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Pencil className="size-3.5 mr-1.5" />
                  Edit
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <Trash2 className="size-3.5 text-destructive" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
