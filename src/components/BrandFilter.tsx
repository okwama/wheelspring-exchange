import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Car, Zap, Car as CarIcon, Truck, Zap as Electric } from "lucide-react";
import { useNavigate } from "react-router-dom";
import carsService, { Category, Brand } from "@/services/carsService";

const categoryIcons = {
  "Luxury": Car,
  "Sports": Car,
  "SUV": CarIcon,
  "Sedan": Car,
  "Truck": Truck,
  "Electric": Electric,
};

const BrandFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          carsService.getCategories(),
          carsService.getBrands()
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error loading categories and brands:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleBrandClick = (brandId: number) => {
    // Navigate to cars page with brand filter
    navigate(`/cars?brand=${brandId}`);
  };

  const handleCategoryNavigation = (categoryId: number) => {
    // Navigate to cars page with category filter
    navigate(`/cars?category=${categoryId}`);
  };

  const getAvailableBrands = () => {
    if (!selectedCategory) return [];
    return brands.filter(brand => brand.categoryId === selectedCategory);
  };

  return (
    <section className="py-16 bg-muted/50 gold-accent-line">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 gold-text-gradient">
            Browse by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect car from our extensive selection of vehicle categories
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons] || Car;
              return (
                <div key={category.id} className="relative group">
                  <Button
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="h-20 w-full flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    onClick={() => handleCategoryNavigation(category.id)}
                  >
                    Browse All
                  </Button>
                </div>
              );
            })}
          </div>
        )}

        {selectedCategory && (
          <div className="mt-8">
            <div className="text-center mb-6">
              <p className="text-muted-foreground mb-4">
                Available brands in: <span className="font-semibold text-foreground">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </span>
              </p>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCategory(null)}
                className="mb-4"
              >
                Clear Filter
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {getAvailableBrands().map((brand) => (
                <Button
                  key={brand.id}
                  variant="secondary"
                  className="h-16 flex flex-col items-center justify-center space-y-1 hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => handleBrandClick(brand.id)}
                >
                  <Car className="h-5 w-5" />
                  <span className="text-xs font-medium">{brand.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandFilter;