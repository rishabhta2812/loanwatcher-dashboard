
import { useState, useEffect } from "react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import LoanCards from "@/components/dashboard/LoanCards";
import ChartSection from "@/components/dashboard/ChartSection";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay for smoother animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="space-y-8">
            <DashboardMetrics />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Loans</h2>
              <LoanCards />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChartSection />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
