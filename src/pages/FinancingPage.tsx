import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  CreditCard, 
  Plus, 
  ArrowLeft, 
  Calculator, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DocumentUpload from '@/components/financing/DocumentUpload';

interface FinancingApplication {
  id: number;
  application_type: 'pre_approval' | 'full_application';
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  vehicle_price?: number;
  loan_amount?: number;
  down_payment?: number;
  loan_term_months?: number;
  monthly_payment?: number;
  interest_rate?: number;
  employment_status: string;
  annual_income?: number;
  credit_score_range?: string;
  existing_debt?: number;
  status: string;
  approval_amount?: number;
  approved_rate?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApplicationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  under_review: number;
}

const FinancingPage = () => {
  const { isAuthenticated, token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<FinancingApplication[]>([]);
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    application_type: 'pre_approval' as 'pre_approval' | 'full_application',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: new Date().getFullYear(),
    vehicle_price: 0,
    loan_amount: 0,
    down_payment: 0,
    loan_term_months: 60,
    employment_status: 'employed',
    annual_income: 0,
    credit_score_range: 'unknown',
    existing_debt: 0,
    notes: ''
  });

  const [calculating, setCalculating] = useState(false);
  const [calculatedPayment, setCalculatedPayment] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    loadApplications();
  }, [isAuthenticated, navigate]);

  const loadApplications = async () => {
    try {
      console.log('Loading applications with token:', token);
      console.log('Is authenticated:', isAuthenticated);
      
      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch('http://localhost:3001/api/financing/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const apps = await response.json();
        setApplications(apps);

        // Calculate stats
        const stats: ApplicationStats = {
          total: apps.length,
          pending: apps.filter((app: any) => app.status === 'pending').length,
          approved: apps.filter((app: any) => app.status === 'approved').length,
          rejected: apps.filter((app: any) => app.status === 'rejected').length,
          under_review: apps.filter((app: any) => app.status === 'under_review').length,
        };
        setStats(stats);
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to load applications: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load financing applications',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePayment = async () => {
    if (!formData.loan_amount || !formData.interest_rate || !formData.loan_term_months) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in loan amount, interest rate, and term',
      });
      return;
    }

    setCalculating(true);
    try {
      // TODO: Replace with actual API call
      const monthlyRate = formData.interest_rate / 100 / 12;
      const numerator = formData.loan_amount * monthlyRate * Math.pow(1 + monthlyRate, formData.loan_term_months);
      const denominator = Math.pow(1 + monthlyRate, formData.loan_term_months) - 1;
      const payment = numerator / denominator;
      
      setCalculatedPayment(Math.round(payment * 100) / 100);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Calculation Error',
        description: 'Failed to calculate payment',
      });
    } finally {
      setCalculating(false);
    }
  };

  const submitApplication = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/financing/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Application Submitted',
          description: 'Your financing application has been submitted for review',
        });
        
        // Reset form
        setFormData({
          application_type: 'pre_approval',
          vehicle_make: '',
          vehicle_model: '',
          vehicle_year: new Date().getFullYear(),
          vehicle_price: 0,
          loan_amount: 0,
          down_payment: 0,
          loan_term_months: 60,
          employment_status: 'employed',
          annual_income: 0,
          credit_score_range: 'unknown',
          existing_debt: 0,
          notes: ''
        });
        
        loadApplications();
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'Failed to submit application',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'under_review':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'under_review':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-64 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/account">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Account
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Financing & Pre-Approval</h1>
            <p className="text-gray-600 mt-2">Manage your financing applications and get pre-approved</p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Approved</p>
                      <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Under Review</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.under_review}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Tabs defaultValue="applications" className="space-y-6">
            <TabsList>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="new">New Application</TabsTrigger>
              <TabsTrigger value="calculator">Payment Calculator</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    My Financing Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start by creating a pre-approval application to see your financing options.
                      </p>
                      <Button asChild>
                        <Link to="/cars">
                          Browse Cars
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {getStatusIcon(app.status)}
                                <h4 className="font-semibold">
                                  {app.vehicle_make} {app.vehicle_model} {app.vehicle_year}
                                </h4>
                                {getStatusBadge(app.status)}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div>
                                  <p className="font-medium">Application Type</p>
                                  <p className="capitalize">{app.application_type.replace('_', ' ')}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Loan Amount</p>
                                  <p>${app.loan_amount?.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Monthly Payment</p>
                                  <p>${app.monthly_payment?.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Applied</p>
                                  <p>{new Date(app.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                              {app.approval_amount && (
                                <div className="mt-2 p-2 bg-green-50 rounded text-green-800 text-sm">
                                  <strong>Approved for:</strong> ${app.approval_amount.toLocaleString()} 
                                  {app.approved_rate && ` at ${app.approved_rate}% APR`}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* New Application Tab */}
            <TabsContent value="new">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    New Financing Application
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="application_type">Application Type</Label>
                        <Select
                          value={formData.application_type}
                          onValueChange={(value) => handleInputChange('application_type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre_approval">Pre-Approval</SelectItem>
                            <SelectItem value="full_application">Full Application</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="vehicle_make">Vehicle Make</Label>
                        <Input
                          id="vehicle_make"
                          value={formData.vehicle_make}
                          onChange={(e) => handleInputChange('vehicle_make', e.target.value)}
                          placeholder="e.g., BMW"
                        />
                      </div>

                      <div>
                        <Label htmlFor="vehicle_model">Vehicle Model</Label>
                        <Input
                          id="vehicle_model"
                          value={formData.vehicle_model}
                          onChange={(e) => handleInputChange('vehicle_model', e.target.value)}
                          placeholder="e.g., X5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="vehicle_year">Vehicle Year</Label>
                        <Input
                          id="vehicle_year"
                          type="number"
                          value={formData.vehicle_year}
                          onChange={(e) => handleInputChange('vehicle_year', parseInt(e.target.value))}
                          min="1900"
                          max={new Date().getFullYear() + 1}
                        />
                      </div>

                      <div>
                        <Label htmlFor="vehicle_price">Vehicle Price ($)</Label>
                        <Input
                          id="vehicle_price"
                          type="number"
                          value={formData.vehicle_price}
                          onChange={(e) => handleInputChange('vehicle_price', parseFloat(e.target.value))}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="loan_amount">Loan Amount ($)</Label>
                        <Input
                          id="loan_amount"
                          type="number"
                          value={formData.loan_amount}
                          onChange={(e) => handleInputChange('loan_amount', parseFloat(e.target.value))}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="down_payment">Down Payment ($)</Label>
                        <Input
                          id="down_payment"
                          type="number"
                          value={formData.down_payment}
                          onChange={(e) => handleInputChange('down_payment', parseFloat(e.target.value))}
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <Label htmlFor="loan_term_months">Loan Term (months)</Label>
                        <Select
                          value={formData.loan_term_months.toString()}
                          onValueChange={(value) => handleInputChange('loan_term_months', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                        <Label htmlFor="employment_status">Employment Status</Label>
                        <Select
                          value={formData.employment_status}
                          onValueChange={(value) => handleInputChange('employment_status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self_employed">Self-Employed</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="annual_income">Annual Income ($)</Label>
                        <Input
                          id="annual_income"
                          type="number"
                          value={formData.annual_income}
                          onChange={(e) => handleInputChange('annual_income', parseFloat(e.target.value))}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="credit_score_range">Credit Score Range</Label>
                      <Select
                        value={formData.credit_score_range}
                        onValueChange={(value) => handleInputChange('credit_score_range', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
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

                    <div>
                      <Label htmlFor="existing_debt">Existing Debt ($)</Label>
                      <Input
                        id="existing_debt"
                        type="number"
                        value={formData.existing_debt}
                        onChange={(e) => handleInputChange('existing_debt', parseFloat(e.target.value))}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <Input
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Any additional information..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={submitApplication} className="flex-1">
                      Submit Application
                    </Button>
                    <Button variant="outline" onClick={() => calculatePayment()}>
                      Calculate Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Calculator Tab */}
            <TabsContent value="calculator">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Payment Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="calc_loan_amount">Loan Amount ($)</Label>
                      <Input
                        id="calc_loan_amount"
                        type="number"
                        value={formData.loan_amount}
                        onChange={(e) => handleInputChange('loan_amount', parseFloat(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="calc_interest_rate">Interest Rate (%)</Label>
                      <Input
                        id="calc_interest_rate"
                        type="number"
                        step="0.01"
                        value={formData.interest_rate}
                        onChange={(e) => handleInputChange('interest_rate', parseFloat(e.target.value))}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="calc_term">Term (months)</Label>
                      <Input
                        id="calc_term"
                        type="number"
                        value={formData.loan_term_months}
                        onChange={(e) => handleInputChange('loan_term_months', parseInt(e.target.value))}
                        placeholder="60"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={calculatePayment} 
                    disabled={calculating}
                    className="w-full"
                  >
                    {calculating ? 'Calculating...' : 'Calculate Payment'}
                  </Button>

                  {calculatedPayment && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Estimated Monthly Payment</h4>
                      <p className="text-2xl font-bold text-blue-900">${calculatedPayment.toLocaleString()}</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Based on ${formData.loan_amount?.toLocaleString()} loan at {formData.interest_rate}% for {formData.loan_term_months} months
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {applications.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
                        <p className="text-gray-600 mb-6">
                          Create a financing application first to upload documents.
                        </p>
                        <Button asChild>
                          <Link to="#new">Create Application</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-medium">Select Application to Upload Documents:</h4>
                        {applications.map((app) => (
                          <div key={app.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h5 className="font-semibold">
                                  {app.vehicle_make} {app.vehicle_model} {app.vehicle_year}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {app.application_type.replace('_', ' ')} • Applied {new Date(app.createdAt).toLocaleDateString()}
                                </p>
                                {getStatusBadge(app.status)}
                              </div>
                            </div>
                            <DocumentUpload 
                              applicationId={app.id} 
                              onDocumentUploaded={() => {
                                toast({
                                  title: 'Documents Updated',
                                  description: 'Your documents have been uploaded successfully.',
                                });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FinancingPage;
