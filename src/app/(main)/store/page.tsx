import { Metadata } from "next";
import { serversService } from "@/lib/api/services/serversService";
import StoreCard from "@/components/ui/store/store-card";
import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";
import Title from "@/components/ui/title";

export const metadata: Metadata = {
  title: "Mağaza",
  description: "Mağaza'da birbirinden farklı ürünlere göz atın.",
};

export default async function StorePage() {
  const servers = await serversService.getServers();
  return (
    <div>
      <div className="flex flex-col gap-4">
        <DefaultBreadcrumb items={[{ label: "Mağaza", href: "/store" }]} />
        <Title title="Oyunlar" description="Mağaza'da birbirinden farklı ürünlere göz atın." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.length > 0 ? (
            servers.map((server) => (
              <StoreCard
                key={server.id}
                name={server.name}
                image={server.image}
                slug={server.slug}
                redirectUrl={`/store/${server.slug}`}
              />
            ))
          ) : (
            <p className="text-muted-foreground">Oyun bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
}
