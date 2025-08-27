import { User, WallMessage } from "@/lib/types/user";
import { ApiClient } from "@/lib/api/useApi";

export class UserService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api =
      apiClient ||
      new ApiClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/website/v2/${process.env.NEXT_PUBLIC_WEBSITE_ID}`
      );
  }

  // Tüm kullanıcıları getir
  async getUsers(): Promise<User[]> {
    const response = await this.api.get<User[]>(`/users`);
    return response.data;
  }

  // Tek bir kullanıcıyı getir (id veya 'me'). Username ile de getirilebilir ancak @ ile başlamalı.
  async getUserById(userIdOrUsername: string): Promise<User> {
    const response = await this.api.get<User>(`/users/${userIdOrUsername}`);
    return response.data;
  }

  // Tek bir kullanıcıyı getir (id veya 'me')
  async getMe(): Promise<User> {
    const response = await this.api.get<User>(`/users/me`, {}, true);
    return response.data;
  }

  // Kullanıcıyı güncelle
  async updateUser(
    userId: string,
    update: {
      email: string;
      password?: string;
    }
  ): Promise<User> {
    const response = await this.api.put<User>(`/users/${userId}`, update);
    return response.data;
  }

  // Kullanıcı rolünü güncelle
  async updateUserRole(userId: string, role: string): Promise<User> {
    const response = await this.api.put<User>(`/users/${userId}/role`, {
      role,
    });
    return response.data;
  }

  // Kullanıcıya bakiye ekle
  async addBalance(userId: string, balance: number): Promise<User> {
    const response = await this.api.put<User>(`/users/${userId}/balance`, {
      balance,
    });
    return response.data;
  }

  async reportUser(userId: string, reportReason: string): Promise<User> {
    const response = await this.api.post<User>(`/users/${userId}/report`, {
      reportReason,
    });
    return response.data;
  }

  // Kullanıcıyı banla
  async banUser(userId: string, banReason: string): Promise<User> {
    const response = await this.api.post<User>(`/users/${userId}/ban`, {
      banReason,
    });
    return response.data;
  }

  // Kullanıcı banını kaldır
  async unbanUser(userId: string): Promise<User> {
    const response = await this.api.post<User>(`/users/${userId}/unban`);
    return response.data;
  }

  async getWallMessages(userId: string): Promise<WallMessage[]> {
    const response = await this.api.get<WallMessage[]>(`/users/${userId}/wall`);
    return response.data;
  }

  async sendWallMessage(
    userId: string,
    wallMessageId: string,
    content: string
  ): Promise<User> {
    const response = await this.api.post<User>(`/users/${userId}/wall`, {
      content,
    });
    return response.data;
  }

  async replyWallMessage(
    userId: string,
    wallMessageId: string,
    content: string
  ): Promise<User> {
    const response = await this.api.post<User>(
      `/users/${userId}/wall/${wallMessageId}/reply`,
      { content }
    );
    return response.data;
  }

  // Şifre değiştir
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<User> {
    const response = await this.api.post<User>(
      `/users/me/change-password`,
      { currentPassword, newPassword }
    );
    return response.data;
  }
  // 2FA kurulum (şimdilik mock)
  async setupTwoFactor(): Promise<{ secret: string }> {
    // Mock implementation - gerçek API hazır olduğunda güncellenecek
    return { secret: "JBSWY3DPEHPK3PXP" };
  }

  // 2FA doğrulama (şimdilik mock)
  async verifyTwoFactor(secret: string, code: string): Promise<User> {
    // Mock implementation - gerçek API hazır olduğunda güncellenecek
    if (code === "123456") {
      return this.getMe();
    }
    throw new Error("Geçersiz doğrulama kodu");
  }

  // 2FA devre dışı bırak (şimdilik mock)
  async disableTwoFactor(): Promise<User> {
    // Mock implementation - gerçek API hazır olduğunda güncellenecek
    return this.getMe();
  }
}

export const userService = new UserService();

export const serverUserService = () => {
  const service = new UserService();

  return {
    getUsers: service.getUsers.bind(service),
    getUserById: service.getUserById.bind(service),
    getMe: service.getMe.bind(service),
    updateUser: service.updateUser.bind(service),
    updateUserRole: service.updateUserRole.bind(service),
    addBalance: service.addBalance.bind(service),
    reportUser: service.reportUser.bind(service),
    banUser: service.banUser.bind(service),
    unbanUser: service.unbanUser.bind(service),
    getWallMessages: service.getWallMessages.bind(service),
    sendWallMessage: service.sendWallMessage.bind(service),
    replyWallMessage: service.replyWallMessage.bind(service),
    changePassword: service.changePassword.bind(service),
    setupTwoFactor: service.setupTwoFactor.bind(service),
    verifyTwoFactor: service.verifyTwoFactor.bind(service),
    disableTwoFactor: service.disableTwoFactor.bind(service),
  };
};
