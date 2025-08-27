import { Metadata } from "next";
import { legalService } from "@/lib/api/services/legalService";
import LegalPage from "@/components/legal-pages";

export const metadata: Metadata = {
  title: "Şartlar ve Koşullar",
  description: "Sunucumuzun şartlarını ve koşullarını okuyunuz.",
};

export default async function TermsPage() {
    const legalDocuments = await legalService.getLegalDocuments();
    const terms = legalDocuments.terms_of_service;

  return (
    <LegalPage
      title="Şartlar ve Koşullar"
      description="Sunucumuzun şartlarını ve koşullarını okuyunuz."
      content={terms}
    />
  );
}