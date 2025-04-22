
import { OverallMetrics } from "@/types/report";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SummaryCardsProps {
  data: OverallMetrics;
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Net Inflow CV</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{(data.net_inflow_cv * 100).toFixed(1)}%</div>
            <Badge variant={data.net_inflow_cv < 0.3 ? "success" : "destructive"}>
              {data.net_inflow_cv < 0.3 ? "Good" : "High Variance"}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Max Consecutive Negative Months</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{data.max_consecutive_negative_months}</div>
            <Badge variant={data.max_consecutive_negative_months < 3 ? "success" : "destructive"}>
              {data.max_consecutive_negative_months < 3 ? "Acceptable" : "Critical"}
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Monthly Change</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {(data.net_inflow_monthly_pct_change * 100).toFixed(1)}%
            </div>
            <Badge 
              variant={data.net_inflow_monthly_pct_change > -0.1 ? "success" : "destructive"}
            >
              {data.net_inflow_monthly_pct_change > -0.1 ? "Stable" : "Declining"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
