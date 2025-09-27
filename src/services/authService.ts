import { API_CONFIG, apiRequest } from '@/config/api';

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  location: string;
  bio?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  location: string;
}

class AuthService {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );

    // Store token and user data
    this.setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  /**
   * Login user
   */
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await apiRequest<AuthResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
      {
        method: 'POST',
        body: JSON.stringify(loginData),
      }
    );

    // Store token and user data
    this.setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    if (!this.token) {
      throw new Error('No authentication token found');
    }

    const response = await apiRequest<{ user: User }>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.PROFILE}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.user;
  }

  /**
   * Get guest access information
   */
  async getGuestInfo(): Promise<any> {
    const response = await apiRequest<any>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.GUEST}`,
      {
        method: 'GET',
      }
    );

    return response;
  }

  /**
   * Logout user
   */
  logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Set authentication token
   */
  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  /**
   * Get authorization header for API requests
   */
  getAuthHeaders(): Record<string, string> {
    if (this.token) {
      return {
        Authorization: `Bearer ${this.token}`,
      };
    }
    return {};
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;

