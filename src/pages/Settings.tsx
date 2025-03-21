
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  CreditCard, 
  Mail, 
  Shield, 
  User, 
  Lock,
  Smartphone 
} from "lucide-react";

const Settings = () => {
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
            <h2 className="text-2xl font-semibold">Settings</h2>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full max-w-md mb-6">
                <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
                <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
                <TabsTrigger value="payment" className="flex-1">Payment</TabsTrigger>
                <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <CustomCard>
                  <CustomCardHeader>
                    <CustomCardTitle>Personal Information</CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User size={32} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">Alex Kim</h3>
                          <p className="text-sm text-muted-foreground">Premium Plan</p>
                          <Button variant="link" className="h-8 px-0 text-sm text-primary">
                            Change Profile Picture
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Alex" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Kim" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="alex.kim@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue="(555) 123-4567" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue="123 Main Street, Apt 4B" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="New York" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input id="zipCode" defaultValue="10001" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <CustomCard>
                  <CustomCardHeader>
                    <CustomCardTitle>Notifications</CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail size={16} className="text-muted-foreground" />
                              <Label htmlFor="payment-email">Payment Reminders</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">Receive email notifications about upcoming payments</p>
                          </div>
                          <Switch id="payment-email" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail size={16} className="text-muted-foreground" />
                              <Label htmlFor="statement-email">Monthly Statements</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">Receive monthly loan statements via email</p>
                          </div>
                          <Switch id="statement-email" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail size={16} className="text-muted-foreground" />
                              <Label htmlFor="marketing-email">Marketing Updates</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">Receive special offers and updates</p>
                          </div>
                          <Switch id="marketing-email" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Push Notifications</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Bell size={16} className="text-muted-foreground" />
                              <Label htmlFor="payment-push">Payment Alerts</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">Receive notifications for successful and failed payments</p>
                          </div>
                          <Switch id="payment-push" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Bell size={16} className="text-muted-foreground" />
                              <Label htmlFor="reminder-push">Payment Reminders</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">Receive payment due date reminders</p>
                          </div>
                          <Switch id="reminder-push" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Bell size={16} className="text-muted-foreground" />
                              <Label htmlFor="rate-push">Rate Change Alerts</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">Get notified when there are changes to your interest rates</p>
                          </div>
                          <Switch id="rate-push" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Preferences</Button>
                      </div>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-6">
                <CustomCard>
                  <CustomCardHeader>
                    <CustomCardTitle>Payment Methods</CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Saved Payment Methods</h3>
                        
                        <div className="border rounded-lg overflow-hidden">
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
                                <CreditCard size={20} />
                              </div>
                              <div>
                                <p className="font-medium">Visa ending in 4532</p>
                                <p className="text-sm text-muted-foreground">Expires 05/2025</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                Remove
                              </Button>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                                  <path d="m4 9 16-4" />
                                  <path d="M4 13h8" />
                                  <path d="M12 19h8" />
                                  <path d="M20 13h-8" />
                                  <path d="M4 17h4" />
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium">Bank Account ending in 7890</p>
                                <p className="text-sm text-muted-foreground">National Bank</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <CreditCard size={16} className="mr-2" />
                          Add New Payment Method
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Autopay Settings</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label htmlFor="autopay" className="text-base">Enable Autopay</Label>
                            <p className="text-sm text-muted-foreground">Automatically pay your bills on the due date</p>
                          </div>
                          <Switch id="autopay" defaultChecked />
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="defaultMethod">Default Payment Method</Label>
                            <select id="defaultMethod" className="w-full rounded-md border border-input px-3 py-2 bg-transparent">
                              <option value="card">Visa ending in 4532</option>
                              <option value="bank">Bank Account ending in 7890</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="paymentDate">Payment Date Preference</Label>
                            <select id="paymentDate" className="w-full rounded-md border border-input px-3 py-2 bg-transparent">
                              <option value="dueDate">On Due Date</option>
                              <option value="before5">5 Days Before Due Date</option>
                              <option value="before3">3 Days Before Due Date</option>
                              <option value="before1">1 Day Before Due Date</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Payment Settings</Button>
                      </div>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <CustomCard>
                  <CustomCardHeader>
                    <CustomCardTitle>Security Settings</CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Password</h3>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div className="md:col-span-2 h-0" />
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                        </div>
                        
                        <Button className="mt-2">
                          <Lock size={16} className="mr-2" />
                          Update Password
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Smartphone size={16} className="text-muted-foreground" />
                              <Label htmlFor="twoFactor" className="text-base">Enable Two-Factor Authentication</Label>
                            </div>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Switch id="twoFactor" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Session Management</h3>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Current Session</p>
                              <p className="text-sm text-muted-foreground">Started on Aug 28, 2023 at 10:45 AM</p>
                              <p className="text-xs text-muted-foreground mt-1">MacBook Pro • San Francisco, CA • Chrome Browser</p>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                          <Shield size={16} className="mr-2" />
                          Log Out Of All Devices
                        </Button>
                      </div>
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

export default Settings;
