import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, CreditCard, Shield, TrendingUp } from "lucide-react";

const Finance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">Car Financing</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get pre-approved for your dream car with competitive rates and flexible terms
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-automotive-navy" />
              </div>
              <CardTitle className="text-lg">Low Rates</CardTitle>
              <CardDescription>Starting from 2.9% APR</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-automotive-navy" />
              </div>
              <CardTitle className="text-lg">Pre-Approval</CardTitle>
              <CardDescription>Get approved in minutes</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-automotive-navy" />
              </div>
              <CardTitle className="text-lg">Flexible Terms</CardTitle>
              <CardDescription>12-84 month options</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-6 w-6 text-automotive-navy" />
              </div>
              <CardTitle className="text-lg">Easy Calculator</CardTitle>
              <CardDescription>Estimate your payments</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Loan Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Payment Calculator
              </CardTitle>
              <CardDescription>Calculate your monthly payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="vehicle-price">Vehicle Price</Label>
                <Input id="vehicle-price" placeholder="$45,000" />
              </div>
              <div>
                <Label htmlFor="down-payment">Down Payment</Label>
                <Input id="down-payment" placeholder="$5,000" />
              </div>
              <div>
                <Label htmlFor="loan-term">Loan Term</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="48">48 months</SelectItem>
                    <SelectItem value="60">60 months</SelectItem>
                    <SelectItem value="72">72 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="interest-rate">Interest Rate</Label>
                <Input id="interest-rate" placeholder="4.5%" />
              </div>
              <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
                Calculate Payment
              </Button>
              
              {/* Results */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Estimated Monthly Payment</h3>
                <p className="text-3xl font-bold text-automotive-navy">$642</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on a $40,000 loan at 4.5% APR for 60 months
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pre-Approval Form */}
          <Card>
            <CardHeader>
              <CardTitle>Get Pre-Approved</CardTitle>
              <CardDescription>Quick approval with no impact to your credit score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              
              <div>
                <Label htmlFor="annual-income">Annual Income</Label>
                <Input id="annual-income" placeholder="$75,000" />
              </div>
              
              <div>
                <Label htmlFor="employment">Employment Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="credit-score">Estimated Credit Score</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent (750+)</SelectItem>
                    <SelectItem value="good">Good (700-749)</SelectItem>
                    <SelectItem value="fair">Fair (650-699)</SelectItem>
                    <SelectItem value="poor">Poor (Below 650)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-automotive-navy hover:bg-automotive-dark">
                Get Pre-Approved
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Checking your rate won't affect your credit score
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Finance;