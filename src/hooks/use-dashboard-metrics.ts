
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
      last_3_month_avg: netInflowTrend.last_3_month_avg,
      pct_change: netInflowTrend.pct_change,
      trend_direction: netInflowTrend.pct_change > 0 ? "improving" : "declining"
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
