import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { ApiClient } from "@/lib/api/useApi";

/**
 * @description Legal dokümanların veri yapısı.
 */
export interface LegalDocuments {
    rules: Record<string, any> | null;
    privacy_policy: Record<string, any> | null;
    terms_of_service: Record<string, any> | null;
}

export class LegalService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  async getLegalDocuments(): Promise<LegalDocuments> {
    const response = await this.api.get<LegalDocuments>(`/config/legal`, {}, true);
    return response.data;
  }

}

export const legalService = new LegalService();

export const serverLegalService = () => {
  const service = new LegalService();

  return {
    getLegalDocuments: service.getLegalDocuments.bind(service),
  };
};
