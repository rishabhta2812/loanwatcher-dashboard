
import { Check, X, AlertCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  type: "payment" | "fee" | "alert";
  title: string;
  amount?: string;
  date: string;
  status?: "completed" | "failed" | "pending";
  message?: string;
}

const ActivityItem = ({ type, title, amount, date, status, message }: ActivityItemProps) => {
  const getIcon = () => {
    if (type === "alert") {
      return (
        <div className="h-9 w-9 rounded-full flex items-center justify-center bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500">
          <AlertCircle size={18} />
        </div>
      );
    }
    
    if (type === "payment" || type === "fee") {
      if (status === "completed") {
        return (
          <div className="h-9 w-9 rounded-full flex items-center justify-center bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500">
            <Check size={18} />
          </div>
        );
      }
      
      if (status === "failed") {
        return (
          <div className="h-9 w-9 rounded-full flex items-center justify-center bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500">
            <X size={18} />
          </div>
        );
      }
      
      return (
        <div className="h-9 w-9 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500">
          <CreditCard size={18} />
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
      {getIcon()}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium truncate">{title}</p>
          {amount && (
            <p className={cn(
              "text-sm font-semibold",
              type === "payment" && status === "completed" && "text-green-600 dark:text-green-400", 
              type === "fee" && "text-red-600 dark:text-red-400"
            )}>
              {type === "payment" ? "-" : "+"}{amount}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">{date}</p>
          {status && (
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              status === "completed" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
              status === "failed" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500",
              status === "pending" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500",
            )}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
        </div>
        
        {message && (
          <p className="text-xs text-muted-foreground mt-1">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
