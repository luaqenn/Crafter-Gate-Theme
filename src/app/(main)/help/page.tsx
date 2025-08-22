import { Metadata } from "next";
import Help from "@/components/help/index";
import { websiteService } from "@/lib/api/services/websiteService";
import { WEBSITE_ID } from "@/lib/constants/base";

export const metadata: Metadata = {
  title: "Yardım",
  description: "Yardım",
};

export default async function HelpPage() {
  const website = await websiteService.getWebsite({ id: WEBSITE_ID });
  return <Help discordLink={website.social_media.discord ?? ""} />;
}
