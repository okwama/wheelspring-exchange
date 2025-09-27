import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Shield, AlertTriangle, CheckCircle, Search, Clock, DollarSign } from "lucide-react";

const CarHistory = () => {
  const reportTypes = [
    {
      title: "Basic Report",
      price: "$29.99",
      features: [
        "Accident History",
        "Title Information",
        "Odometer Reading",
        "Lemon Check",
        "Basic Ownership"
      ],
      popular: false
    },
    {
      title: "Standard Report",
      price: "$39.99",
      features: [
        "Everything in Basic",
        "Service Records",
        "Recall Information",
        "Flood/Fire Damage",
        "Insurance Claims",
        "5-Year History"
      ],
      popular: true
    },
    {
      title: "Premium Report",
      price: "$59.99",
      features: [
        "Everything in Standard",
        "Detailed Service History",
        "Previous Owner Info",
        "Market Value Analysis",
        "Lifetime History",
        "Expert Analysis"
      ],
      popular: false
    }
  ];

  const sampleReport = {
    vin: "1HGBH41JXMN109186",
    year: 2023,
    make: "BMW",
    model: "540i",
    status: "Clean",
    accidents: 0,
    owners: 1,
    serviceRecords: 8,
    recalls: 0,
    lastUpdated: "2024-01-15"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Car History Reports
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive vehicle history reports to make informed decisions. 
            Check for accidents, service records, recalls, and more.
          </p>
        </div>

        {/* VIN Search Section */}
        <Card className="mb-12 bg-gradient-to-r from-automotive-navy to-automotive-accent text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Search Vehicle History</CardTitle>
            <CardDescription className="text-center text-white/80">
              Enter VIN or license plate to get instant vehicle history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">VIN Number</label>
                <Input 
                  placeholder="Enter 17-character VIN"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">License Plate</label>
                <Input 
                  placeholder="Enter license plate number"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <Button className="w-full bg-white text-automotive-navy hover:bg-gray-100 py-3">
              <Search className="mr-2 h-5 w-5" />
              Search Vehicle History
            </Button>
          </CardContent>
        </Card>

        {/* Report Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Choose Your Report Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reportTypes.map((report, index) => (
              <Card key={index} className={`relative hover:shadow-lg transition-shadow ${report.popular ? 'border-automotive-navy ring-2 ring-automotive-navy' : ''}`}>
                {report.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-automotive-navy">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{report.title}</CardTitle>
                  <div className="text-3xl font-bold text-automotive-navy">{report.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {report.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${report.popular ? 'bg-automotive-navy hover:bg-automotive-dark' : 'bg-gray-600 hover:bg-gray-700'}`}>
                    Choose {report.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sample Report */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            Sample Report Preview
          </h2>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{sampleReport.year} {sampleReport.make} {sampleReport.model}</CardTitle>
                  <CardDescription>VIN: {sampleReport.vin}</CardDescription>
                </div>
                <Badge className="bg-green-500 text-white">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {sampleReport.status} Title
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-automotive-navy">{sampleReport.accidents}</div>
                  <div className="text-sm text-muted-foreground">Accidents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-automotive-navy">{sampleReport.owners}</div>
                  <div className="text-sm text-muted-foreground">Previous Owners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-automotive-navy">{sampleReport.serviceRecords}</div>
                  <div className="text-sm text-muted-foreground">Service Records</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-automotive-navy">{sampleReport.recalls}</div>
                  <div className="text-sm text-muted-foreground">Open Recalls</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Clean Vehicle History</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  No accidents, flood damage, or major issues reported for this vehicle.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8 text-center">
            What's Included in Our Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-automotive-navy mb-2" />
                <CardTitle>Accident History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed accident reports, damage assessments, and repair history from insurance claims and police reports.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-automotive-navy mb-2" />
                <CardTitle>Title Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Title status, ownership history, and any title brands like salvage, flood, or lemon.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-automotive-navy mb-2" />
                <CardTitle>Recall Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Open recalls, safety campaigns, and manufacturer notifications that need attention.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-automotive-navy mb-2" />
                <CardTitle>Service Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maintenance history, service intervals, and repair records from dealerships and shops.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-automotive-navy mb-2" />
                <CardTitle>Market Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Current market value, depreciation analysis, and pricing recommendations based on condition.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-automotive-navy mb-2" />
                <CardTitle>Lemon Check</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lemon law buybacks, manufacturer buybacks, and vehicles with recurring problems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Check Your Vehicle?</h2>
            <p className="text-xl mb-8 text-green-100">
              Get instant access to comprehensive vehicle history reports
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Start Your Search Now
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default CarHistory;
