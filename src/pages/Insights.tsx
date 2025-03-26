
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Calendar, ChevronDown, Download, Layers, Search, TrendingUp, Upload } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { derivedMonthlyFeatures } from "@/data/bankingMetrics";

// Sample data for loan insights
const customersWithInsights = [
  {
    id: "CUST-1001",
    name: "Rahul Sharma",
    loanId: "LOAN-5001",
    severity: "High",
    latestMonth: "Oct-23",
    netMonthlyInflow: -5400,
    liquidityRatio: 0.68,
    netInflowTrend: -12.5,
    maxConsecutiveNegativeMonths: 3
  },
  {
    id: "CUST-1007",
    name: "Anjali Patel",
    loanId: "LOAN-5012",
    severity: "Medium",
    latestMonth: "Oct-23",
    netMonthlyInflow: 8500,
    liquidityRatio: 0.78,
    netInflowTrend: -8.3,
    maxConsecutiveNegativeMonths: 0
  },
  {
    id: "CUST-1015",
    name: "Vikram Singh",
    loanId: "LOAN-5024",
    severity: "Low",
    latestMonth: "Oct-23",
    netMonthlyInflow: 12400,
    liquidityRatio: 1.05,
    netInflowTrend: 2.1,
    maxConsecutiveNegativeMonths: 0
  },
  {
    id: "CUST-1023",
    name: "Priya Gupta",
    loanId: "LOAN-5037",
    severity: "High",
    latestMonth: "Oct-23",
    netMonthlyInflow: -3200,
    liquidityRatio: 0.52,
    netInflowTrend: -15.7,
    maxConsecutiveNegativeMonths: 2
  },
  {
    id: "CUST-1042",
    name: "Rohan Verma",
    loanId: "LOAN-5055",
    severity: "Medium",
    latestMonth: "Oct-23",
    netMonthlyInflow: 6700,
    liquidityRatio: 0.91,
    netInflowTrend: -5.2,
    maxConsecutiveNegativeMonths: 1
  }
];

const Insights = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  
  // Filter customers based on search
  const filteredCustomers = customersWithInsights.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.loanId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get the selected customer details
  const customerDetails = selectedCustomer 
    ? customersWithInsights.find(c => c.id === selectedCustomer) 
    : null;
    
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "High": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Low": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };
  
  const getValueColor = (value: number, isPositive = true) => {
    if (isPositive) {
      return value >= 0 ? "text-green-500" : "text-red-500";
    } else {
      return value >= 0 ? "text-red-500" : "text-green-500";
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold">Personal Loan Insights</h1>
            <p className="text-muted-foreground">Comprehensive loan performance analytics</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Customer Selection</CardTitle>
                  <CardDescription>
                    Select a customer to view detailed insights
                  </CardDescription>
                  <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search customers..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <div 
                        key={customer.id}
                        className={`p-3 rounded-md border cursor-pointer transition-colors ${
                          selectedCustomer === customer.id 
                            ? "bg-primary/10 border-primary/20" 
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setSelectedCustomer(customer.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.id} | Loan: {customer.loanId}
                            </div>
                          </div>
                          <Badge variant="outline" className={getSeverityColor(customer.severity)}>
                            {customer.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <div className="py-8 text-center text-muted-foreground">
                        No customers found matching your search.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Data
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart className="mr-2 h-4 w-4" />
                      Visualize Trends
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Historical Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {customerDetails ? (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{customerDetails.name}</CardTitle>
                          <CardDescription>
                            {customerDetails.id} | Loan ID: {customerDetails.loanId}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className={getSeverityColor(customerDetails.severity)}>
                          {customerDetails.severity} Severity
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold mb-4">Borrower Insight Report</div>
                      
                      <div className="space-y-4">
                        <div>
                          <p>
                            Data up to: <span className="font-medium">{customerDetails.latestMonth}</span>
                          </p>
                          <p>
                            Final Severity Rating: <span className="font-medium">{customerDetails.severity}</span>
                          </p>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-2">Key Metrics from {customerDetails.latestMonth}:</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <span>Net Monthly Inflow</span>
                              <span className={getValueColor(customerDetails.netMonthlyInflow)}>
                                ₹{customerDetails.netMonthlyInflow.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <span>Liquidity Ratio</span>
                              <span className={getValueColor(customerDetails.liquidityRatio - 1, false)}>
                                {customerDetails.liquidityRatio.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-2">Advanced Trend Indicators:</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <div className="flex items-center">
                                <span>Net Inflow Trend</span>
                                <TrendingUp className={`ml-1 h-4 w-4 ${
                                  customerDetails.netInflowTrend >= 0 ? "text-green-500" : "text-red-500"
                                }`} />
                              </div>
                              <span className={getValueColor(customerDetails.netInflowTrend)}>
                                {customerDetails.netInflowTrend}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <span>Max Consecutive Negative Months</span>
                              <span className={getValueColor(-customerDetails.maxConsecutiveNegativeMonths, false)}>
                                {customerDetails.maxConsecutiveNegativeMonths}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm">
                            These insights suggest that
                            {customerDetails.severity === "High" && (
                              <span className="text-red-500 font-medium"> urgent intervention is required</span>
                            )}
                            {customerDetails.severity === "Medium" && (
                              <span className="text-amber-500 font-medium"> closer monitoring is recommended</span>
                            )}
                            {customerDetails.severity === "Low" && (
                              <span className="text-green-500 font-medium"> the account is in good standing</span>
                            )}
                            . 
                            {customerDetails.netMonthlyInflow < 0 && " The negative net inflow indicates that expenses exceed income, which may impact loan repayment capabilities."}
                            {customerDetails.liquidityRatio < 1 && " The below-threshold liquidity ratio suggests potential difficulty in covering monthly expenses."}
                            {customerDetails.maxConsecutiveNegativeMonths >= 2 && " Multiple consecutive months of negative cash flow is a strong indicator of financial distress."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Banking Metrics</CardTitle>
                      <CardDescription>
                        Latest calculated metrics from financial data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="monthly">
                        <TabsList className="mb-4">
                          <TabsTrigger value="monthly">Monthly Features</TabsTrigger>
                          <TabsTrigger value="overall">Overall Metrics</TabsTrigger>
                          <TabsTrigger value="advanced">Advanced Indicators</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="monthly">
                          <div className="space-y-4">
                            {derivedMonthlyFeatures.slice(0, 4).map((metric, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                                <div>
                                  <div className="font-medium">{metric.name}</div>
                                  <div className="text-xs text-muted-foreground">Threshold: {metric.threshold}</div>
                                </div>
                                <Button variant="outline" size="sm">
                                  View History
                                </Button>
                              </div>
                            ))}
                            <Button className="w-full" variant="outline">
                              <Layers className="mr-2 h-4 w-4" />
                              View All Monthly Metrics
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="overall">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">Month‑over‑Month Net Inflow Change</div>
                                <div className="text-xs text-muted-foreground">Threshold: Decline should not exceed 10%</div>
                              </div>
                              <Button variant="outline" size="sm">
                                View History
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">Net Inflow Coefficient of Variation</div>
                                <div className="text-xs text-muted-foreground">Threshold: < 0.25 (25%)</div>
                              </div>
                              <Button variant="outline" size="sm">
                                View History
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">Maximum Consecutive Negative Months</div>
                                <div className="text-xs text-muted-foreground">Threshold: < 3 months</div>
                              </div>
                              <Button variant="outline" size="sm">
                                View History
                              </Button>
                            </div>
                            <Button className="w-full" variant="outline">
                              <Layers className="mr-2 h-4 w-4" />
                              View All Overall Metrics
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="advanced">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">Recent Net Inflow Trend</div>
                                <div className="text-xs text-muted-foreground">Comparing the average net inflow of the last 3 months with the preceding 3 months</div>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">3‑Month Moving Average of EOD Balance</div>
                                <div className="text-xs text-muted-foreground">Rolling average computed over 3 months</div>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <div>
                                <div className="font-medium">Transaction Frequency Trend</div>
                                <div className="text-xs text-muted-foreground">Deviations of ±10% or more may indicate abnormal activity</div>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                            <Button className="w-full" variant="outline">
                              <Layers className="mr-2 h-4 w-4" />
                              View All Advanced Indicators
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="py-10 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">No Customer Selected</h3>
                    <p className="text-muted-foreground mt-2">
                      Please select a customer from the list to view detailed insights.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Insights;
