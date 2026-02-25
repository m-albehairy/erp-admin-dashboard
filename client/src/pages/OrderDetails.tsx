import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Printer, Download, Send, MessageSquare, Package, Truck, CheckCircle, Clock, AlertCircle, MapPin, Phone, Mail, User, Calendar, DollarSign, Edit, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

export default function OrderDetails() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [activeTab, setActiveTab] = useState("overview");

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Orders", href: "/orders" },
    { label: "Order #ORD-2024-001" },
  ];

  const orderTimeline = [
    { status: "Order Placed", date: "2024-02-20 10:30 AM", completed: true, icon: "📋" },
    { status: "Payment Confirmed", date: "2024-02-20 10:45 AM", completed: true, icon: "✅" },
    { status: "Preparing", date: "2024-02-21 02:00 PM", completed: true, icon: "📦" },
    { status: "Shipped", date: "2024-02-22 08:15 AM", completed: true, icon: "🚚" },
    { status: "In Transit", date: "Expected: 2024-02-24", completed: false, icon: "🛣️" },
    { status: "Delivered", date: "Expected: 2024-02-25", completed: false, icon: "✓" },
  ];

  return (
    <DashboardLayout currentPage="Order Details" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header with Actions */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <div className={isRTL ? "text-right" : ""}>
              <h2 className="font-display font-bold text-2xl text-foreground">Order #ORD-2024-001</h2>
              <p className="text-sm text-muted-foreground">Placed on February 20, 2024</p>
            </div>
          </div>
          <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Button variant="outline" className="border-border">
              <Printer size={16} />
            </Button>
            <Button variant="outline" className="border-border">
              <Download size={16} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                <DropdownMenuItem>Duplicate Order</DropdownMenuItem>
                <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-accent">In Transit</span>
          <span className="text-xs text-muted-foreground">Expected delivery: Feb 25, 2024</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card className="bg-white shadow-sm border-0 p-0 overflow-hidden">
              <div className={`flex border-b border-border ${isRTL ? "flex-row-reverse" : ""}`}>
                {["overview", "items", "timeline", "notes"].map((tab) => (
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                        <p className="font-semibold text-foreground">ORD-2024-001</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                        <p className="font-semibold text-foreground">Feb 20, 2024</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-accent rounded-full text-xs font-medium">
                          <CheckCircle size={14} />
                          Paid
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Fulfillment Status</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-medium">
                          <Truck size={14} />
                          In Transit
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "items" && (
                  <div className="space-y-4">
                    {[
                      { name: "Laptop Pro 15\"", sku: "LAP-001", qty: 2, price: "$1,299", total: "$2,598" },
                      { name: "Wireless Mouse", sku: "MOU-002", qty: 5, price: "$29", total: "$145" },
                      { name: "USB-C Cable", sku: "USB-003", qty: 10, price: "$12", total: "$120" },
                    ].map((item, idx) => (
                      <div key={idx} className={`flex items-center justify-between p-4 border border-border rounded-lg ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                        <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.sku}</p>
                        </div>
                        <div className={`text-right ${isRTL ? "text-left" : ""}`}>
                          <p className="text-sm font-medium text-foreground">Qty: {item.qty}</p>
                          <p className="text-sm text-muted-foreground">{item.price}</p>
                        </div>
                        <p className="font-semibold text-foreground w-24 text-right">{item.total}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "timeline" && (
                  <div className="space-y-4">
                    {orderTimeline.map((event, idx) => (
                      <div key={idx} className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className={`flex flex-col items-center ${isRTL ? "items-end" : ""}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                            event.completed ? "bg-accent text-white" : "bg-secondary text-muted-foreground"
                          }`}>
                            {event.icon}
                          </div>
                          {idx < orderTimeline.length - 1 && (
                            <div className={`w-0.5 h-12 ${event.completed ? "bg-accent" : "bg-border"}`}></div>
                          )}
                        </div>
                        <div className={`flex-1 pt-2 ${isRTL ? "text-right" : ""}`}>
                          <p className="font-semibold text-foreground">{event.status}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary rounded-lg border border-border">
                      <p className="text-sm text-foreground">Order confirmed and payment received. Preparing items for shipment.</p>
                      <p className="text-xs text-muted-foreground mt-2">Added by Admin • Feb 20, 2024 10:45 AM</p>
                    </div>
                    <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Input placeholder="Add a note..." className="bg-secondary border-0" />
                      <Button className="bg-primary hover:bg-blue-700 text-white">
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Customer & Summary */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="bg-white shadow-sm border-0 p-6">
              <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
                Customer
              </h3>
              <div className={`flex items-center gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <p className="font-semibold text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">Customer ID: CUST-001</p>
                </div>
              </div>
              <div className="space-y-3 border-t border-border pt-4">
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Mail size={16} className="text-muted-foreground" />
                  <p className="text-sm text-foreground">john@example.com</p>
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Phone size={16} className="text-muted-foreground" />
                  <p className="text-sm text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="bg-white shadow-sm border-0 p-6">
              <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
                Shipping Address
              </h3>
              <div className={`space-y-2 ${isRTL ? "text-right" : ""}`}>
                <p className="font-medium text-foreground">John Doe</p>
                <p className="text-sm text-foreground">123 Main Street</p>
                <p className="text-sm text-foreground">New York, NY 10001</p>
                <p className="text-sm text-foreground">United States</p>
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white shadow-sm border-0 p-6">
              <h3 className={`font-display font-bold text-lg text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>
                Order Summary
              </h3>
              <div className={`space-y-3 ${isRTL ? "text-right" : ""}`}>
                <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-sm font-medium text-foreground">$2,863</span>
                </div>
                <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm text-muted-foreground">Shipping</span>
                  <span className="text-sm font-medium text-foreground">$25</span>
                </div>
                <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="text-sm text-muted-foreground">Tax</span>
                  <span className="text-sm font-medium text-foreground">$229</span>
                </div>
                <div className={`flex justify-between border-t border-border pt-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-lg text-primary">$3,117</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
