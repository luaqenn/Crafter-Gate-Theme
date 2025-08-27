import { Profile } from "@/components/profile";
import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";
import { websiteService } from "@/lib/api/services/websiteService";
import { WEBSITE_ID } from "@/lib/constants/base";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profilim",
  description: "Profil sayfanız",
};

export default async function ProfilePage() {
  const website = await websiteService.getWebsite({ id: WEBSITE_ID });
  return (
    <div>
      <DefaultBreadcrumb items={[{ label: "Profilim", href: "/profile" }]} />
      <Profile ownUser={true} currency={website?.currency} />
    </div>
  );
}
