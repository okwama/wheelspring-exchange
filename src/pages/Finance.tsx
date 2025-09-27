import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Calculator, CreditCard, Shield, TrendingUp, LogIn, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Finance = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form states
  const [calculatorData, setCalculatorData] = useState({
    vehiclePrice: '',
    downPayment: '',
    loanTerm: '60',
    interestRate: '',
  });

  const [preApprovalData, setPreApprovalData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    annualIncome: '',
    employmentStatus: '',
    creditScore: '',
  });

  const [calculatedPayment, setCalculatedPayment] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculatorInput = (field: string, value: string) => {
    setCalculatorData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreApprovalInput = (field: string, value: string) => {
    setPreApprovalData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePayment = () => {
    const price = parseFloat(calculatorData.vehiclePrice.replace(/[^0-9.-]+/g, ''));
    const down = parseFloat(calculatorData.downPayment.replace(/[^0-9.-]+/g, ''));
    const rate = parseFloat(calculatorData.interestRate);
    const term = parseInt(calculatorData.loanTerm);

    if (!price || !down || !rate || !term) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all calculator fields',
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const loanAmount = price - down;
      const monthlyRate = rate / 100 / 12;
      const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term);
      const denominator = Math.pow(1 + monthlyRate, term) - 1;
      const payment = numerator / denominator;
      
      setCalculatedPayment(Math.round(payment * 100) / 100);
      setIsCalculating(false);
    }, 1000);
  };

  const handlePreApprovalSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please create an account or login to submit your pre-approval application.',
        action: (
          <Button variant="outline" size="sm" asChild>
            <Link to="/auth">Login</Link>
          </Button>
        ),
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'annualIncome', 'employmentStatus', 'creditScore'];
    const missingFields = requiredFields.filter(field => !preApprovalData[field as keyof typeof preApprovalData]);
    
    if (missingFields.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all required fields',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Application Submitted!',
        description: 'Your pre-approval application has been submitted. Check your applications in your account.',
        action: (
          <Button variant="outline" size="sm" asChild>
            <Link to="/financing">View Applications</Link>
          </Button>
        ),
      });
      
      // Reset form
      setPreApprovalData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        annualIncome: '',
        employmentStatus: '',
        creditScore: '',
      });
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          
          {/* Auth Status Banner */}
          {!isAuthenticated && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-blue-800">
                <LogIn className="h-5 w-5" />
                <span className="font-medium">Create an account or login to submit applications and track your status</span>
              </div>
              <div className="flex gap-2 justify-center mt-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">Create Account</Link>
                </Button>
              </div>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-green-800">
                <User className="h-5 w-5" />
                <span className="font-medium">Welcome back, {user?.firstName}! View your applications</span>
              </div>
              <div className="flex gap-2 justify-center mt-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/financing">My Applications</Link>
                </Button>
              </div>
            </div>
          )}
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

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Payment Calculator</TabsTrigger>
            <TabsTrigger value="preapproval">Get Pre-Approved</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Payment Calculator
                </CardTitle>
                <CardDescription>Calculate your monthly payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicle-price">Vehicle Price</Label>
                    <Input 
                      id="vehicle-price" 
                      placeholder="$45,000"
                      value={calculatorData.vehiclePrice}
                      onChange={(e) => handleCalculatorInput('vehiclePrice', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="down-payment">Down Payment</Label>
                    <Input 
                      id="down-payment" 
                      placeholder="$5,000"
                      value={calculatorData.downPayment}
                      onChange={(e) => handleCalculatorInput('downPayment', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loan-term">Loan Term</Label>
                    <Select 
                      value={calculatorData.loanTerm}
                      onValueChange={(value) => handleCalculatorInput('loanTerm', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                        <SelectItem value="72">72 months</SelectItem>
                        <SelectItem value="84">84 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                    <Input 
                      id="interest-rate" 
                      placeholder="4.5"
                      value={calculatorData.interestRate}
                      onChange={(e) => handleCalculatorInput('interestRate', e.target.value)}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-automotive-navy hover:bg-automotive-dark"
                  onClick={calculatePayment}
                  disabled={isCalculating}
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Payment'}
                </Button>
                
                {/* Results */}
                {calculatedPayment && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800">Estimated Monthly Payment</h3>
                    <p className="text-3xl font-bold text-green-900">${calculatedPayment.toLocaleString()}</p>
                    <p className="text-sm text-green-700 mt-2">
                      Based on a ${(parseFloat(calculatorData.vehiclePrice.replace(/[^0-9.-]+/g, '')) - parseFloat(calculatorData.downPayment.replace(/[^0-9.-]+/g, ''))).toLocaleString()} loan at {calculatorData.interestRate}% APR for {calculatorData.loanTerm} months
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pre-Approval Tab */}
          <TabsContent value="preapproval">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Get Pre-Approved
                </CardTitle>
                <CardDescription>
                  {isAuthenticated 
                    ? "Quick approval with no impact to your credit score" 
                    : "Login required to submit applications and track status"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name *</Label>
                    <Input 
                      id="first-name" 
                      placeholder="John"
                      value={preApprovalData.firstName}
                      onChange={(e) => handlePreApprovalInput('firstName', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name *</Label>
                    <Input 
                      id="last-name" 
                      placeholder="Doe"
                      value={preApprovalData.lastName}
                      onChange={(e) => handlePreApprovalInput('lastName', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com"
                      value={preApprovalData.email}
                      onChange={(e) => handlePreApprovalInput('email', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="(555) 123-4567"
                      value={preApprovalData.phone}
                      onChange={(e) => handlePreApprovalInput('phone', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annual-income">Annual Income *</Label>
                    <Input 
                      id="annual-income" 
                      placeholder="$75,000"
                      value={preApprovalData.annualIncome}
                      onChange={(e) => handlePreApprovalInput('annualIncome', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employment">Employment Status *</Label>
                    <Select 
                      value={preApprovalData.employmentStatus}
                      onValueChange={(value) => handlePreApprovalInput('employmentStatus', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self_employed">Self-Employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="credit-score">Estimated Credit Score *</Label>
                  <Select 
                    value={preApprovalData.creditScore}
                    onValueChange={(value) => handlePreApprovalInput('creditScore', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent_740_plus">Excellent (740+)</SelectItem>
                      <SelectItem value="good_670_739">Good (670-739)</SelectItem>
                      <SelectItem value="fair_580_669">Fair (580-669)</SelectItem>
                      <SelectItem value="poor_below_580">Poor (Below 580)</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-automotive-navy hover:bg-automotive-dark"
                  onClick={handlePreApprovalSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : isAuthenticated ? 'Get Pre-Approved' : 'Login to Submit Application'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  {isAuthenticated 
                    ? "Checking your rate won't affect your credit score"
                    : "Create an account to submit your application and track its status"
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Finance;