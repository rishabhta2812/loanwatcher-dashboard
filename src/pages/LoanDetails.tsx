
import { useState, useEffect } from "react";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  CustomCard, 
  CustomCardHeader, 
  CustomCardTitle, 
  CustomCardContent,
  CustomCardDescription
} from "@/components/ui/custom-card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Home, Download, FileText, Share2 } from "lucide-react";

const LoanDetails = () => {
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
  
  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Home size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Home Loan Details</h2>
                  <p className="text-sm text-muted-foreground">Loan #MOR-2023-8742</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="text-sm h-9">
                  <FileText size={16} className="mr-1" />
                  Statement
                </Button>
                <Button size="sm" variant="outline" className="text-sm h-9">
                  <Download size={16} className="mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="outline" className="text-sm h-9">
                  <Share2 size={16} className="mr-1" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <CustomCard className="animate-fade-in [animation-delay:100ms]">
                <CustomCardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Principal Amount</h3>
                  <p className="text-2xl font-bold mt-1">$320,000</p>
                </CustomCardContent>
              </CustomCard>
              
              <CustomCard className="animate-fade-in [animation-delay:150ms]">
                <CustomCardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
                  <p className="text-2xl font-bold mt-1">$245,500</p>
                </CustomCardContent>
              </CustomCard>
              
              <CustomCard className="animate-fade-in [animation-delay:200ms]">
                <CustomCardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Interest Rate</h3>
                  <p className="text-2xl font-bold mt-1">4.25%</p>
                  <p className="text-xs text-muted-foreground mt-1">Fixed for next 3 years</p>
                </CustomCardContent>
              </CustomCard>
              
              <CustomCard className="animate-fade-in [animation-delay:250ms]">
                <CustomCardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                  <p className="text-2xl font-bold mt-1">$1,850</p>
                  <p className="text-xs text-muted-foreground mt-1">Due on the 1st of each month</p>
                </CustomCardContent>
              </CustomCard>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CustomCard className="lg:col-span-2 animate-fade-in [animation-delay:300ms]">
                <CustomCardHeader>
                  <CustomCardTitle>Amortization Details</CustomCardTitle>
                  <CustomCardDescription>Breakdown of payments over the loan term</CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Term</p>
                        <p className="text-lg font-medium">30 years (360 months)</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="text-lg font-medium">June 15, 2018</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Maturity Date</p>
                        <p className="text-lg font-medium">June 15, 2048</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Loan Progress</p>
                        <p className="text-sm font-medium">25% Complete</p>
                      </div>
                      <Progress value={25} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5 years elapsed</span>
                        <span>25 years remaining</span>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead>Principal</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Ending Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">2023</TableCell>
                            <TableCell>$7,200</TableCell>
                            <TableCell>$14,450</TableCell>
                            <TableCell>$245,500</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">2024</TableCell>
                            <TableCell>$7,500</TableCell>
                            <TableCell>$14,150</TableCell>
                            <TableCell>$238,000</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">2025</TableCell>
                            <TableCell>$7,800</TableCell>
                            <TableCell>$13,850</TableCell>
                            <TableCell>$230,200</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">2026</TableCell>
                            <TableCell>$8,140</TableCell>
                            <TableCell>$13,510</TableCell>
                            <TableCell>$222,060</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">2027</TableCell>
                            <TableCell>$8,480</TableCell>
                            <TableCell>$13,170</TableCell>
                            <TableCell>$213,580</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CustomCardContent>
              </CustomCard>
              
              <CustomCard className="animate-fade-in [animation-delay:350ms]">
                <CustomCardHeader>
                  <CustomCardTitle>Loan Information</CustomCardTitle>
                </CustomCardHeader>
                <CustomCardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Loan Type</p>
                      <p className="text-sm font-medium">Conventional</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="text-sm font-medium">Single Family</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Lender</p>
                      <p className="text-sm font-medium">National Bank</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Payment Frequency</p>
                      <p className="text-sm font-medium">Monthly</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Escrow Included</p>
                      <p className="text-sm font-medium">Yes</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Insurance</p>
                      <p className="text-sm font-medium">$120/month</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <p className="text-sm text-muted-foreground">Property Taxes</p>
                      <p className="text-sm font-medium">$450/month</p>
                    </div>
                  </div>
                </CustomCardContent>
              </CustomCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanDetails;
