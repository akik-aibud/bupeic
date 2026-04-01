"use client";

import { useState } from "react";
import { Save, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const { settings, updateSettings, stats, updateStats } = useStore();
  const { user, checkPermission } = useAuth();

  const canEdit = checkPermission("manage_settings");

  const [siteForm, setSiteForm] = useState({
    siteName: settings.siteName,
    description: settings.description,
    email: settings.email,
    phone: settings.phone,
    address: settings.address,
    announcement: settings.announcement || "",
    heroTitle: settings.heroTitle || "",
    heroDescription: settings.heroDescription || "",
  });

  const [socialForm, setSocialForm] = useState({ ...settings.social });

  const [statsForm, setStatsForm] = useState({ ...stats });

  const [success, setSuccess] = useState("");

  function showSuccess(msg: string) {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 3000);
  }

  function handleSaveSite() {
    updateSettings(siteForm);
    showSuccess("Site settings saved!");
  }

  function handleSaveSocial() {
    updateSettings({ social: socialForm });
    showSuccess("Social links saved!");
  }

  function handleSaveStats() {
    updateStats(statsForm);
    showSuccess("Stats updated!");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage site settings, social links, and stats.
        </p>
      </div>

      {!canEdit && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          You have view-only access. Contact a Super Admin or Admin to make changes.
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Site settings */}
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>General site information and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" value={siteForm.siteName} onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })} disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={siteForm.description} onChange={(e) => setSiteForm({ ...siteForm, description: e.target.value })} rows={3} disabled={!canEdit} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" value={siteForm.email} onChange={(e) => setSiteForm({ ...siteForm, email: e.target.value })} disabled={!canEdit} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={siteForm.phone} onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })} disabled={!canEdit} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={siteForm.address} onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })} disabled={!canEdit} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input id="heroTitle" value={siteForm.heroTitle} onChange={(e) => setSiteForm({ ...siteForm, heroTitle: e.target.value })} placeholder="Main heading on homepage" disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroDescription">Hero Description</Label>
                <Textarea id="heroDescription" value={siteForm.heroDescription} onChange={(e) => setSiteForm({ ...siteForm, heroDescription: e.target.value })} rows={2} placeholder="Subtitle text on homepage" disabled={!canEdit} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="announcement">Announcement Banner</Label>
                <Input id="announcement" value={siteForm.announcement} onChange={(e) => setSiteForm({ ...siteForm, announcement: e.target.value })} placeholder="Leave empty to hide" disabled={!canEdit} />
              </div>
              <Button onClick={handleSaveSite} disabled={!canEdit}>
                <Save className="size-4 mr-1.5" />
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Social media */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" value={socialForm.facebook} onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })} placeholder="https://facebook.com/..." disabled={!canEdit} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" value={socialForm.instagram} onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })} placeholder="https://instagram.com/..." disabled={!canEdit} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" value={socialForm.linkedin} onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })} placeholder="https://linkedin.com/..." disabled={!canEdit} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input id="youtube" value={socialForm.youtube} onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })} placeholder="https://youtube.com/..." disabled={!canEdit} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">X (Twitter)</Label>
                  <Input id="twitter" value={socialForm.twitter} onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })} placeholder="https://x.com/..." disabled={!canEdit} />
                </div>
                <Button onClick={handleSaveSocial} disabled={!canEdit}>
                  <Save className="size-4 mr-1.5" />
                  Save Social Links
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="size-5" />
                Site Statistics
              </CardTitle>
              <CardDescription>Numbers shown on the homepage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="followers">Followers</Label>
                    <Input id="followers" type="number" value={statsForm.followers} onChange={(e) => setStatsForm({ ...statsForm, followers: parseInt(e.target.value) || 0 })} disabled={!canEdit} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-events">Events</Label>
                    <Input id="s-events" type="number" value={statsForm.events} onChange={(e) => setStatsForm({ ...statsForm, events: parseInt(e.target.value) || 0 })} disabled={!canEdit} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-members">Members</Label>
                    <Input id="s-members" type="number" value={statsForm.members} onChange={(e) => setStatsForm({ ...statsForm, members: parseInt(e.target.value) || 0 })} disabled={!canEdit} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-partners">Partners</Label>
                    <Input id="s-partners" type="number" value={statsForm.partners} onChange={(e) => setStatsForm({ ...statsForm, partners: parseInt(e.target.value) || 0 })} disabled={!canEdit} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-alumni">Alumni</Label>
                    <Input id="s-alumni" type="number" value={statsForm.alumni} onChange={(e) => setStatsForm({ ...statsForm, alumni: parseInt(e.target.value) || 0 })} disabled={!canEdit} />
                  </div>
                </div>
                <Button onClick={handleSaveStats} disabled={!canEdit}>
                  <Save className="size-4 mr-1.5" />
                  Save Stats
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
