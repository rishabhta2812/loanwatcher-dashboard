
import { useReportData } from "@/hooks/use-report-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileCard from "@/components/insights/ProfileCard";
import MonthlyMetricsTable from "@/components/insights/MonthlyMetricsTable";
import NetInflowChart from "@/components/dashboard/NetInflowChart";
import SummaryCards from "@/components/insights/SummaryCards";
import TrendWidget from "@/components/insights/TrendWidget";
import CreditDebitBar from "@/components/insights/CreditDebitBar";
import ThresholdTable from "@/components/insights/ThresholdTable";

const PersonalLoanInsights = () => {
  const { data, isLoading, error } = useReportData();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load report data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <ProfileCard data={data.borrowerInfo} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <NetInflowChart data={data.derivedMonthlyFeatures} />
        <CreditDebitBar 
          creditData={data.additionalAdvancedFeatures.avg_credit_amt_by_month}
          debitData={data.additionalAdvancedFeatures.avg_debit_amt_by_month}
        />
      </div>
      
      <SummaryCards data={data.overallMetrics} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <MonthlyMetricsTable data={data.derivedMonthlyFeatures} />
        <div className="space-y-6">
          <TrendWidget trend={data.additionalAdvancedFeatures.recent_net_inflow_trend} />
          <ThresholdTable 
            monthlyThresholds={data.thresholdReport.monthly_thresholds}
            overallThresholds={data.thresholdReport.overall_thresholds}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalLoanInsights;
