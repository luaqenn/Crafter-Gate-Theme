import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/layouts/navbar";
import { serverWebsiteService } from "@/lib/api/services/websiteService";
import Hero from "@/components/layouts/hero";
import Posts from "@/components/layouts/posts";
import Statistics from "@/components/layouts/statistics";
import CTA from "@/components/layouts/cta";
import Footer from "@/components/layouts/footer";
import { getMinecraftStatus } from "@/lib/helpers/statusHelper";
import { serverPostsService } from "@/lib/api/services/postsService";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description: "Bu bir test sayfasıdır",
};

async function getWebsite() {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });
  return website;
}

async function getWebsiteStatistics() {
  const websiteService = serverWebsiteService();
  const websiteStatistics = await websiteService.getWebsiteStatistics();
  return websiteStatistics;
}

async function getPosts() {
  const postsService = serverPostsService();
  const posts = await postsService.getPosts();
  return posts;
}

export default async function Home() {
  const website = await getWebsite();
  const websiteStatistics = await getWebsiteStatistics();
  const mainServer = website.servers.find((server) => server.port === 25565) || website.servers[0];
  const status = await getMinecraftStatus({
    hostname: mainServer.ip,
    port: mainServer.port,
  });
  const posts = await getPosts();
  
  return (
    <div>
      <Hero
        bannerImage={website.theme.header.bannerImage}
        logoImage={website.image}
        socialMedia={website.social_media}
        status={status}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4">
          <Posts posts={posts} />
          <Statistics statistics={websiteStatistics} />
        </div>
      </div>
      <CTA backgroundImage={website.theme.header.bannerImage} />
    </div>
  );
}
