import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Calendar, Gauge, Fuel } from "lucide-react";

interface CarCardProps {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
  condition: "new" | "used";
  fuelType: string;
  transmission: string;
}

const CarCard = ({ 
  make, 
  model, 
  year, 
  price, 
  mileage, 
  location, 
  image, 
  condition,
  fuelType,
  transmission 
}: CarCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (miles: number) => {
    return new Intl.NumberFormat('en-US').format(miles);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={`${year} ${make} ${model}`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge 
            variant={condition === "new" ? "default" : "secondary"}
            className={condition === "new" ? "bg-automotive-success" : "bg-automotive-silver text-automotive-dark"}
          >
            {condition.toUpperCase()}
          </Badge>
        </div>
        <Button 
          size="sm" 
          variant="ghost" 
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-automotive-dark mb-1">
            {year} {make} {model}
          </h3>
          <p className="text-3xl font-bold text-automotive-navy">
            {formatPrice(price)}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Gauge className="h-4 w-4 mr-2 text-automotive-accent" />
            <span>{formatMileage(mileage)} miles</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Fuel className="h-4 w-4 mr-2 text-automotive-accent" />
            <span>{fuelType} • {transmission}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-automotive-accent" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-automotive-navy hover:bg-automotive-dark">
            View Details
          </Button>
          <Button variant="outline" className="border-automotive-navy text-automotive-navy hover:bg-automotive-navy hover:text-white">
            Contact Seller
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;