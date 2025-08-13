import { ApiClient } from "../useApi";

export interface SignInRequest {
  username: string;
  password: string;
  turnstileToken?: string;
}

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  turnstileToken?: string;
}

export interface SignUpResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
  turnstileToken?: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

// Server-side website service using ApiClient
export class AuthService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api =
      apiClient ||
      new ApiClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/website/v2/${process.env.NEXT_PUBLIC_WEBSITE_ID}`
      );
  }

  async signIn(data: SignInRequest): Promise<SignInResponse> {
    try {
      const response = await this.api.post<SignInResponse>(
        "/auth/signin",
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    try {
      const response = await this.api.post<SignUpResponse>(
        "/auth/signup",
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    try {
      const response = await this.api.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error forgot password:", error);
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const response = await this.api.post<ResetPasswordResponse>(
        "/auth/reset-password",
        data
      );

      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }
}

// Create a default instance for server-side usage
export const authService = new AuthService();

// For backward compatibility, export the function-based approach
export const serverAuthService = () => {
  const service = new AuthService();

  return {
    signIn: service.signIn.bind(service),
    signUp: service.signUp.bind(service),
    forgotPassword: service.forgotPassword.bind(service),
    resetPassword: service.resetPassword.bind(service),
  };
};
