
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MonthlyFeature } from "@/types/report";

interface MonthlyMetricsTableProps {
  data: MonthlyFeature[];
}

const MonthlyMetricsTable = ({ data }: MonthlyMetricsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Net Monthly Inflow</TableHead>
          <TableHead>Credit/Debit Ratio</TableHead>
          <TableHead>Cash Buffer Days</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.monthName}</TableCell>
            <TableCell>₹{row.net_monthly_inflow.toLocaleString()}</TableCell>
            <TableCell>{row.credit_debit_ratio.toFixed(2)}</TableCell>
            <TableCell>{row.cash_buffer_days}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MonthlyMetricsTable;
