
import { useReportData } from "./use-report-data";

export const useDashboardMetrics = () => {
  const { data } = useReportData();

  if (!data) return null;

  const latestMonth = data.derivedMonthlyFeatures[data.derivedMonthlyFeatures.length - 1];
  const netInflowTrend = data.additionalAdvancedFeatures.recent_net_inflow_trend;
  
  const metrics = {
    monthlyMetrics: {
      net_inflow: latestMonth.net_monthly_inflow,
      credit_debit_ratio: latestMonth.credit_debit_ratio,
      liquidity_ratio: latestMonth.liquidity_ratio,
      cash_buffer_days: latestMonth.cash_buffer_days
    },
    trendMetrics: {
      last_3_month_avg: typeof netInflowTrend === 'object' && 'last_3_month_avg' in netInflowTrend 
        ? netInflowTrend.last_3_month_avg 
        : 0,
      pct_change: typeof netInflowTrend === 'object' && 'pct_change' in netInflowTrend 
        ? netInflowTrend.pct_change 
        : 0,
      trend_direction: typeof netInflowTrend === 'object' && 'pct_change' in netInflowTrend 
        ? (netInflowTrend.pct_change > 0 ? "improving" : "declining")
        : "stable"
    },
    overallHealth: {
      max_negative_months: data.overallMetrics.max_consecutive_negative_months,
      net_inflow_cv: data.overallMetrics.net_inflow_cv
    },
    borrowerInfo: data.borrowerInfo,
    monthlyFeatures: data.derivedMonthlyFeatures,
    thresholdReport: data.thresholdReport
  };

  return metrics;
};
