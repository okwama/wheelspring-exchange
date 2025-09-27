import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Truck, Clock, CheckCircle } from "lucide-react";

interface StockLocationFilterProps {
  onStockTypeChange?: (stockType: "all" | "local" | "international") => void;
  onImportStatusChange?: (importStatus: "all" | "available" | "pending" | "in-transit") => void;
  className?: string;
}

const StockLocationFilter = ({ 
  onStockTypeChange, 
  onImportStatusChange,
  className = "" 
}: StockLocationFilterProps) => {
  const [selectedStockType, setSelectedStockType] = useState<string>("all");
  const [selectedImportStatus, setSelectedImportStatus] = useState<string>("all");

  const handleStockTypeChange = (value: string) => {
    setSelectedStockType(value);
    onStockTypeChange?.(value as "all" | "local" | "international");
  };

  const handleImportStatusChange = (value: string) => {
    setSelectedImportStatus(value);
    onImportStatusChange?.(value as "all" | "available" | "pending" | "in-transit");
  };

  const getStockTypeIcon = (type: string) => {
    switch (type) {
      case "local":
        return <MapPin className="h-4 w-4" />;
      case "international":
        return <Globe className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getImportStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "in-transit":
        return <Truck className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Stock Type Filter */}
      <Select value={selectedStockType} onValueChange={handleStockTypeChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Stock Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>All Locations</span>
            </div>
          </SelectItem>
          <SelectItem value="local">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Local Stock</span>
            </div>
          </SelectItem>
          <SelectItem value="international">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>International Stock</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Import Status Filter (only show for international stock) */}
      {selectedStockType === "international" && (
        <Select value={selectedImportStatus} onValueChange={handleImportStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Import Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>All Import Status</span>
              </div>
            </SelectItem>
            <SelectItem value="available">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Available Now</span>
              </div>
            </SelectItem>
            <SelectItem value="pending">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span>Pending Import</span>
              </div>
            </SelectItem>
            <SelectItem value="in-transit">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>In Transit</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default StockLocationFilter;
