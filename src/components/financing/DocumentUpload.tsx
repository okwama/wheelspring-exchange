import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Paperclip,
  Download,
  Eye,
  Image,
  File
} from 'lucide-react';

interface DocumentUploadProps {
  applicationId: number;
  onDocumentUploaded?: () => void;
}

interface Document {
  id: number;
  document_type: string;
  file_name: string;
  file_size: number;
  uploaded_at: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  applicationId, 
  onDocumentUploaded 
}) => {
  const { toast } = useToast();
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>('income_proof');
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const documentTypes = [
    { value: 'income_proof', label: 'Income Proof', required: true },
    { value: 'bank_statement', label: 'Bank Statement', required: true },
    { value: 'credit_report', label: 'Credit Report', required: false },
    { value: 'identity', label: 'Identity Document', required: true },
    { value: 'employment_verification', label: 'Employment Verification', required: false },
    { value: 'other', label: 'Other', required: false },
  ];

  // Load existing documents on component mount
  useEffect(() => {
    loadDocuments();
  }, [applicationId]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const loadDocuments = async () => {
    try {
      console.log('Loading documents with token:', token);
      
      if (!token) {
        console.error('No token available for loading documents');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/financing/applications/${applicationId}/documents`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Documents response status:', response.status);

      if (response.ok) {
        const docs = await response.json();
        setDocuments(docs);
      } else {
        const errorText = await response.text();
        console.error('Error loading documents:', errorText);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleFileSelect = (file: File, documentType: string) => {
    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Invalid File Type',
        description: 'Please upload PDF, JPG, PNG, or DOC files only.',
      });
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        variant: 'destructive',
        title: 'File Too Large',
        description: 'Please upload files smaller than 5MB.',
      });
      return;
    }

    // Set preview file
    setPreviewFile(file);
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const uploadDocument = async (file: File, documentType: string) => {
    setUploading(true);
    
    try {
      console.log('Uploading document with token:', token);
      
      if (!token) {
        throw new Error('No authentication token available');
      }

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', documentType);

      const response = await fetch(`http://localhost:3001/api/financing/applications/${applicationId}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('Upload response status:', response.status);

      if (response.ok) {
        const newDocument = await response.json();
        setDocuments(prev => [...prev, newDocument]);
        
        toast({
          title: 'Document Uploaded',
          description: `${file.name} has been uploaded successfully.`,
        });

        // Clear preview
        setPreviewFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }

        onDocumentUploaded?.();
      } else {
        const errorText = await response.text();
        console.error('Upload error response:', errorText);
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }
      
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'There was an error uploading your document. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (documentId: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: 'Document Removed',
      description: 'Document has been removed from your application.',
    });
  };

  const downloadDocument = (document: Document) => {
    // TODO: Implement actual download functionality
    toast({
      title: 'Download Started',
      description: `Downloading ${document.file_name}...`,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentTypeLabel = (type: string) => {
    const docType = documentTypes.find(dt => dt.value === type);
    return docType?.label || type.replace('_', ' ').toUpperCase();
  };

  const getRequiredDocuments = () => {
    return documentTypes.filter(dt => dt.required);
  };

  const getUploadedRequiredDocs = () => {
    const required = getRequiredDocuments().map(dt => dt.value);
    return documents.filter(doc => required.includes(doc.document_type));
  };

  const isAllRequiredUploaded = () => {
    const required = getRequiredDocuments();
    const uploaded = getUploadedRequiredDocs();
    return required.length === uploaded.length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paperclip className="h-5 w-5" />
          Required Documents
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isAllRequiredUploaded() ? "default" : "secondary"}>
            {getUploadedRequiredDocs().length} / {getRequiredDocuments().length} Required
          </Badge>
          {isAllRequiredUploaded() && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Complete
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Required Documents List */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Required Documents:</h4>
          {getRequiredDocuments().map((docType) => {
            const isUploaded = documents.some(doc => doc.document_type === docType.value);
            return (
              <div key={docType.value} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {isUploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                  <div>
                    <p className="font-medium">{docType.label}</p>
                    <p className="text-sm text-gray-500">
                      {isUploaded ? 'Uploaded' : 'Required'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploaded ? 'Replace' : 'Upload'}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Uploaded Documents */}
        {documents.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Uploaded Documents:</h4>
            {documents.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{document.file_name}</p>
                    <p className="text-sm text-gray-500">
                      {getDocumentTypeLabel(document.document_type)} • {formatFileSize(document.file_size)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadDocument(document)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDocument(document.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* File Upload Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileSelect(file, selectedDocumentType);
            }
          }}
        />

        {/* Document Preview Section */}
        {previewFile && (
          <div className="border rounded-lg p-4 bg-blue-50">
            <h4 className="font-medium text-blue-900 mb-3">Document Preview</h4>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {previewUrl ? (
                  <div className="w-20 h-20 border rounded-lg overflow-hidden">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 border rounded-lg flex items-center justify-center bg-gray-100">
                    {previewFile.type.includes('pdf') ? (
                      <FileText className="h-8 w-8 text-red-600" />
                    ) : previewFile.type.includes('image') ? (
                      <Image className="h-8 w-8 text-blue-600" />
                    ) : (
                      <File className="h-8 w-8 text-gray-600" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-blue-900">{previewFile.name}</p>
                    <p className="text-sm text-blue-700">
                      {formatFileSize(previewFile.size)} • {getDocumentTypeLabel(selectedDocumentType)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPreviewFile(null);
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => uploadDocument(previewFile, selectedDocumentType)}
                    disabled={uploading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {uploading ? 'Uploading...' : 'Upload Document'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPreviewFile(null);
                      if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                        setPreviewUrl(null);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Upload Instructions:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Accepted formats: PDF, JPG, PNG, DOC, DOCX</li>
            <li>• Maximum file size: 5MB per document</li>
            <li>• Ensure documents are clear and readable</li>
            <li>• All required documents must be uploaded for application review</li>
          </ul>
        </div>

        {/* Document Type Selector (for additional uploads) */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">Upload Additional Documents:</h4>
          <div className="grid grid-cols-2 gap-2">
            {documentTypes.map((docType) => (
              <Button
                key={docType.value}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedDocumentType(docType.value);
                  fileInputRef.current?.click();
                }}
                disabled={uploading}
                className="justify-start"
              >
                <Upload className="h-4 w-4 mr-2" />
                {docType.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;
