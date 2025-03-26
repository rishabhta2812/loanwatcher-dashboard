
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import LoanDetails from "./pages/LoanDetails";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Triggers from "./pages/Triggers";
import Customers from "./pages/Customers";
import Insights from "./pages/Insights";
import PersonalLoanInsights from "./pages/PersonalLoanInsights";
import UserManagement from "./pages/UserManagement";
import EarlyWarningSystem from "./pages/EarlyWarningSystem";
import LoanChatbot from "./pages/LoanChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/loan-details" element={<LoanDetails />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/triggers" element={<Triggers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/personal-loan-insights" element={<PersonalLoanInsights />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/ews" element={<EarlyWarningSystem />} />
            <Route path="/loan-chatbot" element={<LoanChatbot />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
