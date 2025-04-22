
import { useQuery } from "@tanstack/react-query";
import { ReportData } from "@/types/report";

// Sample fallback data in case the fetch fails
const fallbackData: ReportData = {
  borrowerInfo: {
    name: "John Doe",
    mobile: "+91 98765 43210",
    email: "john.doe@example.com",
    bank: "National Bank",
    dob: "1985-05-15",
    pan: "ABCDE1234F"
  },
  derivedMonthlyFeatures: [
    {
      monthName: "Jan 2023",
      net_monthly_inflow: 25000,
      credit_debit_ratio: 1.2,
      cash_buffer_days: 15
    },
    {
      monthName: "Feb 2023",
      net_monthly_inflow: 28000,
      credit_debit_ratio: 1.3,
      cash_buffer_days: 18
    },
    {
      monthName: "Mar 2023",
      net_monthly_inflow: 22000,
      credit_debit_ratio: 1.1,
      cash_buffer_days: 12
    }
  ],
  overallMetrics: {
    net_inflow_cv: 0.15,
    max_consecutive_negative_months: 1,
    net_inflow_monthly_pct_change: -0.05
  },
  additionalAdvancedFeatures: {
    recent_net_inflow_trend: "stable",
    avg_credit_amt_by_month: {
      "Jan": 50000,
      "Feb": 52000,
      "Mar": 48000
    },
    avg_debit_amt_by_month: {
      "Jan": 25000,
      "Feb": 24000,
      "Mar": 26000
    }
  },
  thresholdReport: {
    monthly_thresholds: [
      {
        name: "Net Monthly Inflow",
        value: 25000,
        threshold: "> 20000",
        pass: true
      },
      {
        name: "Credit/Debit Ratio",
        value: 1.2,
        threshold: "> 1.0",
        pass: true
      }
    ],
    overall_thresholds: [
      {
        name: "Inflow Coefficient of Variation",
        value: 0.15,
        threshold: "< 0.3",
        pass: true
      }
    ]
  }
};

const fetchReport = async (): Promise<ReportData> => {
  try {
    // Try to fetch from the correct location (without the /public prefix)
    const response = await fetch("/report.json");
    if (!response.ok) {
      console.warn("Failed to fetch report data, using fallback data");
      return fallbackData;
    }
    return await response.json();
  } catch (error) {
    console.warn("Error fetching report data:", error);
    return fallbackData;
  }
};

export const useReportData = () => {
  return useQuery({
    queryKey: ["report"],
    queryFn: fetchReport,
  });
};
