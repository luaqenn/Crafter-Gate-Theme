import { BACKEND_URL_WITH_WEBSITE_ID } from '@/lib/constants/base';
import { Server } from '@/lib/types/server';
import { ApiClient } from '../useApi';

export class ServersService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api =
      apiClient ||
      new ApiClient(
        BACKEND_URL_WITH_WEBSITE_ID
      );
  }

  // Tüm sunucuları getir
  async getServers(): Promise<Server[]> {
    try {
      const response = await this.api.get<Server[]>('/config/servers', {}, true);
      return response.data;
    } catch (error) {
      console.error('Error getting servers:', error);
      throw error;
    }
  }

  // Tek bir sunucuyu getir
  async getServer(serverId: string): Promise<Server> {
    try {
      const response = await this.api.get<Server>(`/config/servers/${serverId}`, {}, true);
      return response.data;
    } catch (error) {
      console.error('Error getting server:', error);
      throw error;
    }
  }
}

// Create a default instance for server-side usage
export const serversService = new ServersService();

// For backward compatibility, export the function-based approach
export const serverServersService = () => {
  const service = new ServersService();

  return {
    getServers: service.getServers.bind(service),
    getServer: service.getServer.bind(service),
  };
}; 