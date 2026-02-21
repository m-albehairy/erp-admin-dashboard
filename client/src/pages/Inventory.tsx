import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, AlertCircle, CheckCircle } from "lucide-react";

const inventoryData = [
  { id: 1, name: "Laptop Pro 15\"", sku: "LAP-001", quantity: 45, reorderLevel: 20, status: "in-stock", price: "$1,299" },
  { id: 2, name: "Wireless Mouse", sku: "MOU-002", quantity: 8, reorderLevel: 15, status: "low-stock", price: "$29" },
  { id: 3, name: "USB-C Cable", sku: "USB-003", quantity: 0, reorderLevel: 50, status: "out-of-stock", price: "$12" },
  { id: 4, name: "Monitor 4K", sku: "MON-004", quantity: 32, reorderLevel: 10, status: "in-stock", price: "$599" },
  { id: 5, name: "Mechanical Keyboard", sku: "KEY-005", quantity: 5, reorderLevel: 10, status: "low-stock", price: "$149" },
  { id: 6, name: "Desk Lamp LED", sku: "LAM-006", quantity: 120, reorderLevel: 30, status: "in-stock", price: "$45" },
  { id: 7, name: "Webcam HD", sku: "WEB-007", quantity: 0, reorderLevel: 20, status: "out-of-stock", price: "$89" },
  { id: 8, name: "Phone Stand", sku: "PHO-008", quantity: 67, reorderLevel: 25, status: "in-stock", price: "$19" },
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
  return (
    <DashboardLayout currentPage="Inventory">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

        {/* Search and Filter */}
        <Card className="p-4 bg-white shadow-sm border-0">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input type="text" placeholder="Search by product name or SKU..." className="pl-10 bg-secondary border-0" />
            </div>
            <Button variant="outline" className="border-border">
              Filter
            </Button>
          </div>
        </Card>

        {/* Inventory Table */}
        <Card className="bg-white shadow-sm border-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">SKU</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Reorder Level</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground font-mono">{item.sku}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.reorderLevel}</td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status === "in-stock" && "In Stock"}
                        {item.status === "low-stock" && "Low Stock"}
                        {item.status === "out-of-stock" && "Out of Stock"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-semibold">{item.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
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
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 1 to 8 of 856 products</p>
            <div className="flex gap-2">
              <Button variant="outline" className="border-border">
                Previous
              </Button>
              <Button variant="outline" className="border-border">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
