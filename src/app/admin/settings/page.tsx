"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Globe,
  Share2,
  BarChart3,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { hasPermission } from "@/lib/types";

export default function SettingsPage() {
  const { settings, stats, updateSettings, updateStats } = useStore();
  const { user } = useAuth();

  const canEdit = user ? hasPermission(user.role, "manage_settings") : false;

  // Site settings form
  const [siteForm, setSiteForm] = useState({
    siteName: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    announcement: "",
  });

  // Social links form
  const [socialForm, setSocialForm] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    twitter: "",
  });

  // Stats form
  const [statsForm, setStatsForm] = useState({
    followers: 0,
    events: 0,
    members: 0,
    partners: 0,
  });

  const [successMsg, setSuccessMsg] = useState("");

  // Sync forms with store data
  useEffect(() => {
    setSiteForm({
      siteName: settings.siteName,
      description: settings.description,
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
      announcement: settings.announcement ?? "",
    });
    setSocialForm({ ...settings.social });
    setStatsForm({ ...stats });
  }, [settings, stats]);

  function showSuccess(msg: string) {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function handleSaveSite(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    updateSettings({
      siteName: siteForm.siteName,
      description: siteForm.description,
      email: siteForm.email,
      phone: siteForm.phone,
      address: siteForm.address,
      announcement: siteForm.announcement || undefined,
    });
    showSuccess("Site settings saved successfully!");
  }

  function handleSaveSocial(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    updateSettings({ social: { ...socialForm } });
    showSuccess("Social links saved successfully!");
  }

  function handleSaveStats(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    updateStats({
      followers: Number(statsForm.followers),
      events: Number(statsForm.events),
      members: Number(statsForm.members),
      partners: Number(statsForm.partners),
    });
    showSuccess("Stats updated successfully!");
  }

  if (!canEdit && user) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Site configuration</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShieldAlert className="size-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold">View Only</h2>
            <p className="text-sm text-muted-foreground mt-1">
              You have read-only access to settings. Contact an admin to make changes.
            </p>
          </CardContent>
        </Card>

        {/* Show read-only settings */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Name:</span> {settings.siteName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {settings.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {settings.phone}
              </div>
              <div>
                <span className="font-medium">Address:</span> {settings.address}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Followers:</span> {stats.followers}
              </div>
              <div>
                <span className="font-medium">Events:</span> {stats.events}
              </div>
              <div>
                <span className="font-medium">Members:</span> {stats.members}
              </div>
              <div>
                <span className="font-medium">Partners:</span> {stats.partners}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage site configuration and statistics
        </p>
      </div>

      {successMsg && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMsg}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Site Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-primary" />
              <div>
                <CardTitle className="text-base">Site Information</CardTitle>
                <CardDescription>
                  Basic site details and contact information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSite} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={siteForm.siteName}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, siteName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={siteForm.email}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={siteForm.description}
                  onChange={(e) =>
                    setSiteForm({ ...siteForm, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={siteForm.phone}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={siteForm.address}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement">Announcement Banner</Label>
                <Input
                  id="announcement"
                  value={siteForm.announcement}
                  onChange={(e) =>
                    setSiteForm({ ...siteForm, announcement: e.target.value })
                  }
                  placeholder="Leave empty to hide banner"
                />
              </div>
              <Button type="submit" className="gap-2">
                <Save className="size-4" />
                Save Site Settings
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="size-5 text-primary" />
              <div>
                <CardTitle className="text-base">Social Media Links</CardTitle>
                <CardDescription>Links displayed on the website</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSocial} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={socialForm.facebook}
                  onChange={(e) =>
                    setSocialForm({ ...socialForm, facebook: e.target.value })
                  }
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={socialForm.instagram}
                  onChange={(e) =>
                    setSocialForm({ ...socialForm, instagram: e.target.value })
                  }
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={socialForm.linkedin}
                  onChange={(e) =>
                    setSocialForm({ ...socialForm, linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={socialForm.youtube}
                  onChange={(e) =>
                    setSocialForm({ ...socialForm, youtube: e.target.value })
                  }
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                <Input
                  id="twitter"
                  value={socialForm.twitter}
                  onChange={(e) =>
                    setSocialForm({ ...socialForm, twitter: e.target.value })
                  }
                  placeholder="https://x.com/..."
                />
              </div>
              <Button type="submit" className="gap-2">
                <Save className="size-4" />
                Save Social Links
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stats Editor */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" />
              <div>
                <CardTitle className="text-base">Statistics</CardTitle>
                <CardDescription>
                  Numbers displayed on the public website
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveStats} className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="followers">Followers</Label>
                  <Input
                    id="followers"
                    type="number"
                    value={statsForm.followers}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        followers: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventsCount">Events Count</Label>
                  <Input
                    id="eventsCount"
                    type="number"
                    value={statsForm.events}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        events: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membersCount">Members</Label>
                  <Input
                    id="membersCount"
                    type="number"
                    value={statsForm.members}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        members: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnersCount">Partners</Label>
                  <Input
                    id="partnersCount"
                    type="number"
                    value={statsForm.partners}
                    onChange={(e) =>
                      setStatsForm({
                        ...statsForm,
                        partners: parseInt(e.target.value) || 0,
                      })
                    }
                    min={0}
                  />
                </div>
              </div>
              <Button type="submit" className="gap-2">
                <Save className="size-4" />
                Save Statistics
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
