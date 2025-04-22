
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyFeature } from "@/types/report";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface NetInflowChartProps {
  data: MonthlyFeature[];
}

const NetInflowChart = ({ data }: NetInflowChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Monthly Inflow Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="monthName" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="net_monthly_inflow" 
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetInflowChart;
