import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BACKEND_URL, BACKEND_URL_WITH_WEBSITE_IDV2 } from '../constants/base';
import { ErrorMessages, ErrorType } from '../constants/errors';
import { ApiResponse, CustomError, ErrorResponse, RefreshTokenResponse, ValidationError } from '../types/ApiClass';

// Server-compatible token storage interface
interface TokenStorage {
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  setAccessToken(token: string): void;
  setRefreshToken(token: string): void;
  removeTokens(): void;
}

// Default token storage for server-side (no-op)
class ServerTokenStorage implements TokenStorage {
  getAccessToken(): string | null { return null; }
  getRefreshToken(): string | null { return null; }
  setAccessToken(token: string): void {}
  setRefreshToken(token: string): void {}
  removeTokens(): void {}
}

// Client-side token storage using localStorage
class ClientTokenStorage implements TokenStorage {
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  setAccessToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', token);
    }
  }

  removeTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }
}

export class ApiClient {
  private api: AxiosInstance;
  private tokenStorage: TokenStorage;
  private isRefreshing = false;
  private refreshTokenQueue: (() => void)[] = [];

  constructor(
    baseUrl: string = BACKEND_URL,
    headers: Record<string, string> = { 'Content-Type': 'application/json' },
    tokenStorage?: TokenStorage
  ) {
    this.tokenStorage = tokenStorage || (typeof window !== 'undefined' ? new ClientTokenStorage() : new ServerTokenStorage());
    
    this.api = axios.create({
      baseURL: baseUrl,
      headers: headers,
    });

    this.setupInterceptors();
  }

  // Public methods for token management
  public setAccessToken(token: string): void {
    this.tokenStorage.setAccessToken(token);
  }

  public setRefreshToken(token: string): void {
    this.tokenStorage.setRefreshToken(token);
  }

  public removeTokens(): void {
    this.tokenStorage.removeTokens();
  }

  public getAccessToken(): string | null {
    return this.tokenStorage.getAccessToken();
  }

  public getRefreshToken(): string | null {
    return this.tokenStorage.getRefreshToken();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        config.headers.set('Origin', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
        const token = this.tokenStorage.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.refreshTokenQueue.push(() => {
                originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${this.tokenStorage.getAccessToken()}`,
                };
                resolve(this.api(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const success = await this.refreshToken();
            if (success) {
              this.processQueue();
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            this.processQueue(refreshError as AxiosError);
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: AxiosError | null = null): void {
    this.refreshTokenQueue.forEach((prom) => {
      if (error) {
        prom();
      } else {
        prom();
      }
    });
    this.refreshTokenQueue = [];
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = this.tokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post<RefreshTokenResponse>(
        `${BACKEND_URL_WITH_WEBSITE_IDV2}/auth/refresh-token`,
        { refresh_token: refreshToken }
      );

      this.tokenStorage.setAccessToken(response.data.accessToken);
      this.tokenStorage.setRefreshToken(response.data.refreshToken);
      return true;
    } catch (error) {
      this.tokenStorage.removeTokens();
      return false;
    }
  }

  private handleError(error: AxiosError<ErrorResponse>): never {
    const response = error.response?.data;

    if (!response) {
      throw {
        message: 'An error occurred',
        status: error.response?.status || 500,
      };
    }

    // Handle validation errors
    if (error.response?.status === 400 && Array.isArray(response.message)) {
      const validationError = response as ValidationError;
      throw {
        message: validationError.message,
        status: validationError.statusCode,
      };
    }

    // Handle custom error types
    if ('type' in response && response.type && Object.values(ErrorType).includes(response.type)) {
      const customError = response as CustomError;
      throw {
        message: ErrorMessages[response.type as keyof typeof ErrorMessages] || customError.message,
        status: error.response?.status || 500,
        type: response.type,
      };
    }

    // Handle other errors
    throw {
      message: response.message || 'An error occurred',
      status: error.response?.status || 500,
    };
  }

  async request<T>(config: AxiosRequestConfig, authorize = true): Promise<ApiResponse<T>> {
    try {
      if (authorize) {
        const token = this.tokenStorage.getAccessToken();
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
          };
        }
      }

      const response: AxiosResponse<T> = await this.api(config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      this.handleError(error as AxiosError<ErrorResponse>);
      throw error;
    }
  }

  get<T>(url: string, config?: AxiosRequestConfig, authorize = true) {
    return this.request<T>({ ...config, method: 'GET', url }, authorize);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig, authorize = true) {
    return this.request<T>({ ...config, method: 'POST', url, data }, authorize);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig, authorize = true) {
    return this.request<T>({ ...config, method: 'PUT', url, data }, authorize);
  }

  delete<T>(url: string, config?: AxiosRequestConfig, authorize = true) {
    return this.request<T>({ ...config, method: 'DELETE', url }, authorize);
  }
}

// Create a default instance
export const apiClient = new ApiClient();

// For backward compatibility, export a hook-like function that returns the API client
export const useApi = (options?: {
  baseUrl?: string;
  headers?: Record<string, string>;
  tokenStorage?: TokenStorage;
}) => {
  if (options) {
    return new ApiClient(options.baseUrl, options.headers, options.tokenStorage);
  }
  return apiClient;
};

// Export the class for direct usage in server components
