import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, Plus, ArrowLeft, Clock, CheckCircle, AlertCircle, 
  Search, Filter, Eye, MessageSquare, FileText, Calendar,
  DollarSign, MapPin, Car, Star, MoreHorizontal, Edit, Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import importRequestsService, { 
  ImportRequest, 
  ImportRequestFilters, 
  ImportRequestStatistics 
} from '@/services/importRequestsService';
import { Skeleton } from '@/components/ui/skeleton';

const ImportRequestsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State management
  const [requests, setRequests] = useState<ImportRequest[]>([]);
  const [statistics, setStatistics] = useState<ImportRequestStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ImportRequestFilters>({
    page: 1,
    limit: 10,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  // Load data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      loadRequests();
      loadStatistics();
    } else {
      navigate('/');
    }
  }, [isAuthenticated, navigate, filters]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const response = await importRequestsService.getAllImportRequests(filters);
      setRequests(response.requests);
    } catch (error: any) {
      console.error('Error loading import requests:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load import requests",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const stats = await importRequestsService.getStatistics();
      setStatistics(stats);
    } catch (error: any) {
      console.error('Error loading statistics:', error);
    }
  };

  const handleFilterChange = (newFilters: Partial<ImportRequestFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSearch = () => {
    handleFilterChange({ search: searchTerm || undefined });
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    handleFilterChange({ status: status === 'all' ? undefined : status as any });
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    handleFilterChange({ requestType: type === 'all' ? undefined : type as any });
  };

  const handleDeleteRequest = async (id: number) => {
    if (!confirm('Are you sure you want to delete this request?')) return;

    try {
      await importRequestsService.deleteImportRequest(id);
      toast({
        title: "Request Deleted",
        description: "Import request has been deleted successfully.",
      });
      loadRequests();
    } catch (error: any) {
      console.error('Error deleting request:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete request",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4" />;
      case 'quoted': return <DollarSign className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    return importRequestsService.getStatusColor(status);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link to="/account">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Account
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Truck className="h-8 w-8" />
                    Import Requests
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage your vehicle import and quote requests
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link to="/cars">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Link>
              </Button>
            </div>

            {/* Statistics Cards */}
            {statistics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Truck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Requests</p>
                        <p className="text-2xl font-bold text-gray-900">{statistics.totalRequests}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{statistics.statusBreakdown.pending}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Quoted</p>
                        <p className="text-2xl font-bold text-gray-900">{statistics.statusBreakdown.quoted}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Approved</p>
                        <p className="text-2xl font-bold text-gray-900">{statistics.statusBreakdown.approved}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search requests..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={selectedStatus} onValueChange={handleStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedType} onValueChange={handleTypeFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="import_request">Import Request</SelectItem>
                        <SelectItem value="quote_request">Quote Request</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleSearch} variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Requests List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    My Requests ({requests.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                          <Skeleton className="w-12 h-12 rounded-lg" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <Skeleton className="h-6 w-20" />
                        </div>
                      ))}
                    </div>
                  ) : requests.length === 0 ? (
                    <div className="text-center py-12">
                      <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
                      <p className="text-gray-600 mb-6">
                        {searchTerm || selectedStatus !== 'all' || selectedType !== 'all'
                          ? 'No requests match your current filters.'
                          : 'Start by creating your first import or quote request.'}
                      </p>
                      <Button asChild>
                        <Link to="/cars">
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Request
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Car className="h-6 w-6 text-gray-500" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-lg">
                                    {request.vehicleYear} {request.vehicleMake} {request.vehicleModel}
                                  </h4>
                                  <Badge variant="outline" className="text-xs">
                                    {importRequestsService.getRequestTypeLabel(request.requestType)}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {request.sourceCountry || 'Unknown'} → {request.destinationCountry}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(request.createdAt)}
                                  </div>
                                  {request.quotedPrice && (
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="h-3 w-3" />
                                      {importRequestsService.formatCurrency(request.quotedPrice, request.currency)}
                                    </div>
                                  )}
                                  {request.vehicleCondition && (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3" />
                                      {request.vehicleCondition}
                                    </div>
                                  )}
                                </div>
                                {request.requestNotes && (
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {request.requestNotes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(request.status)}>
                                {getStatusIcon(request.status)}
                                <span className="ml-1">{importRequestsService.getStatusLabel(request.status)}</span>
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/import-requests/${request.id}`}>
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                {request.status === 'pending' && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleDeleteRequest(request.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Import Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Submit Request</p>
                      <p className="text-sm text-gray-600">Choose your vehicle</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-yellow-600">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Review & Quote</p>
                      <p className="text-sm text-gray-600">We provide pricing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-600">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Import & Deliver</p>
                      <p className="text-sm text-gray-600">Vehicle arrives</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to="/cars">
                      <Plus className="h-4 w-4 mr-2" />
                      New Import Request
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Import Guidelines
                  </Button>
                </CardContent>
              </Card>

              {statistics && (
                <Card>
                  <CardHeader>
                    <CardTitle>Request Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Import Requests</span>
                      <span className="font-semibold">{statistics.typeBreakdown.importRequests}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Quote Requests</span>
                      <span className="font-semibold">{statistics.typeBreakdown.quoteRequests}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ImportRequestsPage;

