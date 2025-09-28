import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, HelpCircle, Car } from "lucide-react";
import { useMemo, useState } from "react";

const Contact = () => {
  const defaultWhatsAppEnv = (import.meta.env.VITE_DEFAULT_WHATSAPP_PHONE as string) || "";
  const normalizedWaNumber = useMemo(() => defaultWhatsAppEnv.replace(/\D/g, ""), [defaultWhatsAppEnv]);
  const displayPhone = defaultWhatsAppEnv || "Set VITE_DEFAULT_WHATSAPP_PHONE";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: [
        `Sales: ${displayPhone}`,
        `Support: ${displayPhone}`
      ],
      description: "Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["sales@goldstandardcars.com", "support@goldstandardcars.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["123 Auto Boulevard", "New York, NY 10001"],
      description: "Visit our flagship showroom"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8AM - 8PM", "Sat-Sun: 9AM - 6PM"],
      description: "Extended hours for your convenience"
    }
  ];

  const departments = [
    { icon: Car, name: "Vehicle Sales", description: "Find your perfect car" },
    { icon: HelpCircle, name: "Customer Support", description: "Get help with your purchase" },
    { icon: MessageCircle, name: "General Inquiry", description: "Questions about our services" }
  ];

  const handleSubmitToWhatsApp = () => {
    const lines = [
      `Contact Request` ,
      `Name: ${firstName} ${lastName}`.trim(),
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Department: ${department || "General"}`,
      `Subject: ${subject}`,
      `Message: ${message}`,
    ];
    const text = lines.filter(Boolean).join("\n");
    if (!normalizedWaNumber) {
      alert("WhatsApp number not configured. Set VITE_DEFAULT_WHATSAPP_PHONE.");
      return;
    }
    const waUrl = `https://wa.me/${normalizedWaNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");

    // Clear form fields after sending
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setDepartment(undefined);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help you find your perfect vehicle. Get in touch with our team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={(v) => setDepartment(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Vehicle Sales</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="financing">Financing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your inquiry..."
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button size="lg" className="w-full bg-automotive-navy hover:bg-automotive-dark" onClick={handleSubmitToWhatsApp}>
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We typically respond within 2-4 hours during business hours.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
                <CardDescription>Need immediate assistance?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => {
                  if (!defaultWhatsAppEnv) return;
                  window.location.href = `tel:${defaultWhatsAppEnv}`;
                }}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Sales: {displayPhone}
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => {
                  if (!normalizedWaNumber) return;
                  const text = encodeURIComponent("Hello, I need assistance.");
                  window.open(`https://wa.me/${normalizedWaNumber}?text=${text}`, "_blank");
                }}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Chat
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => {
                  window.location.href = `mailto:support@goldstandardcars.com`;
                }}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
              </CardContent>
            </Card>

            {/* Departments */}
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-automotive-navy/10 rounded-lg flex items-center justify-center mt-1">
                      <dept.icon className="h-5 w-5 text-automotive-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-automotive-navy" />
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <div className="space-y-1 mb-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm font-medium">{detail}</p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Find Us</CardTitle>
            <CardDescription>Visit our flagship showroom in New York</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p>Interactive map would be displayed here</p>
                <p className="text-sm">123 Auto Boulevard, New York, NY 10001</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;