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
}

export default function DashboardLayout({ children, currentPage = "Dashboard", breadcrumbs }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { theme, language, financialYear, toggleTheme, setLanguage, setFinancialYear } = useSettings();

  const isRTL = language === "ar";

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: "📊", href: "/" },
    { name: "Inventory", icon: "📦", href: "/inventory" },
    { name: "Analytics", icon: "📈", href: "/analytics" },
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
    {
      name: "Employees",
      icon: "👤",
      href: "/employees",
    },
    {
      name: "Purchase Orders",
      icon: "🛍️",
      href: "/purchase-orders",
    },
  ];

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName) ? prev.filter((m) => m !== menuName) : [...prev, menuName]
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.name}>
        {item.submenu ? (
          <>
            <button
              onClick={() => toggleMenu(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent/50 ${
                expandedMenus.includes(item.name) ? "bg-sidebar-accent/50" : ""
              } ${level > 0 ? "text-sm" : ""}`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${expandedMenus.includes(item.name) ? "rotate-180" : ""}`}
                  />
                </>
              )}
            </button>
            {expandedMenus.includes(item.name) && sidebarOpen && (
              <div className="pl-4 space-y-1 border-l-2 border-sidebar-accent ml-4">
                {renderNavItems(item.submenu, level + 1)}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href || "/"}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentPage === item.name
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            } ${level > 0 ? "text-sm" : ""}`}
          >
            <span className="text-xl">{item.icon}</span>
            {sidebarOpen && <span>{item.name}</span>}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <div className={`flex h-screen bg-background ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? (isRTL ? "w-64" : "w-64") : "w-20"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col ${isRTL ? "border-r-0 border-l" : ""}`}
      >
        {/* Logo Section */}
        <div className={`p-6 border-b border-sidebar-border ${isRTL ? "text-right" : ""}`}>
          <Link href="/" className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            {sidebarOpen && <span className="font-display font-bold text-lg text-foreground">ERP</span>}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {renderNavItems(navItems)}

          {/* Separator with Title */}
          {sidebarOpen && (
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
            {sidebarOpen && <span>Settings</span>}
          </Link>
        </nav>

        {/* Footer Section */}
        <div className={`p-4 border-t border-sidebar-border space-y-2 ${isRTL ? "text-right" : ""}`}>
          <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
            <LogOut size={18} />
            {sidebarOpen && <span>Logout</span>}
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

          {/* Breadcrumb */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className={`px-6 py-2 bg-secondary border-t border-border ${isRTL ? "text-right" : ""}`}>
              <Breadcrumb items={breadcrumbs} />
            </div>
          )}
        </header>

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
