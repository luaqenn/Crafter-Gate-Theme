import Navbar from "@/components/layouts/navbar";
import { serverWebsiteService } from "@/lib/api/services/websiteService";
import Footer from "@/components/layouts/footer";
import { getMinecraftStatus } from "@/lib/helpers/statusHelper";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });

  const mainServer = website.servers.find((server) => server.port === 25565) || website.servers[0];

  const status = await getMinecraftStatus({
    hostname: mainServer.ip,
    port: mainServer.port,
  });

  return (
    <div>
      <Navbar websiteName={website.name} navbarLinks={website.theme.navbar} />
      <div className="glide-scroll antialiased">
        {children}
      </div>
      <Footer
        logoImage={website.image}
        name={website.name}
        description={website.description}
        serverAddress={mainServer.ip}
        socialMedia={website.social_media}
        quickLinks={website.theme.navbar}
        status={status}
      />
    </div>
  );
}
