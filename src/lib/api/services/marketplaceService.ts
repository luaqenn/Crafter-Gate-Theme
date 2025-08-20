import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { ApiClient } from "../useApi";
import type { Coupon, MarketplaceSettings } from "@/lib/types/marketplace";

// Server-side website service using ApiClient
export class MarketplaceService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  async purchaseProduct(
    productIds: string[],
    coupon?: string
  ): Promise<{ success: string; message: string; type: string }> {
    const response = await this.api.post<{
      success: string;
      message: string;
      type: string;
    }>(`/marketplace/purchase`, { productIds, coupon }, {}, true);
    return response.data;
  }

  async getCouponInfo(couponCode: string): Promise<Coupon> {
    const response = await this.api.get<Coupon>(`/coupons/${couponCode}`, {}, true);
    return response.data;
  }

  async getMarketplaceSettings(): Promise<MarketplaceSettings> {
    const response = await this.api.get<MarketplaceSettings>(`/config/marketplace`, {}, true);
    return response.data;
  }
}

// Create a default instance for server-side usage
export const marketplaceService = new MarketplaceService();

// For backward compatibility, export the function-based approach
export const serverMarketplaceService = () => {
  const service = new MarketplaceService();

  return {
    purchaseProduct: service.purchaseProduct.bind(service),
    getCouponInfo: service.getCouponInfo.bind(service),
    getMarketplaceSettings: service.getMarketplaceSettings.bind(service),
  };
};
