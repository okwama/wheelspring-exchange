import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
// Tabs removed - using step wizard instead
import { Separator } from '@/components/ui/separator';
import { Plus, X, Upload, Car, ImageIcon, DollarSign, Info, Settings, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, API_CONFIG } from '@/config/api';
import FileUpload, { FileUploadItem } from '@/components/ui/file-upload';
import CreateBrandDialog from '@/components/ui/create-brand-dialog';
import CreateModelDialog from '@/components/ui/create-model-dialog';

// Types based on database schema
interface Brand {
  id: number;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
}

interface Model {
  id: number;
  name: string;
  brandId: number;
  categoryId: number;
  year?: number;
  engineType?: string;
  transmission?: string;
  fuelType?: string;
  bodyType?: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface Variant {
  id: number;
  name: string;
  modelId: number;
  year: number;
  engineType?: string;
  transmission?: string;
  fuelType?: string;
  horsepower?: number;
}

// CarImage interface moved to FileUpload component

interface CarFormData {
  // Basic Info
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  year: number;
  
  // Brand/Model/Category
  categoryId: number;
  brandId: number;
  model: string;
  modelId: number;
  variantId?: number;
  
  // Technical Details
  mileage?: number;
  color?: string;
  interior_color?: string;
  vin_number?: string;
  registration_number?: string;
  
  // Stock & Location
  stock: number;
  stock_location: 'local' | 'international';
  import_status: 'available' | 'pending' | 'in-transit' | 'clearing';
  car_condition: 'new' | 'used' | 'certified';
  
  // Dealer Info
  dealer_name?: string;
  dealer_contact?: string;
  dealer_email?: string;
  dealer_phone?: string;
  
  // Pricing & Status
  currency: string;
  negotiable: boolean;
  priceType: 'fixed' | 'negotiable' | 'auction' | 'quote_only';
  isFeatured: boolean;
  isActive: boolean;
  
  // Origin & Tags
  origin?: string;
  tags: string[];
  
  // Primary image
  image?: string;
}

// imageTypes moved to FileUpload component

export default function CarUpload() {
  const { toast } = useToast();
  
  // Data from API
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Form data
  const [formData, setFormData] = useState<CarFormData>({
    name: '',
    description: '',
    price: 0,
    year: new Date().getFullYear(),
    categoryId: 0,
    brandId: 0,
    model: '',
    modelId: 0,
    stock: 1,
    stock_location: 'local',
    import_status: 'available',
    car_condition: 'new',
    currency: 'KES',
    negotiable: true,
    priceType: 'negotiable',
    isFeatured: false,
    isActive: true,
    tags: [],
  });
  
  // File uploads
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadItem[]>([]);
  
  // Dialog states
  const [createBrandDialogOpen, setCreateBrandDialogOpen] = useState(false);
  const [createModelDialogOpen, setCreateModelDialogOpen] = useState(false);
  
  // Tag input
  const [newTag, setNewTag] = useState('');

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load models when brand changes
  useEffect(() => {
    if (formData.brandId) {
      loadModels(formData.brandId);
    }
  }, [formData.brandId]);

  // Load variants when model changes
  useEffect(() => {
    if (formData.modelId) {
      loadVariants(formData.modelId);
    }
  }, [formData.modelId]);

  const loadInitialData = async () => {
    try {
      setDataLoading(true);
      const [brands, categories] = await Promise.all([
        apiRequest<Brand[]>(`${API_CONFIG.BASE_URL}/cars/brands`),
        apiRequest<Category[]>(`${API_CONFIG.BASE_URL}/cars/categories`),
      ]);
      
      setBrands(brands || []);
      setCategories(categories || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast({
        title: "Error",
        description: "Failed to load brands and categories",
        variant: "destructive",
      });
    } finally {
      setDataLoading(false);
    }
  };

  const loadModels = async (brandId: number) => {
    try {
      const models = await apiRequest<Model[]>(`${API_CONFIG.BASE_URL}/cars/brands/${brandId}/models`);
      setModels(models || []);
    } catch (error) {
      console.error('Error loading models:', error);
      toast({
        title: "Error",
        description: "Failed to load models for selected brand",
        variant: "destructive",
      });
    }
  };

  const loadVariants = async (modelId: number) => {
    try {
      const variants = await apiRequest<Variant[]>(`${API_CONFIG.BASE_URL}/cars/models/${modelId}/variants`);
      setVariants(variants || []);
    } catch (error) {
      console.error('Error loading variants:', error);
      // Variants are optional, so don't show error toast
    }
  };

  const handleInputChange = (field: keyof CarFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilesChange = (files: FileUploadItem[]) => {
    setUploadedFiles(files);
  };

  const handleBrandCreated = (newBrand: { id: number; name: string }) => {
    // Add new brand to the list and select it
    setBrands(prev => [...prev, newBrand as Brand]);
    handleInputChange('brandId', newBrand.id);
    // Clear models since brand changed
    setModels([]);
    handleInputChange('modelId', 0);
    handleInputChange('model', '');
  };

  const handleModelCreated = (newModel: { id: number; name: string }) => {
    // Add new model to the list and select it
    const fullModel: Model = {
      ...newModel,
      brandId: formData.brandId,
      categoryId: formData.categoryId,
    };
    setModels(prev => [...prev, fullModel]);
    handleInputChange('modelId', newModel.id);
    handleInputChange('model', newModel.name);
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    
    const tag = newTag.trim().toLowerCase();
    if (!formData.tags.includes(tag)) {
      handleInputChange('tags', [...formData.tags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tag: string) => {
    handleInputChange('tags', formData.tags.filter(t => t !== tag));
  };

  const steps = [
    { id: 'basic', title: 'Basic Info', icon: Info },
    { id: 'technical', title: 'Technical', icon: Settings },
    { id: 'pricing', title: 'Pricing', icon: DollarSign },
    { id: 'images', title: 'Images', icon: ImageIcon },
  ];

  const validateCurrentStep = (showToast: boolean = false): boolean => {
    switch (currentStep) {
      case 0: // Basic Info
        if (!formData.name.trim()) {
          if (showToast) {
            toast({
              title: "Required Field",
              description: "Car name is required",
              variant: "destructive",
            });
          }
          return false;
        }
        if (!formData.categoryId || !formData.brandId || !formData.modelId) {
          if (showToast) {
            toast({
              title: "Required Fields",
              description: "Please select category, brand, and model",
              variant: "destructive",
            });
          }
          return false;
        }
        if (!formData.year || formData.year < 1990 || formData.year > 2030) {
          if (showToast) {
            toast({
              title: "Invalid Year",
              description: "Please enter a valid year (1990-2030)",
              variant: "destructive",
            });
          }
          return false;
        }
        return true;

      case 1: // Technical
        // Technical details are mostly optional, just basic validation
        return true;

      case 2: // Pricing
        if (formData.price <= 0) {
          if (showToast) {
            toast({
              title: "Invalid Price",
              description: "Please enter a valid price",
              variant: "destructive",
            });
          }
          return false;
        }
        return true;

      case 3: // Images
        // Images are optional for now to avoid infinite loops
        return true;

      default:
        return true;
    }
  };

  const goToNextStep = () => {
    if (validateCurrentStep(true)) {
      setCompletedSteps(prev => [...prev.filter(s => s !== currentStep), currentStep]);
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    // Allow going to any completed step or the next step
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Car name is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.categoryId || !formData.brandId || !formData.modelId) {
      toast({
        title: "Error",
        description: "Please select category, brand, and model",
        variant: "destructive",
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      console.log('🚀 Submitting car data:', formData);

      // Create car
      const carResponse = await apiRequest<{ id: number }>(`${API_CONFIG.BASE_URL}/cars`, {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      const carId = carResponse.id;

      // Upload images if any (only if they haven't been uploaded yet during file selection)
      const notUploadedFiles = uploadedFiles.filter(file => !file.uploaded);
      if (notUploadedFiles.length > 0) {
        // This would be for files not yet uploaded to Cloudinary
        // Since our FileUpload component uploads immediately, this shouldn't happen often
        toast({
          title: "Note",
          description: "Some images were not uploaded. Please upload images separately.",
          variant: "destructive",
        });
      } else if (uploadedFiles.length > 0) {
        console.log('🖼️ Linking images to car:', carId);
        console.log('🖼️ Uploaded files:', uploadedFiles);
        
        // Only link images that have been successfully uploaded to Cloudinary
        const uploadedImages = uploadedFiles.filter(file => file.uploaded && file.cloudinaryUrl);
        
        if (uploadedImages.length > 0) {
          // Link uploaded images to the car
          const imageData = uploadedImages.map(file => ({
            url: file.cloudinaryUrl!,
            type: file.type,
            order: file.order,
            altText: file.altText,
            isPrimary: file.order === 1,
          }));

          console.log('🖼️ Image data to send:', imageData);

          const imageResponse = await apiRequest(`${API_CONFIG.BASE_URL}/cars/${carId}/images`, {
            method: 'POST',
            body: JSON.stringify({ images: imageData })
          });
          
          console.log('🖼️ Image linking response:', imageResponse);
          
          toast({
            title: "Images Linked!",
            description: `Successfully linked ${uploadedImages.length} images to the car`,
          });
        } else {
          toast({
            title: "No Images to Link",
            description: "Please upload images to Cloudinary first using the upload button",
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Success!",
        description: `Car "${formData.name}" uploaded successfully`,
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: 0,
        year: new Date().getFullYear(),
        categoryId: 0,
        brandId: 0,
        model: '',
        modelId: 0,
        stock: 1,
        stock_location: 'local',
        import_status: 'available',
        car_condition: 'new',
        currency: 'KES',
        negotiable: true,
        priceType: 'negotiable',
        isFeatured: false,
        isActive: true,
        tags: [],
      });
      setUploadedFiles([]);

    } catch (error: any) {
      console.error('Error uploading car:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to upload car",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading car upload form...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Car className="h-8 w-8" />
          Car Upload System
        </h1>
        <p className="text-muted-foreground mt-2">
          Add new vehicles to your inventory with detailed information and images
        </p>
      </div>

      {/* Step Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => goToStep(index)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  index === currentStep
                    ? 'border-primary bg-primary text-white'
                    : completedSteps.includes(index)
                    ? 'border-green-500 bg-green-500 text-white'
                    : index < currentStep || completedSteps.includes(index - 1)
                    ? 'border-gray-300 bg-white text-gray-600 hover:border-primary'
                    : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
                disabled={index > currentStep && !completedSteps.includes(index - 1)}
              >
                {completedSteps.includes(index) ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </button>
              
              <div className="ml-3 text-left">
                <p className={`text-sm font-medium ${
                  index === currentStep ? 'text-primary' : 
                  completedSteps.includes(index) ? 'text-green-600' : 'text-gray-500'
                }`}>
                  Step {index + 1}
                </p>
                <p className={`text-xs ${
                  index === currentStep ? 'text-primary' : 
                  completedSteps.includes(index) ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  completedSteps.includes(index) ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-6">

        {/* Step 1: Basic Information */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the fundamental details about the vehicle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Car Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Toyota Camry 2024"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value ? parseInt(e.target.value) || new Date().getFullYear() : new Date().getFullYear())}
                    min="1990"
                    max="2030"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the vehicle..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.categoryId.toString()}
                    onValueChange={(value) => handleInputChange('categoryId', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="brand">Brand *</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setCreateBrandDialogOpen(true)}
                      className="text-xs h-auto p-1"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      New Brand
                    </Button>
                  </div>
                  <Select
                    value={formData.brandId.toString()}
                    onValueChange={(value) => handleInputChange('brandId', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="model">Model *</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setCreateModelDialogOpen(true)}
                      disabled={!formData.brandId}
                      className="text-xs h-auto p-1"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      New Model
                    </Button>
                  </div>
                  <Select
                    value={formData.modelId.toString()}
                    onValueChange={(value) => {
                      const modelId = parseInt(value);
                      const selectedModel = models.find(m => m.id === modelId);
                      handleInputChange('modelId', modelId);
                      if (selectedModel) {
                        handleInputChange('model', selectedModel.name);
                      }
                    }}
                    disabled={!formData.brandId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={!formData.brandId ? "Select brand first" : "Select model"} />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id.toString()}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {variants.length > 0 && (
                <div>
                  <Label htmlFor="variant">Variant (Optional)</Label>
                  <Select
                    value={formData.variantId?.toString() || ""}
                    onValueChange={(value) => handleInputChange('variantId', value ? parseInt(value) : undefined)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      {variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id.toString()}>
                          {variant.name} ({variant.year})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Technical Details */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
              <CardDescription>
                Specify technical specifications and condition details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mileage">Mileage (km)</Label>
                  <Input
                    id="mileage"
                    type="number"
                    value={formData.mileage || ''}
                    onChange={(e) => handleInputChange('mileage', e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="e.g., 50000"
                  />
                </div>
                <div>
                  <Label htmlFor="condition">Condition *</Label>
                  <Select
                    value={formData.car_condition}
                    onValueChange={(value: 'new' | 'used' | 'certified') => handleInputChange('car_condition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="used">Used</SelectItem>
                      <SelectItem value="certified">Certified Pre-Owned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Exterior Color</Label>
                  <Input
                    id="color"
                    value={formData.color || ''}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="e.g., Pearl White"
                  />
                </div>
                <div>
                  <Label htmlFor="interior_color">Interior Color</Label>
                  <Input
                    id="interior_color"
                    value={formData.interior_color || ''}
                    onChange={(e) => handleInputChange('interior_color', e.target.value)}
                    placeholder="e.g., Black Leather"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vin">VIN Number</Label>
                  <Input
                    id="vin"
                    value={formData.vin_number || ''}
                    onChange={(e) => handleInputChange('vin_number', e.target.value)}
                    placeholder="17-character VIN"
                  />
                </div>
                <div>
                  <Label htmlFor="registration">Registration Number</Label>
                  <Input
                    id="registration"
                    value={formData.registration_number || ''}
                    onChange={(e) => handleInputChange('registration_number', e.target.value)}
                    placeholder="License plate number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="stock_location">Stock Location *</Label>
                  <Select
                    value={formData.stock_location}
                    onValueChange={(value: 'local' | 'international') => handleInputChange('stock_location', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="import_status">Import Status *</Label>
                  <Select
                    value={formData.import_status}
                    onValueChange={(value: 'available' | 'pending' | 'in-transit' | 'clearing') => handleInputChange('import_status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="clearing">Clearing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value ? parseInt(e.target.value) || 1 : 1)}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="origin">Origin Country</Label>
                <Input
                  id="origin"
                  value={formData.origin || ''}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="e.g., Japan, Germany, USA"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Pricing & Sales */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Sales</CardTitle>
              <CardDescription>
                Set pricing, dealer information, and sales configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Selling Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value ? parseFloat(e.target.value) || 0 : 0)}
                    min="0"
                    step="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                    min="0"
                    step="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency *</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KES">KES (Kenyan Shilling)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceType">Price Type *</Label>
                  <Select
                    value={formData.priceType}
                    onValueChange={(value: 'fixed' | 'negotiable' | 'auction' | 'quote_only') => handleInputChange('priceType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="negotiable">Negotiable</SelectItem>
                      <SelectItem value="fixed">Fixed Price</SelectItem>
                      <SelectItem value="auction">Auction</SelectItem>
                      <SelectItem value="quote_only">Quote Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="negotiable"
                    checked={formData.negotiable}
                    onChange={(e) => handleInputChange('negotiable', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="negotiable">Price is negotiable</Label>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dealer_name">Dealer Name</Label>
                  <Input
                    id="dealer_name"
                    value={formData.dealer_name || ''}
                    onChange={(e) => handleInputChange('dealer_name', e.target.value)}
                    placeholder="Gold Standard Cars"
                  />
                </div>
                <div>
                  <Label htmlFor="dealer_phone">Dealer Phone</Label>
                  <Input
                    id="dealer_phone"
                    value={formData.dealer_phone || ''}
                    onChange={(e) => handleInputChange('dealer_phone', e.target.value)}
                    placeholder="+254 712 345678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dealer_email">Dealer Email</Label>
                  <Input
                    id="dealer_email"
                    type="email"
                    value={formData.dealer_email || ''}
                    onChange={(e) => handleInputChange('dealer_email', e.target.value)}
                    placeholder="dealer@goldstandardcars.com"
                  />
                </div>
                <div>
                  <Label htmlFor="dealer_contact">Dealer Contact</Label>
                  <Input
                    id="dealer_contact"
                    value={formData.dealer_contact || ''}
                    onChange={(e) => handleInputChange('dealer_contact', e.target.value)}
                    placeholder="Additional contact info"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="isFeatured">Featured Car</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Active Listing</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Image Gallery */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Image Gallery</CardTitle>
              <CardDescription>
                Upload high-quality images of the vehicle. Images are automatically optimized and stored in Cloudinary CDN for fast delivery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload 
                onFilesChange={handleFilesChange}
                maxFiles={20}
                acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
              />
              
              {uploadedFiles.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">
                    ✅ {uploadedFiles.filter(f => f.uploaded).length} of {uploadedFiles.length} images uploaded successfully
                  </h4>
                  <p className="text-sm text-green-700">
                    Your images are optimized and ready for the car listing. You can proceed to create the car record.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          ← Previous
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Step {currentStep + 1} of {steps.length}</span>
          {completedSteps.length > 0 && (
            <span className="text-green-600">
              • {completedSteps.length} completed
            </span>
          )}
        </div>

        {currentStep < steps.length - 1 ? (
          <Button 
            onClick={goToNextStep}
            className="flex items-center gap-2"
          >
            Next →
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={loading || !validateCurrentStep()}
            size="lg"
            className="flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating Car...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Create Car Listing
              </>
            )}
          </Button>
        )}
      </div>

      {/* Create Brand Dialog */}
      <CreateBrandDialog
        open={createBrandDialogOpen}
        onOpenChange={setCreateBrandDialogOpen}
        categoryId={formData.categoryId}
        onBrandCreated={handleBrandCreated}
      />

      {/* Create Model Dialog */}
      <CreateModelDialog
        open={createModelDialogOpen}
        onOpenChange={setCreateModelDialogOpen}
        brandId={formData.brandId}
        categoryId={formData.categoryId}
        onModelCreated={handleModelCreated}
      />
    </div>
  );
}
