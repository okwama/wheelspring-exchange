import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Calendar, Gauge, Fuel, Globe, CheckCircle, Clock, Truck, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useComparison } from "@/contexts/ComparisonContext";
import PriceDisplay from "./PriceDisplay";
import favoritesService from "@/services/favoritesService";
import { Car } from "@/services/carsService";

interface CarCardProps {
  id: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
  condition: "new" | "used";
  fuelType: string;
  transmission: string;
  stockType?: "local" | "international";
  country?: string;
  currency?: string;
  importStatus?: "available" | "pending" | "in-transit";
  isFavorite?: boolean;
  onFavoriteToggle?: (productId: number, isFavorite: boolean) => void;
}

const CarCard = ({ 
  id,
  make, 
  model, 
  variant,
  year, 
  price, 
  mileage, 
  location, 
  image, 
  condition, 
  fuelType, 
  transmission,
  stockType,
  country,
  currency,
  importStatus,
  isFavorite = false,
  onFavoriteToggle
}: CarCardProps) => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { addToComparison, isInComparison, canAddToComparison, comparisonCars } = useComparison();
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Login Required",
        description: "Please log in to add cars to your favorites.",
      });
      return;
    }

    setFavoriteLoading(true);
    try {
      const response = await favoritesService.toggleFavorite(parseInt(id));
      setIsFavorited(response.isFavorite);
      
      if (onFavoriteToggle) {
        onFavoriteToggle(parseInt(id), response.isFavorite);
      }

      toast({
        title: response.isFavorite ? "Added to Favorites" : "Removed from Favorites",
        description: response.message,
      });
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update favorites",
      });
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const carId = parseInt(id);
    
    if (isInComparison(carId)) {
      toast({
        title: "Already in Comparison",
        description: "This car is already in your comparison list.",
      });
      return;
    }

    if (!canAddToComparison) {
      toast({
        variant: "destructive",
        title: "Comparison Limit Reached",
        description: `You can compare up to ${comparisonCars.length} cars at a time.`,
      });
      return;
    }

    // Create a Car object from the props
    const car: Car = {
      id: carId,
      name: `${make} ${model}`,
      description: `${year} ${make} ${model}`,
      price: price,
      year: year,
      brand: make,
      model: model,
      category: 'Car',
      images: image ? [image] : [],
      stockType: stockType || 'local',
      importStatus: importStatus || 'available',
      carCondition: condition,
      mileage: mileage,
      color: 'Unknown',
      interiorColor: 'Unknown',
      vinNumber: null,
      isFeatured: false,
      isActive: true,
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currency: currency || 'KES',
      dealer_name: 'Dealer',
      dealer_phone: '',
      dealer_email: '',
      dealer_contact: null,
      registration_number: null,
      views_count: 0,
      favorites_count: 0,
      // 'isFavorite' is not a property of Car, so we remove it to fix the type error
    };

    addToComparison(car);
    toast({
      title: "Added to Comparison",
      description: `${make} ${model} has been added to your comparison.`,
    });
  };

  const formatMileage = (miles: number) => {
    return new Intl.NumberFormat('en-US').format(miles);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 gold-hover-effect">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={`${year} ${make} ${model}`}
          loading="lazy"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge 
            variant={condition === "new" ? "default" : "secondary"}
            className={condition === "new" ? "bg-automotive-success" : "bg-automotive-silver text-automotive-dark"}
          >
            {condition.toUpperCase()}
          </Badge>
          {stockType === "international" && (
            <Badge 
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              <Globe className="h-3 w-3 mr-1" />
              Import
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className={`bg-white/90 hover:bg-white transition-colors ${
              isInComparison(parseInt(id)) ? 'text-blue-500' : 'text-gray-700 hover:text-blue-500'
            }`}
            onClick={handleCompareToggle}
            title={isInComparison(parseInt(id)) ? 'In comparison' : 'Add to comparison'}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className={`bg-white/90 hover:bg-white transition-colors ${
              isFavorited ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
            }`}
            onClick={handleFavoriteToggle}
            disabled={favoriteLoading}
            title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-automotive-dark mb-1 line-clamp-2">
            {year} {make} {model}
          </h3>
          {variant && (
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-1">
              {variant}
            </p>
          )}
          <div className="text-2xl sm:text-3xl font-bold text-automotive-navy">
            <PriceDisplay amount={price} currency={currency} />
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Gauge className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-automotive-accent flex-shrink-0" />
            <span className="truncate">{formatMileage(mileage)} miles</span>
          </div>
          
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Fuel className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-automotive-accent flex-shrink-0" />
            <span className="truncate">{fuelType} • {transmission}</span>
          </div>

          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-automotive-accent flex-shrink-0" />
            <span className="truncate">{location}</span>
            {country && stockType === "international" && (
              <span className="ml-1 sm:ml-2 text-xs text-blue-600">({country})</span>
            )}
          </div>
          
          {stockType === "international" && importStatus && (
            <div className="flex items-center text-sm text-gray-600">
              {importStatus === "available" && <CheckCircle className="h-4 w-4 mr-2 text-green-500" />}
              {importStatus === "pending" && <Clock className="h-4 w-4 mr-2 text-yellow-500" />}
              {importStatus === "in-transit" && <Truck className="h-4 w-4 mr-2 text-blue-500" />}
              <span className="text-xs">
                {importStatus === "available" && "Available Now"}
                {importStatus === "pending" && "Pending Import"}
                {importStatus === "in-transit" && "In Transit"}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Link to={`/car/${id}`} className="flex-1">
            <Button className="w-full bg-automotive-navy hover:bg-automotive-dark text-sm sm:text-base">
              View Details
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="border-automotive-navy text-automotive-navy hover:bg-automotive-navy hover:text-white text-sm sm:text-base"
            size="sm"
          >
            <span className="hidden sm:inline">Contact Seller</span>
            <span className="sm:hidden">Contact</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;