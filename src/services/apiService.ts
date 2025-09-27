// Consolidated API Service
// This file re-exports all services and provides a unified interface

export * from './currencyService';
export * from './carsService';
export * from '../config/api';

// Re-export service instances for convenience
export { currencyService } from './currencyService';
export { carsService } from './carsService';

// API Service Manager
export class ApiServiceManager {
  private static instance: ApiServiceManager;
  private isOnline: boolean = true;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  private constructor() {
    this.setupOnlineOfflineListeners();
  }

  public static getInstance(): ApiServiceManager {
    if (!ApiServiceManager.instance) {
      ApiServiceManager.instance = new ApiServiceManager();
    }
    return ApiServiceManager.instance;
  }

  /**
   * Check if the API is available
   */
  async checkApiHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/currency/supported`, {
        method: 'GET',
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): { isOnline: boolean; retryCount: number } {
    return {
      isOnline: this.isOnline,
      retryCount: this.retryCount,
    };
  }

  /**
   * Reset retry count
   */
  resetRetryCount(): void {
    this.retryCount = 0;
  }

  /**
   * Increment retry count
   */
  incrementRetryCount(): void {
    this.retryCount++;
  }

  /**
   * Check if should retry
   */
  shouldRetry(): boolean {
    return this.retryCount < this.maxRetries;
  }

  private setupOnlineOfflineListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.retryCount = 0;
      console.log('Connection restored');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('Connection lost');
    });
  }
}

// Export singleton instance
export const apiManager = ApiServiceManager.getInstance();
