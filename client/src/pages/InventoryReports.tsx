import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";

export default function InventoryReports() {
  return (
    <DashboardLayout
      currentPage="InventoryReports"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Reports", href: "#" },
        { label: "InventoryReports" },
      ]}
    >
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">InventoryReports</h2>
        <p className="text-muted-foreground">This page is coming soon. Content will be added here.</p>
      </Card>
    </DashboardLayout>
  );
}
