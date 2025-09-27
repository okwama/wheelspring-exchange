import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, RotateCcw } from "lucide-react";

interface CarImageGalleryProps {
  exteriorImages: string[];
  interiorImages: string[];
  carModel: string;
  exterior360?: string;
  interior360?: string;
}

const CarImageGallery = ({ exteriorImages, interiorImages, carModel, exterior360, interior360 }: CarImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"exterior" | "interior">("exterior");
  const [show360, setShow360] = useState<"none" | "exterior" | "interior">("none");
  
  const currentImages = activeTab === "exterior" ? exteriorImages : interiorImages;
  const totalImages = currentImages.length;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleTabChange = (tab: "exterior" | "interior") => {
    setActiveTab(tab);
    setCurrentImageIndex(0);
  };

  if (totalImages === 0) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tab Selector */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === "exterior" ? "default" : "outline"}
          onClick={() => handleTabChange("exterior")}
          disabled={exteriorImages.length === 0}
        >
          Exterior ({exteriorImages.length})
        </Button>
        <Button
          variant={activeTab === "interior" ? "default" : "outline"}
          onClick={() => handleTabChange("interior")}
          disabled={interiorImages.length === 0}
        >
          Interior ({interiorImages.length})
        </Button>
        
        {/* 360 View Buttons */}
        {exterior360 && (
          <Button
            variant="secondary"
            onClick={() => setShow360(show360 === "exterior" ? "none" : "exterior")}
            className={show360 === "exterior" ? "bg-blue-500 text-white" : ""}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            360° Exterior
          </Button>
        )}
        {interior360 && (
          <Button
            variant="secondary"
            onClick={() => setShow360(show360 === "interior" ? "none" : "interior")}
            className={show360 === "interior" ? "bg-blue-500 text-white" : ""}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            360° Interior
          </Button>
        )}
      </div>

      {/* Main Image Display */}
      <div className="relative">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          {show360 === "exterior" && exterior360 ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <RotateCcw className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold text-blue-700 mb-2">360° Exterior View</h3>
                <p className="text-blue-600 mb-4">Interactive 360° experience available</p>
                <Button 
                  onClick={() => window.open(exterior360, '_blank')}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Launch 360° View
                </Button>
              </div>
            </div>
          ) : show360 === "interior" && interior360 ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-center">
                <RotateCcw className="h-16 w-16 text-green-500 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">360° Interior View</h3>
                <p className="text-green-600 mb-4">Interactive 360° experience available</p>
                <Button 
                  onClick={() => window.open(interior360, '_blank')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Launch 360° View
                </Button>
              </div>
            </div>
          ) : (
            <img
              src={currentImages[currentImageIndex]}
              alt={`${carModel} ${activeTab} view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        {/* Navigation Arrows */}
        {totalImages > 1 && show360 === "none" && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {show360 === "none" && (
          <Badge className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm">
            {currentImageIndex + 1} / {totalImages}
          </Badge>
        )}

        {/* Active Tab Badge */}
        <Badge className="absolute top-2 left-2 bg-automotive-navy">
          {show360 === "exterior" ? "360° Exterior" : 
           show360 === "interior" ? "360° Interior" :
           activeTab === "exterior" ? "Exterior" : "Interior"}
        </Badge>
      </div>

      {/* Thumbnail Strip */}
      {totalImages > 1 && show360 === "none" && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {currentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                index === currentImageIndex 
                  ? "border-automotive-navy" 
                  : "border-transparent hover:border-muted-foreground"
              }`}
            >
              <img
                src={image}
                alt={`${carModel} ${activeTab} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarImageGallery;