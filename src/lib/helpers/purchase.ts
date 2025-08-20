import type { Product } from "@/lib/types/product";
import { serverMarketplaceService } from "@/lib/api/services/marketplaceService";

export default async function Purchase({ product }: { product: Product }) {
  const marketplaceService = serverMarketplaceService();
  const settings = await marketplaceService.getMarketplaceSettings();
  console.log(settings);
}
