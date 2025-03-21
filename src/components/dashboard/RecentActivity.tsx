
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from "@/components/ui/custom-card";
import ActivityItem from "./ActivityItem";

const RecentActivity = () => {
  const activities = [
    {
      type: "payment" as const,
      title: "Mortgage Payment",
      amount: "$1,850.00",
      date: "Aug 28, 2023",
      status: "completed" as const,
    },
    {
      type: "alert" as const,
      title: "Interest Rate Change",
      date: "Aug 25, 2023",
      message: "Your mortgage rate will adjust to 4.25% on Oct 1, 2023",
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
      title: "Car Loan Payment",
      amount: "$450.00",
      date: "Aug 15, 2023",
      status: "completed" as const,
    },
    {
      type: "payment" as const,
      title: "Student Loan Payment",
      amount: "$320.00",
      date: "Aug 10, 2023",
      status: "failed" as const,
      message: "Insufficient funds. Please update payment method."
    },
  ];
  
  return (
    <CustomCard className="animate-fade-in">
      <CustomCardHeader>
        <CustomCardTitle>Recent Activity</CustomCardTitle>
      </CustomCardHeader>
      <CustomCardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              type={activity.type}
              title={activity.title}
              amount={activity.amount}
              date={activity.date}
              status={activity.status}
              message={activity.message}
            />
          ))}
        </div>
      </CustomCardContent>
    </CustomCard>
  );
};

export default RecentActivity;
