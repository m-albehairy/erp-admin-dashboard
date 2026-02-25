import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Eye, Edit, Trash2, Truck, CheckCircle, Clock, AlertCircle, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

export default function PurchaseOrders() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Purchase Orders" },
  ];

  const purchaseOrders = [
    {
      id: "PO-2024-001",
      supplier: "Tech Supplies Inc.",
      date: "Feb 20, 2024",
      items: 5,
      total: "$12,450",
      status: "Delivered",
      deliveryDate: "Feb 25, 2024",
      paymentStatus: "Paid",
    },
    {
      id: "PO-2024-002",
      supplier: "Global Electronics",
      date: "Feb 18, 2024",
      items: 3,
      total: "$8,920",
      status: "In Transit",
      deliveryDate: "Expected: Feb 28, 2024",
      paymentStatus: "Pending",
    },
    {
      id: "PO-2024-003",
      supplier: "Premium Logistics",
      date: "Feb 15, 2024",
      items: 8,
      total: "$15,680",
      status: "Processing",
      deliveryDate: "Expected: Mar 5, 2024",
      paymentStatus: "Pending",
    },
    {
      id: "PO-2024-004",
      supplier: "Industrial Parts Co.",
      date: "Feb 10, 2024",
      items: 12,
      total: "$22,340",
      status: "Delivered",
      deliveryDate: "Feb 20, 2024",
      paymentStatus: "Paid",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} className="text-accent" />;
      case "In Transit":
        return <Truck size={16} className="text-primary" />;
      case "Processing":
        return <Clock size={16} className="text-orange-500" />;
      default:
        return <AlertCircle size={16} className="text-destructive" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-accent";
      case "In Transit":
        return "bg-blue-50 text-primary";
      case "Processing":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-red-50 text-destructive";
    }
  };

  return (
    <DashboardLayout currentPage="Purchase Orders" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : ""}>
            <h2 className="font-display font-bold text-2xl text-foreground">Purchase Orders</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage supplier orders and deliveries</p>
          </div>
          <Button className="bg-primary hover:bg-blue-700 text-white">
            <Plus size={16} className="mr-2" />
            New Purchase Order
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-xs font-medium text-muted-foreground uppercase">Total POs</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">24</h3>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-xs font-medium text-muted-foreground uppercase">Total Spent</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">$185,420</h3>
            <p className="text-xs text-accent mt-1">↑ 12% vs last month</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-xs font-medium text-muted-foreground uppercase">Pending</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">8</h3>
            <p className="text-xs text-orange-600 mt-1">Awaiting delivery</p>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <p className="text-xs font-medium text-muted-foreground uppercase">Suppliers</p>
            <h3 className="text-2xl font-bold text-foreground mt-2">12</h3>
            <p className="text-xs text-muted-foreground mt-1">Active partners</p>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="bg-white shadow-sm border-0 p-4">
          <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search purchase orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-0"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-secondary border-0 rounded-lg text-foreground"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="in-transit">In Transit</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </Card>

        {/* Purchase Orders Table */}
        <Card className="bg-white shadow-sm border-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className={`px-6 py-3 text-left text-sm font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>
                    PO Number
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>
                    Supplier
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>
                    Date
                  </th>
                  <th className={`px-6 py-3 text-center text-sm font-semibold text-foreground`}>Items</th>
                  <th className={`px-6 py-3 text-right text-sm font-semibold text-foreground ${isRTL ? "text-left" : ""}`}>
                    Total
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold text-foreground ${isRTL ? "text-right" : ""}`}>
                    Payment
                  </th>
                  <th className={`px-6 py-3 text-center text-sm font-semibold text-foreground`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="border-b border-border hover:bg-secondary transition-colors">
                    <td className={`px-6 py-4 text-sm font-medium text-primary ${isRTL ? "text-right" : ""}`}>
                      {po.id}
                    </td>
                    <td className={`px-6 py-4 text-sm text-foreground ${isRTL ? "text-right" : ""}`}>
                      {po.supplier}
                    </td>
                    <td className={`px-6 py-4 text-sm text-muted-foreground ${isRTL ? "text-right" : ""}`}>
                      {po.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground text-center">{po.items}</td>
                    <td className={`px-6 py-4 text-sm font-semibold text-foreground text-right ${isRTL ? "text-left" : ""}`}>
                      {po.total}
                    </td>
                    <td className={`px-6 py-4 ${isRTL ? "text-right" : ""}`}>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                        {getStatusIcon(po.status)}
                        {po.status}
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${isRTL ? "text-right" : ""}`}>
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        po.paymentStatus === "Paid"
                          ? "bg-green-50 text-accent"
                          : "bg-orange-50 text-orange-600"
                      }`}>
                        {po.paymentStatus}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            ⋮
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={isRTL ? "start" : "end"}>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Track Delivery</DropdownMenuItem>
                          <DropdownMenuItem>Record Payment</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Supplier Performance */}
        <Card className="bg-white shadow-sm border-0 p-6">
          <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
            Top Suppliers
          </h3>
          <div className="space-y-4">
            {[
              { name: "Tech Supplies Inc.", orders: 8, spent: "$45,200", rating: 4.8 },
              { name: "Global Electronics", orders: 6, spent: "$32,100", rating: 4.5 },
              { name: "Industrial Parts Co.", orders: 5, spent: "$28,900", rating: 4.7 },
            ].map((supplier, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 border border-border rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="font-medium text-foreground">{supplier.name}</p>
                  <p className="text-xs text-muted-foreground">{supplier.orders} orders • {supplier.spent}</p>
                </div>
                <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm font-semibold text-foreground">{supplier.rating}</span>
                  <span className="text-orange-400">★</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
