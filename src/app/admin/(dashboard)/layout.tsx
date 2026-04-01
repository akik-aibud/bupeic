"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCog,
  MessageSquare,
  Settings,
  Menu,
  LogOut,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth, getRoleLabel } from "@/lib/auth";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { checkPermission } = useAuth();

  const showUsersLink = checkPermission("manage_users");

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        );
      })}

      {showUsersLink && (
        <Link
          href="/admin/users"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            pathname.startsWith("/admin/users")
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <UserCog className="size-[18px]" />
          Users
        </Link>
      )}
    </nav>
  );
}

function getRoleBadgeStyle(role: string): string {
  switch (role) {
    case "super_admin":
      return "bg-red-50 text-red-700 border border-red-200";
    case "admin":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "editor":
      return "bg-green-50 text-green-700 border border-green-200";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
}

function UserInfo() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 px-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-foreground">
            {user.name}
          </p>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
              getRoleBadgeStyle(user.role)
            )}
          >
            {getRoleLabel(user.role)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Globe className="size-4" />
          Back to Site
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="size-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Branding */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
          E
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">BUP EIC</p>
          <p className="text-[11px] text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-border" />

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Menu
        </p>
        <SidebarNav onNavigate={onNavigate} />
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-border" />

      {/* User info */}
      <div className="px-3 py-4">
        <UserInfo />
      </div>
    </div>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-muted/30">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
          <SidebarContent />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <div className="flex flex-1 flex-col">
            {/* Top bar */}
            <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4 lg:hidden">
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="lg:hidden" />
                }
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle sidebar</span>
              </SheetTrigger>
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">
                  E
                </div>
                <h1 className="text-sm font-semibold text-foreground">
                  BUP EIC Admin
                </h1>
              </div>
            </header>

            {/* Page content */}
            <main className="flex-1 p-4 lg:p-6">{children}</main>
          </div>

          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </AuthGuard>
  );
}
