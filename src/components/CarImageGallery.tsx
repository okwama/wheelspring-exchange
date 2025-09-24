import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarImageGalleryProps {
  exteriorImages: string[];
  interiorImages: string[];
  carModel: string;
}

const CarImageGallery = ({ exteriorImages, interiorImages, carModel }: CarImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"exterior" | "interior">("exterior");
  
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
      </div>

      {/* Main Image Display */}
      <div className="relative">
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img
            src={currentImages[currentImageIndex]}
            alt={`${carModel} ${activeTab} view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Navigation Arrows */}
        {totalImages > 1 && (
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
        <Badge className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm">
          {currentImageIndex + 1} / {totalImages}
        </Badge>

        {/* Active Tab Badge */}
        <Badge className="absolute top-2 left-2 bg-automotive-navy">
          {activeTab === "exterior" ? "Exterior" : "Interior"}
        </Badge>
      </div>

      {/* Thumbnail Strip */}
      {totalImages > 1 && (
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