
export interface BankingMetric {
  name: string;
  formula: string;
  description: string;
  threshold: string;
  rationale: string;
}

export const derivedMonthlyFeatures: BankingMetric[] = [
  {
    name: "Net Monthly Inflow",
    formula: "totalCredit - totalDebit",
    description: "Net Monthly Inflow is calculated as the difference between total credits and total debits.",
    threshold: "> 0",
    rationale: "A positive net inflow indicates that the borrower's income (credits) exceeds their expenditures (debits) for the month, a basic indicator of liquidity."
  },
  {
    name: "Monthly Balance Delta",
    formula: "balLast - balOpen",
    description: "Monthly Balance Delta is computed as the difference between closing balance and opening balance.",
    threshold: "The percentage decline (if any) should be less than 15% of the opening balance.",
    rationale: "A decline exceeding 15% may signal rapid depletion of funds, suggesting potential financial stress."
  },
  {
    name: "Credit-to-Debit Ratio",
    formula: "totalCredit / totalDebit",
    description: "The ratio is computed as total credits divided by total debits.",
    threshold: "> 1.1",
    rationale: "A ratio greater than 1.1 indicates that credits are sufficiently higher than debits—suggesting robust cash inflows. Values below this threshold may indicate liquidity issues."
  },
  {
    name: "Average Daily Inflow",
    formula: "Net Monthly Inflow / 30",
    description: "Average Daily Inflow is derived by dividing the Net Monthly Inflow by 30 (assuming a 30‑day month).",
    threshold: "No fixed threshold",
    rationale: "This metric provides insight into whether the borrower generates sufficient funds on a daily basis to meet obligations."
  },
  {
    name: "Liquidity Ratio",
    formula: "balAvg / totalDebit",
    description: "The Liquidity Ratio is calculated as average EOD balance divided by total monthly debits.",
    threshold: "≥ 1.0",
    rationale: "A ratio of at least 1.0 implies that the borrower's average available balance can cover the total monthly debits, ensuring sufficient liquidity."
  },
  {
    name: "Expense-to-Income Ratio",
    formula: "totalDebit / totalCredit",
    description: "The ratio is given by total debits divided by total credits.",
    threshold: "< 0.65",
    rationale: "A lower expense-to-income ratio indicates that a smaller proportion of income is spent, which is generally a positive indicator of financial health."
  },
  {
    name: "Account Turnover Ratio",
    formula: "(credits + debits) / balAvg",
    description: "Calculated as the sum of credits and debits divided by average balance.",
    threshold: "< 4",
    rationale: "A turnover ratio below 4 suggests moderate transaction activity relative to the account's average balance. High turnover may indicate erratic financial activity."
  },
  {
    name: "Cash Buffer Days",
    formula: "balAvg / (totalDebit/30)",
    description: "Computed as average balance divided by daily debit rate. This estimates the number of days the current average balance can cover daily debits.",
    threshold: "≥ 15 days",
    rationale: "A cash buffer of 15 days or more indicates that the borrower has a reasonable reserve to handle unexpected expenses or delays in income."
  }
];

export const overallMetrics: BankingMetric[] = [
  {
    name: "Month‑over‑Month Net Inflow Percentage Change",
    formula: "Percentage change in net_monthly_inflow between consecutive months",
    description: "This metric is computed using the percentage change function on the net_monthly_inflow column.",
    threshold: "Any month with a decline greater than 10% is flagged as concerning.",
    rationale: "A significant drop in net inflow from one month to the next may signal deteriorating financial performance."
  },
  {
    name: "Net Inflow Coefficient of Variation (CV)",
    formula: "Standard Deviation of Net Inflow / Mean Net Inflow",
    description: "The coefficient of variation measures the relative variability of net inflow.",
    threshold: "< 0.25 (25%)",
    rationale: "A lower CV indicates that net inflow is consistent across months, suggesting stability in cash flow."
  },
  {
    name: "Maximum Consecutive Negative Net Flow Months",
    formula: "Counting the maximum number of successive months with negative net inflow",
    description: "This is derived by counting the maximum number of successive months in which the net inflow is negative.",
    threshold: "< 3 consecutive months",
    rationale: "Three or more consecutive months with negative net inflow are a strong indicator of potential financial distress."
  },
  {
    name: "Salary vs. Credit Correlation",
    formula: "Pearson correlation coefficient between monthly salary deposits and total credit",
    description: "The Pearson correlation coefficient between monthly aggregated salary deposits and the monthly total credit.",
    threshold: "≥ 0.75",
    rationale: "A high correlation (≥ 0.75) suggests that a major portion of credits comes from salary payments, indicating a stable income source."
  }
];

export const advancedMetrics: BankingMetric[] = [
  {
    name: "Recent Net Inflow Trend",
    formula: "Comparing the average net inflow of the last 3 months with the average net inflow of the preceding 3 months",
    description: "Compares the average net inflow of the last 3 months with the average net inflow of the preceding 3 months. Both the absolute difference and the percentage change are calculated.",
    threshold: "No fixed numeric threshold",
    rationale: "A declining trend in recent net inflow may indicate emerging liquidity problems."
  },
  {
    name: "3‑Month Moving Average of EOD Balance",
    formula: "Rolling average computed over 3 months on the average EOD balance",
    description: "A rolling average computed over 3 months on the balAvg (average EOD balance) to smooth out short-term fluctuations.",
    threshold: "Not directly thresholded",
    rationale: "A steadily declining moving average could signal a gradual reduction in available funds."
  },
  {
    name: "Average Transaction Amounts",
    formula: "totalCredit / credits and totalDebit / debits",
    description: "Calculated as total credit divided by number of credits and total debit divided by number of debits.",
    threshold: "No fixed thresholds",
    rationale: "Changes in average transaction sizes can signal shifts in spending or income patterns."
  },
  {
    name: "Transaction Frequency Trend",
    formula: "Deviation from the overall monthly average of total transactions",
    description: "Derived from the total number of transactions (credits + debits) and its percentage deviation from the overall monthly average.",
    threshold: "Deviations of ±10% or more may indicate abnormal activity",
    rationale: "A sudden change in the number of transactions can point to altered spending habits or income irregularities."
  },
  {
    name: "Recent Variability in Net Inflow",
    formula: "Coefficient of variation for net monthly inflow over the most recent 3 months",
    description: "The coefficient of variation (CV) for net monthly inflow over the most recent 3 months.",
    threshold: "CV should be < 0.25 (25%)",
    rationale: "A low CV indicates stable cash flow; high variability signals potential instability."
  },
  {
    name: "Debt Repayment Ratio",
    formula: "EMI Payment Amount / Net Monthly Inflow",
    description: "Would be calculated as EMI Payment Amount divided by Net Monthly Inflow (for months with positive inflow).",
    threshold: "Not computed in this implementation",
    rationale: "A lower ratio would mean that the borrower is less burdened by debt repayments relative to available cash flow."
  }
];

export const severityConstants = {
  LOW_ACCOUNT_BALANCE_THRESHOLD: 10000,
  HIGH_OVERDRAFT_THRESHOLD: 3,
  SEVERE_DPD_THRESHOLD: 90,
  MODERATE_DPD_LOW: 30,
  MODERATE_DPD_HIGH: 60,
  LOW_LIQUIDITY_PERCENT: 0.1
};

export const defaultUserGroups = {
  "0–30 DPD": {
    "description": "Borrowers that are 0–30 days in default",
    "plain_english_rule": "DPD is between 0 and 30 days",
    "formal_expression": "DPD >= 0 AND DPD <= 30"
  },
  "31–60 DPD": {
    "description": "Borrowers that are 31–60 days in default",
    "plain_english_rule": "DPD is between 31 and 60 days",
    "formal_expression": "DPD >= 31 AND DPD <= 60"
  },
  "61–90 DPD": {
    "description": "Borrowers that are 61–90 days in default",
    "plain_english_rule": "DPD is between 61 and 90 days",
    "formal_expression": "DPD >= 61 AND DPD <= 90"
  },
  "Net NPA": {
    "description": "Borrowers that are more than 90 days in default",
    "plain_english_rule": "DPD is greater than 90 days",
    "formal_expression": "DPD > 90"
  }
};
