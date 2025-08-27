import { ApiClient } from "../useApi";
import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { Report, ReportType } from "@/lib/types/website";

export class ReportService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  async reportUser(
    userId: string,
    reportReason: string,
    type: ReportType
  ): Promise<Report> {
    const response = await this.api.post<Report>(`/reports/${userId}`, {
      reason: reportReason,
      reportType: type,
    });
    return response.data;
  }
}

export const reportService = new ReportService();

export const serverReportService = () => {
  const service = new ReportService();

  return {
    reportUser: service.reportUser.bind(service),
  };
};
