import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Star, ShoppingCart, Edit, MoreVertical, TrendingUp, Package, DollarSign, Eye, Info, Zap, MessageCircle } from "lucide-react";
import TabsWithIcons from "@/components/TabsWithIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettings } from "@/contexts/SettingsContext";

export default function ProductDetails() {
  const { language } = useSettings();
  const isRTL = language === "ar";
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVariant, setSelectedVariant] = useState("silver");

  const breadcrumbs = [
    { label: "Dashboard", href: "/" },
    { label: "Inventory", href: "/inventory" },
    { label: "Laptop Pro 15\"" },
  ];

  const variants = [
    { id: "silver", name: "Silver", price: "$1,299", stock: 45, sku: "LAP-001-SLV" },
    { id: "space-gray", name: "Space Gray", price: "$1,299", stock: 32, sku: "LAP-001-SGR" },
    { id: "gold", name: "Gold", price: "$1,349", stock: 18, sku: "LAP-001-GLD" },
  ];

  const specifications = [
    { label: "Processor", value: "Intel Core i7 13th Gen" },
    { label: "RAM", value: "16GB DDR5" },
    { label: "Storage", value: "512GB SSD" },
    { label: "Display", value: "15.6\" 4K Retina" },
    { label: "Graphics", value: "NVIDIA RTX 4060" },
    { label: "Battery", value: "10 hours" },
  ];

  const reviews = [
    { author: "Jane Smith", rating: 5, comment: "Excellent product! Very satisfied with the quality.", date: "Feb 15, 2024" },
    { author: "Mike Johnson", rating: 4, comment: "Good performance, but a bit pricey.", date: "Feb 10, 2024" },
  ];

  return (
    <DashboardLayout currentPage="Product Details" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-foreground" />
            </button>
            <div className={isRTL ? "text-right" : ""}>
              <h2 className="font-display font-bold text-2xl text-foreground">Laptop Pro 15\"</h2>
              <div className={`flex items-center gap-2 mt-1 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 4 ? "fill-orange-400 text-orange-400" : "text-muted-foreground"} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(124 reviews)</span>
              </div>
            </div>
          </div>
          <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Button className="bg-primary hover:bg-blue-700 text-white">
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem>Edit Product</DropdownMenuItem>
                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                <DropdownMenuItem>Manage Stock</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Discontinue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Image & Variants */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-sm border-0 p-6 mb-6">
              <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-6">
                <Package size={80} className="text-muted-foreground" />
              </div>

              <h3 className={`font-semibold text-foreground mb-3 ${isRTL ? "text-right" : ""}`}>Color Variants</h3>
              <div className="space-y-2">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`w-full p-3 border-2 rounded-lg transition-all text-left ${
                      selectedVariant === variant.id
                        ? "border-primary bg-blue-50"
                        : "border-border hover:border-primary"
                    } ${isRTL ? "text-right" : ""}`}
                  >
                    <p className="font-medium text-foreground">{variant.name}</p>
                    <p className="text-xs text-muted-foreground">{variant.price}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Key Metrics */}
            <Card className="bg-white shadow-sm border-0 p-6">
              <h3 className={`font-semibold text-foreground mb-4 ${isRTL ? "text-right" : ""}`}>Product Stats</h3>
              <div className="space-y-4">
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <Eye size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Views</span>
                  </div>
                  <span className="font-semibold text-foreground">2,450</span>
                </div>
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <ShoppingCart size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Sold</span>
                  </div>
                  <span className="font-semibold text-foreground">156</span>
                </div>
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <TrendingUp size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Revenue</span>
                  </div>
                  <span className="font-semibold text-foreground">$202,644</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <Card className="bg-white shadow-sm border-0 p-0 overflow-hidden mb-6">
              <TabsWithIcons
                tabs={[
                  { id: "overview", label: "Overview", icon: Info },
                  { id: "specs", label: "Specifications", icon: Zap },
                  { id: "reviews", label: "Reviews", icon: MessageCircle },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isRTL={isRTL}
              />

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className={`font-semibold text-foreground mb-2 ${isRTL ? "text-right" : ""}`}>Description</h3>
                      <p className={`text-sm text-foreground leading-relaxed ${isRTL ? "text-right" : ""}`}>
                        Experience ultimate performance with our Laptop Pro 15". Featuring cutting-edge Intel Core i7 13th Gen processor, 16GB DDR5 RAM, and stunning 4K Retina display. Perfect for professionals and content creators.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 bg-secondary rounded-lg ${isRTL ? "text-right" : ""}`}>
                        <p className="text-xs text-muted-foreground mb-1">SKU</p>
                        <p className="font-semibold text-foreground">LAP-001-SLV</p>
                      </div>
                      <div className={`p-4 bg-secondary rounded-lg ${isRTL ? "text-right" : ""}`}>
                        <p className="text-xs text-muted-foreground mb-1">Category</p>
                        <p className="font-semibold text-foreground">Electronics</p>
                      </div>
                      <div className={`p-4 bg-secondary rounded-lg ${isRTL ? "text-right" : ""}`}>
                        <p className="text-xs text-muted-foreground mb-1">Stock</p>
                        <p className="font-semibold text-accent">45 units</p>
                      </div>
                      <div className={`p-4 bg-secondary rounded-lg ${isRTL ? "text-right" : ""}`}>
                        <p className="text-xs text-muted-foreground mb-1">Price</p>
                        <p className="font-semibold text-foreground">$1,299</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="space-y-3">
                    {specifications.map((spec, idx) => (
                      <div key={idx} className={`flex justify-between p-3 border border-border rounded-lg ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                        <span className="text-sm text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {reviews.map((review, idx) => (
                      <div key={idx} className={`p-4 border border-border rounded-lg ${isRTL ? "text-right" : ""}`}>
                        <div className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                          <div className={isRTL ? "text-right" : ""}>
                            <p className="font-semibold text-foreground">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < review.rating ? "fill-orange-400 text-orange-400" : "text-muted-foreground"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
