import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Car, MapPin, DollarSign, Calendar, FileText } from "lucide-react";
import importRequestsService, { CreateImportRequestData } from "@/services/importRequestsService";

interface ImportRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportRequestDialog = ({ open, onOpenChange }: ImportRequestDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<CreateImportRequestData>({
    requestType: 'import_request',
    priority: 'medium',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear(),
    vehicleVariant: '',
    vehicleColor: '',
    vehicleInteriorColor: '',
    vehicleCondition: 'new',
    vehicleMileage: undefined,
    vehicleTransmission: undefined,
    vehicleFuelType: undefined,
    vehicleEngineSize: '',
    vehicleDriveType: undefined,
    vehicleBodyType: '',
    vehicleDoors: undefined,
    vehicleSeats: undefined,
    sourceCountry: '',
    destinationCountry: 'Kenya',
    estimatedPrice: undefined,
    currency: 'KES',
    budgetRangeMin: undefined,
    budgetRangeMax: undefined,
    preferredDeliveryTime: 'flexible',
    specialRequirements: '',
    vinNumber: '',
    registrationNumber: '',
    currentLocation: '',
    sellerContact: '',
    sellerWebsite: '',
    requestNotes: '',
  });

  const carMakes = [
    "Toyota", "BMW", "Mercedes-Benz", "Audi", "Honda", "Ford", 
    "Volkswagen", "Nissan", "Porsche", "Lexus", "Hyundai", "Mazda",
    "Chevrolet", "Infiniti", "Acura", "Volvo", "Jaguar", "Land Rover",
    "Kia", "Subaru", "Mitsubishi", "Suzuki", "Isuzu", "Peugeot"
  ];

  const countries = [
    "Japan", "Germany", "United Kingdom", "United States", "South Korea",
    "France", "Italy", "Sweden", "Netherlands", "Belgium", "Spain",
    "Canada", "Australia", "South Africa", "Thailand", "Malaysia",
    "Singapore", "UAE", "Qatar", "Saudi Arabia"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to submit an import request.",
      });
      return;
    }

    if (!formData.vehicleMake || !formData.vehicleModel || !formData.vehicleYear) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please fill in the vehicle make, model, and year.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await importRequestsService.createImportRequest(formData);

      toast({
        title: "Request submitted successfully!",
        description: "We'll contact you within 24 hours with available options.",
      });
      
      // Reset form
      setFormData({
        requestType: 'import_request',
        priority: 'medium',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: new Date().getFullYear(),
        vehicleVariant: '',
        vehicleColor: '',
        vehicleInteriorColor: '',
        vehicleCondition: 'new',
        vehicleMileage: undefined,
        vehicleTransmission: undefined,
        vehicleFuelType: undefined,
        vehicleEngineSize: '',
        vehicleDriveType: undefined,
        vehicleBodyType: '',
        vehicleDoors: undefined,
        vehicleSeats: undefined,
        sourceCountry: '',
        destinationCountry: 'Kenya',
        estimatedPrice: undefined,
        currency: 'KES',
        budgetRangeMin: undefined,
        budgetRangeMax: undefined,
        preferredDeliveryTime: 'flexible',
        specialRequirements: '',
        vinNumber: '',
        registrationNumber: '',
        currentLocation: '',
        sellerContact: '',
        sellerWebsite: '',
        requestNotes: '',
      });
      
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to submit request",
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Car className="h-4 w-4 sm:h-5 sm:w-5" />
            Request Car Import
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type Selection */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Request Type</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button
                type="button"
                variant={formData.requestType === 'import_request' ? 'default' : 'outline'}
                onClick={() => setFormData(prev => ({ ...prev, requestType: 'import_request' }))}
                className="h-14 sm:h-16 flex flex-col items-center gap-1 sm:gap-2"
              >
                <Car className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Import Request</span>
                <span className="text-xs text-gray-500 hidden sm:block">Full import service</span>
              </Button>
              <Button
                type="button"
                variant={formData.requestType === 'quote_request' ? 'default' : 'outline'}
                onClick={() => setFormData(prev => ({ ...prev, requestType: 'quote_request' }))}
                className="h-14 sm:h-16 flex flex-col items-center gap-1 sm:gap-2"
              >
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Quote Request</span>
                <span className="text-xs text-gray-500 hidden sm:block">Get pricing only</span>
              </Button>
            </div>
          </div>

          {/* Basic Vehicle Information */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Vehicle Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Select 
                  value={formData.vehicleMake} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleMake: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleModel: e.target.value }))}
                  placeholder="e.g., Camry, X5, C-Class"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.vehicleYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleYear: parseInt(e.target.value) }))}
                  placeholder="2023"
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variant">Variant/Trim</Label>
                <Input
                  id="variant"
                  value={formData.vehicleVariant || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleVariant: e.target.value }))}
                  placeholder="e.g., xDrive40i, AMG Line"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Select 
                  value={formData.vehicleCondition} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleCondition: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                    <SelectItem value="certified">Certified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.vehicleMileage || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleMileage: e.target.value ? parseInt(e.target.value) : undefined }))}
                  placeholder="50000"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Technical Specifications</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select 
                  value={formData.vehicleTransmission || ''} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleTransmission: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                    <SelectItem value="semi_automatic">Semi-Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Select 
                  value={formData.vehicleFuelType || ''} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleFuelType: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="lpg">LPG</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="engineSize">Engine Size</Label>
                <Input
                  id="engineSize"
                  value={formData.vehicleEngineSize || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicleEngineSize: e.target.value }))}
                  placeholder="e.g., 2.0L, 3.0L V6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driveType">Drive Type</Label>
                <Select 
                  value={formData.vehicleDriveType || ''} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, vehicleDriveType: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select drive type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fwd">Front Wheel Drive</SelectItem>
                    <SelectItem value="rwd">Rear Wheel Drive</SelectItem>
                    <SelectItem value="awd">All Wheel Drive</SelectItem>
                    <SelectItem value="4wd">4 Wheel Drive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location & Pricing */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Location & Pricing</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sourceCountry">Source Country</Label>
                <Select 
                  value={formData.sourceCountry || ''} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, sourceCountry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationCountry">Destination Country</Label>
                <Select 
                  value={formData.destinationCountry} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, destinationCountry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="Uganda">Uganda</SelectItem>
                    <SelectItem value="Tanzania">Tanzania</SelectItem>
                    <SelectItem value="Rwanda">Rwanda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetMin">Budget Range (Min)</Label>
                <Input
                  id="budgetMin"
                  type="number"
                  value={formData.budgetRangeMin || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, budgetRangeMin: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  placeholder="1000000"
                  min="0"
                  step="10000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetMax">Budget Range (Max)</Label>
                <Input
                  id="budgetMax"
                  type="number"
                  value={formData.budgetRangeMax || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, budgetRangeMax: e.target.value ? parseFloat(e.target.value) : undefined }))}
                  placeholder="5000000"
                  min="0"
                  step="10000"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Additional Information</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vinNumber">VIN Number</Label>
                <Input
                  id="vinNumber"
                  value={formData.vinNumber || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, vinNumber: e.target.value }))}
                  placeholder="17-character VIN number"
                  maxLength={17}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentLocation">Current Location</Label>
                <Input
                  id="currentLocation"
                  value={formData.currentLocation || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentLocation: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerContact">Seller Contact</Label>
                <Input
                  id="sellerContact"
                  value={formData.sellerContact || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellerContact: e.target.value }))}
                  placeholder="Phone number or email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sellerWebsite">Seller Website/Listing URL</Label>
                <Input
                  id="sellerWebsite"
                  value={formData.sellerWebsite || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellerWebsite: e.target.value }))}
                  placeholder="https://example.com/listing"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Notes & Requirements</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                  placeholder="Any specific modifications, features, or requirements..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestNotes">Additional Notes</Label>
                <Textarea
                  id="requestNotes"
                  value={formData.requestNotes || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestNotes: e.target.value }))}
                  placeholder="Any additional information or questions..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-automotive-navy hover:bg-automotive-dark" 
              disabled={isLoading || !formData.vehicleMake || !formData.vehicleModel || !formData.vehicleYear}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit {formData.requestType === 'import_request' ? 'Import' : 'Quote'} Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportRequestDialog;