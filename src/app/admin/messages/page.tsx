import { Mail, MailOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const messages = [
  {
    id: 1,
    name: "Kamal Hossain",
    email: "kamal@gmail.com",
    subject: "Partnership Opportunity",
    preview:
      "Hi, I represent a tech startup and would like to explore collaboration with BUP EIC...",
    date: "April 1, 2026",
    read: false,
  },
  {
    id: 2,
    name: "Shirin Begum",
    email: "shirin.begum@yahoo.com",
    subject: "Event Sponsorship Inquiry",
    preview:
      "We are interested in sponsoring your upcoming hackathon event. Could you share details...",
    date: "March 30, 2026",
    read: false,
  },
  {
    id: 3,
    name: "Imran Khan",
    email: "imran.khan@outlook.com",
    subject: "Guest Speaker Availability",
    preview:
      "Thank you for the invitation. I would be happy to speak at your entrepreneurship workshop...",
    date: "March 28, 2026",
    read: true,
  },
  {
    id: 4,
    name: "Nasreen Sultana",
    email: "nasreen@bup.edu.bd",
    subject: "Membership Query",
    preview:
      "I am a second year student at BUP and I would like to know how to join the club...",
    date: "March 25, 2026",
    read: true,
  },
  {
    id: 5,
    name: "Zahid Mia",
    email: "zahid.mia@gmail.com",
    subject: "Feedback on Pitch Night",
    preview:
      "The recent business pitch night was fantastic. I wanted to share some thoughts and suggestions...",
    date: "March 22, 2026",
    read: true,
  },
  {
    id: 6,
    name: "Rimi Akter",
    email: "rimi@live.com",
    subject: "Volunteering Interest",
    preview:
      "I would love to volunteer for upcoming BUP EIC events. How can I get involved...",
    date: "March 20, 2026",
    read: false,
  },
];

export default function MessagesPage() {
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          {unreadCount} unread message{unreadCount !== 1 && "s"} from the
          contact form.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-4 px-4 py-4 transition-colors hover:bg-muted/50 cursor-pointer",
                  !msg.read && "bg-primary/[0.03]"
                )}
              >
                <div className="mt-0.5 shrink-0 text-muted-foreground">
                  {msg.read ? (
                    <MailOpen className="size-4" />
                  ) : (
                    <Mail className="size-4 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm",
                          !msg.read ? "font-semibold" : "font-medium"
                        )}
                      >
                        {msg.name}
                      </span>
                      {!msg.read && <Badge variant="default">New</Badge>}
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {msg.date}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-sm",
                      !msg.read ? "font-medium" : "text-muted-foreground"
                    )}
                  >
                    {msg.subject}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {msg.preview}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {msg.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
