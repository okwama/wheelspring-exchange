import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertTriangle, Shield, Users, DollarSign, Calendar } from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      content: "By accessing and using Gold Standard Cars services, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      title: "User Accounts",
      icon: <Users className="h-6 w-6 text-green-500" />,
      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
    },
    {
      title: "Service Availability",
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      content: "We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve the right to modify or discontinue services."
    },
    {
      title: "User Conduct",
      icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
      content: "Users must comply with all applicable laws and regulations. Prohibited activities include fraud, harassment, and posting false information."
    },
    {
      title: "Payment Terms",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      content: "Payment terms vary by service. All fees are non-refundable unless otherwise specified. We reserve the right to change pricing with notice."
    },
    {
      title: "Intellectual Property",
      icon: <FileText className="h-6 w-6 text-red-500" />,
      content: "All content on Gold Standard Cars is protected by copyright and other intellectual property laws. Users retain rights to their own content."
    }
  ];

  const prohibitedActivities = [
    "Posting false or misleading information",
    "Engaging in fraudulent activities",
    "Harassing other users",
    "Violating intellectual property rights",
    "Attempting to gain unauthorized access",
    "Distributing malware or harmful code",
    "Spamming or unsolicited communications",
    "Circumventing security measures"
  ];

  const liabilityLimitations = [
    {
      category: "Service Availability",
      description: "We do not guarantee uninterrupted service availability",
      limitation: "No liability for service interruptions"
    },
    {
      category: "User Content",
      description: "We are not responsible for user-generated content",
      limitation: "Users are solely responsible for their content"
    },
    {
      category: "Third-Party Services",
      description: "We are not liable for third-party services or websites",
      limitation: "No liability for external services"
    },
    {
      category: "Vehicle Information",
      description: "We do not guarantee accuracy of vehicle information",
      limitation: "Buyers should verify all information independently"
    }
  ];

  const disputeResolution = [
    {
      step: "1",
      title: "Informal Resolution",
      description: "Contact us to resolve disputes informally before formal proceedings"
    },
    {
      step: "2",
      title: "Mediation",
      description: "If informal resolution fails, disputes may be resolved through mediation"
    },
    {
      step: "3",
      title: "Arbitration",
      description: "Binding arbitration may be required for certain disputes"
    },
    {
      step: "4",
      title: "Legal Action",
      description: "Legal action may be taken as a last resort for unresolved disputes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Terms of Service
          </h1>
          <div className="flex items-center justify-center text-muted-foreground">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-6 w-6 text-automotive-navy mr-2" />
              Agreement Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Welcome to Gold Standard Cars. These Terms of Service ("Terms") govern your use of our car marketplace 
              platform and related services. By accessing or using our services, you agree to be bound by 
              these Terms.
            </p>
            <p>
              If you do not agree to these Terms, please do not use our services. We reserve the right to 
              modify these Terms at any time, and your continued use constitutes acceptance of any changes.
            </p>
          </CardContent>
        </Card>

        {/* Key Terms Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-automotive-navy mb-6">Key Terms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    {section.icon}
                    <span className="ml-2">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prohibited Activities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              Prohibited Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The following activities are strictly prohibited on our platform:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prohibitedActivities.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Violation Consequences:</strong> Users who engage in prohibited activities may 
                have their accounts suspended or terminated without notice.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Liability Limitations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-6 w-6 text-automotive-navy mr-2" />
              Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              Gold Standard Cars provides services on an "as is" basis. Our liability is limited as follows:
            </p>
            <div className="space-y-4">
              {liabilityLimitations.map((limitation, index) => (
                <div key={index} className="border-l-4 border-automotive-navy pl-4">
                  <h4 className="font-semibold mb-1">{limitation.category}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{limitation.description}</p>
                  <Badge variant="outline" className="text-xs">{limitation.limitation}</Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> Our total liability to you shall not exceed the amount 
                you paid for our services in the 12 months preceding the claim.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dispute Resolution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 text-automotive-navy mr-2" />
              Dispute Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              We encourage users to resolve disputes amicably. The following process applies to disputes:
            </p>
            <div className="space-y-4">
              {disputeResolution.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-automotive-navy text-white rounded-full flex items-center justify-center font-semibold">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Governing Law and Jurisdiction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              These Terms are governed by the laws of the State of California, United States, without regard 
              to conflict of law principles. Any legal action or proceeding arising under these Terms will 
              be brought exclusively in the courts of California.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Governing Law</h4>
                <p className="text-sm text-muted-foreground">
                  California State Law, United States
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Jurisdiction</h4>
                <p className="text-sm text-muted-foreground">
                  California State Courts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Either party may terminate this agreement at any time. We reserve the right to suspend or 
              terminate accounts that violate these Terms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">User Termination</h4>
                <p className="text-sm text-muted-foreground">
                  Users may terminate their account at any time through account settings or by contacting support.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Gold Standard Cars Termination</h4>
                <p className="text-sm text-muted-foreground">
                  We may terminate accounts for Terms violations, illegal activity, or at our discretion.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Legal Questions</h4>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Email:</strong> legal@goldstandardcars.com
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> 1-800-AUTO-LEGAL
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Mailing Address</h4>
                <div className="text-sm text-muted-foreground">
                  Gold Standard Cars Legal Department<br />
                  123 Auto Street<br />
                  Car City, CA 12345<br />
                  United States
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Severability */}
        <Card>
          <CardHeader>
            <CardTitle>Severability and Entire Agreement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, the remaining 
              provisions will continue to be valid and enforceable.
            </p>
            <p>
              These Terms constitute the entire agreement between you and Gold Standard Cars regarding your use 
              of our services and supersede all prior agreements and understandings.
            </p>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Effective Date:</strong> These Terms are effective as of {lastUpdated} and 
                will remain in effect until modified or terminated.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
