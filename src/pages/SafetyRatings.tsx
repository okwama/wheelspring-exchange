import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Star, AlertTriangle, CheckCircle, Car, Users, Zap } from "lucide-react";

const SafetyRatings = () => {
  const topRatedCars = [
    {
      make: "BMW",
      model: "540i",
      year: 2023,
      overallRating: 5,
      crashTest: "5 Star",
      safetyFeatures: ["Forward Collision Warning", "Automatic Emergency Braking", "Lane Departure Warning"],
      image: "🛡️"
    },
    {
      make: "Toyota",
      model: "RAV4",
      year: 2024,
      overallRating: 5,
      crashTest: "5 Star",
      safetyFeatures: ["Toyota Safety Sense 2.5", "Blind Spot Monitor", "Rear Cross Traffic Alert"],
      image: "🚗"
    },
    {
      make: "Porsche",
      model: "911",
      year: 2023,
      overallRating: 4,
      crashTest: "5 Star",
      safetyFeatures: ["Porsche Active Safety", "Adaptive Cruise Control", "Night Vision Assist"],
      image: "🏎️"
    },
    {
      make: "Ford",
      model: "F-150",
      year: 2024,
      overallRating: 4,
      crashTest: "5 Star",
      safetyFeatures: ["Co-Pilot360", "Pre-Collision Assist", "Lane Keeping System"],
      image: "🚛"
    }
  ];

  const safetyCategories = [
    {
      title: "Crash Test Ratings",
      description: "NHTSA and IIHS crash test results",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      features: [
        "Frontal Crash Test",
        "Side Crash Test", 
        "Rollover Test",
        "Small Overlap Front",
        "Moderate Overlap Front"
      ]
    },
    {
      title: "Safety Features",
      description: "Advanced driver assistance systems",
      icon: <Zap className="h-8 w-8 text-green-500" />,
      features: [
        "Automatic Emergency Braking",
        "Forward Collision Warning",
        "Lane Departure Warning",
        "Blind Spot Detection",
        "Adaptive Cruise Control"
      ]
    },
    {
      title: "Child Safety",
      description: "Child restraint and safety systems",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      features: [
        "LATCH System",
        "Child Safety Locks",
        "Rear Door Locks",
        "Airbag Shutoff",
        "Child Seat Anchors"
      ]
    },
    {
      title: "Vehicle Structure",
      description: "Structural integrity and design",
      icon: <Car className="h-8 w-8 text-orange-500" />,
      features: [
        "High-Strength Steel Frame",
        "Crumple Zones",
        "Rollover Protection",
        "Side Impact Beams",
        "Roof Strength"
      ]
    }
  ];

  const safetyStats = [
    {
      title: "Lives Saved",
      value: "2.3M",
      description: "Lives saved by safety technologies since 2010",
      icon: "💙"
    },
    {
      title: "Crash Reduction",
      value: "23%",
      description: "Reduction in rear-end crashes with AEB",
      icon: "📉"
    },
    {
      title: "Injury Prevention",
      value: "40%",
      description: "Reduction in serious injuries with ESC",
      icon: "🛡️"
    },
    {
      title: "Safety Rating",
      value: "5★",
      description: "Average rating of vehicles in our database",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Vehicle Safety Ratings
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Make informed decisions with comprehensive safety ratings, crash test results, 
            and safety feature comparisons. Your family's safety is our priority.
          </p>
        </div>

        {/* Safety Stats */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {safetyStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-automotive-navy mb-1">{stat.value}</div>
                  <div className="font-semibold mb-2">{stat.title}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Rated Cars */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Top Safety Rated Vehicles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedCars.map((car, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl">{car.image}</div>
                    <Badge className={car.overallRating === 5 ? "bg-green-500" : "bg-yellow-500"}>
                      {car.overallRating}/5
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{car.year} {car.make} {car.model}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-green-500" />
                    {car.crashTest} NHTSA Rating
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Safety Features:</h4>
                    <ul className="space-y-1">
                      {car.safetyFeatures.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Safety Rating Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    {category.icon}
                    <div className="ml-3">
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rating Agencies */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Safety Rating Agencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 text-blue-500 mr-2" />
                  NHTSA
                </CardTitle>
                <CardDescription>National Highway Traffic Safety Administration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Government agency that conducts crash tests and provides 5-star safety ratings 
                  for vehicles sold in the United States.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Rating</span>
                    <Badge variant="outline">1-5 Stars</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Frontal Crash</span>
                    <Badge variant="outline">1-5 Stars</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Side Crash</span>
                    <Badge variant="outline">1-5 Stars</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rollover</span>
                    <Badge variant="outline">1-5 Stars</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-2" />
                  IIHS
                </CardTitle>
                <CardDescription>Insurance Institute for Highway Safety</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Independent organization funded by auto insurers that conducts more rigorous 
                  crash tests and safety evaluations.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Rating</span>
                    <Badge variant="outline">Good/Acceptable/Marginal/Poor</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Small Overlap</span>
                    <Badge variant="outline">Good/Acceptable/Marginal/Poor</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Moderate Overlap</span>
                    <Badge variant="outline">Good/Acceptable/Marginal/Poor</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Side Impact</span>
                    <Badge variant="outline">Good/Acceptable/Marginal/Poor</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  Euro NCAP
                </CardTitle>
                <CardDescription>European New Car Assessment Programme</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  European safety testing organization that provides detailed safety ratings 
                  and crash test results for vehicles sold in Europe.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Rating</span>
                    <Badge variant="outline">1-5 Stars</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Adult Occupant</span>
                    <Badge variant="outline">0-100%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Child Occupant</span>
                    <Badge variant="outline">0-100%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Vulnerable Road Users</span>
                    <Badge variant="outline">0-100%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Safety Tips for Car Buyers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  What to Look For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    5-star NHTSA rating
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Good IIHS ratings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Automatic Emergency Braking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Forward Collision Warning
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Lane Departure Warning
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-600">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  Red Flags to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    Poor crash test ratings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    Missing safety features
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    High rollover risk
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    Poor headlight ratings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    Recalled safety systems
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="text-center py-12">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Check Vehicle Safety Ratings</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get detailed safety ratings and crash test results for any vehicle
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Search Safety Ratings
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default SafetyRatings;
