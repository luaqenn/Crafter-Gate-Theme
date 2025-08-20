import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { ApiClient } from "../useApi";
import { ChestItem } from "@/lib/types/chest";

// Server-side website service using ApiClient
export class ChestService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  async getChestItems(user_id: string): Promise<ChestItem[]> {
    const response = await this.api.get<ChestItem[]>(`/chest/${user_id}`, {}, true);
    return response.data;
  }

  async useChestItem(
    user_id: string,
    product_id: string
  ): Promise<{ success: boolean; message: string; type: string }> {
    const response = await this.api.post<{
      success: boolean;
      message: string;
      type: string;
    }>(`/chest/${user_id}/use/${product_id}`, {}, {}, true);

    return response.data;
  }
}

// Create a default instance for server-side usage
export const chestService = new ChestService();

// For backward compatibility, export the function-based approach
export const serverChestService = () => {
  const service = new ChestService();

  return {
    getChestItems: service.getChestItems.bind(service),
    useChestItem: service.useChestItem.bind(service),
  };
};
