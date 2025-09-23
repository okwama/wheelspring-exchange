import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, DollarSign, CheckCircle } from "lucide-react";

const Sell = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-automotive-navy mb-4">Sell Your Car</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get the best value for your vehicle with our easy-to-use listing process
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-automotive-navy" />
              </div>
              <CardTitle>Add Photos</CardTitle>
              <CardDescription>Upload high-quality photos of your vehicle</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-automotive-navy" />
              </div>
              <CardTitle>Set Your Price</CardTitle>
              <CardDescription>Get a competitive market value estimate</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-automotive-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-automotive-navy" />
              </div>
              <CardTitle>List & Sell</CardTitle>
              <CardDescription>Connect with qualified buyers instantly</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Listing Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>Tell us about your car to create your listing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="make">Make</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                    <SelectItem value="porsche">Porsche</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="e.g., 3 Series" />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mileage">Mileage</Label>
                <Input id="mileage" placeholder="e.g., 25000" type="number" />
              </div>
              <div>
                <Label htmlFor="price">Asking Price</Label>
                <Input id="price" placeholder="e.g., 45000" type="number" />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your vehicle's condition, features, and any additional details..."
                rows={4}
              />
            </div>

            {/* Photo Upload */}
            <div>
              <Label>Photos</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Drag and drop photos here, or click to browse</p>
                <p className="text-sm text-muted-foreground">Maximum 20 photos, 5MB each</p>
                <Button variant="outline" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-name">Your Name</Label>
                <Input id="contact-name" placeholder="Full name" />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input id="contact-phone" placeholder="(555) 123-4567" />
              </div>
            </div>

            <div>
              <Label htmlFor="contact-email">Email Address</Label>
              <Input id="contact-email" placeholder="your@email.com" type="email" />
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button size="lg" className="w-full bg-automotive-navy hover:bg-automotive-dark">
                Create Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Sell;