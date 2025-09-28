import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CarDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [similarCars, setSimilarCars] = useState<Car[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Car[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [downPayment, setDownPayment] = useState<number>(0);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [apr, setApr] = useState<number>(12);

  const loanPrincipal = Math.max(0, (car?.price || 0) - downPayment);
  const monthlyRate = apr > 0 ? apr / 100 / 12 : 0;
  const monthlyPayment = monthlyRate > 0 && termMonths > 0
    ? (loanPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))
    : (termMonths > 0 ? loanPrincipal / termMonths : 0);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Fetch car data from API
        const carData = await carsService.getCarById(parseInt(id));
        setCar(carData);
        setIsFavorite(carData.isFavorite || false);

        // Track recently viewed (store minimal data; fetch full via API where possible)
        try {
          const key = 'recentlyViewedCars';
          const stored = localStorage.getItem(key);
          const list: { id: number; name: string; brand: string; model: string; image?: string }[] = stored ? JSON.parse(stored) : [];
          const thumbnail = (carData.exteriorImages && carData.exteriorImages[0]) || (carData.images && carData.images[0]);
          const next = [{ id: carData.id, name: carData.name, brand: carData.brand, model: carData.model, image: thumbnail }, ...list.filter(x => x.id !== carData.id)].slice(0, 10);
          localStorage.setItem(key, JSON.stringify(next));
        } catch {}
      } catch (error: any) {
        console.error("Error fetching car:", error);
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

  useEffect(() => {
    const loadAuxiliary = async () => {
      if (!car) return;
      // Similar cars by brand/model/category
      try {
        const resp = await carsService.getAllCars({ brand: car.brand, category: car.category, limit: 8 });
        const filtered = resp.cars.filter(c => c.id !== car.id).slice(0, 8);
        setSimilarCars(filtered);
      } catch {}

      // Recently viewed - try to enrich by fetching details if needed
      try {
        const stored = localStorage.getItem('recentlyViewedCars');
        if (stored) {
          const list: { id: number }[] = JSON.parse(stored);
          const ids = list.map(x => x.id).filter(x => x !== car.id).slice(0, 8);
          if (ids.length > 0) {
            // Fetch by filters: since we don't have batch by IDs, load broadly then filter
            const recentResp = await carsService.getAllCars({ limit: 24 });
            const byId = new Map(recentResp.cars.map(c => [c.id, c] as const));
            setRecentlyViewed(ids.map(i => byId.get(i)).filter(Boolean) as Car[]);
          } else {
            setRecentlyViewed([]);
          }
        }
      } catch {}
    };
    loadAuxiliary();
  }, [car]);

  const handleFavoriteToggle = async () => {
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
      const response = await favoritesService.toggleFavorite(parseInt(id!));
      setIsFavorite(response.isFavorite);
      
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

  const formatPhoneForWhatsApp = (phone?: string): string | null => {
    if (!phone) return null;
    let digits = phone.replace(/[^\d]/g, "");
    // If Kenyan local starting with 0 and length 10 -> prefix 254
    if (digits.startsWith("0") && digits.length === 10) {
      digits = "254" + digits.slice(1);
    }
    // If already starts with country code like 254 and length >= 11, keep as is
    if (digits.length >= 11) {
      return digits;
    }
    return digits || null;
  };

  const handleWhatsAppClick = () => {
    const formatted = formatPhoneForWhatsApp(car?.whatsappNumber || car?.dealer_phone);
    const text = encodeURIComponent(
      `Hi, I'm interested in the ${car?.year} ${car?.brand} ${car?.model} (ID: ${car?.id}). Is it still available?`
    );
    const url = formatted
      ? `https://wa.me/${formatted}?text=${text}`
      : `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return <PageLoading message="Loading car details..." />;
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
      <Helmet>
        <title>{`${car.year} ${car.brand} ${car.model} | Gold Standard Cars`}</title>
        <meta name="description" content={`${car.year} ${car.brand} ${car.model} - ${car.carCondition || 'Condition'} ${car.mileage ? `| ${car.mileage.toLocaleString()} km` : ''}`} />
        <link rel="canonical" href={`${window.location.origin}/car/${car.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${car.year} ${car.brand} ${car.model}`} />
        <meta property="og:description" content={`Price: ${car.price > 0 ? '' : 'Request Quote'} ${car.price > 0 ? '' : ''}`} />
        <meta property="og:image" content={(car.exteriorImages && car.exteriorImages[0]) || (car.images && car.images[0]) || ''} />
        <meta property="og:url" content={`${window.location.origin}/car/${car.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${car.year} ${car.brand} ${car.model}`,
            brand: car.brand,
            model: car.model,
            description: car.description,
            image: (car.exteriorImages && car.exteriorImages[0]) || (car.images && car.images[0]) || undefined,
            offers: car.price > 0 ? {
              "@type": "Offer",
              priceCurrency: car.currency || 'KES',
              price: car.price,
              availability: car.stockStatus === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
            } : undefined
          })}
        </script>
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6 relative">
              <CarImageGallery 
                exteriorImages={car.exteriorImages || []}
                interiorImages={car.interiorImages || []}
                exterior360={car.exterior360}
                interior360={car.interior360}
                carModel={`${car.brand} ${car.model}`}
              />
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button 
                  size="sm" 
                  variant={isFavorite ? "default" : "secondary"}
                  onClick={handleFavoriteToggle}
                  disabled={favoriteLoading}
                  className={isFavorite ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
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
                    {car.year} {car.brand} {car.model}
                  </h1>
                  <div className="flex items-center text-muted-foreground gap-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Nairobi
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
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
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
                          <span className="text-muted-foreground">Engine Size</span>
                          <span className="font-medium">{car.engineSize || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Horsepower</span>
                          <span className="font-medium">{car.horsepower ? `${car.horsepower} HP` : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transmission</span>
                          <span className="font-medium">{car.transmission || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Type</span>
                          <span className="font-medium">{car.fuelType || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Drive Type</span>
                          <span className="font-medium">{car.driveType || 'N/A'}</span>
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
                          <span className="text-muted-foreground">Fuel Economy</span>
                          <span className="font-medium">{car.fuelEconomy || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Safety Rating</span>
                          <span className="font-medium">{car.safetyRating || 'N/A'}</span>
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
                          <span className="text-muted-foreground">Mileage</span>
                          <span className="font-medium">{car.mileage ? car.mileage.toLocaleString() + ' km' : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">VIN Number</span>
                          <span className="font-medium">{car.vinNumber || 'N/A'}</span>
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
          {/* Below Tabs: Similar Vehicles & Recently Viewed */}
          <div className="space-y-8 mt-8">
            {similarCars.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">Similar Vehicles</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {similarCars.map(sim => (
                    <a key={sim.id} href={`/car/${sim.id}`} className="block border rounded-lg overflow-hidden hover:shadow-sm transition">
                      <div className="h-40 bg-gray-100 overflow-hidden">
                        {/* simple image fallback */}
                        {((sim.exteriorImages && sim.exteriorImages[0]) || (sim.images && sim.images[0])) ? (
                          <img src={(sim.exteriorImages && sim.exteriorImages[0]) || (sim.images && sim.images[0])} alt={`${sim.brand} ${sim.model}`} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No image</div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="text-sm text-muted-foreground">{sim.brand}</div>
                        <div className="font-medium">{sim.year} {sim.model}</div>
                        <div className="text-sm"><PriceDisplay amount={sim.price} currency={sim.currency} /></div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {recentlyViewed.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">Recently Viewed</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentlyViewed.map(rv => (
                    <a key={rv.id} href={`/car/${rv.id}`} className="block border rounded-lg overflow-hidden hover:shadow-sm transition">
                      <div className="h-28 bg-gray-100 overflow-hidden">
                        {((rv.exteriorImages && rv.exteriorImages[0]) || (rv.images && rv.images[0])) ? (
                          <img src={(rv.exteriorImages && rv.exteriorImages[0]) || (rv.images && rv.images[0])} alt={`${rv.brand} ${rv.model}`} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
                        )}
                      </div>
                      <div className="p-2">
                        <div className="text-xs text-muted-foreground">{rv.brand}</div>
                        <div className="text-sm font-medium truncate">{rv.year} {rv.model}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Seller</CardTitle>
                <CardDescription>{car.dealer_name || 'Gold Standard Cars'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {car.dealer_phone && (
                    <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
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
                  <Button onClick={handleWhatsAppClick} className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp Dealer
                  </Button>
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
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Test Drive
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Customer Care & FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Care & FAQ</CardTitle>
                <CardDescription>Quick answers and support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={handleWhatsAppClick} className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Support on WhatsApp
                  </Button>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-availability">
                      <AccordionTrigger>Is this vehicle available?</AccordionTrigger>
                      <AccordionContent>
                        Availability changes quickly. Tap WhatsApp to confirm the current status and reserve a viewing.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-test-drive">
                      <AccordionTrigger>How do I schedule a test drive?</AccordionTrigger>
                      <AccordionContent>
                        Use the "Schedule Test Drive" button or message us on WhatsApp with your preferred date and time.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-pricing">
                      <AccordionTrigger>Is the price negotiable?</AccordionTrigger>
                      <AccordionContent>
                        {car.negotiable ? "Yes, this vehicle is negotiable. " : "Some vehicles are negotiable. "}
                        Send your offer via WhatsApp and we’ll respond promptly.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-financing">
                      <AccordionTrigger>Do you offer financing?</AccordionTrigger>
                      <AccordionContent>
                        Yes. Tap "Calculate Payment" to estimate terms, or message us for tailored financing options.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-import">
                      <AccordionTrigger>Can you import a similar vehicle?</AccordionTrigger>
                      <AccordionContent>
                        Absolutely. Share your specs on WhatsApp and our team will guide you through the import process.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
                    {new Date(car.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{car.showroomLocation || car.origin || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">
                    {car.stockType === 'international' ? 'Import Vehicle' : 'Local Vehicle'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium capitalize">{(car.stockStatus || 'available').replace('_',' ')}</span>
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
                {car.price > 0 && car.priceType !== 'quote_only' ? (
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-automotive-navy">
                      <PriceDisplay amount={Math.round(monthlyPayment)} currency={car.currency} />/mo
                    </div>
                    <div className="text-sm text-muted-foreground">Est. payment at {apr}% APR</div>
                  </div>
                ) : (
                  <div className="text-center mb-4">
                    <div className="text-lg font-medium text-automotive-navy">Custom Financing</div>
                    <div className="text-sm text-muted-foreground">Contact us for financing options</div>
                  </div>
                )}
                <Button variant="outline" className="w-full" onClick={() => setShowCalculator(v => !v)}>
                  {showCalculator ? 'Hide Calculator' : 'Calculate Payment'}
                </Button>
                {showCalculator && (
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Vehicle Price</span>
                      <span className="font-medium"><PriceDisplay amount={car.price || 0} currency={car.currency} /></span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <label className="text-sm">
                        Down Payment
                        <input
                          type="number"
                          className="mt-1 w-full border rounded px-3 py-2 text-sm"
                          value={downPayment}
                          min={0}
                          max={car.price || 0}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                        />
                      </label>
                      <label className="text-sm">
                        Term (months)
                        <input
                          type="number"
                          className="mt-1 w-full border rounded px-3 py-2 text-sm"
                          value={termMonths}
                          min={6}
                          max={96}
                          onChange={(e) => setTermMonths(Number(e.target.value))}
                        />
                      </label>
                      <label className="text-sm">
                        APR (%)
                        <input
                          type="number"
                          className="mt-1 w-full border rounded px-3 py-2 text-sm"
                          value={apr}
                          min={0}
                          max={60}
                          step={0.1}
                          onChange={(e) => setApr(Number(e.target.value))}
                        />
                      </label>
                    </div>
                    <div className="p-3 bg-gray-50 rounded text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Loan Amount</span>
                        <span className="font-medium"><PriceDisplay amount={loanPrincipal} currency={car.currency} /></span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Monthly</span>
                        <span className="font-semibold text-automotive-navy">
                          <PriceDisplay amount={Math.round(monthlyPayment)} currency={car.currency} />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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