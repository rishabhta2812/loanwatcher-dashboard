
import { useState } from "react";
import { Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/dashboard/Header";
import Navigation from "@/components/dashboard/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const LoanChatbot = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Loan Monitoring Assistant. How can I help you with your loan data today?"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // Add user message
    const newUserMessage: Message = { role: "user", content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    
    // Clear input and set loading
    setUserInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput);
      const newAIMessage: Message = { role: "assistant", content: aiResponse };
      setMessages(prev => [...prev, newAIMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // Simple response generation function (placeholder for actual API call)
  const generateAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("severity")) {
      return "Based on the latest loan monitoring report, the borrower has a Medium severity rating. This is calculated using factors like net monthly inflow, liquidity ratio, and cash buffer days.";
    } else if (query.toLowerCase().includes("metrics") || query.toLowerCase().includes("features")) {
      return "Key metrics tracked include: net monthly inflow, liquidity ratio, expense-income ratio, credit-debit ratio, and cash buffer days. These metrics help determine the borrower's financial health.";
    } else if (query.toLowerCase().includes("threshold")) {
      return "Important thresholds include: Net Monthly Inflow > 0, Liquidity Ratio >= 1.0, Expense-Income Ratio < 0.65, and Cash Buffer Days >= 15 days. These are used to assess risk levels.";
    } else {
      return "I'm a professional loan monitoring assistant focused on helping you understand loan data and risk assessment. Could you provide more specific details about what information you need regarding the loan monitoring report?";
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Navigation />
      
      <main className={`flex-1 transition-all duration-300 ease-out-expo ${isMobile ? "ml-0" : "ml-64"}`}>
        <Header />
        
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Loan Chatbot</h1>
            <p className="text-muted-foreground">
              Chat with the Loan Monitoring Assistant for insights about your loan data
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <Card className="min-h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle>Loan Monitoring Assistant</CardTitle>
                  <CardDescription>
                    Ask questions about loan data, severity ratings, and report details
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto mb-4 max-h-[400px] p-2">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                          <div className="flex space-x-2 items-center">
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-150"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a question about the loan data..."
                        className="w-full"
                      />
                    </div>
                    <Button type="submit" size="icon" disabled={isLoading || !userInput.trim()}>
                      <Send size={18} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className="p-2 bg-muted/50 rounded-lg text-sm cursor-pointer hover:bg-muted"
                    onClick={() => setUserInput("What is the borrower's current severity rating?")}
                  >
                    What is the borrower's current severity rating?
                  </div>
                  <div 
                    className="p-2 bg-muted/50 rounded-lg text-sm cursor-pointer hover:bg-muted"
                    onClick={() => setUserInput("What are the key metrics being monitored?")}
                  >
                    What are the key metrics being monitored?
                  </div>
                  <div 
                    className="p-2 bg-muted/50 rounded-lg text-sm cursor-pointer hover:bg-muted"
                    onClick={() => setUserInput("What thresholds are used for severity classification?")}
                  >
                    What thresholds are used for severity classification?
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Report Context</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    The assistant has access to the loan monitoring report and can provide insights based on:
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-start font-normal py-1">Borrower Information</Badge>
                    <Badge variant="outline" className="w-full justify-start font-normal py-1">Monthly Features</Badge>
                    <Badge variant="outline" className="w-full justify-start font-normal py-1">Overall Metrics</Badge>
                    <Badge variant="outline" className="w-full justify-start font-normal py-1">Advanced Features</Badge>
                    <Badge variant="outline" className="w-full justify-start font-normal py-1">Severity Classifications</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoanChatbot;
