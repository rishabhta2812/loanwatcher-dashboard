
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";

export const BankingHealthSummary = () => {
  const metrics = useDashboardMetrics();
  
  if (!metrics) return null;

  const healthIndicators = [
    {
      name: "Net Monthly Inflow",
      value: `₹${metrics.monthlyMetrics.net_inflow.toLocaleString()}`,
      status: metrics.monthlyMetrics.net_inflow > 0 ? "success" : "destructive",
      label: metrics.monthlyMetrics.net_inflow > 0 ? "Positive" : "Negative"
    },
    {
      name: "Cash Buffer Days",
      value: metrics.monthlyMetrics.cash_buffer_days.toFixed(1),
      status: metrics.monthlyMetrics.cash_buffer_days >= 15 ? "success" : "destructive",
      label: metrics.monthlyMetrics.cash_buffer_days >= 15 ? "Healthy" : "Low"
    },
    {
      name: "Credit/Debit Ratio",
      value: metrics.monthlyMetrics.credit_debit_ratio.toFixed(2),
      status: metrics.monthlyMetrics.credit_debit_ratio > 1 ? "success" : "destructive",
      label: metrics.monthlyMetrics.credit_debit_ratio > 1 ? "Good" : "Poor"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {healthIndicators.map((indicator, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{indicator.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{indicator.value}</div>
              <Badge variant={indicator.status}>{indicator.label}</Badge>
            </div>
            <Progress
              value={
                indicator.status === "success" ? 100 : 50
              }
              className="mt-3"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
