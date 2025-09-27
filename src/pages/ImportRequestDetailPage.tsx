import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Truck, Car, MapPin, Calendar, DollarSign, 
  Star, MessageSquare, FileText, Clock, CheckCircle, 
  AlertCircle, Edit, Send, User, Shield, Eye, EyeOff
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import importRequestsService, { 
  ImportRequest, 
  ImportRequestCommunication,
  CreateCommunicationData 
} from '@/services/importRequestsService';
import { Skeleton } from '@/components/ui/skeleton';

const ImportRequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [request, setRequest] = useState<ImportRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    if (id) {
      loadRequest();
    }
  }, [id, isAuthenticated, navigate]);

  const loadRequest = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const requestData = await importRequestsService.getImportRequestById(parseInt(id));
      setRequest(requestData);
    } catch (error: any) {
      console.error('Error loading import request:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load import request",
      });
      navigate('/import-requests');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !id) return;

    try {
      setSendingMessage(true);
      const communicationData: CreateCommunicationData = {
        message: newMessage.trim(),
        messageType: 'text',
      };

      await importRequestsService.addCommunication(parseInt(id), communicationData);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });

      setNewMessage('');
      loadRequest(); // Reload to get updated communications
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send message",
      });
    } finally {
      setSendingMessage(false);
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            <div className="mb-6">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-6 w-64" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
            <h1 className="text-2xl font-bold mb-4">Request Not Found</h1>
            <p className="text-gray-600 mb-6">The import request you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/import-requests">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Requests
              </Link>
            </Button>
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link to="/import-requests">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Requests
                  </Link>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Truck className="h-8 w-8" />
                    {request.vehicleYear} {request.vehicleMake} {request.vehicleModel}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {importRequestsService.getRequestTypeLabel(request.requestType)} • Created {formatDate(request.createdAt)}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor(request.status)}>
                {getStatusIcon(request.status)}
                <span className="ml-1">{importRequestsService.getStatusLabel(request.status)}</span>
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="communications">Messages</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  {/* Vehicle Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Vehicle Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Make & Model</label>
                          <p className="text-lg font-semibold">{request.vehicleMake} {request.vehicleModel}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Year</label>
                          <p className="text-lg font-semibold">{request.vehicleYear}</p>
                        </div>
                        {request.vehicleVariant && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Variant</label>
                            <p className="text-lg font-semibold">{request.vehicleVariant}</p>
                          </div>
                        )}
                        {request.vehicleCondition && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Condition</label>
                            <p className="text-lg font-semibold capitalize">{request.vehicleCondition}</p>
                          </div>
                        )}
                        {request.vehicleColor && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Exterior Color</label>
                            <p className="text-lg font-semibold">{request.vehicleColor}</p>
                          </div>
                        )}
                        {request.vehicleInteriorColor && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Interior Color</label>
                            <p className="text-lg font-semibold">{request.vehicleInteriorColor}</p>
                          </div>
                        )}
                        {request.vehicleMileage && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Mileage</label>
                            <p className="text-lg font-semibold">{request.vehicleMileage.toLocaleString()} km</p>
                          </div>
                        )}
                        {request.vehicleTransmission && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Transmission</label>
                            <p className="text-lg font-semibold capitalize">{request.vehicleTransmission}</p>
                          </div>
                        )}
                        {request.vehicleFuelType && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Fuel Type</label>
                            <p className="text-lg font-semibold capitalize">{request.vehicleFuelType}</p>
                          </div>
                        )}
                        {request.vehicleEngineSize && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Engine Size</label>
                            <p className="text-lg font-semibold">{request.vehicleEngineSize}</p>
                          </div>
                        )}
                        {request.vehicleDriveType && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Drive Type</label>
                            <p className="text-lg font-semibold uppercase">{request.vehicleDriveType}</p>
                          </div>
                        )}
                        {request.vehicleBodyType && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Body Type</label>
                            <p className="text-lg font-semibold">{request.vehicleBodyType}</p>
                          </div>
                        )}
                        {request.vehicleDoors && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Doors</label>
                            <p className="text-lg font-semibold">{request.vehicleDoors}</p>
                          </div>
                        )}
                        {request.vehicleSeats && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Seats</label>
                            <p className="text-lg font-semibold">{request.vehicleSeats}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Import Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Import Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Source Country</label>
                          <p className="text-lg font-semibold">{request.sourceCountry || 'Not specified'}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Destination Country</label>
                          <p className="text-lg font-semibold">{request.destinationCountry}</p>
                        </div>
                        {request.estimatedPrice && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Estimated Price</label>
                            <p className="text-lg font-semibold">
                              {importRequestsService.formatCurrency(request.estimatedPrice, request.currency)}
                            </p>
                          </div>
                        )}
                        {request.quotedPrice && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Quoted Price</label>
                            <p className="text-lg font-semibold text-green-600">
                              {importRequestsService.formatCurrency(request.quotedPrice, request.currency)}
                            </p>
                          </div>
                        )}
                        {request.budgetRangeMin && request.budgetRangeMax && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Budget Range</label>
                            <p className="text-lg font-semibold">
                              {importRequestsService.formatCurrency(request.budgetRangeMin, request.currency)} - {' '}
                              {importRequestsService.formatCurrency(request.budgetRangeMax, request.currency)}
                            </p>
                          </div>
                        )}
                        <div>
                          <label className="text-sm font-medium text-gray-600">Preferred Delivery</label>
                          <p className="text-lg font-semibold capitalize">
                            {request.preferredDeliveryTime.replace('_', ' ')}
                          </p>
                        </div>
                        {request.vinNumber && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">VIN Number</label>
                            <p className="text-lg font-semibold font-mono">{request.vinNumber}</p>
                          </div>
                        )}
                        {request.registrationNumber && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Registration Number</label>
                            <p className="text-lg font-semibold">{request.registrationNumber}</p>
                          </div>
                        )}
                        {request.currentLocation && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Current Location</label>
                            <p className="text-lg font-semibold">{request.currentLocation}</p>
                          </div>
                        )}
                        {request.sellerContact && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Seller Contact</label>
                            <p className="text-lg font-semibold">{request.sellerContact}</p>
                          </div>
                        )}
                        {request.sellerWebsite && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Seller Website</label>
                            <a 
                              href={request.sellerWebsite} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-lg font-semibold text-blue-600 hover:underline"
                            >
                              {request.sellerWebsite}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  {(request.requestNotes || request.specialRequirements) && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Notes & Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {request.requestNotes && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Request Notes</label>
                            <p className="text-gray-900 mt-1">{request.requestNotes}</p>
                          </div>
                        )}
                        {request.specialRequirements && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Special Requirements</label>
                            <p className="text-gray-900 mt-1">{request.specialRequirements}</p>
                          </div>
                        )}
                        {request.adminNotes && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">Admin Notes</label>
                            <p className="text-gray-900 mt-1">{request.adminNotes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="communications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Communications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Messages */}
                      {request.communications && request.communications.length > 0 ? (
                        <div className="space-y-4">
                          {request.communications.map((communication) => (
                            <div 
                              key={communication.id} 
                              className={`p-4 rounded-lg ${
                                communication.senderType === 'user' 
                                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                                  : 'bg-gray-50 border-l-4 border-gray-500'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {communication.senderType === 'user' ? (
                                    <User className="h-4 w-4 text-blue-600" />
                                  ) : (
                                    <Shield className="h-4 w-4 text-gray-600" />
                                  )}
                                  <span className="font-medium">
                                    {communication.senderType === 'user' ? 'You' : 'Admin'}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {communication.messageType}
                                  </Badge>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {formatDate(communication.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-900">{communication.message}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No messages yet</p>
                        </div>
                      )}

                      {/* Send Message */}
                      <div className="border-t pt-4">
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={3}
                          />
                          <div className="flex justify-end">
                            <Button 
                              onClick={handleSendMessage}
                              disabled={!newMessage.trim() || sendingMessage}
                            >
                              {sendingMessage ? (
                                <>
                                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Message
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {request.documents && request.documents.length > 0 ? (
                        <div className="space-y-4">
                          {request.documents.map((document) => (
                            <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <FileText className="h-8 w-8 text-gray-500" />
                                <div>
                                  <p className="font-medium">{document.fileName}</p>
                                  <p className="text-sm text-gray-600">
                                    {document.documentType} • {document.fileSize ? `${(document.fileSize / 1024).toFixed(1)} KB` : 'Unknown size'}
                                  </p>
                                  {document.description && (
                                    <p className="text-sm text-gray-500">{document.description}</p>
                                  )}
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">No documents uploaded yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  {request.statusHistory && request.statusHistory.length > 0 ? (
                    <div className="space-y-4">
                      {request.statusHistory.map((history, index) => (
                        <div key={history.id} className="flex items-start gap-3">
                          <div className={`w-3 h-3 rounded-full mt-1 ${
                            index === 0 ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium">
                              {importRequestsService.getStatusLabel(history.newStatus)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(history.createdAt)}
                            </p>
                            {history.changeReason && (
                              <p className="text-sm text-gray-500 mt-1">
                                {history.changeReason}
                              </p>
                            )}
                            {history.notes && (
                              <p className="text-sm text-gray-500 mt-1">
                                {history.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600">No status history available</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Request Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Request Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Request ID</span>
                    <span className="font-mono text-sm">#{request.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium">
                      {importRequestsService.getRequestTypeLabel(request.requestType)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Priority</span>
                    <Badge variant="outline" className="text-xs">
                      {importRequestsService.getPriorityLabel(request.priority)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created</span>
                    <span className="text-sm">{formatDate(request.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm">{formatDate(request.updatedAt)}</span>
                  </div>
                  {request.quotedAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Quoted</span>
                      <span className="text-sm">{formatDate(request.quotedAt)}</span>
                    </div>
                  )}
                  {request.approvedAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Approved</span>
                      <span className="text-sm">{formatDate(request.approvedAt)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ImportRequestDetailPage;
