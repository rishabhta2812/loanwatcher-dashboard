
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { CustomCard, CustomCardContent } from "@/components/ui/custom-card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: React.ElementType;
  description?: string;
  className?: string;
}

const MetricCard = ({ title, value, change, icon: Icon, description, className }: MetricCardProps) => {
  return (
    <CustomCard className={cn("transition-all duration-300 hover:shadow-md", className)}>
      <CustomCardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <div className="flex items-center mt-1 space-x-1">
                {change.positive ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  change.positive ? "text-green-500" : "text-red-500"
                )}>
                  {change.value}
                </span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-muted-foreground mt-3">{description}</p>
            )}
          </div>
          
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CustomCardContent>
    </CustomCard>
  );
};

const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Total Outstanding"
        value="$245,500"
        change={{ value: "2.5% from last month", positive: false }}
        icon={DollarSign}
        className="animate-fade-in [animation-delay:100ms]"
      />
      
      <MetricCard
        title="Monthly Payment"
        value="$1,850"
        description="Next payment due in 15 days"
        icon={Calendar}
        className="animate-fade-in [animation-delay:200ms]"
      />
      
      <MetricCard
        title="Interest Paid YTD"
        value="$5,240"
        change={{ value: "12% from last year", positive: true }}
        icon={TrendingUp}
        className="animate-fade-in [animation-delay:300ms]"
      />
    </div>
  );
};

export default DashboardMetrics;
