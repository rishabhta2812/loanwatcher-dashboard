
import { useQuery } from "@tanstack/react-query";
import { ReportData } from "@/types/report";

const fetchReport = async (): Promise<ReportData> => {
  const response = await fetch("/public/report.json");
  if (!response.ok) {
    throw new Error("Failed to fetch report data");
  }
  return response.json();
};

export const useReportData = () => {
  return useQuery({
    queryKey: ["report"],
    queryFn: fetchReport,
  });
};
