import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';
import { getSupportedCurrencies } from '@/utils/currency';
import CurrencySelector from '@/components/ui/CurrencySelector';
import CurrencyInput from '@/components/ui/CurrencyInput';

const CurrencyDemo: React.FC = () => {
  const { currency, setCurrency, formatPrice, isLoading, error } = useCurrency();
  const [demoAmount, setDemoAmount] = React.useState<number>(54900);
  const [formattedDemoPrice, setFormattedDemoPrice] = React.useState<string>('');
  const [formattedCarPrices, setFormattedCarPrices] = React.useState<{[key: number]: string}>({});
  const currencies = getSupportedCurrencies();

  const sampleCars = [
    { name: "2023 BMW X5", price: 65900, currency: "USD" },
    { name: "2022 Mercedes E-Class", price: 54900, currency: "EUR" },
    { name: "2023 Audi A6", price: 47900, currency: "GBP" },
    { name: "2022 Lexus RX", price: 52900, currency: "JPY" },
  ];

  // Format demo price when currency or amount changes
  React.useEffect(() => {
    const formatDemoPrice = async () => {
      try {
        const formatted = await formatPrice(demoAmount);
        setFormattedDemoPrice(formatted);
      } catch (err) {
        console.error('Failed to format demo price:', err);
        setFormattedDemoPrice('KSh 54,900'); // Fallback
      }
    };
    formatDemoPrice();
  }, [currency, demoAmount, formatPrice]);

  // Format car prices when currency changes
  React.useEffect(() => {
    const formatCarPrices = async () => {
      const formatted: {[key: number]: string} = {};
      for (const car of sampleCars) {
        try {
          if (car.currency === currency) {
            const formattedPrice = await formatPrice(car.price);
            formatted[car.price] = formattedPrice;
          }
        } catch (err) {
          console.error('Failed to format car price:', err);
          formatted[car.price] = `${car.currency} ${car.price.toLocaleString()}`;
        }
      }
      setFormattedCarPrices(formatted);
    };
    formatCarPrices();
  }, [currency, formatPrice]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Currency System Demo</CardTitle>
          <CardDescription>Loading currency detection...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🌍 Currency System Demo</CardTitle>
          <CardDescription>
            See how the currency system automatically detects your location and formats prices accordingly.
            {error && <Badge variant="destructive" className="mt-2">{error}</Badge>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Current Currency</label>
              <CurrencySelector
                value={currency}
                onValueChange={setCurrency}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Demo Amount</label>
              <CurrencyInput
                value={demoAmount}
                onValueChange={(value) => setDemoAmount(parseFloat(value || '0'))}
                placeholder="Enter amount"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Formatted Price:</h4>
            <p className="text-2xl font-bold text-automotive-navy">
              {formattedDemoPrice}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🚗 Sample Car Prices</CardTitle>
          <CardDescription>
            See how different car prices are displayed with various currencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sampleCars.map((car, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">{car.name}</h4>
                <p className="text-xl font-bold text-automotive-navy">
                  {car.currency === currency 
                    ? formattedCarPrices[car.price] || 'Loading...'
                    : new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: car.currency,
                        maximumFractionDigits: 0,
                      }).format(car.price)
                  }
                </p>
                {car.currency !== currency && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Original: {car.currency}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔧 How It Works</CardTitle>
          <CardDescription>
            The currency system automatically detects your location and formats prices accordingly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">1. Location Detection</h4>
            <p className="text-sm text-muted-foreground">
              • First tries IP geolocation to detect your country
              • Falls back to browser locale if IP detection fails
              • Supports 100+ countries with smart currency mapping
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">2. Currency Formatting</h4>
            <p className="text-sm text-muted-foreground">
              • Uses native JavaScript Intl.NumberFormat for accurate formatting
              • Respects local currency conventions and symbols
              • Handles different decimal places and grouping separators
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">3. Smart Fallbacks</h4>
            <p className="text-sm text-muted-foreground">
              • If a car has a specific currency, it's displayed as-is
              • Otherwise, uses your detected/preferred currency
              • Graceful degradation for unsupported currencies
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyDemo;
