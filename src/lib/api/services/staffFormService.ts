import { BACKEND_URL_WITH_WEBSITE_ID } from '@/lib/constants/base';
import { StaffForm, StaffFormApplication, StaffFormApplicationValue } from '@/lib/types/staff-form';
import { ApiClient } from '../useApi';

export class StaffFormService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api =
      apiClient ||
      new ApiClient(
        BACKEND_URL_WITH_WEBSITE_ID
      );
  }

  // Tüm formları getir
  async getForms(): Promise<StaffForm[]> {
    const response = await this.api.get<StaffForm[]>('/staff-forms', {}, true);
    return response.data;
  }

  // Tek bir formu id veya slug ile getir
  async getForm(idOrSlug: string): Promise<StaffForm> {
    const response = await this.api.get<StaffForm>(`/staff-forms/${idOrSlug}`, {}, true);
    return response.data;
  }

  // Formu başvuru olarak yanıtla (tüm inputlar tek seferde)
  async submitFormApplication(
    formId: string,
    values: StaffFormApplicationValue[]
  ): Promise<StaffFormApplication> {
    const response = await this.api.post<StaffFormApplication>(
      `/staff-forms/${formId}/apply`,
      { values },
      {},
      true
    );
    return response.data;
  }

  // Kullanıcının kendi başvurularını getir
  async getMyApplications(): Promise<StaffFormApplication[]> {
    const response = await this.api.get<StaffFormApplication[]>(
      '/staff-forms/applications',
      {},
      true
    );
    return response.data;
  }
}

// Create a default instance for server-side usage
export const staffFormService = new StaffFormService();

// For backward compatibility, export the function-based approach
export const serverStaffFormService = () => {
  const service = new StaffFormService();

  return {
    getForms: service.getForms.bind(service),
    getForm: service.getForm.bind(service),
  };
}; 