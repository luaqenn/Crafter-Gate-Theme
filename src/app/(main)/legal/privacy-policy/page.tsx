import { Metadata } from "next";
import { legalService } from "@/lib/api/services/legalService";
import LegalPage from "@/components/legal-pages";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Sunucumuzun gizlilik politikasını okuyunuz.",
};

export default async function PrivacyPolicyPage() {
    const legalDocuments = await legalService.getLegalDocuments();
    const privacyPolicy = legalDocuments.privacy_policy;

  return (
    <LegalPage
      title="Gizlilik Politikası"
      description="Sunucumuzun gizlilik politikasını okuyunuz."
      content={privacyPolicy}
    />
  );
}