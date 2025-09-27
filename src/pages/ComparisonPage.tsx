import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  TrendingUp, 
  Award,
  Car,
  DollarSign,
  Calendar,
  Gauge,
  Palette,
  Shield,
  Eye,
  Heart,
  Plus,
  Trash2
} from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import comparisonService, { ComparisonData } from '@/services/comparisonService';
import { useToast } from '@/components/ui/use-toast';
import PriceDisplay from '@/components/PriceDisplay';

const ComparisonPage = () => {
  const navigate = useNavigate();
  const { comparisonCars, removeFromComparison, clearComparison } = useComparison();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('comparison');

  const comparisonData: ComparisonData = comparisonService.generateComparisonData(comparisonCars);

  const handleRemoveCar = (carId: number) => {
    removeFromComparison(carId);
    toast({
      title: "Car Removed",
      description: "Car has been removed from comparison.",
    });
  };

  const handleClearAll = () => {
    clearComparison();
    toast({
      title: "Comparison Cleared",
      description: "All cars have been removed from comparison.",
    });
  };

  const handleExportCSV = () => {
    try {
      comparisonService.downloadCSV(comparisonData);
      toast({
        title: "Export Successful",
        description: "Comparison data has been exported to CSV.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export comparison data.",
      });
    }
  };

  if (comparisonCars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back Navigation */}
            <div className="mb-6">
              <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Car Comparison</h1>
              <p className="text-gray-600 mt-2">Compare cars side-by-side to make the best decision</p>
            </div>

            <Card>
              <CardContent className="text-center py-16">
                <Car className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">No cars to compare</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Add cars to your comparison to see detailed side-by-side comparisons, 
                  get insights, and make informed decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/cars')} size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Cars
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')} size="lg">
                    Go to Homepage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Car className="h-8 w-8" />
                    Car Comparison
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Comparing {comparisonCars.length} car{comparisonCars.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" onClick={handleClearAll} className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comparison">Detailed Comparison</TabsTrigger>
              <TabsTrigger value="summary">Summary & Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-6">
              {/* Car Headers */}
              <div className="grid gap-6" style={{ gridTemplateColumns: `250px repeat(${comparisonCars.length}, 1fr)` }}>
                <div className="font-semibold text-lg text-gray-700 p-4 bg-gray-100 rounded-lg">
                  Features
                </div>
                {comparisonCars.map((car) => (
                  <div key={car.id} className="relative">
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
                              {car.brand} {car.model}
                            </CardTitle>
                            <p className="text-sm text-gray-500 mb-2">{car.year}</p>
                            <div className="text-lg font-bold text-green-600">
                              <PriceDisplay price={car.price} currency={car.currency} />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCar(car.id)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            ×
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
                            {car.images && car.images.length > 0 ? (
                              <img
                                src={car.images[0]}
                                alt={`${car.brand} ${car.model}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Car className="h-8 w-8" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant={car.carCondition === 'new' ? 'default' : 'secondary'}>
                                {car.carCondition}
                              </Badge>
                              <Badge variant="outline">
                                {car.stockType}
                              </Badge>
                            </div>
                            {car.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{car.rating}/5</span>
                                <span className="text-xs text-gray-500">({car.reviewCount})</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Comparison Features */}
              <div className="space-y-2">
                {comparisonData.features.map((feature, index) => {
                  const hasDifferences = comparisonService.hasDifferences(feature);
                  return (
                    <div
                      key={index}
                      className={`grid gap-6 p-4 rounded-lg ${
                        hasDifferences && feature.highlight ? 'bg-yellow-50 border border-yellow-200' : 'bg-white border border-gray-200'
                      }`}
                      style={{ gridTemplateColumns: `250px repeat(${comparisonCars.length}, 1fr)` }}
                    >
                      <div className="flex items-center gap-3 font-semibold text-gray-700">
                        {feature.name}
                        {hasDifferences && feature.highlight && (
                          <Badge variant="secondary" className="text-xs">
                            Different
                          </Badge>
                        )}
                      </div>
                      {feature.values.map((value, carIndex) => (
                        <div key={carIndex} className="text-gray-900 font-medium">
                          {comparisonService.formatValue(value, feature.type)}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-8">
              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Price Range</p>
                        <p className="text-lg font-bold text-gray-900">
                          {comparisonService.formatValue(comparisonData.summary.priceRange.min, 'currency')} - {' '}
                          {comparisonService.formatValue(comparisonData.summary.priceRange.max, 'currency')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Avg: {comparisonService.formatValue(comparisonData.summary.priceRange.average, 'currency')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Year Range</p>
                        <p className="text-lg font-bold text-gray-900">
                          {comparisonData.summary.yearRange.min} - {comparisonData.summary.yearRange.max}
                        </p>
                        <p className="text-xs text-gray-500">
                          {comparisonData.summary.yearRange.max - comparisonData.summary.yearRange.min} year span
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Top Rated</p>
                        <p className="text-lg font-bold text-gray-900">
                          {comparisonData.summary.topRated?.brand} {comparisonData.summary.topRated?.model}
                        </p>
                        <p className="text-xs text-gray-500">
                          {comparisonData.summary.topRated?.rating}/5 stars
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Best Value</p>
                        <p className="text-lg font-bold text-gray-900">
                          {comparisonData.summary.bestValue?.brand} {comparisonData.summary.bestValue?.model}
                        </p>
                        <p className="text-xs text-gray-500">
                          Best rating/price ratio
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Award className="h-6 w-6 text-yellow-500" />
                      Top Rated Car
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparisonData.summary.topRated && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 bg-gray-100 rounded overflow-hidden">
                            {comparisonData.summary.topRated.images && comparisonData.summary.topRated.images.length > 0 ? (
                              <img
                                src={comparisonData.summary.topRated.images[0]}
                                alt={`${comparisonData.summary.topRated.brand} ${comparisonData.summary.topRated.model}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Car className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">
                              {comparisonData.summary.topRated.brand} {comparisonData.summary.topRated.model}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">
                                {comparisonData.summary.topRated.rating}/5 ({comparisonData.summary.topRated.reviewCount} reviews)
                              </span>
                            </div>
                            <p className="text-lg font-bold text-green-600">
                              <PriceDisplay price={comparisonData.summary.topRated.price} currency={comparisonData.summary.topRated.currency} />
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          {comparisonData.summary.topRated.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                      Best Value Car
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparisonData.summary.bestValue && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 bg-gray-100 rounded overflow-hidden">
                            {comparisonData.summary.bestValue.images && comparisonData.summary.bestValue.images.length > 0 ? (
                              <img
                                src={comparisonData.summary.bestValue.images[0]}
                                alt={`${comparisonData.summary.bestValue.brand} ${comparisonData.summary.bestValue.model}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Car className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">
                              {comparisonData.summary.bestValue.brand} {comparisonData.summary.bestValue.model}
                            </h4>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-500" />
                              <span className="text-lg font-bold text-green-600">
                                <PriceDisplay price={comparisonData.summary.bestValue.price} currency={comparisonData.summary.bestValue.currency} />
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-medium">
                                {comparisonData.summary.bestValue.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">
                          Best rating-to-price ratio in your comparison. This car offers the most value for money.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4 pt-8">
                <Button onClick={() => navigate('/cars')} size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add More Cars
                </Button>
                <Button variant="outline" onClick={handleExportCSV} size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Export Comparison
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ComparisonPage;
