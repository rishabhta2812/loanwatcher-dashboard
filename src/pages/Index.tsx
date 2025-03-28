
import { useState, useEffect } from "react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  AlertTriangle, 
  BarChart3, 
  ChevronRight, 
  CreditCard, 
  DollarSign, 
  Download, 
  FileText, 
  LifeBuoy, 
  MessageCircle, 
  ShieldAlert, 
  TrendingDown, 
  TrendingUp, 
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

// Sample data to simulate loan monitoring dashboard
const loanAccounts = [
  { 
    id: "LOAN-5001", 
    borrower: "Rahul Sharma", 
    vehicleModel: "Toyota Camry", 
    balanceDue: 245500, 
    severity: "High",
    dpd: 45,
    nextPayment: 1850,
    dueDate: "28 Nov 2023", 
    monthlyInflow: -5400,
    liquidityRatio: 0.68
  },
  { 
    id: "LOAN-5012", 
    borrower: "Anjali Patel", 
    vehicleModel: "Honda Civic", 
    balanceDue: 320000, 
    severity: "Medium",
    dpd: 15,
    nextPayment: 2100,
    dueDate: "05 Dec 2023",
    monthlyInflow: 8500,
    liquidityRatio: 0.78
  },
  { 
    id: "LOAN-5024", 
    borrower: "Vikram Singh", 
    vehicleModel: "Ford Mustang", 
    balanceDue: 510000, 
    severity: "Low",
    dpd: 0,
    nextPayment: 3300,
    dueDate: "10 Dec 2023",
    monthlyInflow: 12400,
    liquidityRatio: 1.05
  }
];

const recentTriggers = [
  {
    id: "TRG-001",
    name: "Income not received in the past 2 months",
    severity: "High",
    triggeredOn: "2 Nov 2023",
    affectedLoans: 4
  },
  {
    id: "TRG-002",
    name: "Liquidity ratio below threshold",
    severity: "Medium",
    triggeredOn: "5 Nov 2023",
    affectedLoans: 7
  },
  {
    id: "TRG-003",
    name: "Current balance below Amount Due",
    severity: "Medium",
    triggeredOn: "10 Nov 2023",
    affectedLoans: 3
  }
];

const dpdDistribution = [
  { range: "0-30 Days", count: 145, percentage: 72.5 },
  { range: "31-60 Days", count: 32, percentage: 16 },
  { range: "61-90 Days", count: 15, percentage: 7.5 },
  { range: "90+ Days", count: 8, percentage: 4 }
];

// Sample key performance metrics
const kpiMetrics = [
  {
    title: "Total Portfolio",
    value: "₹12.4M",
    change: { value: "3.5%", positive: true },
    description: "Current loan portfolio value"
  },
  {
    title: "At-Risk Amount",
    value: "₹1.82M",
    change: { value: "2.1%", positive: false },
    description: "Loans with High & Medium severity"
  },
  {
    title: "Avg. Liquidity Ratio",
    value: "0.84",
    change: { value: "1.2%", positive: false },
    description: "Across all loan accounts"
  },
  {
    title: "Total Active Loans",
    value: "200",
    change: { value: "5%", positive: true },
    description: "Across all products"
  }
];

const Index = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay for smoother animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const getSeverityBadge = (severity) => {
    const severityMap = {
      "High": "bg-red-500/10 text-red-500 border-red-500/20",
      "Medium": "bg-amber-500/10 text-amber-500 border-amber-500/20", 
      "Low": "bg-green-500/10 text-green-500 border-green-500/20"
    };
    
    return (
      <Badge variant="outline" className={severityMap[severity] || ""}>
        {severity}
      </Badge>
    );
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-1">Loan Monitoring Dashboard</h1>
            <p className="text-muted-foreground">
              Track loan performance, severity ratings, and trigger alerts across your portfolio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {kpiMetrics.map((metric, index) => (
              <Card key={index} className={`animate-fade-in [animation-delay:${index * 100}ms]`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                      
                      <div className="flex items-center mt-1 space-x-1">
                        {metric.change.positive ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={metric.change.positive ? "text-xs font-medium text-green-500" : "text-xs font-medium text-red-500"}>
                          {metric.change.value}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-3">{metric.description}</p>
                    </div>
                    
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                      {index === 0 && <DollarSign className="h-5 w-5" />}
                      {index === 1 && <AlertTriangle className="h-5 w-5" />}
                      {index === 2 && <BarChart3 className="h-5 w-5" />}
                      {index === 3 && <Users className="h-5 w-5" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card className="animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Monitored Loan Accounts</CardTitle>
                    <CardDescription>
                      Loans with early warning signals based on severity
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/loan-details">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanAccounts.map((loan) => (
                      <div key={loan.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">{loan.borrower}</h4>
                              {getSeverityBadge(loan.severity)}
                            </div>
                            <p className="text-sm text-muted-foreground">{loan.vehicleModel} | {loan.id}</p>
                            <div className="flex space-x-4 mt-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Balance Due</p>
                                <p className="font-medium">₹{loan.balanceDue.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">DPD</p>
                                <p className={`font-medium ${loan.dpd > 30 ? 'text-red-500' : ''}`}>{loan.dpd} days</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Next Payment</p>
                                <p className="font-medium">₹{loan.nextPayment.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col justify-center space-y-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Key Metrics</span>
                              <span 
                                className={loan.monthlyInflow < 0 ? 'text-red-500' : 'text-green-500'}
                              >
                                {loan.monthlyInflow < 0 ? 'At Risk' : 'Healthy'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs whitespace-nowrap">Liquidity</span>
                              <Progress 
                                value={loan.liquidityRatio * 100} 
                                max={100} 
                                className="h-2"
                              />
                              <span 
                                className={`text-xs ${loan.liquidityRatio < 1 ? 'text-red-500' : 'text-green-500'}`}
                              >
                                {loan.liquidityRatio.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>DPD Distribution</CardTitle>
                  <CardDescription>
                    Days past due across portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dpdDistribution.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.range}</span>
                          <span className="font-medium">{item.count} loans ({item.percentage}%)</span>
                        </div>
                        <Progress 
                          value={item.percentage} 
                          max={100} 
                          className={`h-2 ${
                            index === 0 ? "bg-green-100 [&>div]:bg-green-500" : 
                            index === 1 ? "bg-amber-100 [&>div]:bg-amber-500" : 
                            index === 2 ? "bg-orange-100 [&>div]:bg-orange-500" : 
                            "bg-red-100 [&>div]:bg-red-500"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Recent Trigger Alerts</CardTitle>
                  <CardDescription>
                    Custom alerts triggered in the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTriggers.map((trigger) => (
                      <div key={trigger.id} className="p-3 rounded-md border flex justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{trigger.name}</span>
                            {getSeverityBadge(trigger.severity)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Triggered on {trigger.triggeredOn} • {trigger.affectedLoans} affected loans
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Link 
              to="/triggers"
              className="bg-card hover:bg-accent transition-colors duration-200 rounded-lg border p-6 flex flex-col space-y-2 animate-fade-in"
            >
              <ShieldAlert className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Create New Trigger</h3>
              <p className="text-sm text-muted-foreground">Define custom alert rules based on banking metrics</p>
              <Button variant="ghost" className="mt-2 justify-start p-0 h-auto" asChild>
                <div className="flex items-center text-primary text-sm">
                  Create Trigger <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Button>
            </Link>
            
            <Link 
              to="/ews"
              className="bg-card hover:bg-accent transition-colors duration-200 rounded-lg border p-6 flex flex-col space-y-2 animate-fade-in"
            >
              <AlertTriangle className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Early Warning System</h3>
              <p className="text-sm text-muted-foreground">Identify accounts at risk with automated analysis</p>
              <Button variant="ghost" className="mt-2 justify-start p-0 h-auto" asChild>
                <div className="flex items-center text-primary text-sm">
                  View Alerts <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Button>
            </Link>
            
            <Link 
              to="/personal-loan-insights" 
              className="bg-card hover:bg-accent transition-colors duration-200 rounded-lg border p-6 flex flex-col space-y-2 animate-fade-in"
            >
              <FileText className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Loan Insights</h3>
              <p className="text-sm text-muted-foreground">Detailed analytics and insights on loan performance</p>
              <Button variant="ghost" className="mt-2 justify-start p-0 h-auto" asChild>
                <div className="flex items-center text-primary text-sm">
                  View Insights <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Button>
            </Link>
            
            <Link 
              to="/loan-chatbot" 
              className="bg-card hover:bg-accent transition-colors duration-200 rounded-lg border p-6 flex flex-col space-y-2 animate-fade-in"
            >
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Loan Chatbot</h3>
              <p className="text-sm text-muted-foreground">Get answers about loan data and insights</p>
              <Button variant="ghost" className="mt-2 justify-start p-0 h-auto" asChild>
                <div className="flex items-center text-primary text-sm">
                  Ask Questions <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
