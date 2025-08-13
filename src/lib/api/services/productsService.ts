import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { Product } from "@/lib/types/product";
import { ApiClient } from "../useApi";

export class ProductsService {
  private api: ApiClient;
  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  async getProductsByCategory(category_id: string): Promise<Product[]> {
    const response = await this.api.get<Product[]>(
      `/products/by-category/${category_id}`,
      {},
      true
    );
    return response.data;
  };

  async getProductById(product_id: string): Promise<Product> {
    const response = await this.api.get<Product>(`/products/${product_id}`, {}, true);
    return response.data;
  }
}

export const productsService = new ProductsService();

export const serverProductsService = () => {
  const service = new ProductsService();
  return {
    getProductsByCategory: service.getProductsByCategory.bind(service),
    getProductById: service.getProductById.bind(service),
  };
};
