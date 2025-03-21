
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample data for the chart
const yearData = [
  { month: "Jan", balance: 250000 },
  { month: "Feb", balance: 249000 },
  { month: "Mar", balance: 248000 },
  { month: "Apr", balance: 247000 },
  { month: "May", balance: 245800 },
  { month: "Jun", balance: 244600 },
  { month: "Jul", balance: 243400 },
  { month: "Aug", balance: 242200 },
  { month: "Sep", balance: 241000 },
  { month: "Oct", balance: 240000 },
  { month: "Nov", balance: 239000 },
  { month: "Dec", balance: 238000 },
];

const threeYearData = [
  { month: "2020", balance: 280000 },
  { month: "2021", balance: 265000 },
  { month: "2022", balance: 250000 },
  { month: "2023", balance: 238000 },
  { month: "2024 (projected)", balance: 225000 },
  { month: "2025 (projected)", balance: 210000 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-md dark:bg-slate-900 dark:border-slate-800">
        <p className="text-sm font-medium">{`${label}`}</p>
        <p className="text-sm text-blue-600 font-semibold dark:text-blue-400">
          {`Balance: $${payload[0].value?.toLocaleString()}`}
        </p>
      </div>
    );
  }

  return null;
};

const ChartSection = () => {
  const [activeTab, setActiveTab] = useState<"year" | "threeYear">("year");
  
  return (
    <CustomCard className="animate-fade-in">
      <CustomCardHeader className="flex flex-row items-center justify-between">
        <CustomCardTitle>Loan Balance Overview</CustomCardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs h-8",
              activeTab === "year" && "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20"
            )}
            onClick={() => setActiveTab("year")}
          >
            This Year
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-xs h-8",
              activeTab === "threeYear" && "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20"
            )}
            onClick={() => setActiveTab("threeYear")}
          >
            3 Year Trend
          </Button>
        </div>
      </CustomCardHeader>
      <CustomCardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={activeTab === "year" ? yearData : threeYearData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                tickFormatter={(value) => `$${value / 1000}k`} 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#balanceGradient)" 
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CustomCardContent>
    </CustomCard>
  );
};

export default ChartSection;
