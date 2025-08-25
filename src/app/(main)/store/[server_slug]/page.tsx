import { Metadata } from "next";
import { serversService } from "@/lib/api/services/serversService";
import StoreCard from "@/components/ui/store/store-card";
import { serverCategoriesService } from "@/lib/api/services/categoriesService";
import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";
import Title from "@/components/ui/title";
import StaticAlert from "@/components/ui/alerts/static-alert";
import { marketplaceService } from "@/lib/api/services/marketplaceService";
import { websiteService } from "@/lib/api/services/websiteService";
import { WEBSITE_ID } from "@/lib/constants/base";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ server_slug: string }>;
}): Promise<Metadata> {
  const server = await serversService.getServer((await params).server_slug);
  return {
    title: `${server.name}`,
    description: `${server.name} isimli oyuna ait ürün kategorileri!`,
  };
}

export default async function ServerPage({
  params,
}: {
  params: Promise<{ server_slug: string }>;
}) {
  const website = await websiteService.getWebsite({ id: WEBSITE_ID });
  const server = await serversService.getServer((await params).server_slug);
  const categories = await serverCategoriesService().getCategoriesByServer(
    server.id
  );
  const marketplaceSettings = await marketplaceService.getMarketplaceSettings();
  return (
    <div>
      <div className="flex flex-col gap-4">
        <DefaultBreadcrumb
          items={[
            { label: "Mağaza", href: "/store" },
            { label: server.name, href: `/store/${server.slug}` },
          ]}
        />
        {marketplaceSettings.bulkDiscount ? (
          <StaticAlert
            type="info"
            title={`Tüm ürünlerde geçerli ${
              marketplaceSettings.bulkDiscount.amount
            } ${
              marketplaceSettings.bulkDiscount.type === "fixed"
                ? website.currency
                : "%"
            } indirim!`}
            message={
              "Tüm ürünlerde geçerli indirimleri kullanmak için ürünlere göz atın."
            }
          />
        ) : null}
        <Title
          title={server.name}
          description={`${server.name} isimli oyuna ait ürün kategorileri!`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <StoreCard
                key={category.id}
                name={category.name}
                image={category.image}
                slug={category.slug}
                redirectUrl={`/store/${server.slug}/${category.slug}`}
              />
            ))
          ) : (
            <p className="text-muted-foreground">
              Bu oyuna ait kategori bulunamadı.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
