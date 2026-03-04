import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download, Printer, RotateCcw, Grid3x3, List, MoreVertical } from "lucide-react";
import AnimatedModal from "@/components/AnimatedModal";
import BulkActions from "@/components/BulkActions";
import AdvancedFilters from "@/components/AdvancedFilters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

const quotationsData = [
  { id: 1, quoteNo: "QT-2024-001", customer: "Tech Corp", amount: "$5,000", status: "pending", date: "2024-02-20", validUntil: "2024-03-20" },
  { id: 2, quoteNo: "QT-2024-002", customer: "Global Industries", amount: "$12,500", status: "accepted", date: "2024-02-19", validUntil: "2024-03-19" },
  { id: 3, quoteNo: "QT-2024-003", customer: "Local Business", amount: "$3,200", status: "rejected", date: "2024-02-18", validUntil: "2024-03-18" },
  { id: 4, quoteNo: "QT-2024-004", customer: "Enterprise Ltd", amount: "$25,000", status: "pending", date: "2024-02-17", validUntil: "2024-03-17" },
  { id: 5, quoteNo: "QT-2024-005", customer: "Startup Inc", amount: "$8,750", status: "accepted", date: "2024-02-16", validUntil: "2024-03-16" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "accepted":
      return "bg-green-50 text-green-600";
    case "pending":
      return "bg-orange-50 text-orange-600";
    case "rejected":
      return "bg-red-50 text-red-600";
    case "expired":
      return "bg-gray-50 text-gray-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
}

export default function Quotations() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ quoteNo: "", customer: "", amount: "", status: "" });

  const totalPages = Math.ceil(quotationsData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = quotationsData.slice(startIndex, startIndex + pageSize);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const csv = [
      ["Quote No", "Customer", "Amount", "Status", "Date", "Valid Until"],
      ...quotationsData.map(item => [item.quoteNo, item.customer, item.amount, item.status, item.date, item.validUntil])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotations-export.csv";
    a.click();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Sales", href: "#" },
    { label: "Quotations" },
  ];

  return (
    <DashboardLayout currentPage="Quotations" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${isRTL ? "text-right" : ""}`}>
          <Button className="bg-primary hover:bg-blue-700 text-white flex items-center gap-2 w-full sm:w-auto">
            <Plus size={18} />
            Create Quotation
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Total Quotations</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">342</h3>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <h3 className="text-2xl font-bold text-orange-600 mt-2">28</h3>
            <p className="text-xs text-muted-foreground mt-2">Awaiting response</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Accepted</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">287</h3>
            <p className="text-xs text-muted-foreground mt-2">Converted to orders</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Total Value</p>
            <h3 className="text-2xl font-bold text-primary mt-2">$1.8M</h3>
            <p className="text-xs text-muted-foreground mt-2">Pipeline value</p>
          </Card>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <BulkActions
            selectedCount={selectedItems.length}
            isAllSelected={selectedItems.length === paginatedData.length}
            onSelectAll={(checked) => {
              if (checked) {
                setSelectedItems(paginatedData.map(item => item.id));
              } else {
                setSelectedItems([]);
              }
            }}
            onDelete={() => {
              setSelectedItems([]);
            }}
            onExport={() => {
              handleExport();
              setSelectedItems([]);
            }}
            onStatusUpdate={() => {
              setSelectedItems([]);
            }}
          />
        )}

        {/* Search and Advanced Controls - Single Row */}
        <Card className="p-4 bg-white shadow-sm border-0">
          <div className={`flex flex-wrap gap-2 items-center ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Search Bar */}
            <div className="flex-1 min-w-xs">
                            <Input 
                type="text" 
                placeholder="Search by quote number or customer..." 
                className={`${isRTL ? "pr-12 text-right" : "pl-12"} bg-secondary border-0`} 
              />
            </div>

            {/* Advanced Filters */}
            <AdvancedFilters
              onApplyFilters={(filters) => setAppliedFilters(filters)}
              onClearFilters={() => setAppliedFilters({})}
              filterOptions={{
                status: {
                  label: "Status",
                  options: ["Pending", "Accepted", "Rejected", "Expired"],
                },
              }}
            />

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
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(paginatedData.map(item => item.id));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                        className="w-4 h-4 rounded border-border"
                      />
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-left">Quote No</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-left">Customer</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-left">Amount</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-left">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-left">Date</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-left">Valid Until</th>
                    <th className="px-6 py-4 text-sm font-semibold text-foreground text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, item.id]);
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== item.id));
                            }
                          }}
                          className="w-4 h-4 rounded border-border"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{item.quoteNo}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.customer}</td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{item.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.validUntil}</td>
                      <td className="px-6 py-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align={isRTL ? "start" : "end"}>
                            <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Convert to Order</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`flex items-center justify-between px-6 py-4 border-t border-border ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + pageSize, quotationsData.length)} of {quotationsData.length}
              </div>
              <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-white text-foreground"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </Card>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((item) => (
              <Card key={item.id} className="p-4 bg-white shadow-sm border-0">
                <div className={`flex items-start justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={isRTL ? "text-right" : ""}>
                    <h3 className="font-semibold text-foreground">{item.quoteNo}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.customer}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-medium text-foreground">{item.amount}</p>
                      <p className="text-xs text-muted-foreground">Valid until: {item.validUntil}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        <AnimatedModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Quotation"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quote Number</label>
              <Input
                type="text"
                value={editFormData.quoteNo}
                onChange={(e) => setEditFormData({ ...editFormData, quoteNo: e.target.value })}
                placeholder="Quote number"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Customer</label>
              <Input
                type="text"
                value={editFormData.customer}
                onChange={(e) => setEditFormData({ ...editFormData, customer: e.target.value })}
                placeholder="Customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
              <Input
                type="text"
                value={editFormData.amount}
                onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                placeholder="Amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <Input
                type="text"
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                placeholder="Status"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-blue-700 text-white">Save Changes</Button>
          </div>
        </AnimatedModal>
      </div>
    </DashboardLayout>
  );
}
