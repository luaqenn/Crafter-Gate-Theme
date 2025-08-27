import { Profile } from "@/components/profile";
import { DefaultBreadcrumb } from "@/components/ui/breadcrumb";
import { serverUserService } from "@/lib/api/services/userService";
import { websiteService } from "@/lib/api/services/websiteService";
import { WEBSITE_ID } from "@/lib/constants/base";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return {
    title: `${username} Profili`,
    description: `${username} isimli oyuncunun profil sayfası`,
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const website = await websiteService.getWebsite({ id: WEBSITE_ID });
  return (
    <div>
      <DefaultBreadcrumb
        items={[
          { label: "Profil", href: "#" },
          { label: username, href: `/profile/${username}` },
        ]}
      />
      <Profile ownUser={false} username={username} currency={website?.currency} />
    </div>
  );
}
