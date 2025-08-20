import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { ApiClient } from "../useApi";
import { ChestItem } from "@/lib/types/chest";
import { CheckPaymentData, InitiatePaymentData, InitiatePaymentResponse } from "@/lib/types/payment";
import { PaymentProvider } from "@/lib/types/payment";

// Server-side website service using ApiClient
export class PaymentService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient();
  }

  async getPaymentProviders(): Promise<PaymentProvider[]> {
    this.api = new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
    const response = await this.api.get<PaymentProvider[]>(
      `/config/payment/public`,
      {},
      true
    );
    return response.data;
  };

  async initiatePayment(
    data: InitiatePaymentData
  ): Promise<InitiatePaymentResponse> {
    const response = await this.api.post<InitiatePaymentResponse>(
      `/website/payment/initiate`,
      data,
      {},
      true
    );
    return response.data;
  };

  async checkPayment(
    data: CheckPaymentData
  ): Promise<{ success: boolean, status: "COMPLETED" | "FAILED" | "PENDING" }> {
    const response = await this.api.post<{ success: boolean, status: "COMPLETED" | "FAILED" | "PENDING" }>(
      `/website/payment/check`,
      data,
      {},
      true
    );
    return response.data;
  };
}

// Create a default instance for server-side usage
export const paymentService = new PaymentService();

// For backward compatibility, export the function-based approach
export const serverPaymentService = () => {
  const service = new PaymentService();

  return {
    getPaymentProviders: service.getPaymentProviders.bind(service),
    initiatePayment: service.initiatePayment.bind(service),
    checkPayment: service.checkPayment.bind(service),
  };
};
