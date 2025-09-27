import { API_CONFIG, buildApiUrl, apiRequest } from '@/config/api';

// Types
export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: string;
  source: string;
}

export interface ConvertedPrice {
  originalAmount: number;
  convertedAmount: number;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  timestamp: string;
}

export interface BatchConvertedPrices {
  originalAmounts: number[];
  convertedAmounts: number[];
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  timestamp: string;
}

export interface SupportedCurrency {
  code: string;
  name: string;
  symbol: string;
  locale: string;
}

export interface CurrencyServiceConfig {
  defaultCurrency: string;
  fallbackCurrency: string;
  cacheTimeout: number;
}

// Currency Service Class
export class CurrencyService {
  private config: CurrencyServiceConfig;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();

  constructor(config: Partial<CurrencyServiceConfig> = {}) {
    this.config = {
      defaultCurrency: 'USD',
      fallbackCurrency: 'USD',
      cacheTimeout: 300000, // 5 minutes
      ...config,
    };
  }

  /**
   * Get exchange rate between two currencies
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<ExchangeRate> {
    const cacheKey = `rate_${fromCurrency}_${toCurrency}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CURRENCY.RATE, {
        from: fromCurrency,
        to: toCurrency,
      });
      
      const data = await apiRequest<ExchangeRate>(url);
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Failed to get exchange rate:', error);
      throw new Error(`Unable to get exchange rate for ${fromCurrency} to ${toCurrency}`);
    }
  }

  /**
   * Convert amount from one currency to another
   */
  async convertCurrency(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<ConvertedPrice> {
    if (fromCurrency === toCurrency) {
      return {
        originalAmount: amount,
        convertedAmount: amount,
        fromCurrency,
        toCurrency,
        exchangeRate: 1,
        timestamp: new Date().toISOString(),
      };
    }

    const cacheKey = `convert_${amount}_${fromCurrency}_${toCurrency}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CURRENCY.CONVERT);
      
      const data = await apiRequest<ConvertedPrice>(url, {
        method: 'POST',
        body: JSON.stringify({
          amount: Number(amount), // Ensure amount is always a number
          fromCurrency,
          toCurrency,
        }),
      });
      
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Failed to convert currency:', error);
      throw new Error(`Unable to convert ${amount} ${fromCurrency} to ${toCurrency}`);
    }
  }

  /**
   * Quick convert with query parameters
   */
  async quickConvert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<ConvertedPrice> {
    const cacheKey = `quick_${amount}_${fromCurrency}_${toCurrency}`;
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CURRENCY.QUICK_CONVERT, {
        amount: amount.toString(),
        from: fromCurrency,
        to: toCurrency,
      });
      
      const data = await apiRequest<ConvertedPrice>(url);
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Failed to quick convert currency:', error);
      throw new Error(`Unable to convert ${amount} ${fromCurrency} to ${toCurrency}`);
    }
  }

  /**
   * Batch convert multiple amounts
   */
  async batchConvertCurrency(
    amounts: number[],
    fromCurrency: string,
    toCurrency: string
  ): Promise<BatchConvertedPrices> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CURRENCY.BATCH_CONVERT);
      
      const data = await apiRequest<BatchConvertedPrices>(url, {
        method: 'POST',
        body: JSON.stringify({
          amounts,
          fromCurrency,
          toCurrency,
        }),
      });
      
      return data;
    } catch (error) {
      console.error('Failed to batch convert currency:', error);
      throw new Error(`Unable to batch convert ${amounts.length} amounts from ${fromCurrency} to ${toCurrency}`);
    }
  }

  /**
   * Get all supported currencies
   */
  async getSupportedCurrencies(): Promise<SupportedCurrency[]> {
    const cacheKey = 'supported_currencies';
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.CURRENCY.SUPPORTED);
      const data = await apiRequest<SupportedCurrency[]>(url);
      
      this.setCache(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Failed to get supported currencies:', error);
      // Return fallback currencies
      return [
        { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US' },
        { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE' },
        { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB' },
      ];
    }
  }

  /**
   * Check if currency is supported
   */
  async isCurrencySupported(currency: string): Promise<boolean> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.CURRENCY.SUPPORTED_CHECK}/${currency}`);
      const data = await apiRequest<{ supported: boolean }>(url);
      
      return data.supported;
    } catch (error) {
      console.error('Failed to check currency support:', error);
      return false;
    }
  }

  /**
   * Format currency amount
   */
  formatCurrency(amount: number, currency: string, locale?: string): string {
    try {
      const currencyData = this.getCurrencyData(currency);
      const actualLocale = locale || currencyData?.locale || 'en-US';
      
      return new Intl.NumberFormat(actualLocale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      console.error('Failed to format currency:', error);
      return `${currency} ${amount.toLocaleString()}`;
    }
  }

  /**
   * Get currency data from supported currencies
   */
  private getCurrencyData(currency: string): SupportedCurrency | null {
    // This would typically come from cached supported currencies
    const fallbackCurrencies: SupportedCurrency[] = [
      { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US' },
      { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE' },
      { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB' },
      { code: 'JPY', name: 'Japanese Yen', symbol: '¥', locale: 'ja-JP' },
      { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', locale: 'en-CA' },
      { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', locale: 'en-AU' },
      { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', locale: 'de-CH' },
      { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', locale: 'sv-SE' },
      { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', locale: 'nb-NO' },
      { code: 'DKK', name: 'Danish Krone', symbol: 'kr', locale: 'da-DK' },
    ];
    
    return fallbackCurrencies.find(c => c.code === currency) || null;
  }

  /**
   * Cache management
   */
  private getFromCache(key: string): any {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const currencyService = new CurrencyService();

// Export individual functions for convenience
export const getExchangeRate = (from: string, to: string) => 
  currencyService.getExchangeRate(from, to);

export const convertCurrency = (amount: number, from: string, to: string) => 
  currencyService.convertCurrency(amount, from, to);

export const quickConvert = (amount: number, from: string, to: string) => 
  currencyService.quickConvert(amount, from, to);

export const getSupportedCurrencies = () => 
  currencyService.getSupportedCurrencies();

export const formatCurrency = (amount: number, currency: string, locale?: string) => 
  currencyService.formatCurrency(amount, currency, locale);
