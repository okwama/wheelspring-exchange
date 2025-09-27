import { apiRequest, API_CONFIG } from '@/config/api';
import { authService } from './authService';

export interface UserProfile {
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

export interface UpdateProfileData {
  full_name?: string;
  email?: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class ProfileService {
  async getProfile(): Promise<{ user: UserProfile }> {
    const url = `${API_CONFIG.BASE_URL}/auth/profile`;
    const token = authService.getToken();
    console.log('Profile service - Making request to:', url);
    console.log('Profile service - Token available:', !!token);
    return await apiRequest(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateProfile(profileData: UpdateProfileData): Promise<{ message: string; user: UserProfile }> {
    const url = `${API_CONFIG.BASE_URL}/auth/profile`;
    const token = authService.getToken();
    return await apiRequest(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: ChangePasswordData): Promise<{ message: string }> {
    const url = `${API_CONFIG.BASE_URL}/auth/change-password`;
    const token = authService.getToken();
    return await apiRequest(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    });
  }
}

export default new ProfileService();
