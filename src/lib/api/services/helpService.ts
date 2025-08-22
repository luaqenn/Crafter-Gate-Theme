import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { ApiClient } from "../useApi";
import {
  GetHelpDto,
  HelpCategory,
  HelpData,
  HelpFAQ,
  HelpItem,
} from "@/lib/types/help";

// Server-side website service using ApiClient
export class HelpService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  // Help Center data operations
  getHelpCenter = async (data: {
    query?: GetHelpDto;
  }): Promise<HelpData> => {
    const response = await this.api.get<HelpData>(
      `/helpcenter`,
      { params: data.query || {} },
      true
    );
    return response.data;
  };

  // Category operations
  getCategory = async (data: {
    categoryId: string;
  }): Promise<HelpCategory> => {
    const response = await this.api.get<HelpCategory>(
      `/helpcenter/category/${data.categoryId}`,
      {},
      true
    );
    return response.data;
  };

  // Item operations
  getItem = async (data: {
    itemId: string;
  }): Promise<HelpItem> => {
    const response = await this.api.get<HelpItem>(
      `/helpcenter/item/${data.itemId}`,
      {},
      true
    );
    return response.data;
  };

  // FAQ operations
  getFAQ = async (data: {
    faqId: string;
  }): Promise<HelpFAQ> => {
    const response = await this.api.get<HelpFAQ>(
      `/helpcenter/faq/${data.faqId}`,
      {},
      true
    );
    return response.data;
  };
}

// Create a default instance for server-side usage
export const helpService = new HelpService();

// For backward compatibility, export the function-based approach
export const serverHelpService = () => {
  const service = new HelpService();

  return {
    getHelpCenter: service.getHelpCenter.bind(service),
    getCategory: service.getCategory.bind(service),
    getItem: service.getItem.bind(service),
    getFAQ: service.getFAQ.bind(service),
  };
};
