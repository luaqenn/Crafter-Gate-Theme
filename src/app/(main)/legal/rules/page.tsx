import { Metadata } from "next";
import { legalService } from "@/lib/api/services/legalService";
import LegalPage from "@/components/legal-pages";

export const metadata: Metadata = {
  title: "Kurallar",
  description: "Sunucumuzun kurallarını ve şartlarını okuyunuz.",
};

export default async function RulesPage() {
    const legalDocuments = await legalService.getLegalDocuments();
    const rules = legalDocuments.rules;

  return (
    <LegalPage
      title="Kurallar"
      description="Sunucumuzun kurallarını ve şartlarını okuyunuz."
      content={rules}
    />
  );
}