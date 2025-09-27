import React, { useState, useEffect } from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Skeleton } from '@/components/ui/skeleton';

interface PriceDisplayProps {
  amount: number;
  currency?: string; // Optional currency override
  className?: string;
  loadingClassName?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ 
  amount, 
  currency: propCurrency, 
  className = "",
  loadingClassName = "text-gray-400"
}) => {
  const { currency: contextCurrency, formatPrice } = useCurrency();
  const [displayPrice, setDisplayPrice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const targetCurrency = propCurrency || contextCurrency;

  useEffect(() => {
    const formatAndDisplayPrice = async () => {
      setIsLoading(true);
      try {
        const formatted = await formatPrice(amount);
        setDisplayPrice(formatted);
      } catch (error) {
        console.error('Failed to format price:', error);
        // Fallback to simple formatting
        setDisplayPrice(new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: targetCurrency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount));
      } finally {
        setIsLoading(false);
      }
    };

    formatAndDisplayPrice();
  }, [amount, targetCurrency, formatPrice]);

  if (isLoading) {
    return (
      <Skeleton className={`${loadingClassName} inline-block min-w-[80px] h-[1.2em]`} />
    );
  }

  return <span className={className}>{displayPrice}</span>;
};

export default PriceDisplay;
