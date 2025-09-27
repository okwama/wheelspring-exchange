import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { currencyService, getSupportedCurrencies, formatCurrency, convertCurrency } from '@/services/apiService';
import { detectCurrencyFromLocale } from '@/utils/currency';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  formatPrice: (amount: number) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('KES'); // Default to KES for Kenya
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-detect currency on app load
  useEffect(() => {
    const detectCurrency = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get supported currencies from API
        const supportedCurrencies = await getSupportedCurrencies();
        
        // Check if user has a saved preference
        const savedCurrency = localStorage.getItem('preferred-currency');
        if (savedCurrency && supportedCurrencies.some(c => c.code === savedCurrency)) {
          setCurrency(savedCurrency);
          setIsLoading(false);
          return;
        }
        
        // Fallback to locale-based detection
        const fallbackCurrency = detectCurrencyFromLocale();
        const validCurrency = supportedCurrencies.some(c => c.code === fallbackCurrency) 
          ? fallbackCurrency 
          : 'KES';
        
        setCurrency(validCurrency);
        localStorage.setItem('preferred-currency', validCurrency);
        
      } catch (err) {
        console.warn('Failed to get supported currencies, using fallback');
        
        // Fallback to locale-based detection
        const fallbackCurrency = detectCurrencyFromLocale();
        setCurrency(fallbackCurrency);
        localStorage.setItem('preferred-currency', fallbackCurrency);
        
        setError('Failed to connect to currency service, using browser locale');
      } finally {
        setIsLoading(false);
      }
    };

    detectCurrency();
  }, []);

  // Format price with current currency
  const formatPrice = async (amount: number): Promise<string> => {
    try {
      // Ensure amount is a valid number
      const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      
      if (isNaN(numericAmount) || numericAmount < 0) {
        console.warn('Invalid amount for currency conversion:', amount);
        return 'Invalid Amount';
      }

      // If currency is KES (default), just format without conversion
      if (currency === 'KES') {
        return new Intl.NumberFormat('en-KE', {
          style: 'currency',
          currency: 'KES',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(numericAmount);
      }

      // Convert from KES to selected currency
      const converted = await convertCurrency(numericAmount, 'KES', currency);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(converted.convertedAmount);
    } catch (error) {
      console.error('Currency conversion failed:', error);
      // Fallback to simple formatting with original amount
      const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      if (isNaN(numericAmount)) {
        return 'Invalid Amount';
      }
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numericAmount);
    }
  };

  // Update currency and save to localStorage
  const updateCurrency = async (newCurrency: string) => {
    try {
      // Validate currency with API
      const supportedCurrencies = await getSupportedCurrencies();
      const isValidCurrency = supportedCurrencies.some(c => c.code === newCurrency);
      
      if (isValidCurrency) {
        setCurrency(newCurrency);
        localStorage.setItem('preferred-currency', newCurrency);
      } else {
        console.warn(`Unsupported currency: ${newCurrency}`);
        setError(`Currency ${newCurrency} is not supported`);
      }
    } catch (error) {
      console.warn('Failed to validate currency, using fallback validation');
      // Fallback validation using common currencies
      const commonCurrencies = ['KES', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'SEK', 'NOK', 'DKK'];
      if (commonCurrencies.includes(newCurrency)) {
        setCurrency(newCurrency);
        localStorage.setItem('preferred-currency', newCurrency);
      } else {
        setError(`Currency ${newCurrency} is not supported`);
      }
    }
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency: updateCurrency,
    formatPrice,
    isLoading,
    error,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use currency context
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

// Custom hook for formatting prices with loading state
export const usePriceFormatter = () => {
  const { currency, formatPrice } = useCurrency();
  const [loading, setLoading] = useState<boolean>(false);
  const [formattedPrices, setFormattedPrices] = useState<Map<number, string>>(new Map());

  const formatPriceWithLoading = async (amount: number): Promise<string> => {
    // Check if we already have this price formatted
    if (formattedPrices.has(amount)) {
      return formattedPrices.get(amount)!;
    }

    setLoading(true);
    try {
      const formatted = await formatPrice(amount);
      setFormattedPrices(prev => new Map(prev).set(amount, formatted));
      return formatted;
    } finally {
      setLoading(false);
    }
  };

  // Clear cache when currency changes
  useEffect(() => {
    setFormattedPrices(new Map());
  }, [currency]);

  return {
    formatPrice: formatPriceWithLoading,
    loading,
    currency,
  };
};

export default CurrencyContext;
