
import { useIsMobile } from "@/hooks/use-mobile";
import { useReportData } from "@/hooks/use-report-data";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import ProfileCard from "@/components/dashboard/ProfileCard";
import MonthlyMetricsTable from "@/components/dashboard/MonthlyMetricsTable";
import NetInflowChart from "@/components/dashboard/NetInflowChart";
import { Loader } from "lucide-react";

const PersonalLoanInsights = () => {
  const isMobile = useIsMobile();
  const { data, isLoading, error } = useReportData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading report data
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="space-y-8">
            <ProfileCard borrowerInfo={data.borrowerInfo} />
            <NetInflowChart data={data.derivedMonthlyFeatures} />
            <MonthlyMetricsTable data={data.derivedMonthlyFeatures} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalLoanInsights;
