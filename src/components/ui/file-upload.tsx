import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { X, Upload, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, API_CONFIG } from '@/config/api';

export interface FileUploadItem {
  id: string;
  file: File;
  preview: string;
  type: string;
  altText: string;
  order: number;
  uploading: boolean;
  uploaded: boolean;
  error?: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
}

interface FileUploadProps {
  onFilesChange: (files: FileUploadItem[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  carId?: number;
}

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

export default function FileUpload({ 
  onFilesChange, 
  maxFiles = 20, 
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  carId 
}: FileUploadProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileUploadItem[] = acceptedFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      type: 'exterior', // Default type
      altText: `Car ${file.name.split('.')[0]} image`,
      order: files.length + index + 1,
      uploading: false,
      uploaded: false,
    }));

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes.map(type => type.split('/')[1])
    },
    maxFiles: maxFiles - files.length,
    disabled: isUploading
  });

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const updateFileProperty = (id: string, property: keyof FileUploadItem, value: any) => {
    const updatedFiles = files.map(file => 
      file.id === id ? { ...file, [property]: value } : file
    );
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const setPrimaryImage = (id: string) => {
    const updatedFiles = files.map(file => ({
      ...file,
      order: file.id === id ? 1 : file.order + (file.order < files.find(f => f.id === id)?.order || 0 ? 0 : 1)
    }));
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const uploadToCloudinary = async () => {
    if (files.length === 0) {
      toast({
        title: "No Files",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      
      // Add files
      files.forEach(fileItem => {
        formData.append('images', fileItem.file);
      });

      // Add metadata
      formData.append('imageTypes', JSON.stringify(files.map(f => f.type)));
      formData.append('altTexts', JSON.stringify(files.map(f => f.altText)));
      
      if (carId) {
        formData.append('carId', carId.toString());
      }

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', `${API_CONFIG.BASE_URL}/cars/upload-images`);
        
        // Add auth header if available
        const token = localStorage.getItem('access_token');
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
        
        xhr.send(formData);
      });

      const result = await uploadPromise;
      
      // Update files with cloudinary URLs
      const updatedFiles = files.map((file, index) => ({
        ...file,
        uploaded: true,
        uploading: false,
        cloudinaryUrl: (result as any).images[index]?.url,
        cloudinaryPublicId: (result as any).cloudinaryResults[index]?.publicId,
      }));

      setFiles(updatedFiles);
      onFilesChange(updatedFiles);

      toast({
        title: "Success!",
        description: `Uploaded ${files.length} images successfully`,
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload images",
        variant: "destructive",
      });

      // Mark files as failed
      const updatedFiles = files.map(file => ({
        ...file,
        uploading: false,
        error: error.message,
      }));
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          
          {isDragActive ? (
            <p className="text-lg font-medium text-primary">Drop the images here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium">Drag & drop car images here</p>
              <p className="text-sm text-muted-foreground">
                or click to select files ({maxFiles - files.length} remaining)
              </p>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP up to 10MB each
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading to Cloudinary...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {/* Upload Button */}
      {files.length > 0 && !isUploading && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {files.length} image{files.length !== 1 ? 's' : ''} ready
          </span>
          <Button onClick={uploadToCloudinary} className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload to Cloudinary
          </Button>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Selected Images ({files.length})</h4>
          {files.map((fileItem) => (
            <Card key={fileItem.id} className="p-4">
              <div className="flex items-start gap-4">
                {/* Image Preview */}
                <div className="relative">
                  <img
                    src={fileItem.preview}
                    alt={fileItem.altText}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  {fileItem.uploaded && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                  {fileItem.error && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* File Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm truncate">{fileItem.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {fileItem.order === 1 && (
                        <Badge variant="default">Primary</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(fileItem.id)}
                        disabled={isUploading}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`type-${fileItem.id}`}>Image Type</Label>
                      <Select
                        value={fileItem.type}
                        onValueChange={(value) => updateFileProperty(fileItem.id, 'type', value)}
                        disabled={isUploading}
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
                      <Label htmlFor={`alt-${fileItem.id}`}>Alt Text</Label>
                      <Input
                        id={`alt-${fileItem.id}`}
                        value={fileItem.altText}
                        onChange={(e) => updateFileProperty(fileItem.id, 'altText', e.target.value)}
                        placeholder="Describe this image"
                        disabled={isUploading}
                      />
                    </div>
                  </div>

                  {!fileItem.uploaded && fileItem.order !== 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrimaryImage(fileItem.id)}
                      disabled={isUploading}
                    >
                      Set as Primary
                    </Button>
                  )}

                  {fileItem.error && (
                    <p className="text-sm text-red-600">{fileItem.error}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
