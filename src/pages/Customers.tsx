
import { useState } from 'react';
import { 
  AlertTriangle,
  FileDown,
  Filter,
  X,
  Search,
  UserCog,
  Phone,
  Mail,
  RefreshCw,
  CircleCheck,
  Clock,
  CircleX
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/dashboard/Navigation';
import { useUser } from '@/contexts/UserContext';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

// Mock data for borrowers
const customerData = [
  {
    id: "BRW-1001",
    name: "Rahul Sharma",
    loanAmount: 750000,
    emi: 15600,
    balance: 8500,
    installmentDate: "2023-05-15",
    dpd: 95,
    severity: "High",
    actions: [],
    triggers: ["Severe_DPD_Trigger", "Low_Account_Balance_Trigger"]
  },
  {
    id: "BRW-1002",
    name: "Priya Patel",
    loanAmount: 550000,
    emi: 12800,
    balance: 18000,
    installmentDate: "2023-05-10",
    dpd: 45,
    severity: "Medium",
    actions: [],
    triggers: ["Moderate_DPD_Trigger"]
  },
  {
    id: "BRW-1003",
    name: "Vikram Singh",
    loanAmount: 950000,
    emi: 21500,
    balance: 5000,
    installmentDate: "2023-05-05",
    dpd: 0,
    severity: "Low",
    actions: [],
    triggers: ["Low_Account_Balance_Trigger"]
  },
  {
    id: "BRW-1004",
    name: "Ananya Desai",
    loanAmount: 600000,
    emi: 14200,
    balance: 22000,
    installmentDate: "2023-05-20",
    dpd: 10,
    severity: "Low",
    actions: [],
    triggers: ["Minor_DPD_Trigger"]
  },
  {
    id: "BRW-1005",
    name: "Kiran Reddy",
    loanAmount: 825000,
    emi: 18900,
    balance: 3000,
    installmentDate: "2023-05-12",
    dpd: 75,
    severity: "Medium",
    actions: [],
    triggers: ["Moderate_DPD_Trigger", "Low_Account_Balance_Trigger"]
  },
  {
    id: "BRW-1006",
    name: "Arjun Nair",
    loanAmount: 700000,
    emi: 15800,
    balance: 0,
    installmentDate: "2023-05-08",
    dpd: 110,
    severity: "High",
    actions: [],
    triggers: ["Severe_DPD_Trigger", "Missed_Salary_Trigger"]
  }
];

const Customers = () => {
  const { hasPermission } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [customers, setCustomers] = useState(customerData);
  
  // Filter by search term and severity
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      searchTerm === '' || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = 
      severityFilter === 'All' || 
      customer.severity === severityFilter;
    
    return matchesSearch && matchesSeverity;
  });

  const handleAction = (customerId: string, action: string) => {
    setCustomers(prev => prev.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          actions: [...customer.actions, action]
        };
      }
      return customer;
    }));

    toast.success(`${action} action set for customer ${customerId}`);
  };

  const exportCustomers = () => {
    toast.success("Customer data exported successfully");
  };

  if (!hasPermission('view_customers')) {
    return (
      <div className="h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>
                  You don't have permission to view customer information.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {severity}</Badge>;
      case 'Medium':
        return <Badge variant="default" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {severity}</Badge>;
      case 'Low':
        return <Badge variant="outline" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {severity}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'Approved':
        return <Badge variant="success" className="flex items-center gap-1"><CircleCheck className="h-3 w-3" /> Approved</Badge>;
      case 'Pending':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'Rejected':
        return <Badge variant="destructive" className="flex items-center gap-1"><CircleX className="h-3 w-3" /> Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
              <p className="text-muted-foreground">
                View and manage car loan borrowers
              </p>
            </div>
            <Button variant="outline" onClick={exportCustomers}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  High Severity Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {customers.filter(c => c.severity === 'High').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Medium Severity Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {customers.filter(c => c.severity === 'Medium').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Severity Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {customers.filter(c => c.severity === 'Low').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={severityFilter}
                  onValueChange={setSeverityFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Severities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSeverityFilter('All')}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Loan Amount</TableHead>
                      <TableHead className="hidden md:table-cell">EMI</TableHead>
                      <TableHead>DPD</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center h-24">
                          No customers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.id}</TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell className="hidden md:table-cell">₹{customer.loanAmount.toLocaleString()}</TableCell>
                          <TableCell className="hidden md:table-cell">₹{customer.emi.toLocaleString()}</TableCell>
                          <TableCell>{customer.dpd}</TableCell>
                          <TableCell>{getSeverityBadge(customer.severity)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Select
                                onValueChange={(value) => handleAction(customer.id, value)}
                              >
                                <SelectTrigger className="w-32 h-8">
                                  <SelectValue placeholder="Action" />
                                </SelectTrigger>
                                <SelectContent align="end">
                                  <SelectItem value="Approved">Approve</SelectItem>
                                  <SelectItem value="Pending">Pending</SelectItem>
                                  <SelectItem value="Rejected">Reject</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <UserCog className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:flex">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:flex">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customers;
