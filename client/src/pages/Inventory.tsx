import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, AlertCircle, CheckCircle, Download, Printer, RotateCcw, Calendar, Grid3x3, List, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

const inventoryData = [
  { id: 1, name: "Laptop Pro 15\"", sku: "LAP-001", quantity: 45, reorderLevel: 20, status: "in-stock", price: "$1,299" },
  { id: 2, name: "Wireless Mouse", sku: "MOU-002", quantity: 8, reorderLevel: 15, status: "low-stock", price: "$29" },
  { id: 3, name: "USB-C Cable", sku: "USB-003", quantity: 0, reorderLevel: 50, status: "out-of-stock", price: "$12" },
  { id: 4, name: "Monitor 4K", sku: "MON-004", quantity: 32, reorderLevel: 10, status: "in-stock", price: "$599" },
  { id: 5, name: "Mechanical Keyboard", sku: "KEY-005", quantity: 5, reorderLevel: 10, status: "low-stock", price: "$149" },
  { id: 6, name: "Desk Lamp LED", sku: "LAM-006", quantity: 120, reorderLevel: 30, status: "in-stock", price: "$45" },
  { id: 7, name: "Webcam HD", sku: "WEB-007", quantity: 0, reorderLevel: 20, status: "out-of-stock", price: "$89" },
  { id: 8, name: "Phone Stand", sku: "PHO-008", quantity: 67, reorderLevel: 25, status: "in-stock", price: "$19" },
  { id: 9, name: "USB Hub 7-Port", sku: "HUB-009", quantity: 23, reorderLevel: 15, status: "in-stock", price: "$35" },
  { id: 10, name: "Laptop Stand", sku: "STD-010", quantity: 15, reorderLevel: 10, status: "low-stock", price: "$55" },
  { id: 11, name: "Wireless Charger", sku: "CHG-011", quantity: 42, reorderLevel: 20, status: "in-stock", price: "$25" },
  { id: 12, name: "HDMI Cable", sku: "HDM-012", quantity: 3, reorderLevel: 30, status: "low-stock", price: "$8" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "in-stock":
      return "bg-green-50 text-accent";
    case "low-stock":
      return "bg-orange-50 text-orange-600";
    case "out-of-stock":
      return "bg-red-50 text-destructive";
    default:
      return "bg-gray-50 text-gray-600";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "in-stock":
      return <CheckCircle size={16} />;
    case "low-stock":
      return <AlertCircle size={16} />;
    case "out-of-stock":
      return <AlertCircle size={16} />;
    default:
      return null;
  }
}

export default function Inventory() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dateRange, setDateRange] = useState("all");

  const totalPages = Math.ceil(inventoryData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = inventoryData.slice(startIndex, startIndex + pageSize);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const csv = [
      ["Product Name", "SKU", "Quantity", "Reorder Level", "Status", "Price"],
      ...inventoryData.map(item => [item.name, item.sku, item.quantity, item.reorderLevel, item.status, item.price])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory-export.csv";
    a.click();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Inventory" },
  ];

  return (
    <DashboardLayout currentPage="Inventory" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${isRTL ? "text-right" : ""}`}>
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground">Inventory Management</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your product inventory and stock levels</p>
          </div>
          <Button className="bg-primary hover:bg-blue-700 text-white flex items-center gap-2 w-full sm:w-auto">
            <Plus size={18} />
            Add Product
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Total Products</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">856</h3>
            <p className="text-xs text-muted-foreground mt-2">Active in inventory</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
            <h3 className="text-2xl font-bold text-orange-600 mt-2">23</h3>
            <p className="text-xs text-muted-foreground mt-2">Need reordering soon</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
            <h3 className="text-2xl font-bold text-destructive mt-2">12</h3>
            <p className="text-xs text-muted-foreground mt-2">Urgent action required</p>
          </Card>
        </div>

        {/* Search and Advanced Controls - Single Row */}
        <Card className="p-4 bg-white shadow-sm border-0">
          <div className={`flex flex-wrap gap-2 items-center ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Search Bar */}
            <div className="relative flex-1 min-w-xs">
              <Search size={18} className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`} />
              <Input 
                type="text" 
                placeholder="Search by product name or SKU..." 
                className={`${isRTL ? "pr-10 text-right" : "pl-10"} bg-secondary border-0`} 
              />
            </div>

            {/* Date Range Picker */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="hidden sm:inline">Date Range</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
                <DropdownMenuItem onClick={() => setDateRange("today")}>Today</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("week")}>This Week</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("month")}>This Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("quarter")}>This Quarter</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("year")}>This Year</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange("all")}>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border flex items-center gap-2">
                  <span className="hidden sm:inline">Sort:</span>
                  <span className="text-xs sm:text-sm">{sortBy}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
                <DropdownMenuItem onClick={() => setSortBy("name")}>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("quantity")}>Quantity (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price")}>Price (Low to High)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("status")}>Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("date")}>Date Added</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Button */}
            <Button variant="outline" className="border-border">
              Filter
            </Button>

            {/* Reload Button */}
            <Button
              variant="outline"
              className="border-border"
              onClick={handleReload}
              title="Reload data"
            >
              <RotateCcw size={16} />
            </Button>

            {/* Print Button */}
            <Button
              variant="outline"
              className="border-border"
              onClick={handlePrint}
              title="Print table"
            >
              <Printer size={16} />
            </Button>

            {/* Export Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border flex items-center gap-2">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-48">
                <DropdownMenuItem onClick={handleExport}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            <div className="flex gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "table"
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-secondary"
                }`}
                title="Table view"
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-secondary"
                }`}
                title="Grid view"
              >
                <Grid3x3 size={16} />
              </button>
            </div>
          </div>
        </Card>

        {/* Table View */}
        {viewMode === "table" && (
          <Card className="bg-white shadow-sm border-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>Product Name</th>
                    <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>SKU</th>
                    <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>Quantity</th>
                    <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>Reorder Level</th>
                    <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>Status</th>
                    <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>Price</th>
                    <th className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : "text-left"}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className={`px-6 py-4 text-sm text-foreground font-medium ${isRTL ? "text-right" : "text-left"}`}>{item.name}</td>
                      <td className={`px-6 py-4 text-sm text-muted-foreground font-mono ${isRTL ? "text-right" : "text-left"}`}>{item.sku}</td>
                      <td className={`px-6 py-4 text-sm text-foreground font-semibold ${isRTL ? "text-right" : "text-left"}`}>{item.quantity}</td>
                      <td className={`px-6 py-4 text-sm text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}>{item.reorderLevel}</td>
                      <td className={`px-6 py-4 ${isRTL ? "text-right" : "text-left"}`}>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} ${isRTL ? "flex-row-reverse" : ""}`}>
                          {getStatusIcon(item.status)}
                          {item.status === "in-stock" && "In Stock"}
                          {item.status === "low-stock" && "Low Stock"}
                          {item.status === "out-of-stock" && "Out of Stock"}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm text-foreground font-semibold ${isRTL ? "text-right" : "text-left"}`}>{item.price}</td>
                      <td className={`px-6 py-4 ${isRTL ? "text-right" : "text-left"}`}>
                        <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                          <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-destructive">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`px-6 py-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
              <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(startIndex + pageSize, inventoryData.length)} of {inventoryData.length} products
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-border">
                      Page Size: {pageSize}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-32">
                    <DropdownMenuItem onClick={() => { setPageSize(5); setCurrentPage(1); }}>5 per page</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setPageSize(10); setCurrentPage(1); }}>10 per page</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setPageSize(25); setCurrentPage(1); }}>25 per page</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setPageSize(50); setCurrentPage(1); }}>50 per page</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Button
                  variant="outline"
                  className="border-border"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded transition-colors ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "border border-border hover:bg-secondary"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="border-border"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((item) => (
              <Card key={item.id} className={`p-6 bg-white shadow-sm border-0 hover:shadow-md transition-shadow ${isRTL ? "text-right" : ""}`}>
                <div className={`flex justify-between items-start mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">{item.name}</h3>
                    <p className={`text-xs text-muted-foreground font-mono ${isRTL ? "text-right" : ""}`}>{item.sku}</p>
                  </div>
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)} ${isRTL ? "flex-row-reverse" : ""}`}>
                    {getStatusIcon(item.status)}
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <span className="text-sm font-semibold text-foreground">{item.quantity}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-muted-foreground">Reorder Level</span>
                    <span className="text-sm font-semibold text-foreground">{item.reorderLevel}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="text-sm font-semibold text-foreground">{item.price}</span>
                  </div>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Button variant="outline" className="flex-1 border-border">
                    <Edit size={16} />
                  </Button>
                  <Button variant="outline" className="flex-1 border-border text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Grid View Pagination */}
        {viewMode === "grid" && (
          <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse text-right" : ""}`}>
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, inventoryData.length)} of {inventoryData.length} products
            </p>
            <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
                Previous
              </Button>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
