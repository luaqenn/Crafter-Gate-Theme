import { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/resetPassForm";
import { serverWebsiteService } from "@/lib/api/services/websiteService";

export const metadata: Metadata = {
  title: "Şifremi Sıfırla",
  description: "Şifrenizi güvenle sıfırlayarak hesabınıza tekrar erişin.",
};

export default async function ResetPasswordPage() {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });
  
  return (
    <ResetPasswordForm
      bannerImage={website.theme?.header?.bannerImage}
      logo={website.image}
    />
  );
}
