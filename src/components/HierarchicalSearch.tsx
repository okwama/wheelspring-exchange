import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import carsService, { 
  type Category,
  type Brand,
  type Model
} from "@/services/carsService";

interface HierarchicalSearchProps {
  onSelectionChange?: (selection: {
    category: Category | null;
    brand: Brand | null;
    model: Model | null;
  }) => void;
  className?: string;
}

const HierarchicalSearch = ({ onSelectionChange, className = "" }: HierarchicalSearchProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [selectedBrandId, setSelectedBrandId] = useState<string>("all");
  const [selectedModelId, setSelectedModelId] = useState<string>("all");

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, brandsData, modelsData] = await Promise.all([
          carsService.getCategories(),
          carsService.getBrands(),
          carsService.getModels()
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
        setModels(modelsData);
      } catch (error) {
        console.error('Error loading hierarchical search data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle selection changes and notify parent
  useEffect(() => {
    if (onSelectionChange) {
      const selectedCategory = selectedCategoryId && selectedCategoryId !== "all" 
        ? categories.find(c => c.id.toString() === selectedCategoryId) || null
        : null;
      const selectedBrand = selectedBrandId && selectedBrandId !== "all"
        ? brands.find(b => b.id.toString() === selectedBrandId) || null
        : null;
      const selectedModel = selectedModelId && selectedModelId !== "all"
        ? models.find(m => m.id.toString() === selectedModelId) || null
        : null;

      onSelectionChange({
        category: selectedCategory,
        brand: selectedBrand,
        model: selectedModel,
      });
    }
  }, [selectedCategoryId, selectedBrandId, selectedModelId, categories, brands, models, onSelectionChange]);

  // Filter brands by selected category
  const filteredBrands = selectedCategoryId && selectedCategoryId !== "all"
    ? brands.filter(brand => brand.categoryId.toString() === selectedCategoryId)
    : brands;

  // Filter models by selected brand
  const filteredModels = selectedBrandId && selectedBrandId !== "all"
    ? models.filter(model => model.brandId.toString() === selectedBrandId)
    : models;

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-10 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {/* Category Selection */}
      <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Brand Selection */}
      <Select 
        value={selectedBrandId} 
        onValueChange={(value) => {
          setSelectedBrandId(value);
          setSelectedModelId("all"); // Reset model when brand changes
        }}
        disabled={!selectedCategoryId || selectedCategoryId === "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
          {filteredBrands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Model Selection */}
      <Select 
        value={selectedModelId} 
        onValueChange={setSelectedModelId}
        disabled={!selectedBrandId || selectedBrandId === "all"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Models</SelectItem>
          {filteredModels.map((model) => (
            <SelectItem key={model.id} value={model.id.toString()}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HierarchicalSearch;