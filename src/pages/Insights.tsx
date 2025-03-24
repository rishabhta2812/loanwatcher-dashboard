
import { useState } from "react";
import { LineChart, BarChart, AreaChart, Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/dashboard/Navigation";
import { CalendarRange, PieChart, BarChart3, BarChart2, Download, Clock, RefreshCw, FileText, Send } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock data for charts
const triggerData = [
  { date: "Jan", high: 40, medium: 24, low: 18 },
  { date: "Feb", high: 30, medium: 20, low: 22 },
  { date: "Mar", high: 35, medium: 25, low: 20 },
  { date: "Apr", high: 45, medium: 30, low: 15 },
  { date: "May", high: 38, medium: 28, low: 24 },
  { date: "Jun", high: 52, medium: 32, low: 18 },
];

const dpdTrendData = [
  { date: "Jan", "0-30 DPD": 120, "31-60 DPD": 85, "61-90 DPD": 42, ">90 DPD": 23 },
  { date: "Feb", "0-30 DPD": 135, "31-60 DPD": 80, "61-90 DPD": 40, ">90 DPD": 25 },
  { date: "Mar", "0-30 DPD": 128, "31-60 DPD": 75, "61-90 DPD": 38, ">90 DPD": 22 },
  { date: "Apr", "0-30 DPD": 142, "31-60 DPD": 82, "61-90 DPD": 45, ">90 DPD": 28 },
  { date: "May", "0-30 DPD": 138, "31-60 DPD": 90, "61-90 DPD": 48, ">90 DPD": 32 },
  { date: "Jun", "0-30 DPD": 150, "31-60 DPD": 88, "61-90 DPD": 44, ">90 DPD": 30 },
];

const actionData = [
  { date: "Jan", approved: 45, pending: 30, rejected: 15 },
  { date: "Feb", approved: 38, pending: 35, rejected: 12 },
  { date: "Mar", approved: 42, pending: 28, rejected: 18 },
  { date: "Apr", approved: 50, pending: 25, rejected: 20 },
  { date: "May", approved: 48, pending: 30, rejected: 22 },
  { date: "Jun", approved: 55, pending: 28, rejected: 25 },
];

// Sample predefined questions 
const predefinedQuestions = [
  "What are the top 10 borrowers most likely to default?",
  "How many high severity triggers were triggered last month?",
  "What is the trend of DPD for the last 6 months?",
  "What recommendations do you have for borrowers with 60+ DPD?",
  "Which user group has the highest number of severe DPD cases?",
  "How effective have our intervention actions been for medium severity cases?"
];

const chatMessages = [
  {
    role: "assistant",
    content: "Hello! I'm your Car Loan Monitoring assistant. How can I help you analyze your loan data today?"
  }
];

const Insights = () => {
  const { hasPermission } = useUser();
  const [activeTab, setActiveTab] = useState("summary");
  const [chatHistory, setChatHistory] = useState(chatMessages);
  const [userMessage, setUserMessage] = useState("");

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: userMessage }]);
    
    // Simulate AI response based on the question
    setTimeout(() => {
      let response = "";
      
      if (userMessage.toLowerCase().includes("default")) {
        response = "Based on our analysis, the top 10 borrowers most likely to default are those with a combination of high DPD (90+) and multiple triggered alerts including missed salary payments and low account balance. I recommend focusing on borrowers with IDs BRW-1001, BRW-1006, and BRW-1008 as priorities.";
      } else if (userMessage.toLowerCase().includes("trigger")) {
        response = "Last month, we had 42 high severity triggers across all car loans. This is a 15% increase from the previous month, primarily driven by missed salary payments and severe DPD cases.";
      } else if (userMessage.toLowerCase().includes("dpd") || userMessage.toLowerCase().includes("trend")) {
        response = "The DPD trend over the last 6 months shows a concerning increase in the 61-90 DPD category (+12%) while the 0-30 DPD category has remained relatively stable. This suggests that more borrowers are moving into deeper delinquency stages.";
      } else {
        response = "I've analyzed the data and can provide insights on your car loan portfolio. Currently, you have 38 high severity cases, 58 medium severity cases, and 85 low severity cases. Would you like more specific information about any of these categories?";
      }
      
      setChatHistory(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
    
    setUserMessage("");
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
                  You don't have permission to access the Insights page.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const downloadReport = () => {
    toast.success("Report downloaded successfully");
  };

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Loan Insights</h1>
              <p className="text-muted-foreground">
                Analyze car loan performance and trigger patterns
              </p>
            </div>
            <Button variant="outline" onClick={downloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="summary" className="flex items-center">
                <PieChart className="mr-2 h-4 w-4" />
                Daily Summary
              </TabsTrigger>
              <TabsTrigger value="triggers" className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4" />
                Trigger Analysis
              </TabsTrigger>
              <TabsTrigger value="dpd" className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4" />
                DPD Breakdown
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Loan Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Daily Report Summary</CardTitle>
                      <CardDescription>
                        Auto-generated insights for today
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        Updated 2 hours ago
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-md space-y-2">
                    <p className="font-medium">Car Loan Monitoring Daily Summary:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Total active car loans: 538 (↑2% from last week)</li>
                      <li>High severity alerts: 38 (↑15% from yesterday)</li>
                      <li>New severe DPD cases (90+): 5 borrowers moved into this category overnight</li>
                      <li>Pending actions requiring attention: 27 cases (12 high priority)</li>
                      <li>Most common trigger: "Low Account Balance" affecting 65 borrowers</li>
                    </ul>
                    <p className="text-muted-foreground text-sm mt-2">Recommended focus: Address the 5 new severe DPD cases immediately and review the 12 high priority pending actions.</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Triggers
                    </CardTitle>
                    <CardDescription>All severity levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">181</div>
                    <p className="text-xs text-muted-foreground">
                      +6% from last month
                    </p>
                    <div className="mt-4 h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={triggerData}
                          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorTriggers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="high" stroke="#8884d8" fill="url(#colorTriggers)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Action Rate
                    </CardTitle>
                    <CardDescription>Actions taken on alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">84%</div>
                    <p className="text-xs text-muted-foreground">
                      +2% from last month
                    </p>
                    <div className="mt-4 h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={actionData}
                          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                          <Line type="monotone" dataKey="approved" stroke="#4ade80" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Severe DPD Rate
                    </CardTitle>
                    <CardDescription>Loans with 90+ DPD</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5.2%</div>
                    <p className="text-xs text-muted-foreground">
                      +0.8% from last month
                    </p>
                    <div className="mt-4 h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={dpdTrendData}
                          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                          <Line type="monotone" dataKey=">90 DPD" stroke="#ef4444" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="triggers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trigger Distribution by Severity</CardTitle>
                  <CardDescription>
                    Six-month trend of triggers by severity level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={triggerData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="high" name="High Severity" fill="#ef4444" />
                        <Bar dataKey="medium" name="Medium Severity" fill="#f97316" />
                        <Bar dataKey="low" name="Low Severity" fill="#65a30d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Common Triggers</CardTitle>
                    <CardDescription>
                      Top triggers by frequency
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Low Account Balance", count: 65, percentage: 35.9, severity: "Medium" },
                        { name: "Missed Salary Payment", count: 42, percentage: 23.2, severity: "High" },
                        { name: "Moderate DPD (30-60)", count: 38, percentage: 21.0, severity: "Medium" },
                        { name: "Severe DPD (90+)", count: 25, percentage: 13.8, severity: "High" },
                        { name: "Minor Overdraft", count: 11, percentage: 6.1, severity: "Low" },
                      ].map((trigger, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{trigger.name}</p>
                            <p className="text-sm text-muted-foreground">{trigger.count} occurrences</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 text-right">
                              <div className="text-sm font-medium">{trigger.percentage}%</div>
                            </div>
                            <Badge
                              variant={
                                trigger.severity === "High" ? "destructive" : 
                                trigger.severity === "Medium" ? "default" : "outline"
                              }
                            >
                              {trigger.severity}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trigger Effectiveness</CardTitle>
                    <CardDescription>
                      Impact of triggers on loan default prevention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: "Low Account Balance", effectiveness: 62 },
                            { name: "Missed Salary", effectiveness: 78 },
                            { name: "Moderate DPD", effectiveness: 65 },
                            { name: "Severe DPD", effectiveness: 85 },
                            { name: "Minor Overdraft", effectiveness: 45 },
                          ]}
                          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip formatter={(value) => [`${value}%`, 'Effectiveness']} />
                          <Bar dataKey="effectiveness" name="Prevention Effectiveness" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Effectiveness measured by % of cases where timely action prevented further delinquency.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="dpd" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>DPD Trend Analysis</CardTitle>
                  <CardDescription>
                    Six-month trend of DPD categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={dpdTrendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="0-30 DPD" stroke="#4ade80" strokeWidth={2} />
                        <Line type="monotone" dataKey="31-60 DPD" stroke="#facc15" strokeWidth={2} />
                        <Line type="monotone" dataKey="61-90 DPD" stroke="#f97316" strokeWidth={2} />
                        <Line type="monotone" dataKey=">90 DPD" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      0-30 DPD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">150</div>
                    <div className="text-xs text-green-500 font-medium flex items-center">
                      +8%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      27.9% of portfolio
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      31-60 DPD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">88</div>
                    <div className="text-xs text-yellow-500 font-medium flex items-center">
                      -2%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      16.4% of portfolio
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      61-90 DPD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">44</div>
                    <div className="text-xs text-orange-500 font-medium flex items-center">
                      +12%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      8.2% of portfolio
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      90+ DPD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">30</div>
                    <div className="text-xs text-red-500 font-medium flex items-center">
                      +15%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      5.6% of portfolio
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Action Effectiveness by DPD Category</CardTitle>
                  <CardDescription>
                    Breakdown of action outcomes by DPD category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "0-30 DPD", improved: 78, unchanged: 15, worsened: 7 },
                          { name: "31-60 DPD", improved: 65, unchanged: 20, worsened: 15 },
                          { name: "61-90 DPD", improved: 45, unchanged: 30, worsened: 25 },
                          { name: "90+ DPD", improved: 35, unchanged: 40, worsened: 25 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="improved" name="Improved" stackId="a" fill="#4ade80" />
                        <Bar dataKey="unchanged" name="Unchanged" stackId="a" fill="#f97316" />
                        <Bar dataKey="worsened" name="Worsened" stackId="a" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Based on outcomes 30 days after intervention actions were taken.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="chat">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Quick Questions</CardTitle>
                    <CardDescription>
                      Frequently asked questions about your loan data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {predefinedQuestions.map((question, i) => (
                        <Button 
                          key={i} 
                          variant="outline" 
                          className="w-full justify-start text-left h-auto py-2"
                          onClick={() => {
                            setUserMessage(question);
                            setTimeout(() => {
                              handleSendMessage();
                            }, 100);
                          }}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <div className="flex justify-between items-center w-full">
                      <Button variant="outline" size="sm">
                        <CalendarRange className="mr-2 h-4 w-4" />
                        Create MIS Card
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View More Reports
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="md:col-span-2 flex flex-col">
                  <CardHeader>
                    <CardTitle>Loan Monitoring Chat</CardTitle>
                    <CardDescription>
                      Ask questions about your car loan data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-auto">
                    <div className="space-y-4">
                      {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            <Avatar className="h-8 w-8">
                              {msg.role === "user" ? (
                                <>
                                  <AvatarImage src="/placeholder.svg" />
                                  <AvatarFallback>U</AvatarFallback>
                                </>
                              ) : (
                                <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
                              )}
                            </Avatar>
                            <div className={`rounded-lg px-4 py-2 max-w-[85%] ${
                              msg.role === "user" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-4 border-t mt-auto">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Ask a question about your loan data..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        rows={2}
                      />
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Insights;
