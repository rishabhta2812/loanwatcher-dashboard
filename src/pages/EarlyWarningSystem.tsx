
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navigation from "@/components/dashboard/Navigation";
import { useUser } from "@/contexts/UserContext";
import { AlertCircle, ArrowDown, ArrowRight, ArrowUp, Check, CreditCard, Download, Eye, FileText, Info, Search, X } from "lucide-react";
import { toast } from "sonner";

// Mock banking metrics data
const bankingMetrics = [
  {
    id: 1,
    name: "Net Monthly Inflow",
    description: "Calculated as: totalCredit - totalDebit",
    formula: "Net Monthly Inflow = totalCredit - totalDebit",
    threshold: "> 0",
    rationale: "A positive net inflow indicates that the borrower's income (credits) exceeds their expenditures (debits) for the month, a basic indicator of liquidity."
  },
  {
    id: 2,
    name: "Monthly Balance Delta",
    description: "Change in balance over the month",
    formula: "Monthly Balance Delta = balLast - balOpen",
    threshold: "Decline < 15% of opening balance",
    rationale: "A decline exceeding 15% may signal rapid depletion of funds, suggesting potential financial stress."
  },
  {
    id: 3,
    name: "Credit-to-Debit Ratio",
    description: "Ratio of credits to debits",
    formula: "Credit-to-Debit Ratio = totalCredit / totalDebit",
    threshold: "> 1.1",
    rationale: "A ratio greater than 1.1 indicates that credits are sufficiently higher than debits—suggesting robust cash inflows."
  },
  {
    id: 4,
    name: "Average Daily Inflow",
    description: "Average daily cash inflow",
    formula: "Average Daily Inflow = Net Monthly Inflow / 30",
    threshold: "No fixed threshold",
    rationale: "This metric provides insight into whether the borrower generates sufficient funds on a daily basis to meet obligations."
  },
  {
    id: 5,
    name: "Liquidity Ratio",
    description: "Ratio of average balance to total debits",
    formula: "Liquidity Ratio = balAvg / totalDebit",
    threshold: "≥ 1.0",
    rationale: "A ratio of at least 1.0 implies that the borrower's average available balance can cover the total monthly debits, ensuring sufficient liquidity."
  },
  {
    id: 6,
    name: "Expense-to-Income Ratio",
    description: "Ratio of expenses to income",
    formula: "Expense-to-Income Ratio = totalDebit / totalCredit",
    threshold: "< 0.65",
    rationale: "A lower expense-to-income ratio indicates that a smaller proportion of income is spent, which is generally a positive indicator of financial health."
  },
  {
    id: 7,
    name: "Account Turnover Ratio",
    description: "Transaction activity relative to average balance",
    formula: "Account Turnover Ratio = (credits + debits) / balAvg",
    threshold: "< 4",
    rationale: "A turnover ratio below 4 suggests moderate transaction activity relative to the account's average balance. High turnover may indicate erratic financial activity."
  },
  {
    id: 8,
    name: "Cash Buffer Days",
    description: "Number of days average balance can cover daily debits",
    formula: "Cash Buffer Days = balAvg / (totalDebit/30)",
    threshold: "≥ 15 days",
    rationale: "A cash buffer of 15 days or more indicates that the borrower has a reasonable reserve to handle unexpected expenses or delays in income."
  },
  {
    id: 9,
    name: "Month-over-Month Net Inflow Percentage Change",
    description: "Percentage change in net inflow from previous month",
    formula: "Calculated using percentage change function",
    threshold: "Decline should not exceed 10%",
    rationale: "A significant drop in net inflow from one month to the next may signal deteriorating financial performance."
  },
  {
    id: 10,
    name: "Net Inflow Coefficient of Variation (CV)",
    description: "Measure of net inflow consistency",
    formula: "CV = Standard Deviation of Net Inflow / Mean Net Inflow",
    threshold: "< 0.25 (25%)",
    rationale: "A lower CV indicates that net inflow is consistent across months, suggesting stability in cash flow."
  }
];

// Mock alerts data
const alertsData = [
  {
    id: 1,
    customerName: "Rajiv Sharma",
    customerId: "CUST001",
    alertType: "Net Monthly Inflow",
    value: "-₹15,000",
    threshold: "> 0",
    severity: "High",
    date: "2023-10-15",
    status: "Active"
  },
  {
    id: 2,
    customerName: "Priya Patel",
    customerId: "CUST002",
    alertType: "Liquidity Ratio",
    value: "0.75",
    threshold: "≥ 1.0",
    severity: "Medium",
    date: "2023-10-14",
    status: "Active"
  },
  {
    id: 3,
    customerName: "Ankit Verma",
    customerId: "CUST003",
    alertType: "Credit-to-Debit Ratio",
    value: "0.9",
    threshold: "> 1.1",
    severity: "Medium",
    date: "2023-10-13",
    status: "Resolved"
  },
  {
    id: 4,
    customerName: "Deepa Gupta",
    customerId: "CUST004",
    alertType: "Expense-to-Income Ratio",
    value: "0.78",
    threshold: "< 0.65",
    severity: "Low",
    date: "2023-10-12",
    status: "Active"
  },
  {
    id: 5,
    customerName: "Sunil Mehta",
    customerId: "CUST005",
    alertType: "Cash Buffer Days",
    value: "8 days",
    threshold: "≥ 15 days",
    severity: "Medium",
    date: "2023-10-11",
    status: "Active"
  },
  {
    id: 6,
    customerName: "Meena Kumar",
    customerId: "CUST006",
    alertType: "Monthly Balance Delta",
    value: "-22%",
    threshold: "Decline < 15%",
    severity: "High",
    date: "2023-10-10",
    status: "Active"
  },
  {
    id: 7,
    customerName: "Rahul Singh",
    customerId: "CUST007",
    alertType: "Net Inflow CV",
    value: "0.32",
    threshold: "< 0.25",
    severity: "Low",
    date: "2023-10-09",
    status: "Resolved"
  },
  {
    id: 8,
    customerName: "Pooja Reddy",
    customerId: "CUST008",
    alertType: "Account Turnover Ratio",
    value: "5.2",
    threshold: "< 4",
    severity: "Medium",
    date: "2023-10-08",
    status: "Active"
  }
];

// Severity badge component with appropriate colors
const SeverityBadge = ({ severity }: { severity: string }) => {
  let variant: "outline" | "default" | "destructive" | "secondary" = "default";
  
  if (severity === "High") {
    variant = "destructive";
  } else if (severity === "Medium") {
    variant = "default";
  } else if (severity === "Low") {
    variant = "secondary";
  }
  
  return <Badge variant={variant}>{severity}</Badge>;
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  if (status === "Resolved") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
        <Check className="mr-1 h-3 w-3" />
        {status}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
      <AlertCircle className="mr-1 h-3 w-3" />
      {status}
    </Badge>
  );
};

// ValueIndicator component to show if a value is above or below threshold
const ValueIndicator = ({ value, threshold, metricName }: { value: string; threshold: string; metricName: string }) => {
  // Determine if the value is positive or negative based on threshold comparison
  let isNegative = false;
  
  if (metricName.includes("Inflow") && value.includes("-")) {
    isNegative = true;
  } else if (metricName === "Liquidity Ratio" || metricName === "Credit-to-Debit Ratio") {
    const numValue = parseFloat(value.replace("₹", ""));
    isNegative = threshold.includes(">") && numValue < parseFloat(threshold.replace(">", "").trim());
  } else if (metricName.includes("Expense-to-Income")) {
    const numValue = parseFloat(value);
    isNegative = threshold.includes("<") && numValue > parseFloat(threshold.replace("<", "").trim());
  } else if (metricName === "Cash Buffer Days") {
    const numValue = parseInt(value.split(" ")[0]);
    isNegative = numValue < 15;
  } else if (metricName.includes("Delta") && value.includes("-")) {
    const numValue = parseInt(value.replace("%", "").replace("-", ""));
    isNegative = numValue > 15;
  }
  
  return (
    <div className="flex items-center">
      <span className={isNegative ? "text-red-500" : "text-green-500"}>{value}</span>
      {isNegative ? (
        <ArrowDown className="ml-1 h-3 w-3 text-red-500" />
      ) : (
        <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
      )}
    </div>
  );
};

const EarlyWarningSystem = () => {
  const { hasPermission } = useUser();
  const [activeTab, setActiveTab] = useState("alerts");
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);
  
  const handleDownloadReport = () => {
    toast.success("Alert report downloaded successfully");
  };
  
  // Filter alerts based on search term and filters
  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = 
      alert.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      alert.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.alertType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "All" || alert.severity === severityFilter;
    const matchesStatus = statusFilter === "All" || alert.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });
  
  // Handle opening metric details
  const handleViewMetricDetails = (metricId: number) => {
    setSelectedMetric(metricId);
  };
  
  // Handle closing metric details
  const handleCloseMetricDetails = () => {
    setSelectedMetric(null);
  };
  
  if (!hasPermission("view_dashboard")) {
    return (
      <div className="h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>
                  You don't have permission to access the Early Warning System page.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Early Warning System</h1>
              <p className="text-muted-foreground">
                Monitor loans and detect potential issues early
              </p>
            </div>
            <Button variant="outline" onClick={handleDownloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="alerts" className="flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" />
                Active Alerts
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Banking Metrics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="alerts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Monitoring Dashboard</CardTitle>
                  <CardDescription>
                    View and manage alerts for borrowers across various metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search customers or alerts..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Select value={severityFilter} onValueChange={setSeverityFilter}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Severities</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All Status</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 py-3 px-4 font-medium border-b bg-muted/50">
                      <div className="col-span-3">Customer</div>
                      <div className="col-span-2">Alert Type</div>
                      <div className="col-span-2">Value</div>
                      <div className="col-span-1">Severity</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    {filteredAlerts.length === 0 ? (
                      <div className="py-12 text-center text-muted-foreground">
                        No alerts match your filters
                      </div>
                    ) : (
                      <>
                        {filteredAlerts.map((alert) => (
                          <div key={alert.id} className="grid grid-cols-12 gap-4 py-3 px-4 border-b last:border-0 items-center">
                            <div className="col-span-3">
                              <div className="font-medium">{alert.customerName}</div>
                              <div className="text-sm text-muted-foreground">{alert.customerId}</div>
                            </div>
                            <div className="col-span-2">{alert.alertType}</div>
                            <div className="col-span-2">
                              <ValueIndicator 
                                value={alert.value} 
                                threshold={alert.threshold} 
                                metricName={alert.alertType} 
                              />
                              <div className="text-xs text-muted-foreground">
                                Threshold: {alert.threshold}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <SeverityBadge severity={alert.severity} />
                            </div>
                            <div className="col-span-2">
                              {new Date(alert.date).toLocaleDateString()}
                            </div>
                            <div className="col-span-1">
                              <StatusBadge status={alert.status} />
                            </div>
                            <div className="col-span-1">
                              <Button variant="ghost" size="sm" asChild>
                                <div className="cursor-pointer">
                                  <Eye className="h-4 w-4" />
                                </div>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredAlerts.length} of {alertsData.length} alerts
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Alerts
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alert Summary</CardTitle>
                  <CardDescription>
                    Overview of alerts by severity and status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          High Severity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-500">
                          {alertsData.filter(a => a.severity === "High" && a.status === "Active").length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {alertsData.filter(a => a.severity === "High" && a.status === "Resolved").length} resolved
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Medium Severity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-orange-500">
                          {alertsData.filter(a => a.severity === "Medium" && a.status === "Active").length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {alertsData.filter(a => a.severity === "Medium" && a.status === "Resolved").length} resolved
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Low Severity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-500">
                          {alertsData.filter(a => a.severity === "Low" && a.status === "Active").length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {alertsData.filter(a => a.severity === "Low" && a.status === "Resolved").length} resolved
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Banking Metrics</CardTitle>
                  <CardDescription>
                    Key metrics used for early warning calculations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground mb-4">
                      These metrics are calculated from banking transaction data to identify potential issues early. 
                      Click on any metric to view detailed information.
                    </p>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-8 gap-4 py-3 px-4 font-medium border-b bg-muted/50">
                        <div className="col-span-3">Metric Name</div>
                        <div className="col-span-3">Description</div>
                        <div className="col-span-1">Threshold</div>
                        <div className="col-span-1">Details</div>
                      </div>
                      {bankingMetrics.map((metric) => (
                        <div key={metric.id} className="grid grid-cols-8 gap-4 py-3 px-4 border-b last:border-0 items-center">
                          <div className="col-span-3 font-medium">{metric.name}</div>
                          <div className="col-span-3 text-sm">{metric.description}</div>
                          <div className="col-span-1 text-sm">{metric.threshold}</div>
                          <div className="col-span-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewMetricDetails(metric.id)}>
                              <Info className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Metric details drawer */}
      {selectedMetric !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCloseMetricDetails}>
          <div className="bg-white dark:bg-slate-900 rounded-lg w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Metric Details</h3>
                <Button variant="ghost" size="sm" onClick={handleCloseMetricDetails}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {bankingMetrics.filter(m => m.id === selectedMetric).map((metric) => (
                <div key={metric.id} className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">{metric.name}</h4>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Formula</h5>
                    <div className="bg-muted p-3 rounded-md">
                      <code>{metric.formula}</code>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Threshold</h5>
                    <p>{metric.threshold}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Rationale</h5>
                    <p className="text-sm">{metric.rationale}</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleCloseMetricDetails}>Close</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarlyWarningSystem;
