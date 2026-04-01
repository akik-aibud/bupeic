"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage site settings and social links.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Site settings */}
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  defaultValue="BUP Entrepreneurship & Innovation Club"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="Fostering innovation, creativity, and entrepreneurial mindset among BUP students."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue="info@bupeic.org"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+880 1700-000000"
                />
              </div>
              <Separator />
              <Button type="button">Save Settings</Button>
            </form>
          </CardContent>
        </Card>

        {/* Social media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  defaultValue="https://facebook.com/bupeic"
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  defaultValue="https://instagram.com/bupeic"
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  defaultValue="https://linkedin.com/company/bupeic"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">X (Twitter)</Label>
                <Input
                  id="twitter"
                  placeholder="https://x.com/..."
                />
              </div>
              <Separator />
              <Button type="button">Save Social Links</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
