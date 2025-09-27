import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign, Calculator, BarChart3, Car } from "lucide-react";

const CarValues = () => {
  const popularCars = [
    {
      make: "BMW",
      model: "540i",
      year: 2023,
      value: "$54,900",
      change: "+2.3%",
      trend: "up",
      mileage: "12,500"
    },
    {
      make: "Toyota",
      model: "RAV4",
      year: 2024,
      value: "$38,900",
      change: "+1.8%",
      trend: "up",
      mileage: "5,200"
    },
    {
      make: "Porsche",
      model: "911",
      year: 2023,
      value: "$118,500",
      change: "-0.5%",
      trend: "down",
      mileage: "8,900"
    },
    {
      make: "Ford",
      model: "F-150",
      year: 2024,
      value: "$45,900",
      change: "+3.1%",
      trend: "up",
      mileage: "1,200"
    }
  ];

  const valueFactors = [
    {
      title: "Vehicle Age",
      description: "Newer vehicles typically retain more value",
      impact: "High",
      icon: "📅"
    },
    {
      title: "Mileage",
      description: "Lower mileage generally means higher value",
      impact: "High",
      icon: "🛣️"
    },
    {
      title: "Condition",
      description: "Well-maintained vehicles command premium prices",
      impact: "Very High",
      icon: "✨"
    },
    {
      title: "Market Demand",
      description: "Popular models hold value better",
      impact: "Medium",
      icon: "📈"
    },
    {
      title: "Location",
      description: "Regional preferences affect pricing",
      impact: "Medium",
      icon: "📍"
    },
    {
      title: "Season",
      description: "Convertibles sell better in summer",
      impact: "Low",
      icon: "🌤️"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Car Values & Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get accurate car values, market trends, and pricing insights. 
            Make informed decisions when buying or selling your vehicle.
          </p>
        </div>

        {/* Value Calculator */}
        <Card className="mb-12 bg-gradient-to-r from-automotive-navy to-automotive-accent text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Instant Value Calculator</CardTitle>
            <CardDescription className="text-center text-white/80">
              Get your car's current market value in seconds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="2024" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Make</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Select Make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="porsche">Porsche</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="tesla">Tesla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Select Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="540i">540i</SelectItem>
                    <SelectItem value="rav4">RAV4</SelectItem>
                    <SelectItem value="911">911</SelectItem>
                    <SelectItem value="f150">F-150</SelectItem>
                    <SelectItem value="model3">Model 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mileage</label>
                <Input 
                  placeholder="Enter mileage"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <Button className="w-full bg-white text-automotive-navy hover:bg-gray-100 py-3">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Value
            </Button>
          </CardContent>
        </Card>

        {/* Popular Car Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Current Market Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCars.map((car, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Car className="h-6 w-6 text-automotive-navy" />
                    <Badge className={car.trend === "up" ? "bg-green-500" : "bg-red-500"}>
                      {car.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {car.change}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{car.year} {car.make} {car.model}</CardTitle>
                  <CardDescription>{car.mileage} miles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-automotive-navy mb-2">
                    {car.value}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Market value range
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Value Factors */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            What Affects Car Value?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueFactors.map((factor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{factor.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{factor.title}</CardTitle>
                      <Badge variant={factor.impact === "Very High" ? "destructive" : 
                                      factor.impact === "High" ? "default" : "secondary"}>
                        {factor.impact} Impact
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Market Trends & Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                  Hot Market Segments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Electric Vehicles</span>
                    <Badge className="bg-green-500">+15.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Luxury SUVs</span>
                    <Badge className="bg-green-500">+8.7%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Hybrid Cars</span>
                    <Badge className="bg-green-500">+6.3%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pickup Trucks</span>
                    <Badge className="bg-green-500">+4.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="h-6 w-6 text-red-500 mr-2" />
                  Declining Segments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Sedans</span>
                    <Badge className="bg-red-500">-3.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sports Cars</span>
                    <Badge className="bg-red-500">-2.8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Convertibles</span>
                    <Badge className="bg-red-500">-1.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Wagons</span>
                    <Badge className="bg-red-500">-1.5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="text-center py-12">
            <BarChart3 className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Get Professional Valuation</h2>
            <p className="text-xl mb-8 text-blue-100">
              Our certified appraisers provide detailed vehicle valuations for insurance, trade-ins, and sales
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <DollarSign className="mr-2 h-5 w-5" />
              Get Professional Appraisal
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default CarValues;
