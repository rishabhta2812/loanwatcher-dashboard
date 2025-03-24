
import { CreditCard, Car, AlertTriangle, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardTitle, CustomCardFooter } from "@/components/ui/custom-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";

interface LoanCardProps {
  id: string;
  type: "auto";
  name: string;
  amount: string;
  remaining: string;
  rate: string;
  progress: number;
  dueDate: string;
  isLate: boolean;
  delayAnimation?: number;
}

const LoanCard = ({ 
  id, 
  type, 
  name, 
  amount, 
  remaining, 
  rate, 
  progress, 
  dueDate, 
  isLate,
  delayAnimation = 0 
}: LoanCardProps) => {
  const { canTriggerNotifications } = useUser();
  
  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to the customer for ${name}`,
    });
  };
  
  const handleFlagAccount = () => {
    toast({
      title: "Account Flagged",
      description: `${name} has been flagged for review by a loan officer`,
      variant: "destructive",
    });
  };
  
  return (
    <CustomCard 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        "animate-fade-in"
      )}
      style={{ animationDelay: `${delayAnimation}ms` }}
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50",
        "from-emerald-500/20 to-emerald-600/20 dark:from-emerald-500/10 dark:to-emerald-600/10"
      )} 
      />
      
      <CustomCardHeader className="relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center",
              "bg-white/80 dark:bg-slate-800/80",
              "text-emerald-600 dark:text-emerald-400"
            )}>
              <Car size={18} />
            </div>
            <CustomCardTitle>{name}</CustomCardTitle>
          </div>
          <div className="text-sm font-semibold">{amount}</div>
        </div>
      </CustomCardHeader>
      
      <CustomCardContent className="relative space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Outstanding</p>
            <p className="text-sm font-medium">{remaining}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Interest Rate</p>
            <p className="text-sm font-medium">{rate}</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Paid off</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5 bg-emerald-600" />
        </div>
        
        {isLate && (
          <div className="flex items-center gap-1 text-xs text-red-500">
            <AlertTriangle size={12} />
            <span>Payment overdue</span>
          </div>
        )}
      </CustomCardContent>
      
      <CustomCardFooter className="relative">
        <div className="flex flex-col space-y-2 w-full">
          <p className="text-xs text-muted-foreground">
            Next payment due: <span className="font-medium">{dueDate}</span>
          </p>
          
          {canTriggerNotifications && (
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7 flex-1"
                onClick={handleSendReminder}
              >
                <Bell size={12} className="mr-1" />
                Send Reminder
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7 flex-1 text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/50"
                onClick={handleFlagAccount}
              >
                <AlertTriangle size={12} className="mr-1" />
                Flag Account
              </Button>
            </div>
          )}
        </div>
      </CustomCardFooter>
    </CustomCard>
  );
};

const LoanCards = () => {
  const carLoans = [
    {
      id: "auto-1",
      type: "auto" as const,
      name: "Toyota Camry",
      amount: "$35,000",
      remaining: "$18,200",
      rate: "3.75%",
      progress: 52,
      dueDate: "Sep 15, 2023",
      isLate: false,
      delayAnimation: 100
    },
    {
      id: "auto-2",
      type: "auto" as const,
      name: "Honda CR-V",
      amount: "$42,000",
      remaining: "$32,600",
      rate: "4.25%",
      progress: 23,
      dueDate: "Sep 10, 2023",
      isLate: false,
      delayAnimation: 200
    },
    {
      id: "auto-3",
      type: "auto" as const,
      name: "Ford F-150",
      amount: "$55,000",
      remaining: "$48,750",
      rate: "5.0%",
      progress: 12,
      dueDate: "Sep 5, 2023",
      isLate: true,
      delayAnimation: 300
    },
    {
      id: "auto-4",
      type: "auto" as const,
      name: "Tesla Model 3",
      amount: "$62,000",
      remaining: "$42,600",
      rate: "3.9%",
      progress: 32,
      dueDate: "Sep 20, 2023",
      isLate: false,
      delayAnimation: 400
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {carLoans.map((loan) => (
        <LoanCard
          key={loan.id}
          id={loan.id}
          type={loan.type}
          name={loan.name}
          amount={loan.amount}
          remaining={loan.remaining}
          rate={loan.rate}
          progress={loan.progress}
          dueDate={loan.dueDate}
          isLate={loan.isLate}
          delayAnimation={loan.delayAnimation}
        />
      ))}
    </div>
  );
};

export default LoanCards;
