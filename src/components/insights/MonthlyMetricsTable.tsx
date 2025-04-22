
import { MonthlyFeature } from "@/types/report";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MonthlyMetricsTableProps {
  data: MonthlyFeature[];
}

const MonthlyMetricsTable = ({ data }: MonthlyMetricsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead className="text-right">Net Inflow</TableHead>
            <TableHead className="text-right">Credit/Debit Ratio</TableHead>
            <TableHead className="text-right">Cash Buffer Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.monthName}</TableCell>
              <TableCell className="text-right">₹{row.net_monthly_inflow.toLocaleString()}</TableCell>
              <TableCell className="text-right">{row.credit_debit_ratio.toFixed(2)}</TableCell>
              <TableCell className="text-right">{row.cash_buffer_days}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonthlyMetricsTable;
