import { Metadata } from "next";
import { serversService } from "@/lib/api/services/serversService";
import StoreCard from "@/components/ui/store/store-card";
import { serverCategoriesService } from "@/lib/api/services/categoriesService";
import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";

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
  const server = await serversService.getServer((await params).server_slug);
  const categories = await serverCategoriesService().getCategoriesByServer(server.id);

  return (
    <div>
      <div className="container mx-auto pb-10">
        <DefaultBreadcrumb
          items={[
            { label: "Mağaza", href: "/store" },
            { label: server.name, href: `/store/${server.slug}` },
          ]}
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-primary">{server.name} isimli Oyuna Ait Kategoriler</h1>
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
              <p className="text-muted-foreground">Bu oyuna ait kategori bulunamadı.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
