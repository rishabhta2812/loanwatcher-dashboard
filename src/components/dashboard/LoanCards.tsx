
import { CreditCard, Home, Car, GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CustomCard, CustomCardContent, CustomCardHeader, CustomCardTitle, CustomCardFooter } from "@/components/ui/custom-card";
import { cn } from "@/lib/utils";

interface LoanCardProps {
  type: "mortgage" | "auto" | "personal" | "student";
  name: string;
  amount: string;
  remaining: string;
  rate: string;
  progress: number;
  dueDate: string;
  delayAnimation?: number;
}

const LoanCard = ({ type, name, amount, remaining, rate, progress, dueDate, delayAnimation = 0 }: LoanCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "mortgage":
        return <Home className="h-5 w-5" />;
      case "auto":
        return <Car className="h-5 w-5" />;
      case "personal":
        return <CreditCard className="h-5 w-5" />;
      case "student":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };
  
  const getGradient = () => {
    switch (type) {
      case "mortgage":
        return "from-blue-500/20 to-blue-600/20 dark:from-blue-500/10 dark:to-blue-600/10";
      case "auto":
        return "from-emerald-500/20 to-emerald-600/20 dark:from-emerald-500/10 dark:to-emerald-600/10";
      case "personal":
        return "from-purple-500/20 to-purple-600/20 dark:from-purple-500/10 dark:to-purple-600/10";
      case "student":
        return "from-amber-500/20 to-amber-600/20 dark:from-amber-500/10 dark:to-amber-600/10";
      default:
        return "from-slate-500/20 to-slate-600/20 dark:from-slate-500/10 dark:to-slate-600/10";
    }
  };
  
  const getTextColor = () => {
    switch (type) {
      case "mortgage":
        return "text-blue-600 dark:text-blue-400";
      case "auto":
        return "text-emerald-600 dark:text-emerald-400";
      case "personal":
        return "text-purple-600 dark:text-purple-400";
      case "student":
        return "text-amber-600 dark:text-amber-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };
  
  const getProgressColor = () => {
    switch (type) {
      case "mortgage":
        return "bg-blue-600";
      case "auto":
        return "bg-emerald-600";
      case "personal":
        return "bg-purple-600";
      case "student":
        return "bg-amber-600";
      default:
        return "bg-slate-600";
    }
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
        getGradient()
      )} 
      />
      
      <CustomCardHeader className="relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center",
              "bg-white/80 dark:bg-slate-800/80",
              getTextColor()
            )}>
              {getIcon()}
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
          <Progress value={progress} className={cn("h-1.5", getProgressColor())} />
        </div>
      </CustomCardContent>
      
      <CustomCardFooter className="relative">
        <p className="text-xs text-muted-foreground">
          Next payment due: <span className="font-medium">{dueDate}</span>
        </p>
      </CustomCardFooter>
    </CustomCard>
  );
};

const LoanCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <LoanCard
        type="mortgage"
        name="Home Loan"
        amount="$320,000"
        remaining="$245,500"
        rate="4.25%"
        progress={25}
        dueDate="Sep 1, 2023"
        delayAnimation={100}
      />
      
      <LoanCard
        type="auto"
        name="Car Loan"
        amount="$35,000"
        remaining="$18,200"
        rate="3.75%"
        progress={52}
        dueDate="Sep 15, 2023"
        delayAnimation={200}
      />
      
      <LoanCard
        type="personal"
        name="Personal Loan"
        amount="$15,000"
        remaining="$8,750"
        rate="6.5%"
        progress={42}
        dueDate="Sep 5, 2023"
        delayAnimation={300}
      />
      
      <LoanCard
        type="student"
        name="Student Loan"
        amount="$42,000"
        remaining="$12,600"
        rate="5.2%"
        progress={75}
        dueDate="Sep 28, 2023"
        delayAnimation={400}
      />
    </div>
  );
};

export default LoanCards;
