import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Mail, Phone, MapPin, Calendar, DollarSign, ShoppingCart, TrendingUp, MessageSquare, Edit, MoreVertical, Award } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

export default function CustomerDetails() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [activeTab, setActiveTab] = useState("overview");

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Customers", href: "/customers" },
    { label: "John Doe" },
  ];

  const orderHistory = [
    { id: "ORD-2024-001", date: "Feb 20, 2024", amount: "$3,117", status: "In Transit" },
    { id: "ORD-2024-002", date: "Feb 15, 2024", amount: "$1,245", status: "Delivered" },
    { id: "ORD-2024-003", date: "Feb 10, 2024", amount: "$2,890", status: "Delivered" },
  ];

  const communicationLog = [
    { type: "Email", message: "Order confirmation sent", date: "Feb 20, 2024" },
    { type: "Phone", message: "Customer called regarding shipping", date: "Feb 19, 2024" },
    { type: "Email", message: "Promotional offer sent", date: "Feb 15, 2024" },
  ];

  return (
    <DashboardLayout currentPage="Customer Details" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                JD
              </div>
              <div className={isRTL ? "text-right" : ""}>
                <h2 className="font-display font-bold text-2xl text-foreground">John Doe</h2>
                <p className="text-sm text-muted-foreground">Premium Customer • Member since Jan 2023</p>
              </div>
            </div>
          </div>
          <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Button className="bg-primary hover:bg-blue-700 text-white">
              <Edit size={16} className="mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem>Send Email</DropdownMenuItem>
                <DropdownMenuItem>Create Order</DropdownMenuItem>
                <DropdownMenuItem>View Invoices</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white shadow-sm border-0">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className="text-xs font-medium text-muted-foreground uppercase">Total Orders</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">12</h3>
              </div>
              <ShoppingCart size={24} className="text-primary" />
            </div>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className="text-xs font-medium text-muted-foreground uppercase">Total Spent</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">$28,450</h3>
              </div>
              <DollarSign size={24} className="text-accent" />
            </div>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className="text-xs font-medium text-muted-foreground uppercase">Avg Order</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">$2,371</h3>
              </div>
              <TrendingUp size={24} className="text-blue-500" />
            </div>
          </Card>
          <Card className="p-4 bg-white shadow-sm border-0">
            <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
              <div className={isRTL ? "text-right" : ""}>
                <p className="text-xs font-medium text-muted-foreground uppercase">Loyalty</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">Gold</h3>
              </div>
              <Award size={24} className="text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card className="bg-white shadow-sm border-0 p-0 overflow-hidden">
              <div className={`flex border-b border-border ${isRTL ? "flex-row-reverse" : ""}`}>
                {["overview", "orders", "communication"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className={`font-semibold text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>Contact Information</h4>
                      <div className="space-y-3">
                        <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Mail size={18} className="text-muted-foreground" />
                          <div className={isRTL ? "text-right" : ""}>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="text-sm font-medium text-foreground">john@example.com</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Phone size={18} className="text-muted-foreground" />
                          <div className={isRTL ? "text-right" : ""}>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="text-sm font-medium text-foreground">+1 (555) 123-4567</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <Calendar size={18} className="text-muted-foreground" />
                          <div className={isRTL ? "text-right" : ""}>
                            <p className="text-xs text-muted-foreground">Member Since</p>
                            <p className="text-sm font-medium text-foreground">January 15, 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 className={`font-semibold text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>Billing Address</h4>
                      <div className={isRTL ? "text-right" : ""}>
                        <p className="text-sm text-foreground">123 Main Street</p>
                        <p className="text-sm text-foreground">New York, NY 10001</p>
                        <p className="text-sm text-foreground">United States</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-3">
                    {orderHistory.map((order) => (
                      <div key={order.id} className={`flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className={isRTL ? "text-right" : ""}>
                          <p className="font-medium text-foreground">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <div className={`text-right ${isRTL ? "text-left" : ""}`}>
                          <p className="font-semibold text-foreground">{order.amount}</p>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered" ? "bg-green-50 text-accent" : "bg-blue-50 text-primary"
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "communication" && (
                  <div className="space-y-4">
                    {communicationLog.map((log, idx) => (
                      <div key={idx} className={`p-4 border border-border rounded-lg ${isRTL ? "text-right" : ""}`}>
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                          <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded text-foreground">
                            {log.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{log.date}</span>
                        </div>
                        <p className="text-sm text-foreground">{log.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white shadow-sm border-0 p-6">
              <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button className="w-full bg-primary hover:bg-blue-700 text-white justify-start">
                  <ShoppingCart size={16} className="mr-2" />
                  Create Order
                </Button>
                <Button variant="outline" className="w-full border-border justify-start">
                  <Mail size={16} className="mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full border-border justify-start">
                  <MessageSquare size={16} className="mr-2" />
                  Send Message
                </Button>
              </div>
            </Card>

            {/* Loyalty Program */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 shadow-sm border-0 p-6">
              <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
                Loyalty Program
              </h3>
              <div className={isRTL ? "text-right" : ""}>
                <p className="text-sm text-muted-foreground mb-2">Current Tier: Gold</p>
                <div className="w-full bg-secondary rounded-full h-2 mb-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground">2,500 / 5,000 points to Platinum</p>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white shadow-sm border-0 p-6">
              <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className={`text-sm ${isRTL ? "text-right" : ""}`}>
                  <p className="text-foreground">Placed order ORD-2024-001</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <div className={`text-sm ${isRTL ? "text-right" : ""}`}>
                  <p className="text-foreground">Received shipment</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
                <div className={`text-sm ${isRTL ? "text-right" : ""}`}>
                  <p className="text-foreground">Left product review</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
