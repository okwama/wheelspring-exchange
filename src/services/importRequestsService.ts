import { apiRequest, API_CONFIG } from '@/config/api';
import { authService } from './authService';

export interface ImportRequest {
  id: number;
  userId: number;
  requestType: 'import_request' | 'quote_request';
  status: 'pending' | 'in_progress' | 'quoted' | 'approved' | 'rejected' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Vehicle Information
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleVariant?: string;
  vehicleColor?: string;
  vehicleInteriorColor?: string;
  vehicleCondition: 'new' | 'used' | 'certified';
  vehicleMileage?: number;
  vehicleTransmission?: 'manual' | 'automatic' | 'cvt' | 'semi_automatic';
  vehicleFuelType?: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'lpg' | 'cng';
  vehicleEngineSize?: string;
  vehicleDriveType?: 'fwd' | 'rwd' | 'awd' | '4wd';
  vehicleBodyType?: string;
  vehicleDoors?: number;
  vehicleSeats?: number;
  
  // Import/Quote Details
  sourceCountry?: string;
  destinationCountry: string;
  estimatedPrice?: number;
  quotedPrice?: number;
  currency: string;
  budgetRangeMin?: number;
  budgetRangeMax?: number;
  preferredDeliveryTime: 'asap' | '1_month' | '2_months' | '3_months' | 'flexible';
  specialRequirements?: string;
  
  // Additional Information
  vinNumber?: string;
  registrationNumber?: string;
  currentLocation?: string;
  sellerContact?: string;
  sellerWebsite?: string;
  
  // Request Details
  requestNotes?: string;
  adminNotes?: string;
  quotedBy?: number;
  quotedAt?: string;
  approvedBy?: number;
  approvedAt?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  
  // Relations
  user?: {
    id: number;
    full_name: string;
    email: string;
  };
  documents?: ImportRequestDocument[];
  statusHistory?: ImportRequestStatusHistory[];
  communications?: ImportRequestCommunication[];
}

export interface ImportRequestDocument {
  id: number;
  requestId: number;
  documentType: 'vehicle_photo' | 'vehicle_video' | 'inspection_report' | 'registration_document' | 'insurance_document' | 'other';
  fileName: string;
  filePath: string;
  fileSize?: number;
  mimeType?: string;
  description?: string;
  uploadedAt: string;
}

export interface ImportRequestStatusHistory {
  id: number;
  requestId: number;
  oldStatus?: string;
  newStatus: string;
  changedBy?: number;
  changeReason?: string;
  notes?: string;
  createdAt: string;
}

export interface ImportRequestCommunication {
  id: number;
  requestId: number;
  senderId: number;
  senderType: 'user' | 'admin';
  message: string;
  messageType: 'text' | 'quote' | 'status_update' | 'document' | 'system';
  isInternal: boolean;
  createdAt: string;
}

export interface CreateImportRequestData {
  requestType: 'import_request' | 'quote_request';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  
  // Vehicle Information
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleVariant?: string;
  vehicleColor?: string;
  vehicleInteriorColor?: string;
  vehicleCondition?: 'new' | 'used' | 'certified';
  vehicleMileage?: number;
  vehicleTransmission?: 'manual' | 'automatic' | 'cvt' | 'semi_automatic';
  vehicleFuelType?: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'lpg' | 'cng';
  vehicleEngineSize?: string;
  vehicleDriveType?: 'fwd' | 'rwd' | 'awd' | '4wd';
  vehicleBodyType?: string;
  vehicleDoors?: number;
  vehicleSeats?: number;
  
  // Import/Quote Details
  sourceCountry?: string;
  destinationCountry?: string;
  estimatedPrice?: number;
  currency?: string;
  budgetRangeMin?: number;
  budgetRangeMax?: number;
  preferredDeliveryTime?: 'asap' | '1_month' | '2_months' | '3_months' | 'flexible';
  specialRequirements?: string;
  
  // Additional Information
  vinNumber?: string;
  registrationNumber?: string;
  currentLocation?: string;
  sellerContact?: string;
  sellerWebsite?: string;
  
  // Request Details
  requestNotes?: string;
}

export interface ImportRequestFilters {
  requestType?: 'import_request' | 'quote_request';
  status?: 'pending' | 'in_progress' | 'quoted' | 'approved' | 'rejected' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  sourceCountry?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface ImportRequestStatistics {
  totalRequests: number;
  statusBreakdown: {
    pending: number;
    inProgress: number;
    quoted: number;
    approved: number;
    rejected: number;
  };
  typeBreakdown: {
    importRequests: number;
    quoteRequests: number;
  };
}

export interface CreateCommunicationData {
  message: string;
  messageType?: 'text' | 'quote' | 'status_update' | 'document' | 'system';
  isInternal?: boolean;
}

class ImportRequestsService {
  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  async createImportRequest(data: CreateImportRequestData): Promise<ImportRequest> {
    const url = `${API_CONFIG.BASE_URL}/import-requests`;
    return await apiRequest<ImportRequest>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
  }

  async createGuestImportRequest(data: CreateImportRequestData): Promise<ImportRequest> {
    const url = `${API_CONFIG.BASE_URL}/import-requests/guest`;
    return await apiRequest<ImportRequest>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async getAllImportRequests(filters: ImportRequestFilters = {}): Promise<{
    requests: ImportRequest[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const url = `${API_CONFIG.BASE_URL}/import-requests?${params.toString()}`;
    return await apiRequest(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
  }

  async getImportRequestById(id: number): Promise<ImportRequest> {
    const url = `${API_CONFIG.BASE_URL}/import-requests/${id}`;
    return await apiRequest<ImportRequest>(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
  }

  async updateImportRequest(id: number, data: Partial<CreateImportRequestData>): Promise<ImportRequest> {
    const url = `${API_CONFIG.BASE_URL}/import-requests/${id}`;
    return await apiRequest<ImportRequest>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
  }

  async deleteImportRequest(id: number): Promise<void> {
    const url = `${API_CONFIG.BASE_URL}/import-requests/${id}`;
    return await apiRequest<void>(url, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
  }

  async addCommunication(id: number, data: CreateCommunicationData): Promise<ImportRequestCommunication> {
    const url = `${API_CONFIG.BASE_URL}/import-requests/${id}/communications`;
    return await apiRequest<ImportRequestCommunication>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
  }

  async getStatistics(): Promise<ImportRequestStatistics> {
    const url = `${API_CONFIG.BASE_URL}/import-requests/statistics`;
    return await apiRequest<ImportRequestStatistics>(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
  }

  async getPublicStatistics(): Promise<ImportRequestStatistics> {
    const url = `${API_CONFIG.BASE_URL}/import-requests/public/statistics`;
    return await apiRequest<ImportRequestStatistics>(url, {
      method: 'GET',
    });
  }

  // Helper methods for form validation
  validateVehicleYear(year: number): boolean {
    const currentYear = new Date().getFullYear();
    return year >= 1900 && year <= currentYear + 1;
  }

  validateVIN(vin: string): boolean {
    return vin.length === 17 && /^[A-HJ-NPR-Z0-9]+$/.test(vin);
  }

  validateBudgetRange(min: number, max: number): boolean {
    return min >= 0 && max >= 0 && min <= max;
  }

  formatCurrency(amount: number, currency: string = 'KES'): string {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      quoted: 'bg-purple-100 text-purple-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  }

  getPriorityColor(priority: string): string {
    const priorityColors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return priorityColors[priority] || 'bg-gray-100 text-gray-800';
  }

  getRequestTypeLabel(type: string): string {
    const typeLabels: Record<string, string> = {
      import_request: 'Import Request',
      quote_request: 'Quote Request',
    };
    return typeLabels[type] || type;
  }

  getStatusLabel(status: string): string {
    const statusLabels: Record<string, string> = {
      pending: 'Pending',
      in_progress: 'In Progress',
      quoted: 'Quoted',
      approved: 'Approved',
      rejected: 'Rejected',
      cancelled: 'Cancelled',
    };
    return statusLabels[status] || status;
  }

  getPriorityLabel(priority: string): string {
    const priorityLabels: Record<string, string> = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent',
    };
    return priorityLabels[priority] || priority;
  }
}

const importRequestsService = new ImportRequestsService();
export default importRequestsService;
