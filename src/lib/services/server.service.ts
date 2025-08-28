"use client";

import { useApi } from "@/lib/api/useApi";
import { Server } from "@/lib/types/server";

export function useServerService() {
  const { apiClass } = useApi();

  const getServers = async (): Promise<Server[]> => {
    try {
      const response = await apiClass.get("/servers");
      return response.data;
    } catch (error) {
      console.error("Error fetching servers:", error);
      return [];
    }
  };

  return {
    getServers,
  };
}