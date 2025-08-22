import ProductCard from "@/components/ui/store/product-card";
import { serverCategoriesService } from "@/lib/api/services/categoriesService";
import { productsService } from "@/lib/api/services/productsService";
import { websiteService } from "@/lib/api/services/websiteService";
import { Metadata } from "next";
import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";
import { serverServersService } from "@/lib/api/services/serversService";
import Title from "@/components/ui/title";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ server_slug: string; category_slug: string }>;
}): Promise<Metadata> {
  const category = await serverCategoriesService().getCategory(
    (
      await params
    ).category_slug
  );
  return {
    title: `${category.name}`,
    description: `${category.name} isimli kategoriye ait ürünler!`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ server_slug: string; category_slug: string }>;
}) {
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID,
  });

  const category = await serverCategoriesService().getCategory(
    (
      await params
    ).category_slug
  );
  const server = await serverServersService().getServer(category.server_id);

  const products = await productsService.getProductsByCategory(category.id);

  return (
    <div>
      <DefaultBreadcrumb
        items={[
          { label: "Mağaza", href: "/store" },
          { label: server.name, href: `/store/${server.slug}` },
          {
            label: category.name,
            href: `/store/${server.slug}/${category.slug}`,
          },
        ]}
      />
      <div className="flex flex-col gap-4">
        <Title title={category.name} description={`${category.name} isimli kategoriye ait ürünler!`} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={website.currency}
              />
            ))
          ) : (
            <p className="text-muted-foreground">
              Bu kategoriye ait ürün bulunamadı.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
