import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Star
} from "lucide-react";
import carSedan from "@/assets/car-sedan-luxury.jpg";

const CarDetails = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on ID
  const car = {
    id: "1",
    title: "2023 BMW 3 Series",
    price: "$45,999",
    images: [carSedan, carSedan, carSedan],
    year: "2023",
    mileage: "12,000",
    location: "New York, NY",
    make: "BMW",
    model: "3 Series",
    body: "Sedan",
    engine: "2.0L Turbo I4",
    transmission: "8-Speed Automatic",
    drivetrain: "RWD",
    fuelType: "Gasoline",
    mpg: "26/36",
    exteriorColor: "Mineral White",
    interiorColor: "Black Leather",
    vin: "WBA8E1C56NU123456",
    stockNumber: "BW2023001",
    description: "This stunning 2023 BMW 3 Series combines luxury with performance. Featuring a turbocharged engine, premium leather interior, and the latest technology including BMW's iDrive system. One owner, clean CarFax, and regularly maintained.",
    features: [
      "Premium Leather Seats",
      "Sunroof",
      "Navigation System",
      "Bluetooth Connectivity",
      "Backup Camera",
      "Heated Seats",
      "Keyless Entry",
      "LED Headlights"
    ],
    dealer: {
      name: "AutoMarket Certified",
      phone: "(555) 123-4567",
      email: "sales@automarket.com",
      rating: 4.8,
      reviews: 342
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="relative">
                <img 
                  src={car.images[0]} 
                  alt={car.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {car.images.slice(1).map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${car.title} ${index + 2}`}
                    className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
                  />
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-automotive-navy mb-2">{car.title}</h1>
                  <div className="flex items-center text-muted-foreground gap-4">
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
                      {car.mileage} miles
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-automotive-navy">{car.price}</div>
                  <Badge variant="secondary">Great Deal</Badge>
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
                    <p className="text-muted-foreground leading-relaxed">{car.description}</p>
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
                      {car.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-automotive-navy rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
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
                          <span className="font-medium">{car.body}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Engine</span>
                          <span className="font-medium">{car.engine}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transmission</span>
                          <span className="font-medium">{car.transmission}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Drivetrain</span>
                          <span className="font-medium">{car.drivetrain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Type</span>
                          <span className="font-medium">{car.fuelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">MPG</span>
                          <span className="font-medium">{car.mpg}</span>
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
                <CardTitle>Contact Dealer</CardTitle>
                <CardDescription>{car.dealer.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{car.dealer.rating}</span>
                  <span className="text-muted-foreground">({car.dealer.reviews} reviews)</span>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
                    <Phone className="h-4 w-4 mr-2" />
                    {car.dealer.phone}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Dealer
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Test Drive
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
                  <span className="text-muted-foreground">Stock #</span>
                  <span className="font-medium">{car.stockNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VIN</span>
                  <span className="font-medium text-sm">{car.vin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exterior</span>
                  <span className="font-medium">{car.exteriorColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interior</span>
                  <span className="font-medium">{car.interiorColor}</span>
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