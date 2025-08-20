import type { Metadata } from "next";
import { serverWebsiteService } from "@/lib/api/services/websiteService";
import Posts from "@/components/layouts/posts";
import Statistics from "@/components/layouts/statistics";
import CTA from "@/components/layouts/cta";
import { serverPostsService } from "@/lib/api/services/postsService";

export async function generateMetadata(): Promise<Metadata> {
  const website = await getWebsite();

  return {
    title: "Anasayfa",
    description: website.description || "Anasayfa",
  };
}

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
  
  const posts = await getPosts();
  
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Posts posts={posts} />
        <Statistics statistics={websiteStatistics} />
      </div>
      <CTA backgroundImage={website.theme.header.bannerImage} />
    </div>
  );
}
