import { BACKEND_URL_WITH_WEBSITE_ID } from '@/lib/constants/base';
import { Category } from '@/lib/types/category';
import { ApiClient } from '../useApi';

export class CategoriesService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api =
      apiClient ||
      new ApiClient(
        BACKEND_URL_WITH_WEBSITE_ID
      );
  }

  // Tüm sunucuları getir
  async getCategories(): Promise<Category[]> {
    try {
      const response = await this.api.get<Category[]>('/categories', {}, true);
      return response.data;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  async getCategoriesByServer(server_id: string): Promise<Category[]> {
    const response = await this.api.get<Category[]>('/categories', {}, true);
    const filteredCategories = response.data.filter(category => category.server_id === server_id);
    return filteredCategories;
}

  // Tek bir sunucuyu getir
  async getCategory(categoryId: string): Promise<Category> {
    try {
      const response = await this.api.get<Category>(`/categories/${categoryId}`, {}, true);
      return response.data;
    } catch (error) {
      console.error('Error getting category:', error);
      throw error;
    }
  }
}

// Create a default instance for server-side usage
export const categoriesService = new CategoriesService();

// For backward compatibility, export the function-based approach
export const serverCategoriesService = () => {
  const service = new CategoriesService();

  return {
    getCategories: service.getCategories.bind(service),
    getCategory: service.getCategory.bind(service),
    getCategoriesByServer: service.getCategoriesByServer.bind(service),
  };
}; 