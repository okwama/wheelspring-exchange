import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface ImportRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportRequestDialog = ({ open, onOpenChange }: ImportRequestDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    yearMin: "",
    yearMax: "",
    budgetMax: "",
    additionalNotes: "",
    preferredFeatures: [] as string[]
  });
  const { toast } = useToast();

  const carMakes = [
    "Toyota", "BMW", "Mercedes-Benz", "Audi", "Honda", "Ford", 
    "Volkswagen", "Nissan", "Porsche", "Lexus", "Hyundai", "Mazda",
    "Chevrolet", "Infiniti", "Acura", "Volvo", "Jaguar", "Land Rover"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to submit an import request.",
        });
        return;
      }

      const { error } = await supabase
        .from('car_requests')
        .insert({
          user_id: user.id,
          make: formData.make,
          model: formData.model,
          year_min: formData.yearMin ? parseInt(formData.yearMin) : null,
          year_max: formData.yearMax ? parseInt(formData.yearMax) : null,
          budget_max: formData.budgetMax ? parseFloat(formData.budgetMax) : null,
          additional_notes: formData.additionalNotes,
          preferred_features: formData.preferredFeatures,
        });

      if (error) throw error;

      toast({
        title: "Request submitted successfully!",
        description: "We'll contact you within 24 hours with available options.",
      });
      
      // Reset form
      setFormData({
        make: "",
        model: "",
        yearMin: "",
        yearMax: "",
        budgetMax: "",
        additionalNotes: "",
        preferredFeatures: []
      });
      
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to submit request",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Car Import</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make *</Label>
              <Select value={formData.make} onValueChange={(value) => setFormData(prev => ({ ...prev, make: value }))}>
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
                value={formData.model}
                onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                placeholder="e.g., Camry, X5, C-Class"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearMin">Min Year</Label>
              <Input
                id="yearMin"
                type="number"
                value={formData.yearMin}
                onChange={(e) => setFormData(prev => ({ ...prev, yearMin: e.target.value }))}
                placeholder="2018"
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearMax">Max Year</Label>
              <Input
                id="yearMax"
                type="number"
                value={formData.yearMax}
                onChange={(e) => setFormData(prev => ({ ...prev, yearMax: e.target.value }))}
                placeholder="2024"
                min="1990"
                max={new Date().getFullYear() + 1}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Maximum Budget (USD)</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budgetMax}
              onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: e.target.value }))}
              placeholder="50000"
              min="0"
              step="1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              placeholder="Any specific requirements, preferred colors, features, etc."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-automotive-navy hover:bg-automotive-dark" 
            disabled={isLoading || !formData.make || !formData.model}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Import Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportRequestDialog;