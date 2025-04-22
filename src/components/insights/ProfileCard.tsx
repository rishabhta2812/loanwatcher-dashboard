
import { BorrowerInfo } from "@/types/report";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ProfileCardProps {
  data: BorrowerInfo;
}

const ProfileCard = ({ data }: ProfileCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrower Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <div className="text-lg font-medium">{data.name}</div>
            </div>
            <div>
              <Label>Mobile</Label>
              <div className="text-lg font-medium">{data.mobile}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <div className="text-lg font-medium">{data.email}</div>
            </div>
            <div>
              <Label>Bank</Label>
              <div className="text-lg font-medium">{data.bank}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date of Birth</Label>
              <div className="text-lg font-medium">{data.dob}</div>
            </div>
            <div>
              <Label>PAN</Label>
              <div className="text-lg font-medium">{data.pan}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
