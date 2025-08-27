import { Metadata } from "next";
import SignInForm from "@/components/auth/signInForm";
import { serverWebsiteService } from "@/lib/api/services/websiteService";

export const metadata: Metadata = {
  title: "Giriş Yap",
  description: "Bilgilerinizi girerek giriş yapabilirsiniz.",
};

export default async function SignIn({ searchParams }: { searchParams: Promise<{ return: string }> }) {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });

  const turnstilePublicKey = website.security?.cf_turnstile?.site_key || undefined;
  const returnUrl = (await searchParams).return || undefined;
  
  return (
    <SignInForm
      bannerImage={website.theme?.header?.bannerImage}
      logo={website.image}
      turnstilePublicKey={turnstilePublicKey}
      returnUrl={returnUrl}
    />
  );
}
