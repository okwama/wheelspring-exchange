import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Fuel, Leaf, Zap, TrendingUp, Calculator, DollarSign, BarChart3 } from "lucide-react";

const FuelEconomy = () => {
  const fuelEfficientCars = [
    {
      make: "Toyota",
      model: "RAV4 Hybrid",
      year: 2024,
      mpg: "41/38",
      combined: "39",
      fuelType: "Hybrid",
      annualCost: "$1,200",
      rating: "Excellent",
      icon: "🌱"
    },
    {
      make: "BMW",
      model: "540i",
      year: 2023,
      mpg: "25/33",
      combined: "28",
      fuelType: "Gasoline",
      annualCost: "$1,800",
      rating: "Good",
      icon: "🚗"
    },
    {
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      mpg: "132 MPGe",
      combined: "132",
      fuelType: "Electric",
      annualCost: "$600",
      rating: "Excellent",
      icon: "⚡"
    },
    {
      make: "Ford",
      model: "F-150 Hybrid",
      year: 2024,
      mpg: "25/26",
      combined: "25",
      fuelType: "Hybrid",
      annualCost: "$1,400",
      rating: "Good",
      icon: "🚛"
    }
  ];

  const fuelTypes = [
    {
      type: "Gasoline",
      icon: <Fuel className="h-8 w-8 text-orange-500" />,
      description: "Traditional internal combustion engine",
      pros: ["Wide availability", "Lower upfront cost", "Long range"],
      cons: ["Higher emissions", "Fuel costs", "Maintenance costs"],
      avgMpg: "25-30 MPG"
    },
    {
      type: "Hybrid",
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      description: "Combines gasoline engine with electric motor",
      pros: ["Better fuel economy", "Lower emissions", "No charging needed"],
      cons: ["Higher upfront cost", "Complex system", "Battery replacement"],
      avgMpg: "40-50 MPG"
    },
    {
      type: "Electric",
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      description: "Fully electric vehicle with battery power",
      pros: ["Zero emissions", "Low operating cost", "Quiet operation"],
      cons: ["Limited range", "Charging time", "Higher upfront cost"],
      avgMpg: "100+ MPGe"
    },
    {
      type: "Plug-in Hybrid",
      icon: <Leaf className="h-8 w-8 text-purple-500" />,
      description: "Hybrid with larger battery for electric-only driving",
      pros: ["Electric range", "Gas backup", "Tax incentives"],
      cons: ["Complex system", "Higher cost", "Charging needed"],
      avgMpg: "30-40 MPG + 20-50 electric miles"
    }
  ];

  const fuelSavingTips = [
    {
      category: "Driving Habits",
      icon: "🚗",
      tips: [
        "Drive at steady speeds",
        "Avoid rapid acceleration",
        "Use cruise control on highways",
        "Anticipate traffic lights",
        "Remove excess weight"
      ]
    },
    {
      category: "Vehicle Maintenance",
      icon: "🔧",
      tips: [
        "Keep tires properly inflated",
        "Change air filter regularly",
        "Use recommended oil grade",
        "Keep engine tuned",
        "Check for dragging brakes"
      ]
    },
    {
      category: "Route Planning",
      icon: "🗺️",
      tips: [
        "Plan efficient routes",
        "Avoid rush hour traffic",
        "Combine errands",
        "Use GPS for traffic updates",
        "Consider alternative routes"
      ]
    },
    {
      category: "Fuel Choice",
      icon: "⛽",
      tips: [
        "Use recommended fuel grade",
        "Fill up during cooler hours",
        "Don't overfill tank",
        "Use fuel rewards programs",
        "Compare gas prices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Fuel Economy Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare fuel economy ratings, calculate savings, and discover tips to improve your vehicle's efficiency. 
            Make smart choices for your wallet and the environment.
          </p>
        </div>

        {/* Fuel Economy Calculator */}
        <Card className="mb-12 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Fuel Cost Calculator</CardTitle>
            <CardDescription className="text-center text-white/80">
              Calculate your annual fuel costs and potential savings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Miles per Year</label>
                <Input 
                  placeholder="15,000"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">MPG Rating</label>
                <Input 
                  placeholder="30"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fuel Price ($/gallon)</label>
                <Input 
                  placeholder="3.50"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Vehicle Type</label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Gasoline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="plug-in">Plug-in Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full bg-white text-green-600 hover:bg-gray-100 py-3">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Annual Cost
            </Button>
          </CardContent>
        </Card>

        {/* Top Fuel Efficient Cars */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Most Fuel Efficient Vehicles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fuelEfficientCars.map((car, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl">{car.icon}</div>
                    <Badge className={car.rating === "Excellent" ? "bg-green-500" : "bg-blue-500"}>
                      {car.rating}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{car.year} {car.make} {car.model}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Fuel className="h-4 w-4 mr-1" />
                    {car.fuelType}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-automotive-navy">{car.mpg}</div>
                      <div className="text-sm text-muted-foreground">City/Highway MPG</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold">{car.combined} MPG</div>
                      <div className="text-sm text-muted-foreground">Combined</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{car.annualCost}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Annual Fuel Cost</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fuel Types Comparison */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Fuel Types Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fuelTypes.map((fuel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    {fuel.icon}
                    <div className="ml-3">
                      <CardTitle className="text-lg">{fuel.type}</CardTitle>
                      <CardDescription>{fuel.description}</CardDescription>
                      <Badge variant="outline" className="mt-1">{fuel.avgMpg}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {fuel.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="flex items-center text-sm">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {fuel.cons.map((con, conIndex) => (
                          <li key={conIndex} className="flex items-center text-sm">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fuel Saving Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Fuel Saving Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fuelSavingTips.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Environmental Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Leaf className="h-6 w-6 mr-2" />
                  CO2 Emissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Gasoline (30 MPG)</span>
                    <Badge className="bg-red-500">4.6 tons/year</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Hybrid (45 MPG)</span>
                    <Badge className="bg-yellow-500">3.1 tons/year</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Electric (clean grid)</span>
                    <Badge className="bg-green-500">0.8 tons/year</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <BarChart3 className="h-6 w-6 mr-2" />
                  Fuel Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Hybrid vs Gasoline</span>
                    <Badge className="bg-green-500">$600/year saved</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Electric vs Gasoline</span>
                    <Badge className="bg-green-500">$1,200/year saved</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Efficient driving</span>
                    <Badge className="bg-blue-500">$300/year saved</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-600">
                  <Zap className="h-6 w-6 mr-2" />
                  Future Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">EV adoption</span>
                    <Badge className="bg-blue-500">+40% by 2030</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fuel efficiency</span>
                    <Badge className="bg-green-500">+15% improvement</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Renewable energy</span>
                    <Badge className="bg-purple-500">+50% by 2030</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="text-center py-12">
            <Fuel className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Find Your Fuel Efficient Vehicle</h2>
            <p className="text-xl mb-8 text-blue-100">
              Browse our selection of fuel-efficient cars and save money at the pump
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Browse Fuel Efficient Cars
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default FuelEconomy;
