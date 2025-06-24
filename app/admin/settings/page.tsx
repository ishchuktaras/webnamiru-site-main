"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Shield, Search, Save, Mail } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Web na míru",
    siteDescription: "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem. Váš web od ekonoma.",
    siteUrl: "https://webnamiru.site",
    contactEmail: "info@webnamiru.site",
    adminEmail: "admin@webnamiru.site",
  })

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Web na míru - Strategické weby, které vydělávají",
    metaDescription:
      "Tvořím weby, které nejsou jen vizitkou, ale funkčním obchodním nástrojem. Váš web od ekonoma na Vysočině.",
    metaKeywords: "webové stránky, web development, SEO, Vysočina, ekonom",
    googleAnalytics: "",
    googleSearchConsole: "",
    enableSitemap: true,
    enableRobots: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    enableCommentModeration: true,
    enableRateLimiting: true,
    enableCaptcha: false,
    maxLoginAttempts: 5,
    sessionTimeout: 24,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    enableEmailNotifications: true,
    notifyOnNewComment: true,
    notifyOnNewSubscriber: true,
  })

  const handleSaveGeneral = () => {
    toast({
      title: "Nastavení uloženo",
      description: "Obecná nastavení byla úspěšně aktualizována.",
    })
  }

  const handleSaveSEO = () => {
    toast({
      title: "SEO nastavení uloženo",
      description: "SEO konfigurace byla úspěšně aktualizována.",
    })
  }

  const handleSaveSecurity = () => {
    toast({
      title: "Bezpečnostní nastavení uloženo",
      description: "Bezpečnostní konfigurace byla úspěšně aktualizována.",
    })
  }

  const handleSaveEmail = () => {
    toast({
      title: "Email nastavení uloženo",
      description: "Emailová konfigurace byla úspěšně aktualizována.",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Obecné
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Bezpečnost
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Obecná nastavení webu
              </CardTitle>
              <CardDescription>Základní informace o vašem webu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="site-name">Název webu</Label>
                  <Input
                    id="site-name"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="site-url">URL webu</Label>
                  <Input
                    id="site-url"
                    value={generalSettings.siteUrl}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="site-description">Popis webu</Label>
                <Textarea
                  id="site-description"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contact-email">Kontaktní email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="admin-email">Admin email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={generalSettings.adminEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleSaveGeneral} className="bg-slate-600 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Uložit obecná nastavení
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                SEO nastavení
              </CardTitle>
              <CardDescription>Optimalizace pro vyhledávače</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={seoSettings.metaTitle}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={seoSettings.metaDescription}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  value={seoSettings.metaKeywords}
                  onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                  placeholder="klíčová slova oddělená čárkami"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="google-analytics">Google Analytics ID</Label>
                  <Input
                    id="google-analytics"
                    value={seoSettings.googleAnalytics}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalytics: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="search-console">Google Search Console</Label>
                  <Input
                    id="search-console"
                    value={seoSettings.googleSearchConsole}
                    onChange={(e) => setSeoSettings({ ...seoSettings, googleSearchConsole: e.target.value })}
                    placeholder="verification code"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Povolit sitemap.xml</Label>
                    <p className="text-sm text-slate-600">Automaticky generovaná mapa webu</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableSitemap}
                    onCheckedChange={(checked) => setSeoSettings({ ...seoSettings, enableSitemap: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Povolit robots.txt</Label>
                    <p className="text-sm text-slate-600">Instrukce pro vyhledávače</p>
                  </div>
                  <Switch
                    checked={seoSettings.enableRobots}
                    onCheckedChange={(checked) => setSeoSettings({ ...seoSettings, enableRobots: checked })}
                  />
                </div>
              </div>

              <Button onClick={handleSaveSEO} className="bg-slate-600 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Uložit SEO nastavení
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Bezpečnostní nastavení
              </CardTitle>
              <CardDescription>Konfigurace zabezpečení webu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Moderace komentářů</Label>
                    <p className="text-sm text-slate-600">Komentáře vyžadují schválení před publikováním</p>
                  </div>
                  <Switch
                    checked={securitySettings.enableCommentModeration}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enableCommentModeration: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rate limiting</Label>
                    <p className="text-sm text-slate-600">Omezení počtu požadavků z jedné IP adresy</p>
                  </div>
                  <Switch
                    checked={securitySettings.enableRateLimiting}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enableRateLimiting: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>CAPTCHA</Label>
                    <p className="text-sm text-slate-600">Ochrana proti robotům ve formulářích</p>
                  </div>
                  <Switch
                    checked={securitySettings.enableCaptcha}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableCaptcha: checked })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="max-login">Max. pokusů o přihlášení</Label>
                  <Input
                    id="max-login"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="session-timeout">Timeout session (hodiny)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveSecurity} className="bg-slate-600 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Uložit bezpečnostní nastavení
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email nastavení
              </CardTitle>
              <CardDescription>Konfigurace emailového serveru a notifikací</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="smtp-user">SMTP Uživatel</Label>
                  <Input
                    id="smtp-user"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-password">SMTP Heslo</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Emailové notifikace</Label>
                    <p className="text-sm text-slate-600">Povolit odesílání notifikačních emailů</p>
                  </div>
                  <Switch
                    checked={emailSettings.enableEmailNotifications}
                    onCheckedChange={(checked) =>
                      setEmailSettings({ ...emailSettings, enableEmailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifikace o novém komentáři</Label>
                    <p className="text-sm text-slate-600">Email při přidání nového komentáře</p>
                  </div>
                  <Switch
                    checked={emailSettings.notifyOnNewComment}
                    onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, notifyOnNewComment: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifikace o novém odběrateli</Label>
                    <p className="text-sm text-slate-600">Email při registraci nového odběratele</p>
                  </div>
                  <Switch
                    checked={emailSettings.notifyOnNewSubscriber}
                    onCheckedChange={(checked) =>
                      setEmailSettings({ ...emailSettings, notifyOnNewSubscriber: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveEmail} className="bg-slate-600 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Uložit email nastavení
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
