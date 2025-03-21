
import { useState, useEffect } from "react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardContent 
} from "@/components/ui/custom-card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Check, X, Download, CreditCard, CalendarClock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample payment data
const paymentData = [
  {
    id: "PAY-1234",
    date: "Aug 28, 2023",
    amount: "$1,850.00",
    method: "Credit Card (****4532)",
    status: "completed",
    loanType: "Mortgage",
  },
  {
    id: "PAY-1233",
    date: "Aug 15, 2023",
    amount: "$450.00",
    method: "Bank Account (****7890)",
    status: "completed",
    loanType: "Auto Loan",
  },
  {
    id: "PAY-1232",
    date: "Aug 10, 2023",
    amount: "$320.00",
    method: "Credit Card (****4532)",
    status: "failed",
    loanType: "Student Loan",
  },
  {
    id: "PAY-1231",
    date: "Jul 28, 2023",
    amount: "$1,850.00",
    method: "Bank Account (****7890)",
    status: "completed",
    loanType: "Mortgage",
  },
  {
    id: "PAY-1230",
    date: "Jul 15, 2023",
    amount: "$450.00",
    method: "Bank Account (****7890)",
    status: "completed",
    loanType: "Auto Loan",
  },
  {
    id: "PAY-1229",
    date: "Jul 10, 2023",
    amount: "$320.00",
    method: "Credit Card (****4532)",
    status: "completed",
    loanType: "Student Loan",
  },
];

// Sample upcoming payments
const upcomingPayments = [
  {
    id: "SCH-4567",
    dueDate: "Sep 1, 2023",
    amount: "$1,850.00",
    loanType: "Mortgage",
    status: "pending"
  },
  {
    id: "SCH-4568",
    dueDate: "Sep 15, 2023",
    amount: "$450.00",
    loanType: "Auto Loan",
    status: "pending"
  },
  {
    id: "SCH-4569",
    dueDate: "Sep 10, 2023",
    amount: "$320.00",
    loanType: "Student Loan",
    status: "pending"
  },
];

const Payments = () => {
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
  
  const renderStatusBadge = (status: string) => {
    if (status === "completed") {
      return (
        <div className="flex items-center gap-1">
          <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-700 dark:bg-green-900/30 dark:text-green-500">
            <Check size={12} />
          </span>
          <span>Completed</span>
        </div>
      );
    }
    
    if (status === "failed") {
      return (
        <div className="flex items-center gap-1">
          <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-red-700 dark:bg-red-900/30 dark:text-red-500">
            <X size={12} />
          </span>
          <span>Failed</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-1">
        <span className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 dark:bg-amber-900/30 dark:text-amber-500">
          <CalendarClock size={12} />
        </span>
        <span>Pending</span>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold">Payments</h2>
              
              <div className="flex gap-2">
                <Button className="h-9">
                  <CreditCard size={16} className="mr-2" />
                  Make a Payment
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="history" className="animate-fade-in">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="history">Payment History</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="mt-6">
                <CustomCard>
                  <CustomCardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CustomCardTitle>Payment History</CustomCardTitle>
                    
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="h-9 w-[130px]">
                            <Filter size={14} className="mr-2" />
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Loans</SelectItem>
                            <SelectItem value="mortgage">Mortgage</SelectItem>
                            <SelectItem value="auto">Auto Loan</SelectItem>
                            <SelectItem value="student">Student Loan</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button variant="outline" size="sm" className="h-9">
                          <Download size={14} className="mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CustomCardHeader>
                  
                  <CustomCardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Payment ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="hidden md:table-cell">Method</TableHead>
                            <TableHead className="hidden md:table-cell">Loan Type</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paymentData.map((payment) => (
                            <TableRow key={payment.id} className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <TableCell className="font-medium">{payment.id}</TableCell>
                              <TableCell>{payment.date}</TableCell>
                              <TableCell>{payment.amount}</TableCell>
                              <TableCell className="hidden md:table-cell">{payment.method}</TableCell>
                              <TableCell className="hidden md:table-cell">{payment.loanType}</TableCell>
                              <TableCell>
                                <div className={cn(
                                  "text-sm",
                                  payment.status === "completed" && "text-green-600 dark:text-green-400",
                                  payment.status === "failed" && "text-red-600 dark:text-red-400"
                                )}>
                                  {renderStatusBadge(payment.status)}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-6">
                <CustomCard>
                  <CustomCardHeader>
                    <CustomCardTitle>Upcoming Payments</CustomCardTitle>
                  </CustomCardHeader>
                  
                  <CustomCardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Schedule ID</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Loan Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {upcomingPayments.map((payment) => (
                            <TableRow key={payment.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <TableCell className="font-medium">{payment.id}</TableCell>
                              <TableCell>{payment.dueDate}</TableCell>
                              <TableCell>{payment.amount}</TableCell>
                              <TableCell>{payment.loanType}</TableCell>
                              <TableCell>
                                {renderStatusBadge(payment.status)}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  Pay Now
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payments;
