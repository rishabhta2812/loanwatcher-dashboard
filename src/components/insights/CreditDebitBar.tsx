
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CreditDebitBarProps {
  creditData: Record<string, number>;
  debitData: Record<string, number>;
}

const CreditDebitBar = ({ creditData, debitData }: CreditDebitBarProps) => {
  const data = Object.keys(creditData).map(month => ({
    name: month,
    credit: creditData[month],
    debit: debitData[month]
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Credit vs Debit Amounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="credit" fill="#22c55e" name="Credit" />
              <Bar dataKey="debit" fill="#ef4444" name="Debit" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditDebitBar;
