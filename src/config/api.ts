// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://192.12.34.44:3001/api',
  ENDPOINTS: {
    // Authentication endpoints
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      PROFILE: '/auth/profile',
      GUEST: '/auth/guest',
    },
    // Currency endpoints
    CURRENCY: {
      RATE: '/currency/rate',
      CONVERT: '/currency/convert',
      QUICK_CONVERT: '/currency/quick-convert',
      BATCH_CONVERT: '/currency/batch-convert',
      SUPPORTED: '/currency/supported',
      SUPPORTED_CHECK: '/currency/supported',
    },
    // Car endpoints
    CARS: {
      ALL: '/cars',
      BY_ID: '/cars/:id',
      IMAGES: '/cars/:id/images',
      FEATURED: '/cars/featured',
      CATEGORIES: '/cars/categories',
      BRANDS: '/cars/brands',
      MODELS: '/cars/models',
        FAVORITE: '/cars/:id/favorite',
        FILTERS: '/cars/filters',
        PRICE_RANGE: '/cars/filters/price-range',
        MILEAGE_RANGE: '/cars/filters/mileage-range',
      },
      // Import Requests endpoints
      IMPORT_REQUESTS: {
        ALL: '/import-requests',
        BY_ID: '/import-requests/:id',
        GUEST: '/import-requests/guest',
        STATISTICS: '/import-requests/statistics',
        PUBLIC_STATISTICS: '/import-requests/public/statistics',
        COMMUNICATIONS: '/import-requests/:id/communications',
    },
  },
  TIMEOUT: 5000, // 5 seconds
  RETRY_ATTEMPTS: 3,
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }
  
  return url;
};

// Retry configuration
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  retryOn: (error: Error) => boolean;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  retryOn: (error: Error) => {
    // Retry on timeout, connection reset, or 5xx server errors
    return (
      error.message.includes('Request timeout') ||
      error.message.includes('ECONNRESET') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('Network request failed') ||
      error.message.includes('Failed to fetch') ||
      /5\d{2}/.test(error.message) // 5xx errors
    );
  }
};

// Exponential backoff delay calculation
const calculateDelay = (attempt: number, baseDelay: number, maxDelay: number): number => {
  const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 0.1 * exponentialDelay; // Add 10% jitter
  return Math.min(exponentialDelay + jitter, maxDelay);
};

// Sleep function for delays
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get JWT token from localStorage
const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem('access_token');
  } catch (error) {
    console.warn('Failed to get auth token:', error);
    return null;
  }
};

// Helper function to make API requests with timeout and retry logic
export const apiRequest = async <T>(
  url: string, 
  options: RequestInit = {},
  retryConfig: Partial<RetryConfig> = {}
): Promise<T> => {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  
  const makeRequest = async (attempt: number): Promise<T> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    // Get auth token and include it in headers if available
    const token = getAuthToken();
    const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
      signal: controller.signal,
    };

    try {
      console.log(`🔄 API Request attempt ${attempt}/${config.maxRetries + 1}: ${url}`);
      
      const response = await fetch(url, { ...defaultOptions, ...options });
      clearTimeout(timeoutId);
      
      // Always try to parse JSON first, even for error responses
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, it might be HTML or other content
        const text = await response.text();
        throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        // If we have structured error data, use it
        if (responseData && typeof responseData === 'object') {
          const errorMessage = responseData.message || responseData.error?.message || `API request failed: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      console.log(`✅ API Request succeeded on attempt ${attempt}: ${url}`);
      return responseData;
    } catch (error) {
      clearTimeout(timeoutId);
      
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = 'Request timeout';
        } else {
          errorMessage = error.message;
        }
      }
      
      const requestError = new Error(errorMessage);
      
      // Check if we should retry
      if (attempt <= config.maxRetries && config.retryOn(requestError)) {
        const delay = calculateDelay(attempt, config.baseDelay, config.maxDelay);
        console.warn(`⚠️ API Request failed on attempt ${attempt}/${config.maxRetries + 1}: ${errorMessage}`);
        console.log(`🔄 Retrying in ${delay}ms...`);
        
        await sleep(delay);
        return makeRequest(attempt + 1);
      }
      
      console.error(`❌ API Request failed after ${attempt} attempts: ${errorMessage}`);
      throw requestError;
    }
  };

  return makeRequest(1);
};
