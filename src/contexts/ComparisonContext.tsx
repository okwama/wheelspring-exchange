import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car } from '@/services/carsService';

interface ComparisonContextType {
  comparisonCars: Car[];
  addToComparison: (car: Car) => void;
  removeFromComparison: (carId: number) => void;
  clearComparison: () => void;
  isInComparison: (carId: number) => boolean;
  canAddToComparison: boolean;
  maxComparisonItems: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

interface ComparisonProviderProps {
  children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparisonCars, setComparisonCars] = useState<Car[]>([]);
  const maxComparisonItems = 3; // Limit to 3 cars for optimal comparison

  // Load comparison from localStorage on mount
  useEffect(() => {
    const savedComparison = localStorage.getItem('carComparison');
    if (savedComparison) {
      try {
        const parsedComparison = JSON.parse(savedComparison);
        setComparisonCars(parsedComparison);
      } catch (error) {
        console.error('Error loading comparison from localStorage:', error);
        localStorage.removeItem('carComparison');
      }
    }
  }, []);

  // Save comparison to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carComparison', JSON.stringify(comparisonCars));
  }, [comparisonCars]);

  const addToComparison = (car: Car) => {
    setComparisonCars(prev => {
      // Check if car is already in comparison
      if (prev.some(c => c.id === car.id)) {
        return prev;
      }
      
      // Check if we've reached the limit
      if (prev.length >= maxComparisonItems) {
        return prev;
      }
      
      return [...prev, car];
    });
  };

  const removeFromComparison = (carId: number) => {
    setComparisonCars(prev => prev.filter(car => car.id !== carId));
  };

  const clearComparison = () => {
    setComparisonCars([]);
  };

  const isInComparison = (carId: number) => {
    return comparisonCars.some(car => car.id === carId);
  };

  const canAddToComparison = comparisonCars.length < maxComparisonItems;

  const value: ComparisonContextType = {
    comparisonCars,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    canAddToComparison,
    maxComparisonItems,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
