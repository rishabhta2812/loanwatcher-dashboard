
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { NetInflowTrend } from "@/types/report";

interface TrendWidgetProps {
  trend: NetInflowTrend;
}

const TrendWidget = ({ trend }: TrendWidgetProps) => {
  const isPositive = trend.pct_change > 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Recent Net Inflow Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">3-Month Average</span>
            <span className="font-medium">₹{trend.last_3_month_avg.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Change</span>
            <div className="flex items-center space-x-1">
              {isPositive ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
              <span className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {Math.abs(trend.pct_change).toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="pt-2 text-sm">
            <p>
              {isPositive 
                ? "Increasing net inflow indicates improving financial health."
                : "Decreasing net inflow may signal potential financial stress."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendWidget;
