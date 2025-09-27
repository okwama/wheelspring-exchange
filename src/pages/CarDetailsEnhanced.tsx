import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarImageGallery from "@/components/CarImageGallery";
import PageLoading from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Cog, 
  Shield,
  Phone,
  Mail,
  Star,
  MessageCircle,
  Car as CarIcon,
  Zap,
  Weight,
  Ruler
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PriceDisplay from "@/components/PriceDisplay";
import carsService, { Car } from "@/services/carsService";
import favoritesService from "@/services/favoritesService";
import { useAuth } from "@/contexts/AuthContext";

const CarDetailsEnhanced = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const carData = await carsService.getCarById(parseInt(id));
        setCar(carData);
        setIsFavorite(carData.isFavorite || false);
      } catch (error: any) {
        console.error("Error fetching car:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch car details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, toast]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save favorites",
        variant: "destructive",
      });
      return;
    }

    if (!car || favoriteLoading) return;

    try {
      setFavoriteLoading(true);
      if (isFavorite) {
        await favoritesService.removeFavorite(car.id);
        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
          description: "Vehicle has been removed from your favorites",
        });
      } else {
        await favoritesService.addFavorite(car.id);
        setIsFavorite(true);
        toast({
          title: "Added to favorites",
          description: "Vehicle has been added to your favorites",
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) return <PageLoading />;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <CarImageGallery images={car.images || []} />
            
            {/* Car Info Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{car.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {car.origin || 'Location not specified'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {car.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      {car.mileage?.toLocaleString()} miles
                    </div>
                    <Badge variant={car.stockType === 'international' ? 'default' : 'secondary'}>
                      {car.stockType === 'international' ? 'Import' : 'Local'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  {car.price === 0 || car.priceType === 'quote_only' ? (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-automotive-navy">
                        Request Quote
                      </div>
                      <div className="text-sm text-gray-600">
                        Contact for pricing
                      </div>
                      {car.minPrice && car.maxPrice && (
                        <div className="text-xs text-gray-500">
                          Est: <PriceDisplay amount={car.minPrice} currency={car.currency} /> - <PriceDisplay amount={car.maxPrice} currency={car.currency} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-automotive-navy">
                        <PriceDisplay amount={car.price} currency={car.currency} />
                      </div>
                      {car.negotiable && (
                        <div className="text-sm text-gray-600">Negotiable</div>
                      )}
                    </div>
                  )}
                  {car.isFeatured && <Badge variant="secondary">Featured</Badge>}
                  {car.stockStatus && (
                    <Badge variant={car.stockStatus === 'available' ? 'default' : 'destructive'} className="ml-2">
                      {car.stockStatus.replace('_', ' ').toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specs</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {car.description || 'No description available.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Features & Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {car.features && car.features.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {car.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-automotive-navy rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Features and specifications are available upon request. Contact the dealer for detailed information about this vehicle's features and options.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Engine & Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Engine & Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engine Size</span>
                        <span className="font-medium">{car.engineSize || 'N/A'}</span>
                      </div>
                      {car.displacement && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Displacement</span>
                          <span className="font-medium">{car.displacement}L</span>
                        </div>
                      )}
                      {car.cylinders && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cylinders</span>
                          <span className="font-medium">{car.cylinders}</span>
                        </div>
                      )}
                      {car.compressionRatio && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Compression Ratio</span>
                          <span className="font-medium">{car.compressionRatio}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Horsepower</span>
                        <span className="font-medium">{car.horsepower ? `${car.horsepower} HP` : 'N/A'}</span>
                      </div>
                      {car.torque && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Torque</span>
                          <span className="font-medium">{car.torque} Nm</span>
                        </div>
                      )}
                      {car.topSpeed && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Top Speed</span>
                          <span className="font-medium">{car.topSpeed} km/h</span>
                        </div>
                      )}
                      {car.acceleration && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">0-100 km/h</span>
                          <span className="font-medium">{car.acceleration}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transmission</span>
                        <span className="font-medium">{car.transmission || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Drive Type</span>
                        <span className="font-medium">{car.driveType || 'N/A'}</span>
                      </div>
                      {car.towingCapacity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Towing Capacity</span>
                          <span className="font-medium">{car.towingCapacity.toLocaleString()} kg</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Vehicle Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CarIcon className="h-5 w-5" />
                        Vehicle Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Make</span>
                        <span className="font-medium">{car.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model</span>
                        <span className="font-medium">{car.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year</span>
                        <span className="font-medium">{car.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition</span>
                        <span className="font-medium">{car.carCondition || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Doors</span>
                        <span className="font-medium">{car.doors || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Seating</span>
                        <span className="font-medium">{car.seating ? `${car.seating} seats` : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Color</span>
                        <span className="font-medium">{car.color || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interior Color</span>
                        <span className="font-medium">{car.interiorColor || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel Type</span>
                        <span className="font-medium">{car.fuelType || 'N/A'}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dimensions & Weight */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Ruler className="h-5 w-5" />
                        Dimensions & Weight
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {car.length && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Length</span>
                          <span className="font-medium">{car.length.toLocaleString()} mm</span>
                        </div>
                      )}
                      {car.width && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Width</span>
                          <span className="font-medium">{car.width.toLocaleString()} mm</span>
                        </div>
                      )}
                      {car.height && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Height</span>
                          <span className="font-medium">{car.height.toLocaleString()} mm</span>
                        </div>
                      )}
                      {car.wheelbase && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Wheelbase</span>
                          <span className="font-medium">{car.wheelbase.toLocaleString()} mm</span>
                        </div>
                      )}
                      {car.groundClearance && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ground Clearance</span>
                          <span className="font-medium">{car.groundClearance} mm</span>
                        </div>
                      )}
                      {car.curbWeight && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Curb Weight</span>
                          <span className="font-medium">{car.curbWeight.toLocaleString()} kg</span>
                        </div>
                      )}
                      {car.grossWeight && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Gross Weight</span>
                          <span className="font-medium">{car.grossWeight.toLocaleString()} kg</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Fuel Economy & Environment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Fuel className="h-5 w-5" />
                        Fuel & Environment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {car.fuelCapacity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Capacity</span>
                          <span className="font-medium">{car.fuelCapacity}L</span>
                        </div>
                      )}
                      {car.cityFuelEconomy && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">City Fuel Economy</span>
                          <span className="font-medium">{car.cityFuelEconomy}</span>
                        </div>
                      )}
                      {car.highwayFuelEconomy && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Highway Fuel Economy</span>
                          <span className="font-medium">{car.highwayFuelEconomy}</span>
                        </div>
                      )}
                      {car.combinedFuelEconomy && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Combined Fuel Economy</span>
                          <span className="font-medium">{car.combinedFuelEconomy}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel Economy (Legacy)</span>
                        <span className="font-medium">{car.fuelEconomy || 'N/A'}</span>
                      </div>
                      {car.co2Emissions && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CO2 Emissions</span>
                          <span className="font-medium">{car.co2Emissions} g/km</span>
                        </div>
                      )}
                      {car.euroNcapRating && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Euro NCAP Rating</span>
                          <span className="font-medium">{car.euroNcapRating}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Safety Rating</span>
                        <span className="font-medium">{car.safetyRating || 'N/A'}</span>
                      </div>
                      {car.warrantyYears && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Warranty</span>
                          <span className="font-medium">
                            {car.warrantyYears} years
                            {car.warrantyKm && ` / ${car.warrantyKm.toLocaleString()} km`}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span>No Accidents Reported</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span>Single Owner</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span>Regular Maintenance Records</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Seller</CardTitle>
                <CardDescription>{car.dealer_name || 'Gold Standard Cars'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Enhanced Pricing and Availability Section */}
                {car.showroomLocation && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{car.showroomLocation}</span>
                    </div>
                    {car.unitsAvailable && car.unitsAvailable > 1 && (
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-600">Units Available:</span>
                        <span className="font-medium">{car.unitsAvailable}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  {car.price === 0 || car.priceType === 'quote_only' ? (
                    <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Request Quote
                    </Button>
                  ) : (
                    <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Dealer
                    </Button>
                  )}
                  
                  {car.dealer_phone && (
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      {car.dealer_phone}
                    </Button>
                  )}
                  
                  {car.dealer_email && (
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      {car.dealer_email}
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Test Drive
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed</span>
                  <span className="font-medium">
                    {new Date(car.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{car.showroomLocation || 'Nairobi, Kenya'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">
                    {car.stockType === 'international' ? 'Import Vehicle' : 'Local Vehicle'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium capitalize">
                    {car.stockStatus?.replace('_', ' ') || 'Available'}
                  </span>
                </div>
                {car.warrantyYears && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Warranty</span>
                    <span className="font-medium">{car.warrantyYears} years</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Financing */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Available</CardTitle>
                <CardDescription>Get pre-approved in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                {car.price > 0 && car.priceType !== 'quote_only' ? (
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-automotive-navy">
                      <PriceDisplay amount={Math.round(car.price * 0.025)} currency={car.currency} />/mo
                    </div>
                    <div className="text-sm text-muted-foreground">Est. payment at 4.5% APR</div>
                  </div>
                ) : (
                  <div className="text-center mb-4">
                    <div className="text-lg font-medium text-automotive-navy">
                      Custom Financing
                    </div>
                    <div className="text-sm text-muted-foreground">Contact us for financing options</div>
                  </div>
                )}
                <Button variant="outline" className="w-full">
                  Calculate Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetailsEnhanced;
