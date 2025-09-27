import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Mail, Phone, Calendar } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2024";

  const dataTypes = [
    {
      category: "Personal Information",
      description: "Information that identifies you personally",
      examples: ["Name", "Email address", "Phone number", "Mailing address", "Date of birth"],
      icon: <Shield className="h-6 w-6 text-blue-500" />
    },
    {
      category: "Vehicle Information",
      description: "Information about vehicles you're interested in or own",
      examples: ["VIN numbers", "Make and model", "Year", "Mileage", "Condition"],
      icon: <Eye className="h-6 w-6 text-green-500" />
    },
    {
      category: "Usage Information",
      description: "Information about how you use our services",
      examples: ["Search history", "Page views", "Time spent", "Device information", "IP address"],
      icon: <Lock className="h-6 w-6 text-purple-500" />
    }
  ];

  const dataUsage = [
    {
      purpose: "Service Provision",
      description: "To provide and improve our car marketplace services",
      examples: ["Matching buyers with sellers", "Processing transactions", "Customer support"]
    },
    {
      purpose: "Communication",
      description: "To communicate with you about our services",
      examples: ["Service updates", "Promotional offers", "Important notices"]
    },
    {
      purpose: "Analytics",
      description: "To understand how our services are used",
      examples: ["Usage patterns", "Performance metrics", "Feature improvements"]
    },
    {
      purpose: "Legal Compliance",
      description: "To comply with legal obligations",
      examples: ["Tax reporting", "Fraud prevention", "Regulatory compliance"]
    }
  ];

  const dataSharing = [
    {
      party: "Service Providers",
      description: "Third-party companies that help us operate our services",
      examples: ["Payment processors", "Hosting providers", "Analytics services"],
      protection: "Contractual agreements"
    },
    {
      party: "Business Partners",
      description: "Companies we partner with to provide additional services",
      examples: ["Insurance providers", "Financing companies", "Extended warranty providers"],
      protection: "Data sharing agreements"
    },
    {
      party: "Legal Requirements",
      description: "When required by law or to protect our rights",
      examples: ["Court orders", "Law enforcement requests", "Legal proceedings"],
      protection: "Legal compliance"
    }
  ];

  const userRights = [
    {
      right: "Access",
      description: "Request a copy of your personal data",
      icon: <Eye className="h-5 w-5 text-blue-500" />
    },
    {
      right: "Correction",
      description: "Correct inaccurate or incomplete data",
      icon: <Shield className="h-5 w-5 text-green-500" />
    },
    {
      right: "Deletion",
      description: "Request deletion of your personal data",
      icon: <Lock className="h-5 w-5 text-red-500" />
    },
    {
      right: "Portability",
      description: "Export your data in a portable format",
      icon: <Mail className="h-5 w-5 text-purple-500" />
    },
    {
      right: "Restriction",
      description: "Limit how we process your data",
      icon: <Shield className="h-5 w-5 text-yellow-500" />
    },
    {
      right: "Objection",
      description: "Object to certain types of data processing",
      icon: <Lock className="h-5 w-5 text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">
            Privacy Policy
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
              <Shield className="h-6 w-6 text-automotive-navy mr-2" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Gold Standard Cars ("we," "our," or "us") is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              use our car marketplace services.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataTypes.map((type, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center">
                    {type.icon}
                    <h3 className="font-semibold ml-2">{type.category}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                  <ul className="space-y-1">
                    {type.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-automotive-navy rounded-full mr-2"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dataUsage.map((usage, index) => (
                <div key={index} className="border-l-4 border-automotive-navy pl-4">
                  <h3 className="font-semibold text-lg mb-2">{usage.purpose}</h3>
                  <p className="text-muted-foreground mb-3">{usage.description}</p>
                  <ul className="space-y-1">
                    {usage.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-automotive-navy rounded-full mr-2"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dataSharing.map((sharing, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{sharing.party}</h3>
                    <Badge variant="outline">{sharing.protection}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{sharing.description}</p>
                  <ul className="space-y-1">
                    {sharing.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-automotive-navy rounded-full mr-2"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-6 w-6 text-automotive-navy mr-2" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We implement appropriate technical and organizational security measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Technical Measures</h4>
                <ul className="space-y-1 text-sm">
                  <li>• SSL/TLS encryption</li>
                  <li>• Secure data centers</li>
                  <li>• Regular security audits</li>
                  <li>• Access controls</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Organizational Measures</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Employee training</li>
                  <li>• Data handling policies</li>
                  <li>• Incident response plans</li>
                  <li>• Regular reviews</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRights.map((right, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  {right.icon}
                  <div>
                    <h4 className="font-semibold">{right.right}</h4>
                    <p className="text-sm text-muted-foreground">{right.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm">
                <strong>To exercise your rights:</strong> Contact us at privacy@goldstandardcars.com or use the 
                contact information provided below. We will respond to your request within 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies and Tracking Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, 
              and provide personalized content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Required for basic website functionality and security.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Used to deliver relevant advertisements and measure effectiveness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-6 w-6 text-automotive-navy mr-2" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Privacy Questions</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-automotive-navy" />
                    <span className="text-sm">privacy@goldstandardcars.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-automotive-navy" />
                    <span className="text-sm">1-800-AUTO-PRIVACY</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Mailing Address</h4>
                <div className="text-sm text-muted-foreground">
                  Gold Standard Cars Privacy Officer<br />
                  123 Auto Street<br />
                  Car City, CC 12345<br />
                  United States
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policy Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or 
              applicable laws. We will notify you of any material changes by posting the new Privacy Policy 
              on this page and updating the "Last updated" date.
            </p>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm">
                <strong>Important:</strong> Your continued use of our services after any changes to this 
                Privacy Policy will constitute your acceptance of such changes.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
