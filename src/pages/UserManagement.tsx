
import { useState } from "react";
import { ChevronRight, ListFilter, PlusCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/dashboard/Navigation";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { USER_GROUPS } from "@/types/userGroups";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    description: "",
    permissions: [] as string[]
  });
  const [open, setOpen] = useState(false);

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
    toast.success("User group created successfully!");
    setOpen(false);
    setNewUserGroup({
      name: "",
      description: "",
      permissions: []
    });
  };

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
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create User Group
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New User Group</DialogTitle>
                  <DialogDescription>
                    Add a new user group with specific permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="group-name" className="text-right">
                      Group Name
                    </label>
                    <Input
                      id="group-name"
                      className="col-span-3"
                      value={newUserGroup.name}
                      onChange={(e) => setNewUserGroup({...newUserGroup, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="group-description" className="text-right">
                      Description
                    </label>
                    <Input
                      id="group-description"
                      className="col-span-3"
                      value={newUserGroup.description}
                      onChange={(e) => setNewUserGroup({...newUserGroup, description: e.target.value})}
                    />
                  </div>
                  <div className="col-span-4">
                    <h4 className="mb-2 font-medium">Permissions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {["view_dashboard", "manage_users", "create_triggers", "view_customers", "approve_loans", "modify_loan_terms"].map((perm) => (
                        <div key={perm} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={perm}
                            checked={newUserGroup.permissions.includes(perm)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewUserGroup({...newUserGroup, permissions: [...newUserGroup.permissions, perm]});
                              } else {
                                setNewUserGroup({
                                  ...newUserGroup, 
                                  permissions: newUserGroup.permissions.filter(p => p !== perm)
                                });
                              }
                            }}
                          />
                          <label htmlFor={perm} className="text-sm">{perm.replace(/_/g, " ")}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateUserGroup}>
                    Create Group
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="groups" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="groups" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                User Groups
              </TabsTrigger>
              <TabsTrigger value="permissions">
                <ListFilter className="mr-2 h-4 w-4" />
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
                      <div className="flex flex-wrap gap-2">
                        {group.permissions.map((permission) => (
                          <Badge variant="secondary" key={permission}>
                            {permission}
                          </Badge>
                        ))}
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
                      {[
                        {name: "view_dashboard", desc: "Access to view the main dashboard"},
                        {name: "manage_users", desc: "Create and modify user groups"},
                        {name: "create_triggers", desc: "Create and manage triggers"},
                        {name: "view_customers", desc: "Access to customer information"},
                        {name: "approve_loans", desc: "Approve or reject loan applications"},
                        {name: "modify_loan_terms", desc: "Modify terms for existing loans"},
                      ].map((perm, idx) => (
                        <div key={perm.name} className="grid grid-cols-3 gap-4 p-4 items-center">
                          <div className="font-medium">{perm.name}</div>
                          <div className="text-sm text-muted-foreground">{perm.desc}</div>
                          <div className="flex gap-2">
                            {USER_GROUPS.filter(g => g.permissions.includes(perm.name)).map(g => (
                              <Badge key={g.id} variant="outline">{g.id}</Badge>
                            ))}
                          </div>
                          {idx < 5 && <Separator className="col-span-3" />}
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
