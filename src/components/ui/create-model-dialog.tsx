import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, API_CONFIG } from '@/config/api';

interface CreateModelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  brandId: number;
  categoryId: number;
  onModelCreated: (model: { id: number; name: string }) => void;
}

export default function CreateModelDialog({ open, onOpenChange, brandId, categoryId, onModelCreated }: CreateModelDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    year: new Date().getFullYear(),
    engineType: '',
    transmission: '',
    fuelType: '',
    bodyType: '',
  });

  const transmissionTypes = [
    'Manual',
    'Automatic',
    'CVT',
    'Semi-Automatic',
    'Dual-Clutch'
  ];

  const fuelTypes = [
    'Petrol',
    'Diesel',
    'Electric',
    'Hybrid',
    'Plug-in Hybrid',
    'LPG',
    'CNG'
  ];

  const bodyTypes = [
    'Sedan',
    'SUV',
    'Hatchback',
    'Coupe',
    'Convertible',
    'Wagon',
    'Pickup truck',
    'Van',
    'Minivan'
  ];

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Model name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const modelData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        year: formData.year,
        engineType: formData.engineType || undefined,
        transmission: formData.transmission || undefined,
        fuelType: formData.fuelType || undefined,
        bodyType: formData.bodyType || undefined,
        brandId: brandId,
        categoryId: categoryId,
        isActive: true,
      };

      const newModel = await apiRequest<{ id: number; name: string }>(`${API_CONFIG.BASE_URL}/cars/models`, {
        method: 'POST',
        body: JSON.stringify(modelData)
      });

      toast({
        title: "Success!",
        description: `Model "${formData.name}" created successfully`,
      });

      onModelCreated(newModel);
      onOpenChange(false);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        year: new Date().getFullYear(),
        engineType: '',
        transmission: '',
        fuelType: '',
        bodyType: '',
      });

    } catch (error: any) {
      console.error('Error creating model:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create model",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Model</DialogTitle>
          <DialogDescription>
            Add a new car model for this brand. This will be available for future car listings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="modelName">Model Name *</Label>
              <Input
                id="modelName"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Camry, X5, F-150"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="modelYear">Model Year</Label>
              <Input
                id="modelYear"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                min="1990"
                max="2030"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="modelDescription">Description</Label>
            <Textarea
              id="modelDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the model..."
              rows={2}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) => setFormData(prev => ({ ...prev, transmission: value }))}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  {transmissionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select
                value={formData.fuelType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, fuelType: value }))}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bodyType">Body Type</Label>
              <Select
                value={formData.bodyType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, bodyType: value }))}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="engineType">Engine Type</Label>
              <Input
                id="engineType"
                value={formData.engineType}
                onChange={(e) => setFormData(prev => ({ ...prev, engineType: e.target.value }))}
                placeholder="e.g., 2.0L Turbo, V6, Electric"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading || !formData.name.trim()}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              'Create Model'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
