import { API_CONFIG, apiRequest } from '@/config/api';

export interface Car {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  year: number;
  brand: string;
  model: string;
  category: string;
  images: string[];
  // New categorized image properties
  exteriorImages: string[];
  interiorImages: string[];
  exterior360?: string;
  interior360?: string;
  engineImages: string[];
  dashboardImages: string[];
  otherImages: string[];
  stockType: 'local' | 'international';
  importStatus?: 'available' | 'pending' | 'in-transit' | 'clearing';
  carCondition: 'new' | 'used' | 'certified';
  mileage?: number;
  color?: string;
  origin?: string;
  interiorColor?: string;
  vinNumber?: string;
  isFeatured: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  // Additional fields from database
  currency?: string;
  dealer_name?: string;
  dealer_phone?: string;
  dealer_email?: string;
  dealer_contact?: string;
  whatsappNumber?: string;
  registration_number?: string;
  views_count?: number;
  favorites_count?: number;
  isFavorite?: boolean;
  
  // Enhanced pricing and inventory
  stockStatus?: string;
  unitsAvailable?: number;
  showroomLocation?: string;
  negotiable?: boolean;
  priceType?: string;
  minPrice?: number;
  maxPrice?: number;
  
  // Detailed specifications
  engineSize?: string;
  displacement?: number;
  cylinders?: number;
  compressionRatio?: string;
  horsepower?: number;
  torque?: number;
  topSpeed?: number;
  acceleration?: string;
  towingCapacity?: number;
  transmission?: string;
  fuelType?: string;
  driveType?: string;
  doors?: number;
  seating?: number;
  
  // Dimensions and weight
  curbWeight?: number;
  grossWeight?: number;
  length?: number;
  width?: number;
  height?: number;
  wheelbase?: number;
  groundClearance?: number;
  
  // Fuel economy details
  fuelCapacity?: number;
  cityFuelEconomy?: string;
  highwayFuelEconomy?: string;
  combinedFuelEconomy?: string;
  fuelEconomy?: string;
  co2Emissions?: number;
  
  // Safety and warranty
  euroNcapRating?: string;
  safetyRating?: string;
  warrantyYears?: number;
  warrantyKm?: number;
  
  // Features
  features?: string[];
}

export interface CarFilters {
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
  search?: string;
  stockType?: 'local' | 'international';
  importStatus?: 'available' | 'pending' | 'in-transit' | 'clearing';
  carCondition?: 'new' | 'used' | 'certified';
  color?: string;
  interiorColor?: string;
  minMileage?: number;
  maxMileage?: number;
  minRating?: number;
  sortBy?: 'price' | 'year' | 'mileage' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface CarListResponse {
  cars: Car[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: number;
  name: string;
  isActive: boolean;
  categoryId?: number;
  logo?: string;
  description?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Model {
  id: number;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  year?: number;
  engineType?: string;
  transmission?: string;
  fuelType?: string;
  bodyType?: string;
  brandId?: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

class CarsService {
  /**
   * Get all cars with optional filters
   */
  async getAllCars(filters: CarFilters = {}): Promise<CarListResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.ALL}?${queryParams.toString()}`;
    
    return await apiRequest<CarListResponse>(url, {
      method: 'GET',
    });
  }

  /**
   * Get featured cars
   */
  async getFeaturedCars(limit: number = 6): Promise<Car[]> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.FEATURED}?limit=${limit}`;
    
    return await apiRequest<Car[]>(url, {
      method: 'GET',
    });
  }

  /**
   * Get car by ID
   */
  async getCarById(id: number): Promise<Car> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.BY_ID.replace(':id', id.toString())}`;
    
    return await apiRequest<Car>(url, {
      method: 'GET',
    }, {
      maxRetries: 5, // More retries for individual car requests
      baseDelay: 1500, // Slightly longer delay
      maxDelay: 15000, // Up to 15 seconds delay
    });
  }

  /**
   * Get car images
   */
  async getCarImages(id: number): Promise<string[]> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.IMAGES.replace(':id', id.toString())}`;
    
    return await apiRequest<string[]>(url, {
      method: 'GET',
    });
  }

  /**
   * Get categories
   */
  async getCategories(): Promise<Category[]> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.CATEGORIES}`;
    
    return await apiRequest<Category[]>(url, {
      method: 'GET',
    });
  }

  /**
   * Get brands
   */
  async getBrands(categoryId?: number): Promise<Brand[]> {
    const queryParams = categoryId ? `?categoryId=${categoryId}` : '';
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.BRANDS}${queryParams}`;
    
    return await apiRequest<Brand[]>(url, {
      method: 'GET',
    });
  }

  /**
   * Get models
   */
  async getModels(brandId?: number): Promise<Model[]> {
    const queryParams = brandId ? `?brandId=${brandId}` : '';
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.MODELS}${queryParams}`;
    
    return await apiRequest<Model[]>(url, {
      method: 'GET',
    });
  }

  /**
   * Toggle favorite (requires authentication)
   */
  async toggleFavorite(carId: number, token: string): Promise<{ success: boolean; message: string }> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.FAVORITE.replace(':id', carId.toString())}`;
    
    return await apiRequest<{ success: boolean; message: string }>(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  /**
   * Get available filter options
   */
  async getFilterOptions() {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.FILTERS}`;
    
    return await apiRequest<{
      colors: string[];
      interiorColors: string[];
      years: number[];
      conditions: string[];
      stockTypes: string[];
      importStatuses: string[];
    }>(url, {
      method: 'GET',
    });
  }

  /**
   * Get price range statistics
   */
  async getPriceRange() {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.PRICE_RANGE}`;
    
    return await apiRequest<{
      minPrice: number;
      maxPrice: number;
    }>(url, {
      method: 'GET',
    });
  }

  /**
   * Get mileage range statistics
   */
  async getMileageRange() {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARS.MILEAGE_RANGE}`;
    
    return await apiRequest<{
      minMileage: number;
      maxMileage: number;
    }>(url, {
      method: 'GET',
    });
  }
}

const carsService = new CarsService();
export default carsService;
export { carsService };