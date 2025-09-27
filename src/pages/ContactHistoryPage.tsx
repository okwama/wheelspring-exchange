import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ArrowLeft, Phone, Mail, Calendar, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactHistoryPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Contact History</h1>
            <p className="text-gray-600 mt-2">Your communication history with dealers and support</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Sample Conversation 1 */}
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">2023 BMW X5 Inquiry</h4>
                            <p className="text-sm text-gray-600 mb-1">John Smith - Auto Dealer</p>
                            <p className="text-sm text-gray-500">Interested in the BMW X5 xDrive40i. Can you provide more details about the maintenance history?</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">{formatDate('2024-09-20T14:30:00Z')}</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Replied
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Sample Conversation 2 */}
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">Mercedes E-Class Support</h4>
                            <p className="text-sm text-gray-600 mb-1">Sarah Johnson - Customer Support</p>
                            <p className="text-sm text-gray-500">Follow-up call regarding your import request. All documents have been processed successfully.</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">{formatDate('2024-09-18T10:15:00Z')}</p>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Sample Conversation 3 */}
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Mail className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">Insurance Quote Request</h4>
                            <p className="text-sm text-gray-600 mb-1">Mike Wilson - Insurance Partner</p>
                            <p className="text-sm text-gray-500">Thank you for your insurance inquiry. I've attached the quote for your selected vehicles.</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">{formatDate('2024-09-15T16:45:00Z')}</p>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Empty State (commented out since we have sample data) */}
              {false && (
                <Card className="mt-6">
                  <CardContent>
                    <div className="text-center py-12">
                      <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start browsing cars and contact dealers to see your conversation history here.
                      </p>
                      <Button asChild>
                        <Link to="/cars">
                          Browse Cars
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to="/cars">
                      Browse Cars
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">
                      Contact Support
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Car Inquiries</span>
                    <Badge variant="secondary" className="ml-auto">2</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Support Calls</span>
                    <Badge variant="secondary" className="ml-auto">1</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Email</span>
                    <Badge variant="secondary" className="ml-auto">1</Badge>
                  </div>
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

export default ContactHistoryPage;

