
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorrowerInfo } from "@/types/report";
import { Mail, Phone, Building2, Calendar, CreditCard } from "lucide-react";

interface ProfileCardProps {
  borrowerInfo: BorrowerInfo;
}

const ProfileCard = ({ borrowerInfo }: ProfileCardProps) => {
  const infoItems = [
    { icon: Phone, label: "Mobile", value: borrowerInfo.mobile },
    { icon: Mail, label: "Email", value: borrowerInfo.email },
    { icon: Building2, label: "Bank", value: borrowerInfo.bank },
    { icon: Calendar, label: "DOB", value: borrowerInfo.dob },
    { icon: CreditCard, label: "PAN", value: borrowerInfo.pan },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{borrowerInfo.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{item.label}:</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
