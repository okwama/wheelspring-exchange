import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  X, 
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
  Heart
} from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import comparisonService, { ComparisonData } from '@/services/comparisonService';
import { useToast } from '@/components/ui/use-toast';
import PriceDisplay from '@/components/PriceDisplay';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose }) => {
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
    onClose();
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
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Car Comparison
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No cars to compare</h3>
            <p className="text-gray-600 mb-6">
              Add cars to your comparison to see detailed side-by-side comparisons.
            </p>
            <Button onClick={onClose}>
              Browse Cars
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Car Comparison ({comparisonCars.length} cars)
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                Clear All
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comparison">Detailed Comparison</TabsTrigger>
            <TabsTrigger value="summary">Summary & Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="flex-1 overflow-auto">
            <div className="space-y-4">
              {/* Car Headers */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparisonCars.length}, 1fr)` }}>
                <div className="font-semibold text-sm text-gray-600 p-2">Features</div>
                {comparisonCars.map((car) => (
                  <div key={car.id} className="relative">
                    <Card className="h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-sm font-medium line-clamp-2">
                              {car.brand} {car.model}
                            </CardTitle>
                            <p className="text-xs text-gray-500 mt-1">{car.year}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCar(car.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="h-20 bg-gray-100 rounded overflow-hidden">
                            {car.images && car.images.length > 0 ? (
                              <img
                                src={car.images[0]}
                                alt={`${car.brand} ${car.model}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Car className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-semibold">
                            <PriceDisplay price={car.price} currency={car.currency} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Comparison Features */}
              {comparisonData.features.map((feature, index) => {
                const hasDifferences = comparisonService.hasDifferences(feature);
                return (
                  <div
                    key={index}
                    className={`grid gap-4 p-2 rounded ${
                      hasDifferences && feature.highlight ? 'bg-yellow-50 border border-yellow-200' : ''
                    }`}
                    style={{ gridTemplateColumns: `200px repeat(${comparisonCars.length}, 1fr)` }}
                  >
                    <div className="flex items-center gap-2 font-medium text-sm">
                      {feature.name}
                      {hasDifferences && feature.highlight && (
                        <Badge variant="secondary" className="text-xs">
                          Different
                        </Badge>
                      )}
                    </div>
                    {feature.values.map((value, carIndex) => (
                      <div key={carIndex} className="text-sm">
                        {comparisonService.formatValue(value, feature.type)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="flex-1 overflow-auto">
            <div className="space-y-6">
              {/* Summary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Price Range</p>
                        <p className="text-xs text-gray-600">
                          {comparisonService.formatValue(comparisonData.summary.priceRange.min, 'currency')} - {' '}
                          {comparisonService.formatValue(comparisonData.summary.priceRange.max, 'currency')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Year Range</p>
                        <p className="text-xs text-gray-600">
                          {comparisonData.summary.yearRange.min} - {comparisonData.summary.yearRange.max}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">Top Rated</p>
                        <p className="text-xs text-gray-600">
                          {comparisonData.summary.topRated?.brand} {comparisonData.summary.topRated?.model}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">Best Value</p>
                        <p className="text-xs text-gray-600">
                          {comparisonData.summary.bestValue?.brand} {comparisonData.summary.bestValue?.model}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="h-5 w-5" />
                      Top Rated Car
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparisonData.summary.topRated && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">
                          {comparisonData.summary.topRated.brand} {comparisonData.summary.topRated.model}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">
                            {comparisonData.summary.topRated.rating}/5 ({comparisonData.summary.topRated.reviewCount} reviews)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {comparisonData.summary.topRated.description}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5" />
                      Best Value Car
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparisonData.summary.bestValue && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">
                          {comparisonData.summary.bestValue.brand} {comparisonData.summary.bestValue.model}
                        </h4>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="text-sm">
                            <PriceDisplay price={comparisonData.summary.bestValue.price} currency={comparisonData.summary.bestValue.currency} />
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Best rating-to-price ratio in your comparison
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
