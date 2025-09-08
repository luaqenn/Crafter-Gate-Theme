import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/forgotPassForm";
import { serverWebsiteService } from "@/lib/api/services/websiteService";

export const metadata: Metadata = {
  title: "Şifremi Unuttum",
  description: "Şifrenizi unuttuysanız, e-posta adresinizi girerek şifrenizi sıfırlayabilirsiniz.",
};

export default async function ForgotPasswordPage() {
  const websiteService = serverWebsiteService();
  const website = await websiteService.getWebsite({
    id: process.env.NEXT_PUBLIC_WEBSITE_ID || "",
  });

  const turnstilePublicKey = website.security?.cf_turnstile?.site_key || undefined;
  
  return (
    <ForgotPasswordForm
      bannerImage={website.theme?.header?.bannerImage}
      logo={website.image}
      turnstilePublicKey={turnstilePublicKey}
    />
  );
}
