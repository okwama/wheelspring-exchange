import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import CarCard from "@/components/CarCard";
import AdvancedFilters from "@/components/AdvancedFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Loader2, Grid, List } from "lucide-react";
import HierarchicalSearch from "@/components/HierarchicalSearch";
import StockLocationFilter from "@/components/StockLocationFilter";
import carsService, { Car, CarFilters, Category, Brand, Model } from "@/services/carsService";

const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStockType, setSelectedStockType] = useState<"all" | "local" | "international">("all");
  const [selectedImportStatus, setSelectedImportStatus] = useState<"all" | "available" | "pending" | "in-transit">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedModel, setSelectedModel] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  
  // Advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    carCondition: '',
    color: '',
    interiorColor: '',
    minMileage: '',
    maxMileage: '',
    minRating: '',
    sortBy: '',
    sortOrder: ''
  });
  
  // Data states
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (brandParam) {
      setSelectedBrand(brandParam);
    }
  }, [searchParams]);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load cars when filters change
  useEffect(() => {
    loadCars();
  }, [selectedCategory, selectedBrand, selectedModel, selectedStockType, selectedImportStatus, selectedPriceRange, selectedYear, searchTerm, advancedFilters]);

  // Load brands when category changes
  useEffect(() => {
    if (selectedCategory) {
      loadBrands(selectedCategory);
      setSelectedBrand("");
      setSelectedModel("");
    }
  }, [selectedCategory]);

  // Load models when brand changes
  useEffect(() => {
    if (selectedBrand) {
      loadModels(selectedBrand);
      setSelectedModel("");
    }
  }, [selectedBrand]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [categoriesData] = await Promise.all([
        carsService.getCategories(),
      ]);
      
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const loadCars = async () => {
    try {
      setLoading(true);
      
      const filters: CarFilters = {
        page: 1,
        limit: 20,
        search: searchTerm || undefined,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        brand: selectedBrand !== "all" ? selectedBrand : undefined,
        model: selectedModel !== "all" ? selectedModel : undefined,
        stockType: selectedStockType !== "all" ? selectedStockType : undefined,
        importStatus: selectedImportStatus !== "all" ? selectedImportStatus : undefined,
      };

      // Add price range filter
      if (selectedPriceRange && selectedPriceRange !== "all") {
        const [min, max] = selectedPriceRange.split('-').map(p => parseInt(p.replace(/[$,]/g, '')));
        if (min) filters.minPrice = min;
        if (max) filters.maxPrice = max;
      }

      // Add year filter
      if (selectedYear && selectedYear !== "all") {
        filters.year = parseInt(selectedYear);
      }

      // Add advanced filters
      if (advancedFilters.carCondition) filters.carCondition = advancedFilters.carCondition as any;
      if (advancedFilters.color) filters.color = advancedFilters.color;
      if (advancedFilters.interiorColor) filters.interiorColor = advancedFilters.interiorColor;
      if (advancedFilters.minMileage) filters.minMileage = parseInt(advancedFilters.minMileage);
      if (advancedFilters.maxMileage) filters.maxMileage = parseInt(advancedFilters.maxMileage);
      if (advancedFilters.minRating) filters.minRating = parseInt(advancedFilters.minRating);
      if (advancedFilters.sortBy) filters.sortBy = advancedFilters.sortBy as any;
      if (advancedFilters.sortOrder) filters.sortOrder = advancedFilters.sortOrder as any;

      const response = await carsService.getAllCars(filters);
      setCars(response.cars);
      setPagination(response.pagination);
    } catch (err) {
      console.error('Error loading cars:', err);
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const loadBrands = async (categoryName: string) => {
    try {
      if (categoryName === "all") {
        setBrands([]);
        return;
      }
      const category = categories.find(c => c.name === categoryName);
      if (category) {
        const brandsData = await carsService.getBrands(category.id);
        setBrands(brandsData);
      }
    } catch (err) {
      console.error('Error loading brands:', err);
    }
  };

  const loadModels = async (brandName: string) => {
    try {
      if (brandName === "all") {
        setModels([]);
        return;
      }
      const brand = brands.find(b => b.name === brandName);
      if (brand) {
        const modelsData = await carsService.getModels(brand.id);
        setModels(modelsData);
      }
    } catch (err) {
      console.error('Error loading models:', err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadCars();
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedModel("all");
    setSelectedPriceRange("all");
    setSelectedYear("all");
    setSearchTerm("");
    setSelectedStockType("all");
    setSelectedImportStatus("all");
    setAdvancedFilters({
      carCondition: '',
      color: '',
      interiorColor: '',
      minMileage: '',
      maxMileage: '',
      minRating: '',
      sortBy: '',
      sortOrder: ''
    });
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      carCondition: '',
      color: '',
      interiorColor: '',
      minMileage: '',
      maxMileage: '',
      minRating: '',
      sortBy: '',
      sortOrder: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Browse Cars | Gold Standard Cars</title>
        <meta name="description" content="Filter and browse cars by brand, model, category, price, year, and more." />
        <link rel="canonical" href={`${window.location.origin}/cars`} />
      </Helmet>
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-automotive-navy mb-2 sm:mb-4 gold-text-gradient">Find Your Perfect Car</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Browse our extensive collection of quality vehicles</p>
          </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm border">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBrand} onValueChange={setSelectedBrand} disabled={selectedCategory === "all"}>
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedModel} onValueChange={setSelectedModel} disabled={selectedBrand === "all"}>
              <SelectTrigger>
                  <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">All Models</SelectItem>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.name}>
                      {model.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-30000">$0 - $30,000</SelectItem>
                  <SelectItem value="30000-60000">$30,000 - $60,000</SelectItem>
                  <SelectItem value="60000-100000">$60,000 - $100,000</SelectItem>
                  <SelectItem value="100000-999999">$100,000+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            </div>
          </form>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Stock Location Filter */}
            <StockLocationFilter 
              onStockTypeChange={setSelectedStockType}
              onImportStatusChange={setSelectedImportStatus}
              className="space-y-2"
            />
            
            <div className="flex gap-2">
              <Button type="submit" onClick={handleSearch}>
                Search
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
            </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AdvancedFilters
          filters={advancedFilters}
          onFiltersChange={setAdvancedFilters}
          onClearAll={clearAdvancedFilters}
          activeFilterCount={
            Object.values(advancedFilters).filter(value => value !== '').length
          }
        />

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading cars...
              </span>
            ) : (
              <>
                {cars.length} of {pagination.total} cars found
                {(selectedCategory || selectedBrand || selectedModel || selectedStockType !== "all") && (
                  <span className="ml-2 text-blue-600">
                    (Filtered results)
                  </span>
                )}
              </>
            )}
          </p>
          {error && (
            <div className="text-red-600 mt-2">
              {error}
            </div>
          )}
        </div>

        {/* Car Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-4 shadow-sm border animate-pulse">
                <div className="h-40 sm:h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {cars.map((car) => (
              <CarCard 
                key={car.id} 
                id={car.id.toString()}
                make={car.brand}
                model={car.model}
                variant={car.model}
                year={car.year}
                price={car.price}
                mileage={car.mileage || 0}
                location="Nairobi, Kenya"
                image={car.images && car.images.length > 0 ? car.images[0] : '/images/placeholder-car.jpg'}
                condition={car.carCondition === 'certified' ? 'new' : car.carCondition}
                fuelType="Petrol"
                transmission="Automatic"
                stockType={car.stockType}
                importStatus={car.importStatus}
                currency={car.currency}
                isFavorite={car.isFavorite || false}
                onFavoriteToggle={(productId: number, isFavorite: boolean) => {
                  // Update the car's favorite status in the local state
                  setCars(prevCars => 
                    prevCars.map(c => 
                      c.id === productId ? { ...c, isFavorite } : c
                    )
                  );
                }}
              />
          ))}
        </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={pagination.page === 1}
                onClick={() => {
                  // Implement pagination
                }}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => {
                  // Implement pagination
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cars;