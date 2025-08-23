import { Metadata } from "next";
import SignUpForm from "@/components/auth/signUpForm";
import { serverWebsiteService } from "@/lib/api/services/websiteService";

export const metadata: Metadata = {
  title: "Kayıt Ol",
  description: "Hesabınızı oluşturarak kayıt olabilirsiniz.",
};

export default async function SignUp() {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });

  const turnstilePublicKey = website.security?.cf_turnstile?.site_key || undefined;

  return (
    <SignUpForm
      bannerImage={website.theme?.header?.bannerImage}
      logo={website.image}
      turnstilePublicKey={turnstilePublicKey}
    />
  );
}
