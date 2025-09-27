import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency } from '@/contexts/CurrencyContext';
import { currencyService, getSupportedCurrencies, SupportedCurrency } from '@/services/apiService';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const CurrencyApiTest: React.FC = () => {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [testAmount, setTestAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [conversionResult, setConversionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [supportedCurrencies, setSupportedCurrencies] = useState<SupportedCurrency[]>([]);
  const [formattedPrice, setFormattedPrice] = useState<string>('');

  React.useEffect(() => {
    const loadSupportedCurrencies = async () => {
      try {
        const currencies = await getSupportedCurrencies();
        setSupportedCurrencies(currencies);
      } catch (err) {
        console.error('Failed to load supported currencies:', err);
      }
    };
    loadSupportedCurrencies();
  }, []);

  React.useEffect(() => {
    const loadFormattedPrice = async () => {
      try {
        const formatted = await formatPrice(1000);
        setFormattedPrice(formatted);
      } catch (err) {
        console.error('Failed to format price:', err);
        setFormattedPrice('KSh 1,000'); // Fallback
      }
    };
    loadFormattedPrice();
  }, [currency, formatPrice]);

  const testCurrencyConversion = async () => {
    setIsLoading(true);
    setError(null);
    setConversionResult(null);

    try {
      const result = await currencyService.quickConvert(testAmount, fromCurrency, toCurrency);
      setConversionResult(result);
    } catch (err: any) {
      setError(err.message || 'Conversion failed');
    } finally {
      setIsLoading(false);
    }
  };

  const testExchangeRate = async () => {
    setIsLoading(true);
    setError(null);
    setConversionResult(null);

    try {
      const result = await currencyService.getExchangeRate(fromCurrency, toCurrency);
      setConversionResult(result);
    } catch (err: any) {
      setError(err.message || 'Exchange rate fetch failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Currency API Test</CardTitle>
          <CardDescription>
            Test the real currency API integration with your NestJS backend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Context Currency */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Current Context Currency</h4>
            <div className="text-blue-700">
              Selected: <Badge variant="secondary">{currency}</Badge>
            </div>
            <div className="text-blue-700">
              Formatted Price: <Badge variant="outline">{formattedPrice}</Badge>
            </div>
          </div>

          {/* Test Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={testAmount}
                onChange={(e) => setTestAmount(Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label htmlFor="fromCurrency">From Currency</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {supportedCurrencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="toCurrency">To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {supportedCurrencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.symbol} {curr.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={testCurrencyConversion} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Test Currency Conversion
            </Button>
            <Button 
              onClick={testExchangeRate} 
              disabled={isLoading}
              variant="outline"
              className="flex-1"
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Test Exchange Rate
            </Button>
          </div>

          {/* Results */}
          {conversionResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  API Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(conversionResult, null, 2)}
                </pre>
                
                {conversionResult.convertedAmount && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Conversion Result</h4>
                    <p className="text-green-700">
                      {conversionResult.originalAmount} {conversionResult.fromCurrency} = 
                      {' '}{conversionResult.convertedAmount} {conversionResult.toCurrency}
                    </p>
                    <p className="text-green-600 text-sm">
                      Exchange Rate: {conversionResult.exchangeRate}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {error && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* API Status */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">API Configuration</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Base URL:</strong> http://localhost:3001/api
              </div>
              <div>
                <strong>Supported Currencies:</strong> {supportedCurrencies.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyApiTest;
