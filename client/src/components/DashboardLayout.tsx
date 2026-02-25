import { useState, ReactNode } from "react";
import { Link } from "wouter";
import { Menu, X, Bell, Settings, LogOut, User, Search, Globe, Maximize2, Moon, Sun, Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Breadcrumb from "@/components/Breadcrumb";
import NotificationCenter from "@/components/NotificationCenter";
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
    { name: "SALES", icon: "", isHeader: true },
    {
      name: "Customers",
      icon: "👥",
      submenu: [
        { name: "All Customers", icon: "👥", href: "/customer-details" },
        { name: "Customer Groups", icon: "👫", href: "/customer-details" },
      ],
    },
    {
      name: "Quotations",
      icon: "📝",
      href: "/quotations",
    },
    {
      name: "Sales Orders",
      icon: "🛒",
      submenu: [
        { name: "All Orders", icon: "📋", href: "/order-details" },
        { name: "Pending", icon: "⏳", href: "/order-details" },
        { name: "Completed", icon: "✅", href: "/order-details" },
      ],
    },
    {
      name: "Sales Invoices",
      icon: "🧾",
      href: "/sales-invoices",
    },
    {
      name: "Sales Returns",
      icon: "↩️",
      href: "/sales-returns",
    },
    {
      name: "Customer Receipts",
      icon: "💳",
      href: "/customer-receipts",
    },
    {
      name: "Customer Statements",
      icon: "📊",
      href: "/customer-statements",
    },
    { name: "PURCHASES", icon: "", isHeader: true },
    {
      name: "Vendors",
      icon: "🏪",
      submenu: [
        { name: "All Vendors", icon: "🏪", href: "/vendors" },
        { name: "Vendor Groups", icon: "🏢", href: "/vendors" },
      ],
    },
    {
      name: "Purchase Orders",
      icon: "📦",
      href: "/purchase-orders",
    },
    {
      name: "Purchase Invoices",
      icon: "🧾",
      href: "/purchase-invoices",
    },
    {
      name: "Purchase Returns",
      icon: "↩️",
      href: "/purchase-returns",
    },
    {
      name: "Vendor Payments",
      icon: "💰",
      href: "/vendor-payments",
    },
    {
      name: "Vendor Statements",
      icon: "📋",
      href: "/vendor-statements",
    },
    { name: "INVENTORY", icon: "", isHeader: true },
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
      name: "Product Categories",
      icon: "🏷️",
      href: "/product-categories",
    },
    {
      name: "Units of Measure",
      icon: "📏",
      href: "/units-of-measure",
    },
    {
      name: "Warehouses",
      icon: "🏭",
      href: "/warehouses",
    },
    {
      name: "Opening Stock",
      icon: "📊",
      href: "/opening-stock",
    },
    {
      name: "Stock Adjustments",
      icon: "⚙️",
      href: "/stock-adjustments",
    },
    {
      name: "Stock Transfers",
      icon: "🔄",
      href: "/stock-transfers",
    },
    {
      name: "Stock Count",
      icon: "📝",
      href: "/stock-count",
    },
    {
      name: "Inventory Valuation",
      icon: "💹",
      href: "/inventory-valuation",
    },
    {
      name: "Stock Movement Report",
      icon: "📈",
      href: "/stock-movement",
    },
    { name: "ACCOUNTING", icon: "", isHeader: true },
    {
      name: "Chart of Accounts",
      icon: "📋",
      href: "/chart-of-accounts",
    },
    {
      name: "Journal Entries",
      icon: "📝",
      href: "/journal-entries",
    },
    {
      name: "Journal Types",
      icon: "🏷️",
      href: "/journal-types",
    },
    {
      name: "Opening Balances",
      icon: "⚖️",
      href: "/opening-balances",
    },
    {
      name: "Fiscal Years",
      icon: "📅",
      href: "/fiscal-years",
    },
    {
      name: "Period Closing",
      icon: "🔒",
      href: "/period-closing",
    },
    {
      name: "Account Statements",
      icon: "📊",
      href: "/account-statements",
    },
    {
      name: "Trial Balance",
      icon: "⚖️",
      href: "/trial-balance",
    },
    {
      name: "General Ledger",
      icon: "📖",
      href: "/general-ledger",
    },
    {
      name: "Income Statement",
      icon: "📈",
      href: "/income-statement",
    },
    {
      name: "Balance Sheet",
      icon: "📊",
      href: "/balance-sheet",
    },
    {
      name: "Cash Flow Statement",
      icon: "💵",
      href: "/cash-flow",
    },
    { name: "TREASURY", icon: "", isHeader: true },
    {
      name: "Cash Accounts",
      icon: "💵",
      href: "/cash-accounts",
    },
    {
      name: "Bank Accounts",
      icon: "🏦",
      href: "/bank-accounts",
    },
    {
      name: "Receipts",
      icon: "💳",
      href: "/receipts",
    },
    {
      name: "Payments",
      icon: "💸",
      href: "/payments",
    },
    {
      name: "Bank Transfers",
      icon: "🔄",
      href: "/bank-transfers",
    },
    {
      name: "Bank Reconciliation",
      icon: "✓",
      href: "/bank-reconciliation",
    },
    { name: "REPORTS", icon: "", isHeader: true },
    {
      name: "Sales Reports",
      icon: "📊",
      href: "/sales-reports",
    },
    {
      name: "Purchase Reports",
      icon: "📊",
      href: "/purchase-reports",
    },
    {
      name: "Inventory Reports",
      icon: "📦",
      href: "/inventory-reports",
    },
    {
      name: "Financial Reports",
      icon: "💹",
      href: "/financial-reports",
    },
    {
      name: "Aging Reports",
      icon: "📈",
      href: "/aging-reports",
    },
    {
      name: "Tax Reports",
      icon: "🧾",
      href: "/tax-reports",
    },
    { name: "SETTINGS", icon: "", isHeader: true },
    {
      name: "Company Profile",
      icon: "🏢",
      href: "/settings",
    },
    {
      name: "Branches",
      icon: "🏪",
      href: "/branches",
    },
    {
      name: "Currencies",
      icon: "💱",
      href: "/currencies",
    },
    {
      name: "Exchange Rates",
      icon: "📊",
      href: "/exchange-rates",
    },
    {
      name: "Taxes",
      icon: "🧾",
      href: "/taxes",
    },
    {
      name: "Numbering Series",
      icon: "🔢",
      href: "/numbering-series",
    },
    {
      name: "Payment Methods",
      icon: "💳",
      href: "/payment-methods",
    },
    {
      name: "Price Lists",
      icon: "💰",
      href: "/price-lists",
    },
    {
      name: "Cost Centers",
      icon: "📍",
      href: "/cost-centers",
    },
    {
      name: "Users",
      icon: "👤",
      href: "/users",
    },
    {
      name: "Roles & Permissions",
      icon: "🔐",
      href: "/roles-permissions",
    },
    {
      name: "Audit Logs",
      icon: "📋",
      href: "/audit-logs",
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
          <div key={item.name} className={`py-3 px-4 ${sidebarOpen || sidebarHovered ? "" : "hidden"}`}>
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

  const colorMap: { [key: string]: string } = {
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#10B981",
    purple: "#A855F7",
    orange: "#F97316",
    pink: "#EC4899",
    teal: "#14B8A6",
    indigo: "#6366F1",
    cyan: "#06B6D4",
    amber: "#F59E0B",
    rose: "#F43F5E",
    slate: "#64748B",
    darkgreen: "#25671E",
    darkred: "#280905",
    darkblue: "#0D1A63",
    black: "#090040",
    maroon: "#3A0519",
    darkgray: "#2C3930",
    navy: "#09122C",
    darkpurple: "#2E073F",
    darkslate: "#17153B",
  };

  const colors = [
    { name: "Red", value: "red" },
    { name: "Blue", value: "blue" },
    { name: "Green", value: "green" },
    { name: "Purple", value: "purple" },
    { name: "Orange", value: "orange" },
    { name: "Pink", value: "pink" },
    { name: "Teal", value: "teal" },
    { name: "Indigo", value: "indigo" },
    { name: "Cyan", value: "cyan" },
    { name: "Amber", value: "amber" },
    { name: "Rose", value: "rose" },
    { name: "Slate", value: "slate" },
    { name: "Dark Green", value: "darkgreen" },
    { name: "Dark Red", value: "darkred" },
    { name: "Dark Blue", value: "darkblue" },
    { name: "Black", value: "black" },
    { name: "Maroon", value: "maroon" },
    { name: "Dark Gray", value: "darkgray" },
    { name: "Navy", value: "navy" },
    { name: "Dark Purple", value: "darkpurple" },
    { name: "Dark Slate", value: "darkslate" },
  ];

  return (
    <div className={`flex h-screen bg-background ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside
        onMouseEnter={() => !sidebarOpen && setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        className={`${
          sidebarOpen || sidebarHovered ? (isRTL ? "w-64" : "w-64") : "w-20"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col overflow-y-auto ${isRTL ? "border-r-0 border-l" : ""}`}
      >
        {/* Logo Section */}
        <div className={`p-6 border-b border-sidebar-border space-y-4 ${isRTL ? "text-right" : ""} flex-shrink-0`}>
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
                <div className={isRTL ? "text-right" : ""}>
                  <p className="text-sm font-semibold text-foreground">Acme Corp</p>
                  <p className="text-xs text-muted-foreground">Premium Plan</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto space-y-1 px-3 py-4">
          {renderNavItems(navItems)}
        </nav>

        {/* Logout Button */}
        <div className={`p-4 border-t border-sidebar-border mt-auto flex-shrink-0 ${isRTL ? "text-right" : ""}`}>
          <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:scale-105 hover:translate-x-1 ${isRTL ? "flex-row-reverse" : ""}`}>
            <LogOut size={16} />
            {(sidebarOpen || sidebarHovered) && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="bg-white border-b border-border shadow-sm">
          <div className={`flex items-center justify-between px-6 py-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Left Section */}
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="relative hidden sm:block">
                <Search size={18} className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
                <Input
                  type="text"
                  placeholder="Search..."
                  className={`${isRTL ? "pr-10 text-right" : "pl-10"} bg-secondary border-0 rounded-lg focus:ring-2 focus:ring-primary w-64`}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe size={16} />
                    <span className="hidden sm:inline text-xs">{language.toUpperCase()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {["en", "es", "fr", "de", "zh", "ar"].map((lang) => (
                    <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                      {lang === "en" && "English"}
                      {lang === "es" && "Español"}
                      {lang === "fr" && "Français"}
                      {lang === "de" && "Deutsch"}
                      {lang === "zh" && "中文"}
                      {lang === "ar" && "العربية"}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fullscreen */}
              <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
                <Maximize2 size={16} />
              </Button>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </Button>

              {/* Financial Year */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Calendar size={16} />
                    <span className="hidden sm:inline text-xs">FY: {financialYear}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {["2025-2026", "2024-2025", "2023-2024", "2022-2023"].map((year) => (
                    <DropdownMenuItem key={year} onClick={() => setFinancialYear(year)}>
                      {year}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <NotificationCenter />

              {/* Theme Color Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 rounded-full"
                    style={{ backgroundColor: colorMap[theme] || colorMap.red }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-56">
                  <div className="grid grid-cols-5 gap-2 p-3">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => {
                          const root = document.documentElement;
                          root.style.setProperty("--primary", colorMap[color.value]);
                          root.style.setProperty("--primary-foreground", "#fff");
                          root.style.setProperty("--sidebar-primary", colorMap[color.value]);
                          root.style.setProperty("--sidebar-primary-foreground", "#fff");
                          root.style.setProperty("--chart-1", colorMap[color.value] + "4D");
                          root.style.setProperty("--chart-2", colorMap[color.value] + "80");
                          root.style.setProperty("--chart-3", colorMap[color.value] + "B3");
                          root.style.setProperty("--chart-4", colorMap[color.value] + "CC");
                          root.style.setProperty("--chart-5", colorMap[color.value]);
                        }}
                        className="w-8 h-8 rounded-full border-2 border-border hover:border-primary transition-all"
                        style={{ backgroundColor: colorMap[color.value] }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full bg-primary text-white font-bold">
                    JD
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>

        {/* Breadcrumb and Page Title */}
        <div className={`px-6 py-4 border-b border-border bg-secondary/50 ${isRTL ? "text-right" : ""}`}>
          <Breadcrumb items={breadcrumbs || [{ label: currentPage }]} />
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
