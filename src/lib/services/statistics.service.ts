"use client";

import { useApi } from "@/lib/api/useApi";

interface Statistics {
  latest?: {
    signups?: any[];
  };
}

export function useStatisticsService() {
  const { apiClass } = useApi();

  const getStatistics = async (): Promise<Statistics | null> => {
    try {
      const response = await apiClass.get("/statistics");
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return null;
    }
  };

  return {
    getStatistics,
  };
}