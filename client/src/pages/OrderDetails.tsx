import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TableControls from "@/components/TableControls";
import FormModal from "@/components/FormModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Edit, Trash2, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

const ordersData = [
  { id: 1, orderNo: "ORD-2024-001", customer: "John Doe", amount: "$1,299", status: "completed", date: "2024-02-20" },
  { id: 2, orderNo: "ORD-2024-002", customer: "Jane Smith", amount: "$2,450", status: "in-transit", date: "2024-02-21" },
  { id: 3, orderNo: "ORD-2024-003", customer: "Mike Johnson", amount: "$899", status: "pending", date: "2024-02-22" },
  { id: 4, orderNo: "ORD-2024-004", customer: "Sarah Williams", amount: "$3,200", status: "completed", date: "2024-02-23" },
  { id: 5, orderNo: "ORD-2024-005", customer: "Tom Brown", amount: "$1,550", status: "pending", date: "2024-02-24" },
  { id: 6, orderNo: "ORD-2024-006", customer: "Emma Davis", amount: "$2,100", status: "in-transit", date: "2024-02-25" },
  { id: 7, orderNo: "ORD-2024-007", customer: "Chris Wilson", amount: "$890", status: "completed", date: "2024-02-26" },
  { id: 8, orderNo: "ORD-2024-008", customer: "Lisa Anderson", amount: "$1,750", status: "pending", date: "2024-02-27" },
  { id: 9, orderNo: "ORD-2024-009", customer: "David Taylor", amount: "$2,600", status: "completed", date: "2024-02-28" },
  { id: 10, orderNo: "ORD-2024-010", customer: "Rachel Martin", amount: "$1,200", status: "in-transit", date: "2024-02-29" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-50 text-green-600";
    case "in-transit":
      return "bg-blue-50 text-blue-600";
    case "pending":
      return "bg-orange-50 text-orange-600";
    case "cancelled":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
}

export default function OrderDetails() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ orderNo: "", customer: "", amount: "", status: "" });

  const totalPages = Math.ceil(ordersData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = ordersData.slice(startIndex, startIndex + pageSize);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const csv = [
      ["Order No", "Customer", "Amount", "Status", "Date"],
      ...ordersData.map(item => [item.orderNo, item.customer, item.amount, item.status, item.date])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders-export.csv";
    a.click();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Orders" },
  ];

  return (
    <DashboardLayout currentPage="Orders" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${isRTL ? "text-right" : ""}`}>
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground">Orders Management</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage and track all customer orders</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">2,345</h3>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <h3 className="text-2xl font-bold text-orange-600 mt-2">23</h3>
            <p className="text-xs text-muted-foreground mt-2">Awaiting action</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">In Transit</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">45</h3>
            <p className="text-xs text-muted-foreground mt-2">On the way</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">2,277</h3>
            <p className="text-xs text-muted-foreground mt-2">Delivered</p>
          </Card>
        </div>

        {/* Table Controls */}
        <TableControls
          onSearch={() => {}}
          onAddNew={() => setIsCreateModalOpen(true)}
          onPrint={handlePrint}
          onExport={handleExport}
          onReload={handleReload}
          onViewChange={setViewMode}
          viewMode={viewMode}
          isRTL={isRTL}
          addButtonLabel="Create Order"
        />

        {/* Table View */}
        {viewMode === "table" && (
          <Card className="bg-white shadow-sm border-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>Order No</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>Customer</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>Amount</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>Status</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>Date</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedData.map((order) => (
                    <tr key={order.id} className="hover:bg-secondary transition-colors">
                      <td className={`px-6 py-4 text-sm font-medium text-foreground ${isRTL ? "text-right" : ""}`}>{order.orderNo}</td>
                      <td className={`px-6 py-4 text-sm text-foreground ${isRTL ? "text-right" : ""}`}>{order.customer}</td>
                      <td className={`px-6 py-4 text-sm font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>{order.amount}</td>
                      <td className={`px-6 py-4 text-sm ${isRTL ? "text-right" : ""}`}>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("-", " ")}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm text-muted-foreground ${isRTL ? "text-right" : ""}`}>{order.date}</td>
                      <td className={`px-6 py-4 text-sm ${isRTL ? "text-right" : ""}`}>
                        <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                            setFormData({ orderNo: order.orderNo, customer: order.customer, amount: order.amount, status: order.status });
                            setIsEditModalOpen(true);
                          }}>
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`px-6 py-4 border-t border-border flex items-center justify-between ${isRTL ? "flex-row-reverse text-right" : ""}`}>
              <p className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + pageSize, ordersData.length)} of {ordersData.length} orders
              </p>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Button
                  variant="outline"
                  className="border-border"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded transition-colors text-sm ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-border hover:bg-secondary"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <Button
                  variant="outline"
                  className="border-border"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((order) => (
              <Card key={order.id} className="p-6 bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
                <div className={`flex justify-between items-start mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={isRTL ? "text-right" : ""}>
                    <h3 className="font-display font-bold text-lg text-foreground">{order.orderNo}</h3>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("-", " ")}
                  </span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="text-sm font-semibold text-foreground">{order.amount}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-semibold text-foreground">{order.date}</span>
                  </div>
                </div>
                <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Button variant="outline" className="flex-1 border-border">
                    <Eye size={16} />
                  </Button>
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

        {/* Create Modal */}
        <FormModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Order"
          description="Enter order details"
          onSubmit={() => {
            setIsCreateModalOpen(false);
            setFormData({ orderNo: "", customer: "", amount: "", status: "" });
          }}
          submitLabel="Create Order"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Order Number</label>
              <Input placeholder="ORD-2024-XXX" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Customer Name</label>
              <Input placeholder="Enter customer name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Amount</label>
              <Input placeholder="Enter amount" className="mt-1" />
            </div>
          </div>
        </FormModal>

        {/* Edit Modal */}
        <FormModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Order"
          description="Update order details"
          onSubmit={() => {
            setIsEditModalOpen(false);
            setFormData({ orderNo: "", customer: "", amount: "", status: "" });
          }}
          submitLabel="Update Order"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Order Number</label>
              <Input value={formData.orderNo} placeholder="ORD-2024-XXX" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Customer Name</label>
              <Input value={formData.customer} placeholder="Enter customer name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Amount</label>
              <Input value={formData.amount} placeholder="Enter amount" className="mt-1" />
            </div>
          </div>
        </FormModal>
      </div>
    </DashboardLayout>
  );
}
