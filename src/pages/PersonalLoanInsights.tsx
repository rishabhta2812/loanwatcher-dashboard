
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const borrowers = [
  { id: "BRW001", name: "John Doe" },
  { id: "BRW002", name: "Jane Smith" },
  { id: "BRW003", name: "Robert Johnson" },
  { id: "BRW004", name: "Mary Williams" },
];

const sampleData = {
  borrowerInfo: {
    id: "BRW001",
    name: "John Doe",
    accountNumber: "ACC123456",
    loanType: "Car Loan",
    loanAmount: 500000,
    interestRate: "8.5%",
    tenure: "60 months"
  },
  latestMonth: "Oct-23",
  finalSeverity: "Medium",
  builtInSeverity: "Medium",
  customSeverity: "Low",
  metrics: {
    netMonthlyInflow: 25000,
    liquidityRatio: 0.8,
    creditDebitRatio: 1.2,
    expenseIncomeRatio: 0.7,
    cashBufferDays: 12
  },
  monthlyTrend: [
    { month: "May-23", netInflow: 28000 },
    { month: "Jun-23", netInflow: 26500 },
    { month: "Jul-23", netInflow: 24000 },
    { month: "Aug-23", netInflow: 25500 },
    { month: "Sep-23", netInflow: 23000 },
    { month: "Oct-23", netInflow: 25000 }
  ],
  thresholdChecks: [
    { name: "Net Monthly Inflow", value: 25000, threshold: "> 0", pass: true },
    { name: "Liquidity Ratio", value: 0.8, threshold: ">= 1.0", pass: false },
    { name: "Expense-Income Ratio", value: 0.7, threshold: "< 0.65", pass: false },
    { name: "Credit-Debit Ratio", value: 1.2, threshold: "> 1.1", pass: true },
    { name: "Cash Buffer Days", value: 12, threshold: ">= 15 days", pass: false }
  ]
};

const PersonalLoanInsights = () => {
  const isMobile = useIsMobile();
  const [selectedBorrower, setSelectedBorrower] = useState(borrowers[0].id);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleBorrowerChange = (value: string) => {
    setIsLoading(true);
    setSelectedBorrower(value);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Personal Loan Insights</h1>
              <p className="text-muted-foreground">
                Detailed insights and analysis for individual borrowers
              </p>
            </div>
            
            <div className="w-full md:w-[240px]">
              <Select
                value={selectedBorrower}
                onValueChange={handleBorrowerChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select borrower" />
                </SelectTrigger>
                <SelectContent>
                  {borrowers.map((borrower) => (
                    <SelectItem key={borrower.id} value={borrower.id}>
                      {borrower.name} ({borrower.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Borrower Summary</span>
                    <Badge className={`${getSeverityColor(sampleData.finalSeverity)} text-white`}>
                      {sampleData.finalSeverity} Risk
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Overview of borrower {sampleData.borrowerInfo.name} as of {sampleData.latestMonth}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Borrower Information</h3>
                      <dl className="grid grid-cols-2 gap-1 text-sm">
                        <dt className="text-gray-500">Account Number:</dt>
                        <dd>{sampleData.borrowerInfo.accountNumber}</dd>
                        <dt className="text-gray-500">Loan Type:</dt>
                        <dd>{sampleData.borrowerInfo.loanType}</dd>
                        <dt className="text-gray-500">Loan Amount:</dt>
                        <dd>₹{sampleData.borrowerInfo.loanAmount.toLocaleString()}</dd>
                        <dt className="text-gray-500">Interest Rate:</dt>
                        <dd>{sampleData.borrowerInfo.interestRate}</dd>
                        <dt className="text-gray-500">Tenure:</dt>
                        <dd>{sampleData.borrowerInfo.tenure}</dd>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Severity Assessment</h3>
                      <dl className="grid grid-cols-2 gap-1 text-sm">
                        <dt className="text-gray-500">Final Severity:</dt>
                        <dd>
                          <Badge className={`${getSeverityColor(sampleData.finalSeverity)} text-white`}>
                            {sampleData.finalSeverity}
                          </Badge>
                        </dd>
                        <dt className="text-gray-500">Built-in Severity:</dt>
                        <dd>
                          <Badge className={`${getSeverityColor(sampleData.builtInSeverity)} text-white`}>
                            {sampleData.builtInSeverity}
                          </Badge>
                        </dd>
                        <dt className="text-gray-500">Custom Severity:</dt>
                        <dd>
                          <Badge className={`${getSeverityColor(sampleData.customSeverity)} text-white`}>
                            {sampleData.customSeverity}
                          </Badge>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics (Latest Month)</CardTitle>
                    <CardDescription>Financial health indicators from {sampleData.latestMonth}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {sampleData.thresholdChecks.map((check, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{check.name}</p>
                            <p className="text-sm text-gray-500">Threshold: {check.threshold}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{check.value}</p>
                            <Badge variant={check.pass ? "default" : "destructive"} className="mt-1">
                              {check.pass ? "Pass" : "Fail"}
                            </Badge>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Net Inflow Trend</CardTitle>
                    <CardDescription>Monthly net inflow over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sampleData.monthlyTrend} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="netInflow" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insight Summary</CardTitle>
                  <CardDescription>Analysis and recommendations based on borrower data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-bold mb-2">Borrower Insight Report</h3>
                    
                    <p className="mb-2">
                      Borrower: {sampleData.borrowerInfo.name} (ID: {sampleData.borrowerInfo.id}).
                    </p>
                    
                    <p className="mb-2">
                      Data up to: {sampleData.latestMonth}.<br />
                      Final Severity Rating: <span className="font-bold">{sampleData.finalSeverity}</span> 
                      (Built-in: {sampleData.builtInSeverity}, Custom: {sampleData.customSeverity}).
                    </p>
                    
                    <p className="mb-2">
                      <span className="font-medium">Key Metrics from {sampleData.latestMonth}:</span><br />
                      - Net Monthly Inflow: {sampleData.metrics.netMonthlyInflow}<br />
                      - Liquidity Ratio: {sampleData.metrics.liquidityRatio}
                    </p>
                    
                    <p className="mb-2">
                      <span className="font-medium">Advanced Trend:</span> The borrower's net inflow shows a slight declining trend over the past 6 months.
                    </p>
                    
                    <p>
                      These insights suggest that further review and potential remedial actions may be required based on the severity rating.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PersonalLoanInsights;
