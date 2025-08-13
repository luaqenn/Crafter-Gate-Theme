import { ApiClient } from "../useApi";
import { Website } from "../../types/website";
import { License } from "../../types/license";

export interface GetWebsiteRequest {
  id?: string;
  url?: string;
}

export interface VerifyLicenseKeyRequest {
  key: string;
}

export interface VerifyLicenseKeyResponse {
  success: boolean;
  message: string;
  website: Website;
  license: License;
}

export interface GetWebsiteStatisticsResponse {
  latest: {
    purchases: {
      id: string;
      username: string;
      productName: string;
      serverName: string;
      amount: number;
      timestamp: string;
    }[];
    payments: {
      id: string;
      username: string;
      amount: number;
      paymentMethod: string;
      timestamp: string;
    }[];
    signups: {
      id: string;
      username: string;
    }[];
  };
}

// Server-side website service using ApiClient
export class WebsiteService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient();
  }

  async verifyLicenseKey(
    data: VerifyLicenseKeyRequest
  ): Promise<VerifyLicenseKeyResponse> {
    try {
      const response = await this.api.post<VerifyLicenseKeyResponse>(
        "/website/key/verify",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying license key:", error);
      throw error;
    }
  }

  async getWebsite(data: GetWebsiteRequest): Promise<Website> {
    try {
      const response = await this.api.post<Website>("/website/get", data);

      return response.data;
    } catch (error) {
      console.error("Error getting website:", error);
      throw error;
    }
  }

  async getWebsiteStatistics(): Promise<GetWebsiteStatisticsResponse> {
    try {
      const response = await this.api.get<GetWebsiteStatisticsResponse>(
        `/website/v2/${process.env.NEXT_PUBLIC_WEBSITE_ID}/statistics`
      );

      return response.data;
    } catch (error) {
      console.error("Error getting website statistics:", error);
      throw error;
    }
  }
}

// Create a default instance for server-side usage
export const websiteService = new WebsiteService();

// For backward compatibility, export the function-based approach
export const serverWebsiteService = () => {
  const service = new WebsiteService();

  return {
    verifyLicenseKey: service.verifyLicenseKey.bind(service),
    getWebsite: service.getWebsite.bind(service),
    getWebsiteStatistics: service.getWebsiteStatistics.bind(service),
  };
};
