import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock, User, Globe, Palette, Database, Shield, LogOut, Save, X, Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";
import { useThemeColor } from "@/contexts/ThemeColorContext";
import { useThemePreset } from "@/contexts/ThemePresetContext";
import { useThemeSystem } from "@/contexts/ThemeSystemContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Settings() {
  const { language, theme, toggleTheme, setLanguage } = useSettings();
  const { themeColor, setThemeColor } = useThemeColor();
  const { currentPreset, setPreset, presets } = useThemePreset();
  const isRTL = language === "ar";
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Solutions Inc.",
    timezone: "UTC-5 (Eastern Time)",
  });

  const tabs = [
    { id: "general", label: "General", icon: "⚙️" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "appearance", label: "Appearance", icon: "🎨" },
    { id: "integrations", label: "Integrations", icon: "🔗" },
  ];

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Settings" },
  ];

  return (
    <DashboardLayout currentPage="Settings" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className={`${isRTL ? "text-right" : ""}`}>
          <h2 className="font-display font-bold text-2xl text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and application preferences</p>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-card bg-card shadow-sm border-0 p-0 overflow-hidden">
              <nav className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-left border-b border-border transition-colors flex items-center gap-3 ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-secondary"
                    } ${isRTL ? "flex-row-reverse text-right" : ""}`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === "general" && (
              <Card className="dark:bg-card bg-card shadow-sm border-0 p-6">
                <h3 className={`font-display font-bold text-lg text-foreground mb-6 ${isRTL ? "text-right" : ""}`}>
                  General Settings
                </h3>
                <div className="space-y-6">
                  {/* System Language */}
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                      System Language
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full border-border justify-between">
                          <span>
                            {language === "en" && "🇺🇸 English"}
                            {language === "es" && "🇪🇸 Español"}
                            {language === "fr" && "🇫🇷 Français"}
                            {language === "de" && "🇩🇪 Deutsch"}
                            {language === "zh" && "🇨🇳 中文"}
                            {language === "ar" && "🇸🇦 العربية"}
                          </span>
                          <Globe size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-full">
                        <DropdownMenuItem onClick={() => setLanguage("en")}>🇺🇸 English</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("es")}>🇪🇸 Español</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("fr")}>🇫🇷 Français</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("de")}>🇩🇪 Deutsch</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("zh")}>🇨🇳 中文</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLanguage("ar")}>🇸🇦 العربية</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                      Timezone
                    </label>
                    <select className={`w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none ${isRTL ? "text-right" : ""}`}>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC-6 (Central Time)</option>
                      <option>UTC-7 (Mountain Time)</option>
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (CET)</option>
                      <option>UTC+8 (CST)</option>
                    </select>
                  </div>

                  {/* Date Format */}
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                      Date Format
                    </label>
                    <select className={`w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary outline-none ${isRTL ? "text-right" : ""}`}>
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  {/* Data Backup */}
                  <div className={`p-4 bg-secondary rounded-lg border border-border ${isRTL ? "text-right" : ""}`}>
                    <h4 className="font-semibold text-foreground mb-2">Data Backup</h4>
                    <p className="text-sm text-muted-foreground mb-4">Last backup: 2 hours ago</p>
                    <Button className="bg-primary hover:bg-blue-700 text-white">
                      <Database size={16} className="mr-2" />
                      Backup Now
                    </Button>
                  </div>

                  <Button className="bg-primary hover:bg-blue-700 text-white w-full">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <Card className="dark:bg-card bg-card shadow-sm border-0 p-6">
                <h3 className={`font-display font-bold text-lg text-foreground mb-6 ${isRTL ? "text-right" : ""}`}>
                  Profile Information
                </h3>
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className={`flex items-center gap-4 pb-6 border-b border-border ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      JD
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <Button variant="outline" className="border-border mb-2">
                        Change Photo
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 5MB</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`bg-secondary border-0 ${isRTL ? "text-right" : ""}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`bg-secondary border-0 ${isRTL ? "text-right" : ""}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`bg-secondary border-0 ${isRTL ? "text-right" : ""}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>
                      Company
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`bg-secondary border-0 ${isRTL ? "text-right" : ""}`}
                    />
                  </div>

                  <Button className="bg-primary hover:bg-blue-700 text-white w-full">
                    <Save size={16} className="mr-2" />
                    Save Profile
                  </Button>
                </div>
              </Card>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <Card className="dark:bg-card bg-card shadow-sm border-0 p-6">
                <h3 className={`font-display font-bold text-lg text-foreground mb-6 ${isRTL ? "text-right" : ""}`}>
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Email Notifications", desc: "Receive updates via email" },
                    { title: "Order Updates", desc: "Get notified when orders change" },
                    { title: "Inventory Alerts", desc: "Alert when stock is low" },
                    { title: "System Alerts", desc: "Important system notifications" },
                    { title: "Weekly Reports", desc: "Receive weekly summary reports" },
                  ].map((item, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 border border-border rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                    </div>
                  ))}
                  <Button className="bg-primary hover:bg-blue-700 text-white w-full">
                    <Save size={16} className="mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card className="dark:bg-card bg-card shadow-sm border-0 p-6">
                <h3 className={`font-display font-bold text-lg text-foreground mb-6 ${isRTL ? "text-right" : ""}`}>
                  Security Settings
                </h3>
                <div className="space-y-6">
                  {/* Change Password */}
                  <div className={`p-4 border border-border rounded-lg ${isRTL ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Lock size={20} className="text-primary" />
                      <div>
                        <h4 className="font-semibold text-foreground">Change Password</h4>
                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-border">
                      Update Password
                    </Button>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className={`p-4 border border-border rounded-lg ${isRTL ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Shield size={20} className="text-accent" />
                      <div>
                        <h4 className="font-semibold text-foreground">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Not enabled</p>
                      </div>
                    </div>
                    <Button className="bg-accent hover:bg-green-600 text-white">
                      Enable 2FA
                    </Button>
                  </div>

                  {/* Active Sessions */}
                  <div className={`p-4 border border-border rounded-lg ${isRTL ? "text-right" : ""}`}>
                    <h4 className="font-semibold text-foreground mb-4">Active Sessions</h4>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-3 bg-secondary rounded ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className={isRTL ? "text-right" : ""}>
                          <p className="text-sm font-medium text-foreground">Chrome on Windows</p>
                          <p className="text-xs text-muted-foreground">Last active: 5 minutes ago</p>
                        </div>
                        <span className="text-xs font-semibold text-accent">Current</span>
                      </div>
                      <div className={`flex items-center justify-between p-3 bg-secondary rounded ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className={isRTL ? "text-right" : ""}>
                          <p className="text-sm font-medium text-foreground">Safari on iPhone</p>
                          <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                        </div>
                        <button className="text-xs text-destructive hover:underline">Logout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <Card className="dark:bg-card bg-card shadow-sm border-0 p-6">
                <h3 className={`font-display font-bold text-lg text-foreground mb-6 ${isRTL ? "text-right" : ""}`}>
                  Appearance Settings
                </h3>
                <ThemeSwitcher />
              </Card>
            )}

            {/* Integrations Settings */}
            {activeTab === "integrations" && (
              <Card className="dark:bg-card bg-card shadow-sm border-0 p-6">
                <h3 className={`font-display font-bold text-lg text-foreground mb-6 ${isRTL ? "text-right" : ""}`}>
                  Integrations
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Stripe", status: "Connected", icon: "💳" },
                    { name: "Google Drive", status: "Not Connected", icon: "📁" },
                    { name: "Slack", status: "Connected", icon: "💬" },
                    { name: "Zapier", status: "Not Connected", icon: "⚡" },
                  ].map((integration, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 border border-border rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <span className="text-2xl">{integration.icon}</span>
                        <div className={isRTL ? "text-right" : ""}>
                          <p className="font-medium text-foreground">{integration.name}</p>
                          <p className={`text-xs ${integration.status === "Connected" ? "text-accent" : "text-muted-foreground"}`}>
                            {integration.status}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-border">
                        {integration.status === "Connected" ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
