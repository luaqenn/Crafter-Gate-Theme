"use client";

import { useApi } from "@/lib/api/useApi";

interface LegalDocuments {
  rules: Record<string, any> | null;
  privacy_policy: Record<string, any> | null;
  terms_of_service: Record<string, any> | null;
}

export function useLegalService() {
  const { apiClass } = useApi();

  const getLegalDocuments = async (): Promise<LegalDocuments> => {
    try {
      const response = await apiClass.get("/config/legal", {}, true);
      return response.data;
    } catch (error) {
      console.error("Error fetching legal documents:", error);
      return {
        rules: null,
        privacy_policy: null,
        terms_of_service: null,
      };
    }
  };

  return {
    getLegalDocuments,
  };
}