
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowRight, BarChart2, Download, Eye, FileUp, Filter, Search, Sliders, TrendingDown, TrendingUp } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { derivedMonthlyFeatures, overallMetrics, advancedMetrics, defaultUserGroups, severityConstants } from "@/data/bankingMetrics";

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

// Sample DPD data for severity distribution
const sampleDpdData = {
  total: 253,
  distribution: [
    { category: "0-30 DPD", count: 178, percentage: 70.4, severity: "Low" },
    { category: "31-60 DPD", count: 42, percentage: 16.6, severity: "Medium" },
    { category: "61-90 DPD", count: 18, percentage: 7.1, severity: "Medium" },
    { category: "90+ DPD", count: 15, percentage: 5.9, severity: "High" },
  ]
};

const EarlyWarningSystem = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedAlert, setSelectedAlert] = useState(null);
  
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
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case "High": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Medium": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Low": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case "Open": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "In Review": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Closed": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getProgressColorClass = (percentage) => {
    if (percentage >= 66) return "bg-red-500";
    if (percentage >= 33) return "bg-amber-500";
    return "bg-green-500";
  };

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
  };

  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Early Warning System</h1>
                <p className="text-muted-foreground">Monitor loan health indicators and alerts</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Sliders className="h-4 w-4" />
                  <span>Configure</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Create Alert</span>
                </Button>
              </div>
            </div>
            
            <Alert className="bg-blue-50 border-blue-200 mb-6">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertTitle className="text-blue-600">System Notification</AlertTitle>
              <AlertDescription className="text-blue-700">
                There are <span className="font-bold">{alerts.filter(a => a.status === "Open").length} open alerts</span> that require your attention. Review and address these alerts to maintain loan health.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-red-50 to-white border-red-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-800">High Severity</CardTitle>
                <CardDescription className="text-red-600">Critical attention required</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-red-700">
                    {alerts.filter(a => a.severity === "High").length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((alerts.filter(a => a.severity === "High").length / alerts.length) * 100)}% of total
                  </div>
                </div>
                <div className="mt-2">
                  <Progress 
                    value={(alerts.filter(a => a.severity === "High").length / alerts.length) * 100}
                    className="h-2 bg-red-100"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <div>Open: {alerts.filter(a => a.severity === "High" && a.status === "Open").length}</div>
                  <div>In Review: {alerts.filter(a => a.severity === "High" && a.status === "In Review").length}</div>
                  <div>Closed: {alerts.filter(a => a.severity === "High" && a.status === "Closed").length}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-amber-800">Medium Severity</CardTitle>
                <CardDescription className="text-amber-600">Monitoring required</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-amber-700">
                    {alerts.filter(a => a.severity === "Medium").length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((alerts.filter(a => a.severity === "Medium").length / alerts.length) * 100)}% of total
                  </div>
                </div>
                <div className="mt-2">
                  <Progress 
                    value={(alerts.filter(a => a.severity === "Medium").length / alerts.length) * 100}
                    className="h-2 bg-amber-100"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <div>Open: {alerts.filter(a => a.severity === "Medium" && a.status === "Open").length}</div>
                  <div>In Review: {alerts.filter(a => a.severity === "Medium" && a.status === "In Review").length}</div>
                  <div>Closed: {alerts.filter(a => a.severity === "Medium" && a.status === "Closed").length}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-800">Low Severity</CardTitle>
                <CardDescription className="text-green-600">Regular monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold text-green-700">
                    {alerts.filter(a => a.severity === "Low").length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.round((alerts.filter(a => a.severity === "Low").length / alerts.length) * 100)}% of total
                  </div>
                </div>
                <div className="mt-2">
                  <Progress 
                    value={(alerts.filter(a => a.severity === "Low").length / alerts.length) * 100}
                    className="h-2 bg-green-100"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <div>Open: {alerts.filter(a => a.severity === "Low" && a.status === "Open").length}</div>
                  <div>In Review: {alerts.filter(a => a.severity === "Low" && a.status === "In Review").length}</div>
                  <div>Closed: {alerts.filter(a => a.severity === "Low" && a.status === "Closed").length}</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="alerts">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
              <TabsTrigger value="alerts">Alerts Dashboard</TabsTrigger>
              <TabsTrigger value="dpd">DPD Distribution</TabsTrigger>
              <TabsTrigger value="metrics">Banking Metrics</TabsTrigger>
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
                              <Button variant="ghost" size="sm" onClick={() => handleViewAlert(alert)}>
                                <Eye className="h-4 w-4 mr-1" />
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <CardTitle className="text-lg">Warning Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Improving</span>
                        </div>
                        <span>23%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
                          <span className="text-sm">Deteriorating</span>
                        </div>
                        <span>41%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-4 w-4 mr-2 rounded-full bg-gray-200"></div>
                          <span className="text-sm">Stable</span>
                        </div>
                        <span>36%</span>
                      </div>
                      <div className="pt-2 mt-2 border-t">
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-sm">Net Change</span>
                          <span className="text-red-500">-18%</span>
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
            
            <TabsContent value="dpd" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>DPD Distribution</CardTitle>
                  <CardDescription>
                    Days Past Due customer segmentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Total monitored accounts</div>
                      <div className="text-2xl font-bold">{sampleDpdData.total}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">
                      Breakdown of loan accounts by days past due (DPD) status
                    </p>
                    
                    <div className="space-y-4">
                      {sampleDpdData.distribution.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Badge variant="outline" className={`mr-2 ${getSeverityColor(item.severity)}`}>{item.severity}</Badge>
                              <span>{item.category}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-muted-foreground">{item.count} accounts</span>
                              <span className="font-medium">{item.percentage}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getProgressColorClass(index / sampleDpdData.distribution.length * 100)}`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">DPD Thresholds</h3>
                    
                    <div className="space-y-4">
                      {Object.entries(defaultUserGroups).map(([groupName, groupInfo], index) => (
                        <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{groupName}</h4>
                            <Badge variant="outline">
                              {sampleDpdData.distribution[index]?.count || "-"} accounts
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{groupInfo.description}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <Badge variant="secondary">{groupInfo.plain_english_rule}</Badge>
                            <Badge variant="outline" className="font-mono">{groupInfo.formal_expression}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
          </Tabs>
        </div>
      </main>
      
      {/* Alert Details Dialog */}
      {selectedAlert && (
        <AlertDialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center justify-between">
                <span>Alert Details</span>
                <Badge variant="outline" className={`${getSeverityColor(selectedAlert.severity)}`}>
                  {selectedAlert.severity} Severity
                </Badge>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Detailed information about the selected alert.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
                  <p className="text-lg font-medium">{selectedAlert.customer}</p>
                  <p className="text-sm">{selectedAlert.customerID}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Alert Status</h3>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className={`${getStatusColor(selectedAlert.status)}`}>
                      {selectedAlert.status}
                    </Badge>
                    <span className="text-sm ml-2">
                      Created on {selectedAlert.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Alert Details</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Metric</p>
                        <p>{selectedAlert.metric}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Current Value</p>
                          <p>{selectedAlert.value}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Threshold</p>
                          <p>{selectedAlert.threshold}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm">{selectedAlert.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Recommended Actions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Review customer's account statements for the past 3 months</li>
                  <li>Check for any recent changes in transaction patterns</li>
                  <li>Verify if there are any pending loan applications</li>
                  <li>Contact customer for follow-up if severity is high</li>
                </ul>
              </div>
            </div>
            
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                Update Status
              </AlertDialogAction>
              <AlertDialogAction className="bg-primary">
                <span className="flex items-center">
                  View Full Report
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default EarlyWarningSystem;
