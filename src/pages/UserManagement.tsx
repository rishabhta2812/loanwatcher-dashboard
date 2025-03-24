
import { useState } from "react";
import { ChevronRight, ListFilter, PlusCircle, Users, UserPlus, Shield, CircleCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/dashboard/Navigation";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { USER_GROUPS } from "@/types/userGroups";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "sonner";

const UserManagement = () => {
  const { hasPermission } = useUser();
  const [newUserGroup, setNewUserGroup] = useState({
    name: "",
    id: "",
    description: "",
    permissions: [] as string[],
    canTriggerNotifications: false,
    canApproveLoans: false,
    canModifyLoanTerms: false,
    canViewCustomerData: false,
    canContactCustomers: false,
    role: ""
  });
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("groups");

  if (!hasPermission("manage_users")) {
    return (
      <div className="h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Access Denied</CardTitle>
                <CardDescription>
                  You don't have permission to access the User Management section.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const handleCreateUserGroup = () => {
    // Generate ID if not provided
    if (!newUserGroup.id) {
      const generatedId = newUserGroup.name.toLowerCase().replace(/\s+/g, '_');
      setNewUserGroup({...newUserGroup, id: generatedId});
    }
    
    // Generate role if not provided
    if (!newUserGroup.role) {
      const generatedRole = newUserGroup.name.toLowerCase().replace(/\s+/g, '');
      setNewUserGroup({...newUserGroup, role: generatedRole});
    }
    
    toast.success("User group created successfully!");
    setOpen(false);
    setNewUserGroup({
      name: "",
      id: "",
      description: "",
      permissions: [],
      canTriggerNotifications: false,
      canApproveLoans: false,
      canModifyLoanTerms: false,
      canViewCustomerData: false,
      canContactCustomers: false,
      role: ""
    });
  };

  const availablePermissions = [
    { id: "view_dashboard", description: "Access to view the main dashboard" },
    { id: "manage_users", description: "Create and modify user groups" },
    { id: "create_triggers", description: "Create and manage triggers" },
    { id: "view_customers", description: "Access to customer information" },
    { id: "approve_loans", description: "Approve or reject loan applications" },
    { id: "modify_loan_terms", description: "Modify terms for existing loans" },
    { id: "manage_settings", description: "Modify system settings" },
    { id: "delete_data", description: "Delete customer and loan data" },
    { id: "export_data", description: "Export data reports" },
    { id: "view_reports", description: "View detailed analytics reports" }
  ];

  return (
    <div className="h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground">
                Manage users and user groups for the loan monitoring system
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User Group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New User Group</DialogTitle>
                  <DialogDescription>
                    Add a new user group with specific permissions for the car loan monitoring system.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="group-name" className="text-sm font-medium">
                        Group Name *
                      </label>
                      <Input
                        id="group-name"
                        placeholder="e.g., Senior Loan Manager"
                        value={newUserGroup.name}
                        onChange={(e) => setNewUserGroup({...newUserGroup, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="group-id" className="text-sm font-medium">
                        Group ID (optional)
                      </label>
                      <Input
                        id="group-id"
                        placeholder="e.g., senior_loan_manager"
                        value={newUserGroup.id}
                        onChange={(e) => setNewUserGroup({...newUserGroup, id: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">If left blank, an ID will be generated from the name.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="group-description" className="text-sm font-medium">
                      Description *
                    </label>
                    <Textarea
                      id="group-description"
                      placeholder="Describe the purpose and responsibilities of this user group"
                      className="min-h-[80px]"
                      value={newUserGroup.description}
                      onChange={(e) => setNewUserGroup({...newUserGroup, description: e.target.value})}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Group Capabilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="trigger-notifications" 
                          checked={newUserGroup.canTriggerNotifications}
                          onCheckedChange={(checked) => 
                            setNewUserGroup({...newUserGroup, canTriggerNotifications: checked as boolean})
                          }
                        />
                        <label htmlFor="trigger-notifications" className="text-sm">
                          Can trigger notifications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="approve-loans" 
                          checked={newUserGroup.canApproveLoans}
                          onCheckedChange={(checked) => 
                            setNewUserGroup({...newUserGroup, canApproveLoans: checked as boolean})
                          }
                        />
                        <label htmlFor="approve-loans" className="text-sm">
                          Can approve loans
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="modify-terms" 
                          checked={newUserGroup.canModifyLoanTerms}
                          onCheckedChange={(checked) => 
                            setNewUserGroup({...newUserGroup, canModifyLoanTerms: checked as boolean})
                          }
                        />
                        <label htmlFor="modify-terms" className="text-sm">
                          Can modify loan terms
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="view-customer-data" 
                          checked={newUserGroup.canViewCustomerData}
                          onCheckedChange={(checked) => 
                            setNewUserGroup({...newUserGroup, canViewCustomerData: checked as boolean})
                          }
                        />
                        <label htmlFor="view-customer-data" className="text-sm">
                          Can view customer data
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="contact-customers" 
                          checked={newUserGroup.canContactCustomers}
                          onCheckedChange={(checked) => 
                            setNewUserGroup({...newUserGroup, canContactCustomers: checked as boolean})
                          }
                        />
                        <label htmlFor="contact-customers" className="text-sm">
                          Can contact customers
                        </label>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Permissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availablePermissions.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={perm.id}
                            checked={newUserGroup.permissions.includes(perm.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewUserGroup({
                                  ...newUserGroup, 
                                  permissions: [...newUserGroup.permissions, perm.id]
                                });
                              } else {
                                setNewUserGroup({
                                  ...newUserGroup, 
                                  permissions: newUserGroup.permissions.filter(p => p !== perm.id)
                                });
                              }
                            }}
                          />
                          <div>
                            <label htmlFor={perm.id} className="text-sm font-medium">
                              {perm.id.replace(/_/g, " ")}
                            </label>
                            <p className="text-xs text-muted-foreground">{perm.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateUserGroup} disabled={!newUserGroup.name || !newUserGroup.description}>
                    Create Group
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="groups" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="groups" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                User Groups
              </TabsTrigger>
              <TabsTrigger value="permissions">
                <Shield className="mr-2 h-4 w-4" />
                Permissions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="groups" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {USER_GROUPS.map((group) => (
                  <Card key={group.id}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {group.name}
                        <Badge variant={group.id === "admin" ? "destructive" : "outline"}>
                          {group.id}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-4">
                      <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.permissions.map((permission) => (
                          <Badge variant="secondary" key={permission}>
                            {permission}
                          </Badge>
                        ))}
                      </div>
                      
                      <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          {group.canTriggerNotifications ? 
                            <CircleCheck className="h-4 w-4 text-green-500" /> : 
                            <Clock className="h-4 w-4 text-gray-400" />
                          }
                          Trigger notifications
                        </div>
                        <div className="flex items-center gap-1">
                          {group.canApproveLoans ? 
                            <CircleCheck className="h-4 w-4 text-green-500" /> : 
                            <Clock className="h-4 w-4 text-gray-400" />
                          }
                          Approve loans
                        </div>
                        <div className="flex items-center gap-1">
                          {group.canModifyLoanTerms ? 
                            <CircleCheck className="h-4 w-4 text-green-500" /> : 
                            <Clock className="h-4 w-4 text-gray-400" />
                          }
                          Modify loan terms
                        </div>
                        <div className="flex items-center gap-1">
                          {group.canViewCustomerData ? 
                            <CircleCheck className="h-4 w-4 text-green-500" /> : 
                            <Clock className="h-4 w-4 text-gray-400" />
                          }
                          View customer data
                        </div>
                        <div className="flex items-center gap-1">
                          {group.canContactCustomers ? 
                            <CircleCheck className="h-4 w-4 text-green-500" /> : 
                            <Clock className="h-4 w-4 text-gray-400" />
                          }
                          Contact customers
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="permissions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Permissions</CardTitle>
                  <CardDescription>
                    List of all available permissions in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-3 gap-4 p-4 font-medium">
                        <div>Permission</div>
                        <div>Description</div>
                        <div>Used By</div>
                      </div>
                      <Separator />
                      {availablePermissions.map((perm, idx) => (
                        <div key={perm.id} className="grid grid-cols-3 gap-4 p-4 items-center">
                          <div className="font-medium">{perm.id}</div>
                          <div className="text-sm text-muted-foreground">{perm.description}</div>
                          <div className="flex gap-2">
                            {USER_GROUPS.filter(g => g.permissions.includes(perm.id)).map(g => (
                              <Badge key={g.id} variant="outline">{g.id}</Badge>
                            ))}
                          </div>
                          {idx < availablePermissions.length - 1 && <Separator className="col-span-3" />}
                        </div>
                      ))}
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

export default UserManagement;
