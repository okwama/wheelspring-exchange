import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, API_CONFIG } from '@/config/api';

interface CreateBrandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId?: number;
  onBrandCreated: (brand: { id: number; name: string }) => void;
}

export default function CreateBrandDialog({ open, onOpenChange, categoryId, onBrandCreated }: CreateBrandDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    logo: '',
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Brand name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const brandData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        website: formData.website.trim() || undefined,
        logo: formData.logo.trim() || undefined,
        categoryId: categoryId || undefined,
        isActive: true,
      };

      const newBrand = await apiRequest<{ id: number; name: string }>(`${API_CONFIG.BASE_URL}/cars/brands`, {
        method: 'POST',
        body: JSON.stringify(brandData)
      });

      toast({
        title: "Success!",
        description: `Brand "${formData.name}" created successfully`,
      });

      onBrandCreated(newBrand);
      onOpenChange(false);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        website: '',
        logo: '',
      });

    } catch (error: any) {
      console.error('Error creating brand:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create brand",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Brand</DialogTitle>
          <DialogDescription>
            Add a new car brand to the system. This will be available for all future car listings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="brandName">Brand Name *</Label>
            <Input
              id="brandName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Toyota, BMW, Ford"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="brandDescription">Description</Label>
            <Textarea
              id="brandDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the brand..."
              rows={2}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="brandWebsite">Website</Label>
            <Input
              id="brandWebsite"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://toyota.com"
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="brandLogo">Logo URL</Label>
            <Input
              id="brandLogo"
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              placeholder="https://example.com/logo.png"
              disabled={loading}
            />
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
              'Create Brand'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
