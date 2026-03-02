import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { ThemeColorProvider } from "./contexts/ThemeColorContext";
import { ThemePresetProvider } from "./contexts/ThemePresetContext";
import { ThemeSystemProvider } from "./contexts/ThemeSystemContext";

// Main Pages
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Showcase from "./pages/Showcase";

// Sales Pages
import OrderDetails from "./pages/OrderDetails";
import CustomerDetails from "./pages/CustomerDetails";
import Quotations from "./pages/Quotations";
import AllCustomers from "./pages/AllCustomers";
import CustomerGroups from "./pages/CustomerGroups";
import AllOrders from "./pages/AllOrders";
import PendingOrders from "./pages/PendingOrders";
import CompletedOrders from "./pages/CompletedOrders";
import AllVendors from "./pages/AllVendors";
import VendorGroups from "./pages/VendorGroups";
import SalesInvoices from "./pages/SalesInvoices";
import SalesReturns from "./pages/SalesReturns";
import CustomerReceipts from "./pages/CustomerReceipts";
import CustomerStatements from "./pages/CustomerStatements";

// Purchase Pages
import Vendors from "./pages/Vendors";
import PurchaseOrders from "./pages/PurchaseOrders";
import PurchaseInvoices from "./pages/PurchaseInvoices";
import PurchaseReturns from "./pages/PurchaseReturns";
import VendorPayments from "./pages/VendorPayments";
import VendorStatements from "./pages/VendorStatements";

// Inventory Pages
import ProductDetails from "./pages/ProductDetails";
import ProductCategories from "./pages/ProductCategories";
import UnitsOfMeasure from "./pages/UnitsOfMeasure";
import Warehouses from "./pages/Warehouses";
import OpeningStock from "./pages/OpeningStock";
import StockAdjustments from "./pages/StockAdjustments";
import StockTransfers from "./pages/StockTransfers";
import StockCount from "./pages/StockCount";
import InventoryValuation from "./pages/InventoryValuation";
import StockMovement from "./pages/StockMovement";

// Accounting Pages
import ChartOfAccounts from "./pages/ChartOfAccounts";
import JournalEntries from "./pages/JournalEntries";
import JournalTypes from "./pages/JournalTypes";
import OpeningBalances from "./pages/OpeningBalances";
import FiscalYears from "./pages/FiscalYears";
import PeriodClosing from "./pages/PeriodClosing";
import AccountStatements from "./pages/AccountStatements";
import TrialBalance from "./pages/TrialBalance";
import GeneralLedger from "./pages/GeneralLedger";
import IncomeStatement from "./pages/IncomeStatement";
import BalanceSheet from "./pages/BalanceSheet";
import CashFlow from "./pages/CashFlow";

// Treasury Pages
import CashAccounts from "./pages/CashAccounts";
import BankAccounts from "./pages/BankAccounts";
import Receipts from "./pages/Receipts";
import Payments from "./pages/Payments";
import BankTransfers from "./pages/BankTransfers";
import BankReconciliation from "./pages/BankReconciliation";

// Reports Pages
import SalesReports from "./pages/SalesReports";
import PurchaseReports from "./pages/PurchaseReports";
import InventoryReports from "./pages/InventoryReports";
import FinancialReports from "./pages/FinancialReports";
import AgingReports from "./pages/AgingReports";
import TaxReports from "./pages/TaxReports";

// Settings Pages
import Branches from "./pages/Branches";
import Currencies from "./pages/Currencies";
import ExchangeRates from "./pages/ExchangeRates";
import Taxes from "./pages/Taxes";
import NumberingSeries from "./pages/NumberingSeries";
import PaymentMethods from "./pages/PaymentMethods";
import PriceLists from "./pages/PriceLists";
import CostCenters from "./pages/CostCenters";
import Users from "./pages/Users";
import RolesPermissions from "./pages/RolesPermissions";
import AuditLogs from "./pages/AuditLogs";

// Legacy Pages
import Invoice from "./pages/Invoice";
import EmployeeManagement from "./pages/EmployeeManagement";
import FinancialDashboard from "./pages/FinancialDashboard";
import ReportsGenerator from "./pages/ReportsGenerator";

function Router() {
  return (
    <Switch>
      {/* Main Routes */}
      <Route path={"/showcase"} component={Showcase} />
      <Route path={"/"} component={Dashboard} />
      <Route path={"/inventory"} component={Inventory} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/settings"} component={Settings} />

      {/* Sales Routes */}
      <Route path={"/order-details"} component={OrderDetails} />
      <Route path={"/customer-details"} component={CustomerDetails} />
      <Route path={"/all-customers"} component={AllCustomers} />
      <Route path={"/customer-groups"} component={CustomerGroups} />
      <Route path={"/all-orders"} component={AllOrders} />
      <Route path={"/pending-orders"} component={PendingOrders} />
      <Route path={"/completed-orders"} component={CompletedOrders} />
      <Route path={"/quotations"} component={Quotations} />
      <Route path={"/sales-invoices"} component={SalesInvoices} />
      <Route path={"/sales-returns"} component={SalesReturns} />
      <Route path={"/customer-receipts"} component={CustomerReceipts} />
      <Route path={"/customer-statements"} component={CustomerStatements} />

      {/* Purchase Routes */}
      <Route path={"/vendors"} component={Vendors} />
      <Route path={"/all-vendors"} component={AllVendors} />
      <Route path={"/vendor-groups"} component={VendorGroups} />
      <Route path={"/purchase-orders"} component={PurchaseOrders} />
      <Route path={"/purchase-invoices"} component={PurchaseInvoices} />
      <Route path={"/purchase-returns"} component={PurchaseReturns} />
      <Route path={"/vendor-payments"} component={VendorPayments} />
      <Route path={"/vendor-statements"} component={VendorStatements} />

      {/* Inventory Routes */}
      <Route path={"/product-details"} component={ProductDetails} />
      <Route path={"/product-categories"} component={ProductCategories} />
      <Route path={"/units-of-measure"} component={UnitsOfMeasure} />
      <Route path={"/warehouses"} component={Warehouses} />
      <Route path={"/opening-stock"} component={OpeningStock} />
      <Route path={"/stock-adjustments"} component={StockAdjustments} />
      <Route path={"/stock-transfers"} component={StockTransfers} />
      <Route path={"/stock-count"} component={StockCount} />
      <Route path={"/inventory-valuation"} component={InventoryValuation} />
      <Route path={"/stock-movement"} component={StockMovement} />

      {/* Accounting Routes */}
      <Route path={"/chart-of-accounts"} component={ChartOfAccounts} />
      <Route path={"/journal-entries"} component={JournalEntries} />
      <Route path={"/journal-types"} component={JournalTypes} />
      <Route path={"/opening-balances"} component={OpeningBalances} />
      <Route path={"/fiscal-years"} component={FiscalYears} />
      <Route path={"/period-closing"} component={PeriodClosing} />
      <Route path={"/account-statements"} component={AccountStatements} />
      <Route path={"/trial-balance"} component={TrialBalance} />
      <Route path={"/general-ledger"} component={GeneralLedger} />
      <Route path={"/income-statement"} component={IncomeStatement} />
      <Route path={"/balance-sheet"} component={BalanceSheet} />
      <Route path={"/cash-flow"} component={CashFlow} />

      {/* Treasury Routes */}
      <Route path={"/cash-accounts"} component={CashAccounts} />
      <Route path={"/bank-accounts"} component={BankAccounts} />
      <Route path={"/receipts"} component={Receipts} />
      <Route path={"/payments"} component={Payments} />
      <Route path={"/bank-transfers"} component={BankTransfers} />
      <Route path={"/bank-reconciliation"} component={BankReconciliation} />

      {/* Reports Routes */}
      <Route path={"/sales-reports"} component={SalesReports} />
      <Route path={"/purchase-reports"} component={PurchaseReports} />
      <Route path={"/inventory-reports"} component={InventoryReports} />
      <Route path={"/financial-reports"} component={FinancialReports} />
      <Route path={"/aging-reports"} component={AgingReports} />
      <Route path={"/tax-reports"} component={TaxReports} />

      {/* Settings Routes */}
      <Route path={"/branches"} component={Branches} />
      <Route path={"/currencies"} component={Currencies} />
      <Route path={"/exchange-rates"} component={ExchangeRates} />
      <Route path={"/taxes"} component={Taxes} />
      <Route path={"/numbering-series"} component={NumberingSeries} />
      <Route path={"/payment-methods"} component={PaymentMethods} />
      <Route path={"/price-lists"} component={PriceLists} />
      <Route path={"/cost-centers"} component={CostCenters} />
      <Route path={"/users"} component={Users} />
      <Route path={"/roles-permissions"} component={RolesPermissions} />
      <Route path={"/audit-logs"} component={AuditLogs} />

      {/* Legacy Routes */}
      <Route path={"/invoice"} component={Invoice} />
      <Route path={"/employees"} component={EmployeeManagement} />
      <Route path={"/financial"} component={FinancialDashboard} />
      <Route path={"/reports"} component={ReportsGenerator} />

      {/* Error Routes */}
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
      <ThemeSystemProvider>
        <ThemePresetProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <SettingsProvider>
              <ThemeColorProvider>
                <TooltipProvider>
                  <Toaster />
                  <Router />
                </TooltipProvider>
              </ThemeColorProvider>
            </SettingsProvider>
          </ThemeProvider>
        </ThemePresetProvider>
      </ThemeSystemProvider>
    </ErrorBoundary>
  );
}

export default App;
