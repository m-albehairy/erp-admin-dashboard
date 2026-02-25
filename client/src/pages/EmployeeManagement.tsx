import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Shield, Clock, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import AnimatedModal from "@/components/AnimatedModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

export default function EmployeeManagement() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", phone: "", role: "", department: "" });

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Employee Management" },
  ];

  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Sales Manager",
      department: "Sales",
      email: "sarah@company.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      joinDate: "Jan 15, 2023",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      department: "IT",
      email: "michael@company.com",
      phone: "+1 (555) 234-5678",
      status: "Active",
      joinDate: "Mar 20, 2023",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "HR Specialist",
      department: "Human Resources",
      email: "emily@company.com",
      phone: "+1 (555) 345-6789",
      status: "Active",
      joinDate: "Feb 10, 2023",
      avatar: "ER",
    },
    {
      id: 4,
      name: "David Williams",
      role: "Accountant",
      department: "Finance",
      email: "david@company.com",
      phone: "+1 (555) 456-7890",
      status: "On Leave",
      joinDate: "May 5, 2022",
      avatar: "DW",
    },
  ];

  const permissions = [
    { id: 1, name: "View Dashboard", category: "Dashboard" },
    { id: 2, name: "Manage Orders", category: "Orders" },
    { id: 3, name: "Manage Inventory", category: "Inventory" },
    { id: 4, name: "View Analytics", category: "Analytics" },
    { id: 5, name: "Manage Users", category: "Admin" },
    { id: 6, name: "View Reports", category: "Reports" },
  ];

  return (
    <DashboardLayout currentPage="Employee Management" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={isRTL ? "text-right" : ""}>
            <h2 className="font-display font-bold text-2xl text-foreground">Employee Management</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage team members, roles, and permissions</p>
          </div>
          <Button className="bg-primary hover:bg-blue-700 text-white">
            <Plus size={16} className="mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Search & Filter */}
        <Card className="bg-white shadow-sm border-0 p-4">
          <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-0"
              />
            </div>
            <Button variant="outline" className="border-border">
              Filter
            </Button>
          </div>
        </Card>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <Card key={employee.id} className="bg-white shadow-sm border-0 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className={`flex items-start justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                    {employee.avatar}
                  </div>
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="font-semibold text-foreground">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.role}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      ⋮
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={isRTL ? "start" : "end"}>
                    <DropdownMenuItem onClick={() => {
                      setSelectedEmployee(employee);
                      setEditFormData({ name: employee.name, email: employee.email, phone: employee.phone, role: employee.role, department: employee.department });
                      setIsEditModalOpen(true);
                    }}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                  employee.status === "Active"
                    ? "bg-green-50 text-accent"
                    : "bg-orange-50 text-orange-600"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${employee.status === "Active" ? "bg-accent" : "bg-orange-600"}`}></div>
                  {employee.status}
                </div>
              </div>

              {/* Details */}
              <div className={`space-y-3 border-t border-border pt-4 ${isRTL ? "text-right" : ""}`}>
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Mail size={14} className="text-muted-foreground" />
                  <p className="text-xs text-muted-foreground truncate">{employee.email}</p>
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Phone size={14} className="text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{employee.phone}</p>
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Clock size={14} className="text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Joined {employee.joinDate}</p>
                </div>
              </div>

              {/* Actions */}
              <div className={`flex gap-2 mt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Button variant="outline" size="sm" className="flex-1 border-border">
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-border">
                  <Shield size={14} className="mr-1" />
                  Permissions
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Permissions Reference */}
        <Card className="bg-white shadow-sm border-0 p-6">
          <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
            Available Permissions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {permissions.map((perm) => (
              <div key={perm.id} className={`p-3 border border-border rounded-lg ${isRTL ? "text-right" : ""}`}>
                <p className="text-xs font-semibold text-muted-foreground uppercase">{perm.category}</p>
                <p className="text-sm font-medium text-foreground mt-1">{perm.name}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Edit Employee Modal */}
        <AnimatedModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Employee"
          onSubmit={() => {
            setIsEditModalOpen(false);
          }}
          submitLabel="Update Employee"
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                placeholder="Enter full name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input
                placeholder="Enter phone number"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Role</label>
              <Input
                placeholder="Enter job role"
                value={editFormData.role}
                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Department</label>
              <Input
                placeholder="Enter department"
                value={editFormData.department}
                onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </AnimatedModal>
      </div>
    </DashboardLayout>
  );
}
