import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSupportedCurrencies, getCurrencySymbol, getCurrencyName } from '@/utils/currency';

interface CurrencySelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showSymbol?: boolean;
  showName?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  value,
  onValueChange,
  placeholder = "Select currency",
  disabled = false,
  className,
  showSymbol = true,
  showName = true,
}) => {
  const currencies = getSupportedCurrencies();

  const formatCurrencyOption = (currency: any) => {
    const parts = [];
    if (showSymbol) parts.push(currency.symbol);
    parts.push(currency.code);
    if (showName) parts.push(`(${currency.name})`);
    return parts.join(' ');
  };

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {formatCurrencyOption(currency)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
