
export interface BorrowerInfo {
  name: string;
  mobile: string;
  email: string;
  bank: string;
  dob: string;
  pan: string;
}

export interface MonthlyFeature {
  monthName: string;
  net_monthly_inflow: number;
  credit_debit_ratio: number;
  cash_buffer_days: number;
}

export interface OverallMetrics {
  net_inflow_cv: number;
  max_consecutive_negative_months: number;
  net_inflow_monthly_pct_change: number;
}

export interface AdvancedFeatures {
  recent_net_inflow_trend: string;
  avg_credit_amt_by_month: Record<string, number>;
  avg_debit_amt_by_month: Record<string, number>;
}

export interface ThresholdCheck {
  name: string;
  value: number;
  threshold: string;
  pass: boolean;
}

export interface ThresholdReport {
  monthly_thresholds: ThresholdCheck[];
  overall_thresholds: ThresholdCheck[];
}

export interface ReportData {
  borrowerInfo: BorrowerInfo;
  derivedMonthlyFeatures: MonthlyFeature[];
  overallMetrics: OverallMetrics;
  additionalAdvancedFeatures: AdvancedFeatures;
  thresholdReport: ThresholdReport;
}
