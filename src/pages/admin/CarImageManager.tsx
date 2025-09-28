import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Upload, Edit, Trash2, Eye, Star, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, API_CONFIG } from '@/config/api';
import FileUpload, { FileUploadItem } from '@/components/ui/file-upload';

interface CarImage {
  id: number;
  carId: number;
  imageUrl: string;
  imageType: 'exterior' | 'interior' | '360_exterior' | '360_interior' | 'engine' | 'dashboard' | 'trunk' | 'wheels' | 'other';
  imageOrder: number;
  altText: string;
  isPrimary: boolean;
  isActive: boolean;
  createdAt: string;
}

interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
}

export default function CarImageManager() {
  const { toast } = useToast();
  
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carImages, setCarImages] = useState<CarImage[]>([]);
  const [editingImage, setEditingImage] = useState<CarImage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // New image upload state
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadItem[]>([]);

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    if (selectedCarId) {
      loadCarImages(selectedCarId);
      const car = cars.find(c => c.id === selectedCarId);
      setSelectedCar(car || null);
    }
  }, [selectedCarId, cars]);

  const loadCars = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<any>(`${API_CONFIG.BASE_URL}/cars`);
      console.log('Cars API response:', response);
      
      // Handle different possible response structures
      let carsData: Car[] = [];
      if (Array.isArray(response)) {
        carsData = response;
      } else if (response && Array.isArray(response.cars)) {
        carsData = response.cars;
      } else if (response && Array.isArray(response.data)) {
        carsData = response.data;
      } else {
        console.warn('Unexpected cars API response structure:', response);
        carsData = [];
      }
      
      setCars(carsData);
    } catch (error) {
      console.error('Error loading cars:', error);
      setCars([]); // Ensure cars is always an array
      toast({
        title: "Error",
        description: "Failed to load cars",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCarImages = async (carId: number) => {
    try {
      setLoading(true);
      console.log('🔍 Loading car images for car ID:', carId);
      
      // Use the dedicated images endpoint to get real CarImage objects with proper IDs
      const images = await apiRequest<CarImage[]>(`${API_CONFIG.BASE_URL}/cars/${carId}/images`);
      console.log('✅ Car images response:', images);
      console.log('📊 Number of images found:', images?.length || 0);
      
      const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
      setCarImages(validImages);
      
      if (validImages.length > 0) {
        console.log('🎯 Image types found:', [...new Set(validImages.map(img => img.imageType))]);
        console.log('🆔 Sample image IDs:', validImages.slice(0, 3).map(img => ({ id: img.id, type: img.imageType })));
      }
      
    } catch (error) {
      console.error('❌ Error loading car images:', error);
      setCarImages([]);
      toast({
        title: "Error",
        description: "Failed to load car images. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadNewImages = async () => {
    if (!selectedCarId || uploadedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select a car and upload images first",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      // The FileUpload component should have already uploaded to Cloudinary
      // and set cloudinaryUrl on the files. We just need to link them to the car.
      const uploadedImages = uploadedFiles.filter(file => file.uploaded && file.cloudinaryUrl);
      
      if (uploadedImages.length === 0) {
        toast({
          title: "Error",
          description: "No images were successfully uploaded to Cloudinary. Please try uploading again.",
          variant: "destructive",
        });
        return;
      }

      // Prepare image data from uploaded files
      const imageData = uploadedImages.map(file => ({
        url: file.cloudinaryUrl!,
        type: file.type,
        order: file.order,
        altText: file.altText,
        isPrimary: file.order === 1,
      }));

      console.log('🔗 Linking images to car:', selectedCarId, imageData);

      await apiRequest(`${API_CONFIG.BASE_URL}/cars/${selectedCarId}/images`, {
        method: 'POST',
        body: JSON.stringify({ images: imageData })
      });

      toast({
        title: "Success!",
        description: `${uploadedImages.length} images linked to car successfully`,
      });

      // Reload images and clear upload state
      loadCarImages(selectedCarId);
      setUploadedFiles([]);

    } catch (error: any) {
      console.error('Error linking images to car:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to link images to car",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateImage = async (image: CarImage) => {
    try {
      await apiRequest(`${API_CONFIG.BASE_URL}/cars/${image.carId}/images/${image.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          imageType: image.imageType,
          imageOrder: image.imageOrder,
          altText: image.altText,
          isPrimary: image.isPrimary,
        })
      });

      toast({
        title: "Success!",
        description: "Image updated successfully",
      });

      setEditingImage(null);
      loadCarImages(image.carId);

    } catch (error: any) {
      console.error('Error updating image:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update image",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!selectedCarId) return;

    try {
      await apiRequest(`${API_CONFIG.BASE_URL}/cars/${selectedCarId}/images/${imageId}`, {
        method: 'DELETE'
      });

      toast({
        title: "Success!",
        description: "Image deleted successfully",
      });

      loadCarImages(selectedCarId);

    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete image",
        variant: "destructive",
      });
    }
  };

  const filteredCars = Array.isArray(cars) ? cars.filter(car => 
    car.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const imageTypes = [
    { value: 'exterior', label: 'Exterior View' },
    { value: 'interior', label: 'Interior View' },
    { value: '360_exterior', label: '360° Exterior' },
    { value: '360_interior', label: '360° Interior' },
    { value: 'engine', label: 'Engine Bay' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'trunk', label: 'Trunk/Boot' },
    { value: 'wheels', label: 'Wheels' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Image Manager</h1>
          <p className="text-gray-600">Upload and manage images for existing cars</p>
        </div>

        {/* Car Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Car</CardTitle>
            <CardDescription>
              Choose a car to manage its images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search Cars</Label>
              <Input
                id="search"
                placeholder="Search by name, brand, or model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredCars.map((car, index) => (
                <Card 
                  key={`car-${car.id}-${index}`} 
                  className={`cursor-pointer transition-colors ${
                    selectedCarId === car.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCarId(car.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{car.name}</h3>
                    <p className="text-sm text-gray-600">{car.brand} {car.model}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">{car.year} • ID: {car.id}</p>
                      {selectedCarId === car.id && (
                        <Badge variant="secondary" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedCar && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Selected Car: {selectedCar.name}</CardTitle>
                <CardDescription>
                  {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Upload New Images */}
            <Card>
              <CardHeader>
                <CardTitle>Upload New Images</CardTitle>
                <CardDescription>
                  Add new images to this car
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUpload 
                  onFilesChange={setUploadedFiles}
                  maxFiles={20}
                  carId={selectedCarId}
                />
                
                {uploadedFiles.length > 0 && (
                  <Button 
                    onClick={handleUploadNewImages}
                    disabled={uploading}
                    className="w-full"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload {uploadedFiles.length} Images to Car
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Existing Images */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Images ({carImages.length})</CardTitle>
                <CardDescription>
                  Manage existing images for this car - organized by type
                </CardDescription>
              </CardHeader>
              <CardContent>
                {carImages.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No images found for this car</p>
                ) : (
                  <div className="space-y-6">
                    {/* Image Type Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-lg">
                      {imageTypes.map((type) => {
                        const count = carImages.filter(img => img.imageType === type.value).length;
                        return (
                          <div key={`summary-${type.value}`} className="text-center">
                            <div className={`text-sm font-medium ${count > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                              {type.label}
                            </div>
                            <div className={`text-lg font-bold ${count > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Images by Type */}
                    <div className="space-y-8">
                    {imageTypes.map((imageType, typeIndex) => {
                      const imagesOfType = carImages.filter(img => img.imageType === imageType.value);
                      if (imagesOfType.length === 0) return null;
                      
                      return (
                        <div key={imageType.value}>
                          {typeIndex > 0 && <Separator className="my-6" />}
                          <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">{imageType.label}</h3>
                            <Badge variant="secondary">{imagesOfType.length}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {imagesOfType.map((image, index) => (
                      <Card key={`image-${image.id}-${index}`} className="overflow-hidden">
                        <div className="relative aspect-video">
                          <img 
                            src={image.imageUrl} 
                            alt={image.altText}
                            className="w-full h-full object-cover"
                          />
                          {image.isPrimary && (
                            <Badge className="absolute top-2 left-2 bg-yellow-500">
                              <Star className="h-3 w-3 mr-1" />
                              Primary
                            </Badge>
                          )}
                          <Badge className="absolute top-2 right-2">
                            {imageTypes.find(t => t.value === image.imageType)?.label}
                          </Badge>
                        </div>
                        
                        <CardContent className="p-4 space-y-2">
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700">{image.altText}</p>
                            <p className="text-xs text-gray-500">Order: {image.imageOrder} • ID: {image.id}</p>
                            <p className="text-xs text-blue-600 truncate">{image.imageUrl}</p>
                          </div>
                          {editingImage?.id === image.id ? (
                            <div className="space-y-3">
                              <div>
                                <Label>Image Type</Label>
                                <Select
                                  value={editingImage?.imageType || ''}
                                  onValueChange={(value) => setEditingImage(prev => prev ? {
                                    ...prev,
                                    imageType: value as any
                                  } : null)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {imageTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <Label>Alt Text</Label>
                                <Input
                                  value={editingImage?.altText || ''}
                                  onChange={(e) => setEditingImage(prev => prev ? {
                                    ...prev,
                                    altText: e.target.value
                                  } : null)}
                                />
                              </div>

                              <div>
                                <Label>Order</Label>
                                <Input
                                  type="number"
                                  value={editingImage?.imageOrder || 0}
                                  onChange={(e) => setEditingImage(prev => prev ? {
                                    ...prev,
                                    imageOrder: parseInt(e.target.value) || 0
                                  } : null)}
                                />
                              </div>

                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="isPrimary"
                                  checked={editingImage?.isPrimary || false}
                                  onChange={(e) => setEditingImage(prev => prev ? {
                                    ...prev,
                                    isPrimary: e.target.checked
                                  } : null)}
                                />
                                <Label htmlFor="isPrimary">Set as Primary Image</Label>
                              </div>

                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => editingImage && handleUpdateImage(editingImage)}
                                  disabled={!editingImage}
                                  className="flex-1"
                                >
                                  <Save className="h-3 w-3 mr-1" />
                                  Save
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => setEditingImage(null)}
                                  className="flex-1"
                                >
                                  <X className="h-3 w-3 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => window.open(image.imageUrl, '_blank')}
                                  className="flex-1"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setEditingImage(image)}
                                  className="flex-1"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleDeleteImage(image.id)}
                                  className="flex-1"
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
