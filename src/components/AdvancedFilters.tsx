import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  X, 
  RotateCcw,
  Palette,
  Car,
  Gauge,
  Star,
  Calendar
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import carsService from '@/services/carsService';

export interface FilterOptions {
  colors: string[];
  interiorColors: string[];
  years: number[];
  conditions: string[];
  stockTypes: string[];
  importStatuses: string[];
}

export interface FilterValues {
  carCondition: string;
  color: string;
  interiorColor: string;
  minMileage: string;
  maxMileage: string;
  minRating: string;
  sortBy: string;
  sortOrder: string;
}

interface AdvancedFiltersProps {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearAll,
  activeFilterCount
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    colors: ['White', 'Black', 'Silver', 'Red', 'Blue', 'Gray'],
    interiorColors: ['Black', 'Beige', 'Brown', 'Gray', 'White'],
    years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
    conditions: ['new', 'used', 'certified'],
    stockTypes: ['local', 'international'],
    importStatuses: ['available', 'pending', 'in-transit', 'clearing']
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Temporarily disable filter options loading
    // loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      setLoading(true);
      const options = await carsService.getFilterOptions();
      setFilterOptions(options);
    } catch (error: any) {
      console.error('Error loading filter options:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load filter options",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    // Convert "all" values to empty strings for backend compatibility
    const processedValue = value === "all" ? "" : value;
    onFiltersChange({
      ...filters,
      [key]: processedValue
    });
  };

  const removeFilter = (key: keyof FilterValues) => {
    onFiltersChange({
      ...filters,
      [key]: ''
    });
  };

  const getActiveFilters = () => {
    const active: Array<{ key: keyof FilterValues; label: string; value: string }> = [];
    
    if (filters.carCondition) active.push({ key: 'carCondition', label: 'Condition', value: filters.carCondition });
    if (filters.color) active.push({ key: 'color', label: 'Color', value: filters.color });
    if (filters.interiorColor) active.push({ key: 'interiorColor', label: 'Interior', value: filters.interiorColor });
    if (filters.minMileage || filters.maxMileage) {
      const mileage = filters.minMileage && filters.maxMileage 
        ? `${filters.minMileage} - ${filters.maxMileage} km`
        : filters.minMileage 
        ? `${filters.minMileage}+ km`
        : `Up to ${filters.maxMileage} km`;
      active.push({ key: 'minMileage', label: 'Mileage', value: mileage });
    }
    if (filters.minRating) active.push({ key: 'minRating', label: 'Rating', value: `${filters.minRating}+ stars` });
    if (filters.sortBy) active.push({ key: 'sortBy', label: 'Sort', value: `${filters.sortBy} (${filters.sortOrder})` });
    
    return active;
  };

  const activeFilters = getActiveFilters();

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <CardTitle className="text-lg">Advanced Filters</CardTitle>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Car Condition */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Condition
                </Label>
                <Select value={filters.carCondition || "all"} onValueChange={(value) => handleFilterChange('carCondition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    {filterOptions.conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition.charAt(0).toUpperCase() + condition.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Exterior Color
                </Label>
                <Select value={filters.color || "all"} onValueChange={(value) => handleFilterChange('color', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Colors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colors</SelectItem>
                    {filterOptions.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interior Color */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Interior Color
                </Label>
                <Select value={filters.interiorColor || "all"} onValueChange={(value) => handleFilterChange('interiorColor', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Interior Colors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Interior Colors</SelectItem>
                    {filterOptions.interiorColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mileage Range */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Mileage Range
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min km"
                    value={filters.minMileage}
                    onChange={(e) => handleFilterChange('minMileage', e.target.value)}
                    type="number"
                  />
                  <Input
                    placeholder="Max km"
                    value={filters.maxMileage}
                    onChange={(e) => handleFilterChange('maxMileage', e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Minimum Rating
                </Label>
                <Select value={filters.minRating || "all"} onValueChange={(value) => handleFilterChange('minRating', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="1">1+ Stars</SelectItem>
                    <SelectItem value="2">2+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Sort By
                </Label>
                <div className="flex gap-2">
                  <Select value={filters.sortBy || "all"} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Default</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="mileage">Mileage</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="createdAt">Date Added</SelectItem>
                    </SelectContent>
                  </Select>
                  {filters.sortBy && (
                    <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">↑</SelectItem>
                        <SelectItem value="desc">↓</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="space-y-2">
                <Label>Active Filters:</Label>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
                    <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
                      {filter.label}: {filter.value}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeFilter(filter.key)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={onClearAll} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Clear All Filters
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardHeader>
    </Card>
  );
};

export default AdvancedFilters;
