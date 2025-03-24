
import React, { useState } from "react";
import { ChevronRight, PlusCircle, Bell, CalendarDays, CalendarClock, AlarmCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/dashboard/Navigation";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Mock data for user groups
const dummyUserGroups = [
  "Car Loan Festival",
  "Car Loan Co-lending",
  "Car Loan - High Ticket",
  "Car Loan May-Jun 2024",
  "Car Loan High Interest"
];

// Mock data for existing triggers
const existingTriggers = [
  {
    id: "trigger-1",
    name: "Missed Salary Payment",
    severity: "High",
    rule: "Monthly Income = 0 for > 2 months",
    groups: ["Car Loan Festival", "Car Loan Co-lending"],
    lastRun: "2 days ago",
    status: "Active",
    frequency: "Daily"
  },
  {
    id: "trigger-2",
    name: "Low Account Balance",
    severity: "Medium",
    rule: "Current balance < 10000",
    groups: ["Car Loan High Interest"],
    lastRun: "1 day ago",
    status: "Active",
    frequency: "Weekly"
  },
  {
    id: "trigger-3",
    name: "High Overdraft",
    severity: "High",
    rule: "Overdraft Count > 3",
    groups: ["Car Loan - High Ticket"],
    lastRun: "12 hours ago",
    status: "Active",
    frequency: "Daily"
  },
  {
    id: "trigger-4",
    name: "Severe DPD",
    severity: "High",
    rule: "DPD > 90",
    groups: ["Car Loan Festival", "Car Loan May-Jun 2024"],
    lastRun: "1 day ago",
    status: "Active",
    frequency: "Daily"
  },
  {
    id: "trigger-5",
    name: "Moderate DPD",
    severity: "Medium",
    rule: "DPD between 30 and 60",
    groups: ["Car Loan Co-lending", "Car Loan High Interest"],
    lastRun: "1 day ago",
    status: "Inactive",
    frequency: "Weekly"
  }
];

type GroupOption = {
  value: string;
  label: string;
  description: string;
};

// Default groups for the form
const defaultGroups: GroupOption[] = [
  { value: "0-30-dpd", label: "0–30 DPD", description: "Borrowers that are 0–30 days in default" },
  { value: "31-60-dpd", label: "31–60 DPD", description: "Borrowers that are 31–60 days in default" },
  { value: "61-90-dpd", label: "61–90 DPD", description: "Borrowers that are 61–90 days in default" },
  { value: "net-npa", label: "Net NPA", description: "Borrowers that are more than 90 days in default" },
];

const Triggers = () => {
  const { hasPermission } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTrigger, setNewTrigger] = useState({
    alertName: "0–30 DPD Sufficient Balance Alert",
    triggerName: "Missed Income",
    severity: "High",
    condition: "Current balance > Amount Due",
    amountDue: "0",
    plainRule: "Income not received in the past 2 months",
    currentRule: "Monthly Income = 0 for > 2 months",
    repeatFrequency: "Daily",
    dayOfWeek: "",
    dayOfMonth: "",
    notificationMethods: ["Email"],
    selectedGroups: ["Car Loan Festival", "Car Loan Co-lending"],
    selectedDefaultGroup: "",
    customGroupName: "",
    customGroupDescription: ""
  });

  const [tab, setTab] = useState("active");

  const handleCreateTrigger = () => {
    toast.success("New trigger created successfully!");
    setDialogOpen(false);
  };

  if (!hasPermission("create_triggers")) {
    return (
      <div className="h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>
                  You don't have permission to create triggers.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const activeTriggersCount = existingTriggers.filter(t => t.status === "Active").length;
  const inactiveTriggersCount = existingTriggers.filter(t => t.status === "Inactive").length;

  // Filter triggers based on active tab
  const displayedTriggers = existingTriggers.filter(trigger => {
    if (tab === "active") return trigger.status === "Active";
    if (tab === "inactive") return trigger.status === "Inactive";
    return true; // all
  });

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Triggers</h1>
              <p className="text-muted-foreground">
                Create and manage triggers for car loan monitoring
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Trigger
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Trigger</DialogTitle>
                  <DialogDescription>
                    Set up a new trigger for car loan monitoring
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Step 1: Trigger Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="alert-name">Alert Name</Label>
                        <Input 
                          id="alert-name" 
                          value={newTrigger.alertName} 
                          onChange={(e) => setNewTrigger({...newTrigger, alertName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trigger-name">Trigger Display Name</Label>
                        <Input 
                          id="trigger-name" 
                          value={newTrigger.triggerName} 
                          onChange={(e) => setNewTrigger({...newTrigger, triggerName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="severity">Severity</Label>
                        <Select 
                          value={newTrigger.severity} 
                          onValueChange={(value) => setNewTrigger({...newTrigger, severity: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Loan Product Types</Label>
                        <div className="border rounded-md p-2 flex items-center">
                          <Switch id="car-loan" checked />
                          <Label htmlFor="car-loan" className="ml-2">Car Loan</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Step 2: Select User Groups</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="user-groups">Select User Groups</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select groups" />
                          </SelectTrigger>
                          <SelectContent>
                            {dummyUserGroups.map(group => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newTrigger.selectedGroups.map(group => (
                          <Badge key={group} variant="secondary" className="px-3 py-1">
                            {group}
                            <button 
                              className="ml-1 text-muted-foreground hover:text-foreground"
                              onClick={() => setNewTrigger({
                                ...newTrigger, 
                                selectedGroups: newTrigger.selectedGroups.filter(g => g !== group)
                              })}
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <Label htmlFor="default-group">Choose a default group or create new</Label>
                        <Select 
                          value={newTrigger.selectedDefaultGroup}
                          onValueChange={(value) => setNewTrigger({...newTrigger, selectedDefaultGroup: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select group or create new" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="create-new">Create a new group</SelectItem>
                            {defaultGroups.map(group => (
                              <SelectItem key={group.value} value={group.value}>
                                {group.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {newTrigger.selectedDefaultGroup === "create-new" && (
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="group-name">Group Name</Label>
                            <Input 
                              id="group-name" 
                              value={newTrigger.customGroupName}
                              onChange={(e) => setNewTrigger({...newTrigger, customGroupName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="group-description">Group Description</Label>
                            <Input 
                              id="group-description"
                              value={newTrigger.customGroupDescription}
                              onChange={(e) => setNewTrigger({...newTrigger, customGroupDescription: e.target.value})}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Step 3: Alert Settings & Define Trigger Rule</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="condition">Select Condition</Label>
                        <Select 
                          value={newTrigger.condition}
                          onValueChange={(value) => setNewTrigger({...newTrigger, condition: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Current balance > Amount Due">Current balance > Amount Due</SelectItem>
                            <SelectItem value="Current balance > x% of EMI">Current balance > x% of EMI</SelectItem>
                            <SelectItem value="Custom Condition">Custom Condition</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {newTrigger.condition === "Current balance > Amount Due" && (
                        <div className="space-y-2">
                          <Label htmlFor="amount-due">Enter Amount Due</Label>
                          <Input 
                            id="amount-due"
                            type="number"
                            min="0"
                            placeholder="0.00"
                            value={newTrigger.amountDue}
                            onChange={(e) => setNewTrigger({...newTrigger, amountDue: e.target.value})}
                          />
                        </div>
                      )}
                      
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="plain-rule">Define Trigger Rule (Plain English)</Label>
                        <Input 
                          id="plain-rule"
                          placeholder="e.g., Income not received in the past 2 months"
                          value={newTrigger.plainRule}
                          onChange={(e) => setNewTrigger({...newTrigger, plainRule: e.target.value})}
                        />
                      </div>
                      
                      <div className="col-span-2">
                        <div className="p-3 bg-muted rounded-md">
                          <div className="text-sm font-medium">Current Rule:</div>
                          <div className="mt-1">{newTrigger.currentRule}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Step 4: Scheduling & Notifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Repeat Frequency</Label>
                        <Select 
                          value={newTrigger.repeatFrequency}
                          onValueChange={(value) => setNewTrigger({...newTrigger, repeatFrequency: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Daily">Daily</SelectItem>
                            <SelectItem value="Weekly">Weekly</SelectItem>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {newTrigger.repeatFrequency === "Weekly" && (
                        <div className="space-y-2">
                          <Label>Select day of week</Label>
                          <div className="flex gap-2">
                            {["M", "T", "W", "Th", "F", "Sa", "Su"].map(day => (
                              <Button 
                                key={day}
                                type="button"
                                variant={newTrigger.dayOfWeek === day ? "default" : "outline"}
                                className="w-9 h-9 p-0"
                                onClick={() => setNewTrigger({...newTrigger, dayOfWeek: day})}
                              >
                                {day}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {newTrigger.repeatFrequency === "Monthly" && (
                        <div className="space-y-2">
                          <Label htmlFor="day-of-month">Select day of month</Label>
                          <Select
                            value={newTrigger.dayOfMonth}
                            onValueChange={(value) => setNewTrigger({...newTrigger, dayOfMonth: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div className="col-span-2 space-y-2">
                        <Label>Notification Methods</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="email-notification" 
                              checked={newTrigger.notificationMethods.includes("Email")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewTrigger({
                                    ...newTrigger, 
                                    notificationMethods: [...newTrigger.notificationMethods, "Email"]
                                  });
                                } else {
                                  setNewTrigger({
                                    ...newTrigger, 
                                    notificationMethods: newTrigger.notificationMethods.filter(m => m !== "Email")
                                  });
                                }
                              }}
                            />
                            <Label htmlFor="email-notification">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="callback-notification"
                              checked={newTrigger.notificationMethods.includes("Callback")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewTrigger({
                                    ...newTrigger, 
                                    notificationMethods: [...newTrigger.notificationMethods, "Callback"]
                                  });
                                } else {
                                  setNewTrigger({
                                    ...newTrigger, 
                                    notificationMethods: newTrigger.notificationMethods.filter(m => m !== "Callback")
                                  });
                                }
                              }}
                            />
                            <Label htmlFor="callback-notification">Callback</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="inapp-notification"
                              checked={newTrigger.notificationMethods.includes("In-App")}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setNewTrigger({
                                    ...newTrigger, 
                                    notificationMethods: [...newTrigger.notificationMethods, "In-App"]
                                  });
                                } else {
                                  setNewTrigger({
                                    ...newTrigger, 
                                    notificationMethods: newTrigger.notificationMethods.filter(m => m !== "In-App")
                                  });
                                }
                              }}
                            />
                            <Label htmlFor="inapp-notification">In-App</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Step 5: Upload Borrower Data (Optional)</h3>
                    <Input type="file" />
                    <p className="text-sm text-muted-foreground">
                      Accepted file formats: CSV, XLSX. Maximum size: 10MB.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTrigger}>
                    Create Trigger
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="active" value={tab} onValueChange={setTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="active" className="flex items-center">
                <AlarmCheck className="mr-2 h-4 w-4" />
                Active ({activeTriggersCount})
              </TabsTrigger>
              <TabsTrigger value="inactive">
                <Bell className="mr-2 h-4 w-4" />
                Inactive ({inactiveTriggersCount})
              </TabsTrigger>
              <TabsTrigger value="all">
                <CalendarClock className="mr-2 h-4 w-4" />
                All ({existingTriggers.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={tab} className="mt-6">
              <div className="space-y-4">
                {displayedTriggers.map(trigger => (
                  <Card key={trigger.id}>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          {trigger.name}
                          <Badge 
                            variant={
                              trigger.severity === "High" ? "destructive" : 
                              trigger.severity === "Medium" ? "default" : "outline"
                            }
                            className="ml-2"
                          >
                            {trigger.severity}
                          </Badge>
                        </CardTitle>
                        <Badge variant={trigger.status === "Active" ? "default" : "secondary"}>
                          {trigger.status}
                        </Badge>
                      </div>
                      <CardDescription>{trigger.rule}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-1">Frequency</div>
                          <div className="flex items-center text-sm">
                            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                            {trigger.frequency}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1">Last Run</div>
                          <div className="text-sm">{trigger.lastRun}</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm font-medium mb-1">User Groups</div>
                        <div className="flex flex-wrap gap-2">
                          {trigger.groups.map(group => (
                            <Badge key={group} variant="outline">
                              {group}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-4 flex justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={trigger.status === "Active" ? "text-destructive" : "text-primary"}
                        >
                          {trigger.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        Run Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Triggers;
