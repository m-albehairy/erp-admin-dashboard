import { useState, ReactNode } from "react";
import { Link } from "wouter";
import { Menu, X, Bell, Settings, LogOut, User, Search, Globe, Maximize2, Moon, Sun, Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Breadcrumb from "@/components/Breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

interface NavItem {
  name: string;
  icon: string;
  href?: string;
  submenu?: NavItem[];
  isHeader?: boolean;
}

export default function DashboardLayout({ children, currentPage = "Dashboard", breadcrumbs }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("expandedMenus");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const { theme, language, financialYear, toggleTheme, setLanguage, setFinancialYear } = useSettings();

  const isRTL = language === "ar";

  // Persist expanded menus to localStorage
  const handleToggleMenu = (menuName: string) => {
    const newExpanded = expandedMenus.includes(menuName)
      ? expandedMenus.filter((m) => m !== menuName)
      : [...expandedMenus, menuName];
    setExpandedMenus(newExpanded);
    localStorage.setItem("expandedMenus", JSON.stringify(newExpanded));
  };

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: "📊", href: "/" },
    { name: "Inventory", icon: "📦", href: "/inventory" },
    { name: "Analytics", icon: "📈", href: "/analytics" },
    { name: "SALES", icon: "", isHeader: true },
    {
      name: "Orders",
      icon: "🛒",
      submenu: [
        { name: "All Orders", icon: "📋", href: "/order-details" },
        { name: "Pending", icon: "⏳", href: "/order-details" },
        { name: "Completed", icon: "✅", href: "/order-details" },
      ],
    },
    {
      name: "Customers",
      icon: "👥",
      submenu: [
        { name: "All Customers", icon: "👥", href: "/customer-details" },
        { name: "Active", icon: "✨", href: "/customer-details" },
        { name: "Inactive", icon: "🔒", href: "/customer-details" },
      ],
    },
    { name: "OPERATIONS", icon: "", isHeader: true },
    {
      name: "Products",
      icon: "📦",
      submenu: [
        { name: "All Products", icon: "📦", href: "/product-details" },
        { name: "In Stock", icon: "✅", href: "/product-details" },
        { name: "Low Stock", icon: "⚠️", href: "/product-details" },
      ],
    },
    {
      name: "Purchase Orders",
      icon: "🛍️",
      href: "/purchase-orders",
    },
    {
      name: "Employees",
      icon: "👤",
      href: "/employees",
    },
    { name: "REPORTS & ANALYTICS", icon: "", isHeader: true },
    {
      name: "Reports",
      icon: "📋",
      submenu: [
        { name: "Sales Report", icon: "💹", href: "/reports" },
        { name: "Inventory Report", icon: "📦", href: "/reports" },
        { name: "Customer Report", icon: "👥", href: "/reports" },
      ],
    },
    {
      name: "Financial",
      icon: "💰",
      href: "/financial",
    },
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => {
      if (item.isHeader) {
        return (
          <div key={item.name} className={`py-3 px-4 ${sidebarOpen ? "" : "hidden"}`}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.name}</p>
          </div>
        );
      }
      return (
      <div key={item.name}>
        {item.submenu ? (
          <>
            <button
              onClick={() => handleToggleMenu(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:scale-105 hover:translate-x-1 ${
                expandedMenus.includes(item.name) ? "bg-sidebar-accent/50" : ""
              } ${level > 0 ? "text-sm" : ""}`}
            >
              <span className="text-base">{item.icon}</span>
              {(sidebarOpen || sidebarHovered) && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${expandedMenus.includes(item.name) ? "rotate-180" : ""}`}
                  />
                </>
              )}
            </button>
            {expandedMenus.includes(item.name) && (sidebarOpen || sidebarHovered) && (
              <div className="pl-4 space-y-1 border-l-2 border-sidebar-accent ml-4">
                {renderNavItems(item.submenu, level + 1)}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href || "/"}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:translate-x-1 ${
              currentPage === item.name
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            } ${level > 0 ? "text-sm" : ""}`}
          >
            <span className="text-base">{item.icon}</span>
            {(sidebarOpen || sidebarHovered) && <span>{item.name}</span>}
          </Link>
        )}
      </div>
    );
    });
  };

  return (
    <div className={`flex h-screen bg-background ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside
        onMouseEnter={() => !sidebarOpen && setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={`${
          sidebarOpen || sidebarHovered ? (isRTL ? "w-64" : "w-64") : "w-20"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col ${isRTL ? "border-r-0 border-l" : ""}`}
      >
        {/* Logo Section */}
        <div className={`p-6 border-b border-sidebar-border space-y-4 ${isRTL ? "text-right" : ""}`}>
          <Link href="/" className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            {(sidebarOpen || sidebarHovered) && <span className="font-display font-bold text-lg text-foreground">ERP</span>}
          </Link>

          {(sidebarOpen || sidebarHovered) && (
            <div className="bg-sidebar-accent/50 rounded-lg p-3 border border-sidebar-border/50">
              <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  AC
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-sidebar-foreground truncate">Acme Corp</p>
                  <p className="text-xs text-muted-foreground truncate">Premium Plan</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {renderNavItems(navItems)}

          {/* Separator with Title */}
          {(sidebarOpen || sidebarHovered) && (
            <div className="py-4 px-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-sidebar-border"></div>
                <span className="text-xs font-semibold text-muted-foreground uppercase">Settings</span>
                <div className="flex-1 h-px bg-sidebar-border"></div>
              </div>
            </div>
          )}

          <Link href="/settings" className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
            <Settings size={18} />
            {(sidebarOpen || sidebarHovered) && <span>Settings</span>}
          </Link>
        </nav>

        {/* Footer Section */}
        <div className={`p-4 border-t border-sidebar-border space-y-2 ${isRTL ? "text-right" : ""}`}>
          <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
            <LogOut size={18} />
            {(sidebarOpen || sidebarHovered) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-border shadow-sm">
          <div className={`px-6 py-4 flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Left Section */}
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="font-display font-bold text-xl text-foreground hidden sm:block">{currentPage}</h1>
            </div>

            {/* Center Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search size={18} className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                <Input
                  type="text"
                  placeholder="Search..."
                  className={`${isRTL ? "pr-10 text-right" : "pl-10"} bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary`}
                />
              </div>
            </div>

            {/* Right Section - Icons */}
            <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Globe size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {["en", "es", "fr", "de", "zh", "ar"].map((lang) => (
                    <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                      {lang === "en" ? "English" : lang === "es" ? "Español" : lang === "fr" ? "Français" : lang === "de" ? "Deutsch" : lang === "zh" ? "中文" : "العربية"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fullscreen */}
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={toggleFullscreen}>
                <Maximize2 size={18} />
              </Button>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0" onClick={toggleTheme}>
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>

              {/* Financial Year */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 px-3 gap-2">
                    <Calendar size={16} />
                    <span className="text-sm">{financialYear}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {["2025-2026", "2024-2025", "2023-2024"].map((year) => (
                    <DropdownMenuItem key={year} onClick={() => setFinancialYear(year)}>
                      {year}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Color Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <div className="w-5 h-5 rounded-full bg-primary"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
                  <div className="px-2 py-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Theme Color</p>
                    <div className="grid grid-cols-3 gap-2">
                      {["blue", "purple", "green", "orange", "red", "pink", "teal", "indigo", "cyan", "amber", "rose", "slate"].map((color) => {
                        const colorMap: Record<string, string> = {
                          blue: "#0066CC",
                          purple: "#7C3AED",
                          green: "#10B981",
                          orange: "#F97316",
                          red: "#EF4444",
                          pink: "#EC4899",
                          teal: "#14B8A6",
                          indigo: "#4F46E5",
                          cyan: "#06B6D4",
                          amber: "#F59E0B",
                          rose: "#F43F5E",
                          slate: "#64748B",
                        };
                        return (
                          <button
                            key={color}
                            onClick={() => {
                              const colors: Record<string, { primary: string; sidebar: string; chart: string[] }> = {
                                blue: { primary: "#0066CC", sidebar: "#0052A3", chart: ["#3B82F6", "#0066CC", "#0052A3", "#003D7A", "#002E5C"] },
                                purple: { primary: "#7C3AED", sidebar: "#6D28D9", chart: ["#A78BFA", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95"] },
                                green: { primary: "#10B981", sidebar: "#059669", chart: ["#6EE7B7", "#10B981", "#059669", "#047857", "#065F46"] },
                                orange: { primary: "#F97316", sidebar: "#EA580C", chart: ["#FDBA74", "#F97316", "#EA580C", "#C2410C", "#92220C"] },
                                red: { primary: "#EF4444", sidebar: "#DC2626", chart: ["#FCA5A5", "#EF4444", "#DC2626", "#B91C1C", "#7F1D1D"] },
                                pink: { primary: "#EC4899", sidebar: "#DB2777", chart: ["#F472B6", "#EC4899", "#DB2777", "#BE185D", "#831843"] },
                                teal: { primary: "#14B8A6", sidebar: "#0D9488", chart: ["#5EEAD4", "#14B8A6", "#0D9488", "#0F766E", "#134E4A"] },
                                indigo: { primary: "#4F46E5", sidebar: "#4338CA", chart: ["#A5B4FC", "#4F46E5", "#4338CA", "#3730A3", "#312E81"] },
                                cyan: { primary: "#06B6D4", sidebar: "#0891B2", chart: ["#22D3EE", "#06B6D4", "#0891B2", "#0E7490", "#164E63"] },
                                amber: { primary: "#F59E0B", sidebar: "#D97706", chart: ["#FCD34D", "#F59E0B", "#D97706", "#B45309", "#78350F"] },
                                rose: { primary: "#F43F5E", sidebar: "#E11D48", chart: ["#FB7185", "#F43F5E", "#E11D48", "#BE185D", "#831843"] },
                                slate: { primary: "#64748B", sidebar: "#475569", chart: ["#CBD5E1", "#64748B", "#475569", "#334155", "#1E293B"] },
                              };
                              const c = colors[color];
                              document.documentElement.style.setProperty("--primary", c.primary);
                              document.documentElement.style.setProperty("--sidebar-primary", c.sidebar);
                              document.documentElement.style.setProperty("--chart-1", c.chart[0]);
                              document.documentElement.style.setProperty("--chart-2", c.chart[1]);
                              document.documentElement.style.setProperty("--chart-3", c.chart[2]);
                              document.documentElement.style.setProperty("--chart-4", c.chart[3]);
                              document.documentElement.style.setProperty("--chart-5", c.chart[4]);
                            }}
                            className="w-8 h-8 rounded-full border-2 border-border hover:border-foreground transition-all"
                            style={{ backgroundColor: colorMap[color] }}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>

              {/* Settings */}
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Settings size={18} />
                </Button>
              </Link>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full bg-primary text-white hover:bg-blue-700">
                    JD
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-medium text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@company.com</p>
                  </div>
                  <DropdownMenuItem>
                    <User size={16} className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

        </header>

        {/* Page Header with Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="px-6 py-4">
            <div className={`flex items-center justify-between mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              <h1 className="font-display font-bold text-2xl text-foreground">{currentPage}</h1>
            </div>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className={isRTL ? "text-right" : ""}>
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
