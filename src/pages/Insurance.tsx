import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Phone, Mail, CheckCircle, Star, Clock, DollarSign } from "lucide-react";

const Insurance = () => {
  const insuranceProviders = [
    {
      name: "AutoShield Insurance",
      rating: 4.8,
      reviews: 1250,
      features: ["24/7 Claims", "Quick Settlement", "Roadside Assistance"],
      price: "From $89/month",
      logo: "🛡️"
    },
    {
      name: "SecureDrive",
      rating: 4.6,
      reviews: 890,
      features: ["Comprehensive Coverage", "No Deductible Options", "Mobile App"],
      price: "From $75/month",
      logo: "🔒"
    },
    {
      name: "Premium Auto",
      rating: 4.9,
      reviews: 2100,
      features: ["Luxury Car Specialists", "Concierge Service", "Fast Claims"],
      price: "From $120/month",
      logo: "⭐"
    }
  ];

  const coverageTypes = [
    {
      title: "Liability Coverage",
      description: "Protects you if you're at fault in an accident",
      features: ["Bodily Injury", "Property Damage", "Legal Defense"],
      price: "Required by law"
    },
    {
      title: "Comprehensive Coverage",
      description: "Covers damage from non-collision events",
      features: ["Theft", "Vandalism", "Natural Disasters", "Fire"],
      price: "Optional"
    },
    {
      title: "Collision Coverage",
      description: "Covers damage to your car from collisions",
      features: ["Accident Damage", "Hit & Run", "Single Vehicle Accidents"],
      price: "Optional"
    },
    {
      title: "Uninsured Motorist",
      description: "Protects you from uninsured drivers",
      features: ["Medical Expenses", "Property Damage", "Lost Wages"],
      price: "Recommended"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Auto Insurance Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protect your investment with comprehensive auto insurance coverage. 
            Get quotes from top-rated providers and find the perfect plan for your needs.
          </p>
        </div>

        {/* Quick Quote Section */}
        <Card className="mb-12 bg-gradient-to-r from-automotive-navy to-automotive-accent text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Get Your Free Quote</CardTitle>
            <CardDescription className="text-center text-white/80">
              Compare rates from multiple providers in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Vehicle Year</label>
                <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Make</label>
                <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                  <option>BMW</option>
                  <option>Toyota</option>
                  <option>Porsche</option>
                  <option>Ford</option>
                  <option>Tesla</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                  <option>540i</option>
                  <option>RAV4</option>
                  <option>911</option>
                  <option>F-150</option>
                  <option>Model 3</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-white text-automotive-navy hover:bg-gray-100 py-3">
              Get Free Quotes
            </Button>
          </CardContent>
        </Card>

        {/* Coverage Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Coverage Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageTypes.map((coverage, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{coverage.title}</CardTitle>
                  <CardDescription>{coverage.description}</CardDescription>
                  <Badge variant={coverage.price === "Required by law" ? "destructive" : "secondary"}>
                    {coverage.price}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {coverage.features.map((feature, featureIndex) => (
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

        {/* Insurance Providers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Top Insurance Providers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insuranceProviders.map((provider, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{provider.logo}</div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{provider.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{provider.reviews} reviews</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{provider.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-automotive-navy">
                    {provider.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {provider.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Need Help Choosing?</CardTitle>
            <CardDescription className="text-center">
              Our insurance experts are here to help you find the perfect coverage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <Phone className="h-8 w-8 text-automotive-navy mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">1-800-AUTO-INS</p>
                <Button variant="outline">Call Now</Button>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 text-automotive-navy mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">insurance@goldstandardcars.com</p>
                <Button variant="outline">Send Email</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Insurance;
