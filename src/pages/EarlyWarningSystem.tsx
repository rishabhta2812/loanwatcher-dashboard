
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Search, Filter, Download, FileUp, BarChart2 } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { derivedMonthlyFeatures, overallMetrics, advancedMetrics } from "@/data/bankingMetrics";

// Sample data for Early Warning System alerts
const alerts = [
  {
    id: 1,
    customer: "Rahul Sharma",
    customerID: "CUST-1001",
    severity: "High",
    status: "Open",
    metric: "Net Monthly Inflow",
    value: "-5,400",
    threshold: "> 0",
    date: "2023-10-15",
    details: "Customer's net inflow is negative for the past 3 consecutive months"
  },
  {
    id: 2,
    customer: "Anjali Patel",
    customerID: "CUST-1007",
    severity: "Medium",
    status: "In Review",
    metric: "Liquidity Ratio",
    value: "0.78",
    threshold: "≥ 1.0",
    date: "2023-10-14",
    details: "Liquidity ratio below threshold for 2 consecutive months"
  },
  {
    id: 3,
    customer: "Vikram Singh",
    customerID: "CUST-1015",
    severity: "Low",
    status: "Closed",
    metric: "Credit-to-Debit Ratio",
    value: "1.05",
    threshold: "> 1.1",
    date: "2023-10-10",
    details: "Credit-to-Debit ratio slightly below threshold"
  },
  {
    id: 4,
    customer: "Priya Gupta",
    customerID: "CUST-1023",
    severity: "High",
    status: "Open",
    metric: "Cash Buffer Days",
    value: "8",
    threshold: "≥ 15 days",
    date: "2023-10-16",
    details: "Customer's cash buffer significantly below threshold"
  },
  {
    id: 5,
    customer: "Rohan Verma",
    customerID: "CUST-1042",
    severity: "Medium",
    status: "In Review",
    metric: "Account Turnover Ratio",
    value: "4.7",
    threshold: "< 4",
    date: "2023-10-13",
    details: "Account turnover ratio indicates high transaction activity"
  }
];

const EarlyWarningSystem = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  
  // Filter alerts based on search and filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.customerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.metric.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || alert.status === statusFilter;
    const matchesSeverity = severityFilter === "All" || alert.severity === severityFilter;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "High": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Low": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Open": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "In Review": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Closed": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold">Early Warning System</h1>
            <p className="text-muted-foreground">Monitor loan health indicators and alerts</p>
          </div>
          
          <Tabs defaultValue="alerts">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
              <TabsTrigger value="alerts">Alerts Dashboard</TabsTrigger>
              <TabsTrigger value="metrics">Banking Metrics</TabsTrigger>
              <TabsTrigger value="reports">Analysis Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Active Alerts</CardTitle>
                      <CardDescription>
                        Early warning indicators that need attention
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search alerts..."
                          className="pl-8 w-full md:w-[250px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Select
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="All">All Statuses</SelectItem>
                              <SelectItem value="Open">Open</SelectItem>
                              <SelectItem value="In Review">In Review</SelectItem>
                              <SelectItem value="Closed">Closed</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        
                        <Select
                          value={severityFilter}
                          onValueChange={setSeverityFilter}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Severity</SelectLabel>
                              <SelectItem value="All">All Severities</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">Customer</TableHead>
                          <TableHead>Alert</TableHead>
                          <TableHead className="w-[100px]">Severity</TableHead>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead className="w-[100px]">Date</TableHead>
                          <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAlerts.map((alert) => (
                          <TableRow key={alert.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{alert.customer}</div>
                                <div className="text-xs text-muted-foreground">{alert.customerID}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{alert.metric}</div>
                                <div className="text-xs text-muted-foreground">
                                  Value: {alert.value} (Threshold: {alert.threshold})
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`${getSeverityColor(alert.severity)}`}>
                                {alert.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`${getStatusColor(alert.status)}`}>
                                {alert.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{alert.date}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredAlerts.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              No alerts found matching your filters.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Alert Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">High Severity</span>
                        <Badge variant="outline" className={getSeverityColor("High")}>
                          {alerts.filter(a => a.severity === "High").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Medium Severity</span>
                        <Badge variant="outline" className={getSeverityColor("Medium")}>
                          {alerts.filter(a => a.severity === "Medium").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Low Severity</span>
                        <Badge variant="outline" className={getSeverityColor("Low")}>
                          {alerts.filter(a => a.severity === "Low").length}
                        </Badge>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-sm">Total Alerts</span>
                          <span>{alerts.length}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Open</span>
                        <Badge variant="outline" className={getStatusColor("Open")}>
                          {alerts.filter(a => a.status === "Open").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">In Review</span>
                        <Badge variant="outline" className={getStatusColor("In Review")}>
                          {alerts.filter(a => a.status === "In Review").length}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Closed</span>
                        <Badge variant="outline" className={getStatusColor("Closed")}>
                          {alerts.filter(a => a.status === "Closed").length}
                        </Badge>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-sm">Resolution Rate</span>
                          <span>{Math.round((alerts.filter(a => a.status === "Closed").length / alerts.length) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Advanced Filters
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export Alerts
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload Custom Data
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Generate Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Banking Metrics Information</CardTitle>
                  <CardDescription>
                    Details about metrics used in the early warning system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="section-1">
                      <AccordionTrigger>Derived Monthly Features</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {derivedMonthlyFeatures.map((metric, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardHeader className="bg-muted/50 p-4">
                                <CardTitle className="text-lg">{metric.name}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-4 pt-4">
                                <div className="grid grid-cols-1 gap-2">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Formula</Label>
                                    <div className="font-mono text-sm bg-muted p-2 rounded mt-1">
                                      {metric.formula}
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Description</Label>
                                    <p className="text-sm">{metric.description}</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Threshold</Label>
                                      <p className="text-sm font-medium">{metric.threshold}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Rationale</Label>
                                      <p className="text-sm">{metric.rationale}</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="section-2">
                      <AccordionTrigger>Overall (Cross‑Month) Metrics</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {overallMetrics.map((metric, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardHeader className="bg-muted/50 p-4">
                                <CardTitle className="text-lg">{metric.name}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-4 pt-4">
                                <div className="grid grid-cols-1 gap-2">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Formula</Label>
                                    <div className="font-mono text-sm bg-muted p-2 rounded mt-1">
                                      {metric.formula}
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Description</Label>
                                    <p className="text-sm">{metric.description}</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Threshold</Label>
                                      <p className="text-sm font-medium">{metric.threshold}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Rationale</Label>
                                      <p className="text-sm">{metric.rationale}</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="section-3">
                      <AccordionTrigger>Additional Advanced Features</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {advancedMetrics.map((metric, index) => (
                            <Card key={index} className="overflow-hidden">
                              <CardHeader className="bg-muted/50 p-4">
                                <CardTitle className="text-lg">{metric.name}</CardTitle>
                              </CardHeader>
                              <CardContent className="p-4 pt-4">
                                <div className="grid grid-cols-1 gap-2">
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Formula</Label>
                                    <div className="font-mono text-sm bg-muted p-2 rounded mt-1">
                                      {metric.formula}
                                    </div>
                                  </div>
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Description</Label>
                                    <p className="text-sm">{metric.description}</p>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Threshold</Label>
                                      <p className="text-sm font-medium">{metric.threshold}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">Rationale</Label>
                                      <p className="text-sm">{metric.rationale}</p>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Reports</CardTitle>
                  <CardDescription>
                    Generate and view detailed loan monitoring reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Generate New Report</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customer-id">Customer ID</Label>
                          <Input id="customer-id" placeholder="Enter customer ID" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="report-type">Report Type</Label>
                          <Select>
                            <SelectTrigger id="report-type">
                              <SelectValue placeholder="Select report type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                              <SelectItem value="threshold">Threshold Report</SelectItem>
                              <SelectItem value="trends">Trend Analysis</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Generate Report</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-3">Recent Reports</h3>
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Report Name</TableHead>
                              <TableHead>Customer</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Oct 2023 Analysis</TableCell>
                              <TableCell>Rahul Sharma (CUST-1001)</TableCell>
                              <TableCell>2023-10-16</TableCell>
                              <TableCell>Comprehensive</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Download</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Q3 Threshold Report</TableCell>
                              <TableCell>Anjali Patel (CUST-1007)</TableCell>
                              <TableCell>2023-10-14</TableCell>
                              <TableCell>Threshold</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Download</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>6-Month Trend Analysis</TableCell>
                              <TableCell>Vikram Singh (CUST-1015)</TableCell>
                              <TableCell>2023-10-10</TableCell>
                              <TableCell>Trends</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Download</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EarlyWarningSystem;
