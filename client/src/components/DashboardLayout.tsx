import { ReactNode, useState } from "react";
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
        { name: "All Orders", icon: "📋", href: "/orders" },
        { name: "Pending", icon: "⏳", href: "/orders/pending" },
        { name: "Completed", icon: "✅", href: "/orders/completed" },
      ],
    },
    {
      name: "Customers",
      icon: "👥",
      submenu: [
        { name: "All Customers", icon: "👥", href: "/customers" },
        { name: "Active", icon: "✨", href: "/customers/active" },
        { name: "Inactive", icon: "🔒", href: "/customers/inactive" },
      ],
    },
    {
      name: "Reports",
      icon: "📋",
      submenu: [
        { name: "Sales Report", icon: "💹", href: "/reports/sales" },
        { name: "Inventory Report", icon: "📦", href: "/reports/inventory" },
        { name: "Customer Report", icon: "👥", href: "/reports/customers" },
      ],
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
          <a
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentPage === item.name
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            } ${level > 0 ? "text-sm" : ""}`}
          >
            <span className="text-xl">{item.icon}</span>
            {sidebarOpen && <span>{item.name}</span>}
          </a>
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
          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            {sidebarOpen && <span className="font-display font-bold text-lg text-foreground">ERP</span>}
          </div>
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

          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
            <Settings size={18} />
            {sidebarOpen && <span>Settings</span>}
          </button>
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

            {/* Right Section */}
            <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Language">
                    <Globe size={20} className="text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-40">
                  <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-secondary" : ""}>
                    🇺🇸 English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("es")} className={language === "es" ? "bg-secondary" : ""}>
                    🇪🇸 Español
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("fr")} className={language === "fr" ? "bg-secondary" : ""}>
                    🇫🇷 Français
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("de")} className={language === "de" ? "bg-secondary" : ""}>
                    🇩🇪 Deutsch
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("zh")} className={language === "zh" ? "bg-secondary" : ""}>
                    🇨🇳 中文
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("ar")} className={language === "ar" ? "bg-secondary" : ""}>
                    🇸🇦 العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Fullscreen"
              >
                <Maximize2 size={20} className="text-foreground" />
              </button>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={20} className="text-foreground" /> : <Moon size={20} className="text-foreground" />}
              </button>

              {/* Financial Year Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`p-2 hover:bg-secondary rounded-lg transition-colors flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`} title="Financial Year">
                    <Calendar size={20} className="text-foreground" />
                    <span className="text-sm font-medium text-foreground hidden sm:inline">{financialYear}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
                  <DropdownMenuItem onClick={() => setFinancialYear("2025-2026")} className={financialYear === "2025-2026" ? "bg-secondary" : ""}>
                    Financial Year 2025-2026
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFinancialYear("2024-2025")} className={financialYear === "2024-2025" ? "bg-secondary" : ""}>
                    Financial Year 2024-2025
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFinancialYear("2023-2024")} className={financialYear === "2023-2024" ? "bg-secondary" : ""}>
                    Financial Year 2023-2024
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View All Years</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors" title="Notifications">
                <Bell size={20} className="text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold hover:opacity-90 transition-opacity">
                    JD
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">admin@example.com</p>
                  </div>
                  <DropdownMenuItem className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <User size={16} />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className={`flex items-center gap-2 text-destructive ${isRTL ? "flex-row-reverse" : ""}`}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background">
          <div className={`p-6 ${isRTL ? "text-right" : ""}`}>
            {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
