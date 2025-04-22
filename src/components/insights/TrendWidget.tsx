
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrendWidgetProps {
  trend: string;
}

const TrendWidget = ({ trend }: TrendWidgetProps) => {
  const getTrendColor = (trend: string) => {
    switch (trend.toLowerCase()) {
      case "improving":
        return "success";
      case "stable":
        return "secondary";
      case "declining":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Net Inflow Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold capitalize">{trend}</div>
          <Badge variant={getTrendColor(trend)}>{trend}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendWidget;
