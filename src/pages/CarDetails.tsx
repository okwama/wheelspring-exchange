import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarImageGallery from "@/components/CarImageGallery";
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
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading car details",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <p className="text-muted-foreground">The car you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6 relative">
              <CarImageGallery 
                exteriorImages={car.exterior_images || []}
                interiorImages={car.interior_images || []}
                carModel={`${car.make} ${car.model}`}
              />
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button size="sm" variant="secondary">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-automotive-navy mb-2">
                    {car.year} {car.make} {car.model}
                  </h1>
                  <div className="flex items-center text-muted-foreground gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {car.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {car.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      {car.mileage?.toLocaleString()} miles
                    </div>
                    <Badge variant={car.type === 'import' ? 'default' : 'secondary'}>
                      {car.type === 'import' ? 'Import' : 'Local'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-automotive-navy">
                    ${car.price?.toLocaleString()}
                  </div>
                  {car.is_featured && <Badge variant="secondary">Featured</Badge>}
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
                    <div className="grid grid-cols-2 gap-3">
                      {car.features && car.features.length > 0 ? (
                        car.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-automotive-navy rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground col-span-2">No features listed.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Make</span>
                          <span className="font-medium">{car.make}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Model</span>
                          <span className="font-medium">{car.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Body Style</span>
                          <span className="font-medium">{car.body_type || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Color</span>
                          <span className="font-medium">{car.color || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transmission</span>
                          <span className="font-medium">{car.transmission || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type</span>
                          <span className="font-medium">{car.type === 'import' ? 'Import' : 'Local'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Type</span>
                          <span className="font-medium">{car.fuel_type || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mileage</span>
                          <span className="font-medium">{car.mileage?.toLocaleString() || 'N/A'} miles</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                        <span>Clean CarFax Report</span>
                      </div>
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
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Seller</CardTitle>
                <CardDescription>{car.contact_name || 'AutoMarket'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {car.contact_phone && (
                    <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
                      <Phone className="h-4 w-4 mr-2" />
                      {car.contact_phone}
                    </Button>
                  )}
                  {car.contact_email && (
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      {car.contact_email}
                    </Button>
                  )}
                  <Button variant="outline" className="w-full">
                    Schedule Viewing
                  </Button>
                  <Button variant="outline" className="w-full">
                    Request More Info
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed</span>
                  <span className="font-medium">
                    {new Date(car.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{car.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">
                    {car.type === 'import' ? 'Import Vehicle' : 'Local Vehicle'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">Available</span>
                </div>
              </CardContent>
            </Card>

            {/* Financing */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Available</CardTitle>
                <CardDescription>Get pre-approved in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-automotive-navy">$642/mo</div>
                  <div className="text-sm text-muted-foreground">Est. payment at 4.5% APR</div>
                </div>
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

export default CarDetails;