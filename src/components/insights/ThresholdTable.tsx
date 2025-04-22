
import { ThresholdCheck } from "@/types/report";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ThresholdTableProps {
  monthlyThresholds: ThresholdCheck[];
  overallThresholds: ThresholdCheck[];
}

const ThresholdTable = ({ monthlyThresholds, overallThresholds }: ThresholdTableProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Monthly Thresholds</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Threshold</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyThresholds.map((threshold, index) => (
                <TableRow key={index}>
                  <TableCell>{threshold.name}</TableCell>
                  <TableCell className="text-right">{threshold.value}</TableCell>
                  <TableCell className="text-right">{threshold.threshold}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={threshold.pass ? "success" : "destructive"}>
                      {threshold.pass ? "Pass" : "Fail"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Overall Thresholds</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Threshold</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overallThresholds.map((threshold, index) => (
                <TableRow key={index}>
                  <TableCell>{threshold.name}</TableCell>
                  <TableCell className="text-right">{threshold.value}</TableCell>
                  <TableCell className="text-right">{threshold.threshold}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={threshold.pass ? "success" : "destructive"}>
                      {threshold.pass ? "Pass" : "Fail"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ThresholdTable;
