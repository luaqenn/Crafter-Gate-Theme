import { Metadata } from "next";
import SignInForm from "@/components/auth/signInForm";
import { serverWebsiteService } from "@/lib/api/services/websiteService";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Bilgilerinizi girerek giriş yapabilirsiniz.",
};

export default async function SignIn() {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });

  const turnstilePublicKey = website.security?.cf_turnstile?.site_key || undefined;

  return (
    <SignInForm
      bannerImage={website.theme?.header?.bannerImage}
      logo={website.image}
      turnstilePublicKey={turnstilePublicKey}
    />
  );
}
