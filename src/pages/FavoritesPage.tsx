import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Car, Plus, ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import favoritesService, { FavoriteCar } from '@/services/favoritesService';

const FavoritesPage = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [favorites, setFavorites] = useState<FavoriteCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    loadFavorites();
  }, [isAuthenticated, navigate]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await favoritesService.getUserFavorites(pagination.page, pagination.limit);
      setFavorites(response.favorites);
      setPagination(response.pagination);
    } catch (error: any) {
      console.error('Error loading favorites:', error);
      setError(error.message || 'Failed to load favorites');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your favorites. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (productId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== productId));
      setPagination(prev => ({ ...prev, total: prev.total - 1 }));
    }
  };

  const handleClearAllFavorites = async () => {
    try {
      await favoritesService.clearUserFavorites();
      setFavorites([]);
      setPagination(prev => ({ ...prev, total: 0 }));
      toast({
        title: "Favorites Cleared",
        description: "All your favorites have been removed.",
      });
    } catch (error: any) {
      console.error('Error clearing favorites:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to clear favorites. Please try again.",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/account">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Account
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
            <p className="text-gray-600 mt-2">Cars you've saved for later</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your favorites...</p>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Favorites</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={loadFavorites}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : favorites.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Saved Cars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start exploring our car collection and save your favorites for easy access later.
                  </p>
                  <Button asChild>
                    <Link to="/cars">
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Cars
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {pagination.total} Favorite{pagination.total !== 1 ? 's' : ''}
                  </h2>
                  <p className="text-gray-600">
                    Cars you've saved for later
                  </p>
                </div>
                {favorites.length > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={handleClearAllFavorites}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((car) => (
                  <CarCard
                    key={car.id}
                    id={car.id.toString()}
                    make={car.brand}
                    model={car.model}
                    year={car.year}
                    price={car.price}
                    mileage={car.mileage || 0}
                    location="Nairobi, Kenya"
                    image={car.images[0] || '/images/placeholder-car.jpg'}
                    condition={car.carCondition}
                    fuelType="Petrol"
                    transmission="Automatic"
                    stockType={car.stockType}
                    currency={car.currency}
                    importStatus={car.importStatus}
                    isFavorite={true}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="text-center">
                  <p className="text-gray-600">
                    Showing {favorites.length} of {pagination.total} favorites
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
