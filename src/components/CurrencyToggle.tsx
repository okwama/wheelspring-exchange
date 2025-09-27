import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';
import { getSupportedCurrencies, SupportedCurrency } from '@/services/apiService';
import { Skeleton } from '@/components/ui/skeleton';

const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency, isLoading } = useCurrency();
  const [currencies, setCurrencies] = useState<SupportedCurrency[]>([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const supportedCurrencies = await getSupportedCurrencies();
        setCurrencies(supportedCurrencies);
      } catch (error) {
        console.error('Failed to load currencies:', error);
        // Fallback currencies
        setCurrencies([
          { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', locale: 'en-KE' },
          { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US' },
          { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE' },
          { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB' },
        ]);
      } finally {
        setLoadingCurrencies(false);
      }
    };

    loadCurrencies();
  }, []);

  if (isLoading || loadingCurrencies) {
    return (
      <Skeleton className="w-20 h-10 rounded" />
    );
  }

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-20 h-10 border-automotive-silver hover:border-automotive-navy">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((curr) => (
          <SelectItem key={curr.code} value={curr.code}>
            {curr.symbol} {curr.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencyToggle;
