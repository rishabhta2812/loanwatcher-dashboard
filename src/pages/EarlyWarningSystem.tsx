
import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  ShieldAlert,
  AlertCircle,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Sample alerts data for demonstration
const sampleAlerts = [
  {
    id: 1,
    customerId: "CUST-001",
    customerName: "Alex Johnson",
    metric: "Net Monthly Inflow",
    value: -500,
    threshold: "> 0",
    severity: "high",
    timestamp: "2023-06-15T09:23:12",
    description: "Customer's monthly inflow is negative, indicating spending exceeds income.",
    status: "active",
  },
  {
    id: 2,
    customerId: "CUST-002",
    customerName: "Sarah Williams",
    metric: "Monthly Balance Delta",
    value: -22,
    threshold: "< 15%",
    severity: "medium",
    timestamp: "2023-06-14T14:45:30",
    description: "Balance declined by 22% this month, exceeding the 15% threshold.",
    status: "active",
  },
  {
    id: 3,
    customerId: "CUST-003",
    customerName: "Michael Chen",
    metric: "Credit-to-Debit Ratio",
    value: 0.8,
    threshold: "> 1.1",
    severity: "medium",
    timestamp: "2023-06-13T11:12:45",
    description: "Credit-to-Debit ratio below threshold, indicating potential cash flow issues.",
    status: "resolved",
  },
  {
    id: 4,
    customerId: "CUST-004",
    customerName: "Emily Davis",
    metric: "Cash Buffer Days",
    value: 9,
    threshold: "≥ 15 days",
    severity: "high",
    timestamp: "2023-06-12T16:08:22",
    description: "Customer has only 9 days of cash buffer, below the 15-day minimum.",
    status: "active",
  },
  {
    id: 5,
    customerId: "CUST-001",
    customerName: "Alex Johnson",
    metric: "Consecutive Negative Months",
    value: 3,
    threshold: "< 3",
    severity: "critical",
    timestamp: "2023-06-11T10:33:05",
    description: "Customer has had 3 consecutive months of negative net flow.",
    status: "active",
  },
  {
    id: 6,
    customerId: "CUST-005",
    customerName: "James Wilson",
    metric: "Expense-to-Income Ratio",
    value: 0.78,
    threshold: "< 0.65",
    severity: "low",
    timestamp: "2023-06-10T13:27:18",
    description: "Expenses are 78% of income, above the recommended 65% threshold.",
    status: "resolved",
  },
];

// Alert Card Component
const AlertCard = ({ alert }: { alert: typeof sampleAlerts[0] }) => {
  const { toast } = useToast();
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertOctagon className="h-5 w-5 text-destructive" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "medium":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "low":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="text-blue-500 border-blue-500">Low</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    return status === "resolved" ? 
      <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
      <XCircle className="h-5 w-5 text-red-500" />;
  };
  
  const handleResolve = () => {
    toast({
      title: "Alert resolved",
      description: `Alert for ${alert.customerName} has been marked as resolved.`,
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className={`mb-4 ${alert.status === 'resolved' ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getSeverityIcon(alert.severity)}
            <div>
              <CardTitle className="text-base">{alert.metric}</CardTitle>
              <CardDescription className="text-sm">
                {alert.customerName} ({alert.customerId})
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getSeverityBadge(alert.severity)}
            <div className="flex items-center gap-1">
              {getStatusIcon(alert.status)}
              <span className="text-xs capitalize">{alert.status}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Value:</span>
            <span className="font-medium">{alert.value}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Threshold:</span>
            <span className="font-medium">{alert.threshold}</span>
          </div>
          <div className="text-sm mt-2">
            <p>{alert.description}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground">
              {formatDate(alert.timestamp)}
            </span>
            {alert.status !== "resolved" && (
              <Button variant="outline" size="sm" onClick={handleResolve}>
                Mark Resolved
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Metrics Information Component
const MetricsInfo = () => {
  const metrics = [
    {
      name: "Net Monthly Inflow",
      description: "Net Monthly Inflow = totalCredit − totalDebit",
      threshold: "> 0",
      rationale: "A positive net inflow indicates that the borrower's income (credits) exceeds their expenditures (debits) for the month, a basic indicator of liquidity."
    },
    {
      name: "Monthly Balance Delta",
      description: "Monthly Balance Delta = balLast − balOpen",
      threshold: "< 15% decline",
      rationale: "A decline exceeding 15% may signal rapid depletion of funds, suggesting potential financial stress."
    },
    {
      name: "Credit-to-Debit Ratio",
      description: "Credit-to-Debit Ratio = totalCredit / totalDebit",
      threshold: "> 1.1",
      rationale: "A ratio greater than 1.1 indicates that credits are sufficiently higher than debits—suggesting robust cash inflows."
    },
    {
      name: "Liquidity Ratio",
      description: "Liquidity Ratio = balAvg / totalDebit",
      threshold: "≥ 1.0",
      rationale: "A ratio of at least 1.0 implies that the borrower's average available balance can cover the total monthly debits, ensuring sufficient liquidity."
    },
    {
      name: "Expense-to-Income Ratio",
      description: "Expense-to-Income Ratio = totalDebit / totalCredit",
      threshold: "< 0.65",
      rationale: "A lower expense-to-income ratio indicates that a smaller proportion of income is spent, which is generally a positive indicator of financial health."
    },
    {
      name: "Cash Buffer Days",
      description: "Cash Buffer Days = balAvg / (totalDebit/30)",
      threshold: "≥ 15 days",
      rationale: "A cash buffer of 15 days or more indicates that the borrower has a reasonable reserve to handle unexpected expenses or delays in income."
    },
    {
      name: "Consecutive Negative Months",
      description: "Maximum number of successive months with negative net inflow",
      threshold: "< 3 months",
      rationale: "Three or more consecutive months with negative net inflow are a strong indicator of potential financial distress."
    }
  ];

  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-lg font-medium">Monitored Metrics</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <Card key={metric.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{metric.name}</CardTitle>
              <CardDescription className="text-xs font-mono">
                {metric.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Threshold:</span>
                <Badge variant="outline" className="font-mono">{metric.threshold}</Badge>
              </div>
              <p className="text-xs mt-2">{metric.rationale}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Early Warning System Page Component
const EarlyWarningSystem = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter alerts based on the active tab
  const filteredAlerts = activeTab === "all" 
    ? sampleAlerts 
    : sampleAlerts.filter(alert => activeTab === "resolved" 
        ? alert.status === "resolved" 
        : alert.status === "active" && alert.severity === activeTab);

  // Count alerts by severity and status
  const alertCounts = {
    all: sampleAlerts.length,
    active: sampleAlerts.filter(a => a.status === "active").length,
    resolved: sampleAlerts.filter(a => a.status === "resolved").length,
    critical: sampleAlerts.filter(a => a.severity === "critical" && a.status === "active").length,
    high: sampleAlerts.filter(a => a.severity === "high" && a.status === "active").length,
    medium: sampleAlerts.filter(a => a.severity === "medium" && a.status === "active").length,
    low: sampleAlerts.filter(a => a.severity === "low" && a.status === "active").length,
  };
  
  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="flex items-center mb-6">
            <ShieldAlert className="mr-2 h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Early Warning System</h1>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>
                Monitor customer financial health metrics and receive alerts when thresholds are exceeded.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50">
                      <AlertOctagon className="h-8 w-8 text-red-500 mb-2" />
                      <span className="text-2xl font-bold">{alertCounts.critical}</span>
                      <span className="text-xs text-muted-foreground">Critical Alerts</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Critical alerts require immediate action to prevent severe financial distress.</p>
                  </HoverCardContent>
                </HoverCard>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900/50">
                      <AlertTriangle className="h-8 w-8 text-orange-500 mb-2" />
                      <span className="text-2xl font-bold">{alertCounts.high}</span>
                      <span className="text-xs text-muted-foreground">High Priority</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">High priority alerts indicate significant risk factors that should be addressed soon.</p>
                  </HoverCardContent>
                </HoverCard>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col items-center p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/50">
                      <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                      <span className="text-2xl font-bold">{alertCounts.medium}</span>
                      <span className="text-xs text-muted-foreground">Medium Priority</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Medium priority alerts suggest potential issues that should be monitored.</p>
                  </HoverCardContent>
                </HoverCard>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
                      <Info className="h-8 w-8 text-blue-500 mb-2" />
                      <span className="text-2xl font-bold">{alertCounts.low}</span>
                      <span className="text-xs text-muted-foreground">Low Priority</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Low priority alerts are minor concerns that may require attention in the future.</p>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsListWrapper>
              <TabsTrigger value="all">
                All
                <Badge variant="outline" className="ml-2">{alertCounts.all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="critical">
                Critical
                <Badge variant="outline" className="ml-2">{alertCounts.critical}</Badge>
              </TabsTrigger>
              <TabsTrigger value="high">
                High
                <Badge variant="outline" className="ml-2">{alertCounts.high}</Badge>
              </TabsTrigger>
              <TabsTrigger value="medium">
                Medium
                <Badge variant="outline" className="ml-2">{alertCounts.medium}</Badge>
              </TabsTrigger>
              <TabsTrigger value="low">
                Low
                <Badge variant="outline" className="ml-2">{alertCounts.low}</Badge>
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved
                <Badge variant="outline" className="ml-2">{alertCounts.resolved}</Badge>
              </TabsTrigger>
            </TabsListWrapper>
            
            <TabsContent value={activeTab} className="mt-6">
              <h2 className="text-xl font-semibold mb-4">
                {activeTab === "all" ? "All Alerts" : 
                 activeTab === "resolved" ? "Resolved Alerts" : 
                 `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Priority Alerts`}
              </h2>
              
              {filteredAlerts.length > 0 ? (
                <div className="space-y-2">
                  {filteredAlerts.map(alert => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Alerts Found</h3>
                    <p className="text-sm text-muted-foreground">
                      There are currently no {activeTab !== "all" && activeTab !== "resolved" ? `${activeTab} priority` : activeTab} alerts.
                    </p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          <MetricsInfo />
        </div>
      </main>
    </div>
  );
};

// TabsListWrapper to ensure the tabs look good on mobile
const TabsListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <TabsList className="inline-flex min-w-max">
        {children}
      </TabsList>
    </div>
  );
};

export default EarlyWarningSystem;
