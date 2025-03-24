
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from "@/components/ui/custom-card";
import ActivityItem from "./ActivityItem";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RecentActivity = () => {
  const { canTriggerNotifications, currentUser } = useUser();
  
  const handleTriggerNotification = (title: string) => {
    toast({
      title: "Notification Triggered",
      description: `${title} notification was sent to the customer`,
    });
  };
  
  // Filter activities based on user role
  const activities = [
    {
      type: "payment" as const,
      title: "Toyota Camry Payment",
      amount: "$450.00",
      date: "Aug 28, 2023",
      status: "completed" as const,
    },
    {
      type: "alert" as const,
      title: "Interest Rate Change",
      date: "Aug 25, 2023",
      message: "Honda CR-V loan rate will adjust to 4.5% on Oct 1, 2023",
    },
    {
      type: "fee" as const,
      title: "Late Fee",
      amount: "$25.00",
      date: "Aug 18, 2023",
      status: "completed" as const,
    },
    {
      type: "payment" as const,
      title: "Ford F-150 Payment",
      amount: "$550.00",
      date: "Aug 15, 2023",
      status: "completed" as const,
    },
    {
      type: "payment" as const,
      title: "Tesla Model 3 Payment",
      amount: "$620.00",
      date: "Aug 10, 2023",
      status: "failed" as const,
      message: "Insufficient funds. Please update payment method."
    },
  ];
  
  // Filter activities based on user permissions
  const filteredActivities = activities.filter(activity => {
    // Allow loan officers and admins to see all activities
    if (currentUser?.group.role === 'admin' || currentUser?.group.role === 'loanOfficer') {
      return true;
    }
    
    // Customers can only see their own completed payments and alerts
    if (currentUser?.group.role === 'customer') {
      return activity.type === 'payment' && activity.status === 'completed' || activity.type === 'alert';
    }
    
    // Dealers and agents can see everything except failed payments
    return !(activity.type === 'payment' && activity.status === 'failed');
  });
  
  return (
    <CustomCard className="animate-fade-in">
      <CustomCardHeader>
        <CustomCardTitle>Recent Activity</CustomCardTitle>
      </CustomCardHeader>
      <CustomCardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredActivities.map((activity, index) => (
            <div key={index} className="relative">
              <ActivityItem
                type={activity.type}
                title={activity.title}
                amount={activity.amount}
                date={activity.date}
                status={activity.status}
                message={activity.message}
              />
              
              {canTriggerNotifications && (
                <div className="absolute top-2 right-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0"
                    onClick={() => handleTriggerNotification(activity.title)}
                  >
                    <Bell size={14} />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CustomCardContent>
    </CustomCard>
  );
};

export default RecentActivity;
