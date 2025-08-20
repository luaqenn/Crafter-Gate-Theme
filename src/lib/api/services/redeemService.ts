import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { ApiClient } from "../useApi";

export interface RedeemCodeResponse {
  success: boolean;
  message: string;
  bonus?: number;
  products?: { id: string; name: string }[];
}

export class RedeemService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  redeemCode = async (code: string): Promise<RedeemCodeResponse> => {
    const response = await this.api.post<RedeemCodeResponse>(
      `/redeem-codes/use`,
      { code },
      {},
      true
    );
    return response.data;
  };

}

export const redeemService = new RedeemService();

export const serverRedeemService = () => {
  const service = new RedeemService();

  return {
    redeemCode: service.redeemCode.bind(service),
  };
};
