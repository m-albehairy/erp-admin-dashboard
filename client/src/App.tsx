import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Showcase from "./pages/Showcase";
import OrderDetails from "./pages/OrderDetails";
import CustomerDetails from "./pages/CustomerDetails";
import ProductDetails from "./pages/ProductDetails";
import Invoice from "./pages/Invoice";
import EmployeeManagement from "./pages/EmployeeManagement";
import FinancialDashboard from "./pages/FinancialDashboard";
import PurchaseOrders from "./pages/PurchaseOrders";
import ReportsGenerator from "./pages/ReportsGenerator";


function Router() {
  return (
    <Switch>
      <Route path={"/showcase"} component={Showcase} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/"} component={Dashboard} />
      <Route path={"/inventory"} component={Inventory} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/order-details"} component={OrderDetails} />
      <Route path={"/customer-details"} component={CustomerDetails} />
      <Route path={"/product-details"} component={ProductDetails} />
      <Route path={"/invoice"} component={Invoice} />
      <Route path={"/employees"} component={EmployeeManagement} />
      <Route path={"/financial"} component={FinancialDashboard} />
      <Route path={"/purchase-orders"} component={PurchaseOrders} />
      <Route path={"/reports"} component={ReportsGenerator} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <SettingsProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
