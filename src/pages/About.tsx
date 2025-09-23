import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, Zap, Heart, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Cars Sold", value: "50,000+", icon: TrendingUp },
    { label: "Happy Customers", value: "45,000+", icon: Users },
    { label: "Years Experience", value: "15+", icon: Award },
    { label: "Dealership Partners", value: "500+", icon: Shield },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every vehicle comes with a detailed history report and honest pricing."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We prioritize your needs and satisfaction above all else."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Rigorous inspection process ensures only the best vehicles make it to our platform."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology makes buying and selling cars easier than ever."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-automotive-navy mb-6">
            About AutoMarket
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the way people buy and sell cars. Since 2008, we've been connecting 
            buyers with quality vehicles and trusted dealers across the country.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-automotive-navy mx-auto mb-4" />
                <div className="text-3xl font-bold text-automotive-navy mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-automotive-navy to-automotive-accent text-white">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto opacity-90">
                To make car buying and selling transparent, efficient, and enjoyable for everyone. 
                We believe everyone deserves access to quality vehicles at fair prices, backed by 
                exceptional service and support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-automotive-navy text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-automotive-navy" />
                    </div>
                    <CardTitle>{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-automotive-navy mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                AutoMarket was founded in 2008 with a simple vision: to create a better way for people 
                to buy and sell cars. Our founders, experienced automotive professionals, recognized the 
                need for transparency and trust in the car buying process.
              </p>
              <p>
                Starting with a small team and big dreams, we built our platform around the principles 
                of honesty, quality, and customer service. Today, we're proud to be one of the leading 
                automotive marketplaces in the country.
              </p>
              <p>
                We've helped thousands of families find their perfect vehicle and assisted dealers in 
                connecting with qualified buyers. Our commitment to innovation and customer satisfaction 
                continues to drive us forward.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2008</CardTitle>
                <CardDescription>AutoMarket founded</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2012</CardTitle>
                <CardDescription>Reached 10,000 cars sold milestone</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2018</CardTitle>
                <CardDescription>Launched mobile app and advanced search features</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2023</CardTitle>
                <CardDescription>50,000+ vehicles sold, 500+ dealer partners</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-automotive-navy mb-8">Trusted & Certified</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Better Business Bureau A+
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              AutoTrader Partner
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              CarGurus Certified
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              NIADA Member
            </Badge>
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold text-automotive-navy mb-4">
              Ready to Find Your Perfect Car?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied customers who found their dream vehicle with us.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/cars" 
                className="inline-flex items-center justify-center px-6 py-3 bg-automotive-navy text-white rounded-md hover:bg-automotive-dark transition-colors"
              >
                Browse Cars
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border border-automotive-navy text-automotive-navy rounded-md hover:bg-automotive-navy hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;