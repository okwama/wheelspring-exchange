import { apiRequest, API_CONFIG } from '@/config/api';
import { authService } from './authService';

export interface FavoriteCar {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  year: number;
  brand: string;
  model: string;
  category: string;
  images: string[];
  stockType: 'local' | 'international';
  importStatus?: 'available' | 'pending' | 'in-transit' | 'clearing';
  carCondition: 'new' | 'used' | 'certified';
  mileage?: number;
  color?: string;
  interiorColor?: string;
  vinNumber?: string;
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  currency?: string;
  dealer_name?: string;
  dealer_phone?: string;
  dealer_email?: string;
  dealer_contact?: string;
  registration_number?: string;
  views_count?: number;
  favorites_count?: number;
  favoritedAt: string;
}

export interface FavoritesResponse {
  favorites: FavoriteCar[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FavoriteToggleResponse {
  success: boolean;
  message: string;
  isFavorite: boolean;
}

class FavoritesService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  async addToFavorites(productId: number): Promise<{ success: boolean; message: string }> {
    const url = `${API_CONFIG.BASE_URL}/favorites/${productId}`;
    return await apiRequest(url, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
  }

  async removeFromFavorites(productId: number): Promise<{ success: boolean; message: string }> {
    const url = `${API_CONFIG.BASE_URL}/favorites/${productId}`;
    return await apiRequest(url, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
  }

  async toggleFavorite(productId: number): Promise<FavoriteToggleResponse> {
    const url = `${API_CONFIG.BASE_URL}/favorites/${productId}/toggle`;
    return await apiRequest(url, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
  }

  async getUserFavorites(page: number = 1, limit: number = 20): Promise<FavoritesResponse> {
    const url = `${API_CONFIG.BASE_URL}/favorites?page=${page}&limit=${limit}`;
    return await apiRequest(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
  }

  async getUserFavoriteCount(): Promise<{ count: number }> {
    const url = `${API_CONFIG.BASE_URL}/favorites/count`;
    return await apiRequest(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
  }

  async isFavorite(productId: number): Promise<{ isFavorite: boolean }> {
    const url = `${API_CONFIG.BASE_URL}/favorites/${productId}/status`;
    return await apiRequest(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
  }

  async clearUserFavorites(): Promise<{ success: boolean; message: string }> {
    const url = `${API_CONFIG.BASE_URL}/favorites`;
    return await apiRequest(url, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
  }
}

export default new FavoritesService();
