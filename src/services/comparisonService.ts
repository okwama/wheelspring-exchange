import { Car } from './carsService';

export interface ComparisonFeature {
  name: string;
  values: (string | number | null)[];
  type: 'text' | 'number' | 'currency' | 'boolean' | 'rating';
  highlight?: boolean; // Whether to highlight differences
}

export interface ComparisonData {
  cars: Car[];
  features: ComparisonFeature[];
  summary: {
    totalCars: number;
    priceRange: {
      min: number;
      max: number;
      average: number;
    };
    yearRange: {
      min: number;
      max: number;
    };
    topRated: Car | null;
    bestValue: Car | null;
  };
}

class ComparisonService {
  /**
   * Generate comparison data from cars
   */
  generateComparisonData(cars: Car[]): ComparisonData {
    if (cars.length === 0) {
      return {
        cars: [],
        features: [],
        summary: {
          totalCars: 0,
          priceRange: { min: 0, max: 0, average: 0 },
          yearRange: { min: 0, max: 0 },
          topRated: null,
          bestValue: null,
        },
      };
    }

    const features: ComparisonFeature[] = [
      {
        name: 'Price',
        values: cars.map(car => car.price),
        type: 'currency',
        highlight: true,
      },
      {
        name: 'Original Price',
        values: cars.map(car => car.originalPrice || car.price),
        type: 'currency',
      },
      {
        name: 'Year',
        values: cars.map(car => car.year),
        type: 'number',
        highlight: true,
      },
      {
        name: 'Brand',
        values: cars.map(car => car.brand),
        type: 'text',
      },
      {
        name: 'Model',
        values: cars.map(car => car.model),
        type: 'text',
      },
      {
        name: 'Category',
        values: cars.map(car => car.category),
        type: 'text',
      },
      {
        name: 'Condition',
        values: cars.map(car => car.carCondition),
        type: 'text',
        highlight: true,
      },
      {
        name: 'Mileage',
        values: cars.map(car => car.mileage),
        type: 'number',
        highlight: true,
      },
      {
        name: 'Color',
        values: cars.map(car => car.color),
        type: 'text',
      },
      {
        name: 'Interior Color',
        values: cars.map(car => car.interiorColor),
        type: 'text',
      },
      {
        name: 'Stock Type',
        values: cars.map(car => car.stockType),
        type: 'text',
      },
      {
        name: 'Import Status',
        values: cars.map(car => car.importStatus),
        type: 'text',
      },
      {
        name: 'Rating',
        values: cars.map(car => car.rating),
        type: 'rating',
        highlight: true,
      },
      {
        name: 'Review Count',
        values: cars.map(car => car.reviewCount),
        type: 'number',
      },
      {
        name: 'Views',
        values: cars.map(car => car.views_count),
        type: 'number',
      },
      {
        name: 'Favorites',
        values: cars.map(car => car.favorites_count),
        type: 'number',
      },
    ];

    // Calculate summary statistics
    const prices = cars.map(car => car.price).filter(price => price != null);
    const years = cars.map(car => car.year).filter(year => year != null);
    
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((sum, price) => sum + price, 0) / prices.length,
    };

    const yearRange = {
      min: Math.min(...years),
      max: Math.max(...years),
    };

    // Find top rated car
    const topRated = cars.reduce((best, car) => {
      if (!best || car.rating > best.rating) {
        return car;
      }
      return best;
    }, null as Car | null);

    // Find best value car (highest rating per price ratio)
    const bestValue = cars.reduce((best, car) => {
      if (!best) return car;
      
      const bestValueScore = best.rating / best.price;
      const currentValueScore = car.rating / car.price;
      
      return currentValueScore > bestValueScore ? car : best;
    }, null as Car | null);

    return {
      cars,
      features,
      summary: {
        totalCars: cars.length,
        priceRange,
        yearRange,
        topRated,
        bestValue,
      },
    };
  }

  /**
   * Format value for display
   */
  formatValue(value: string | number | null, type: ComparisonFeature['type']): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-KE', {
          style: 'currency',
          currency: 'KES',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(Number(value));

      case 'number':
        return new Intl.NumberFormat('en-US').format(Number(value));

      case 'rating':
        return `${value}/5 ⭐`;

      case 'boolean':
        return value ? 'Yes' : 'No';

      case 'text':
      default:
        return String(value);
    }
  }

  /**
   * Check if a feature has different values across cars
   */
  hasDifferences(feature: ComparisonFeature): boolean {
    if (feature.values.length <= 1) return false;
    
    const firstValue = feature.values[0];
    return feature.values.some(value => value !== firstValue);
  }

  /**
   * Export comparison data as CSV
   */
  exportToCSV(comparisonData: ComparisonData): string {
    const { cars, features } = comparisonData;
    
    // Create header row
    const headers = ['Feature', ...cars.map(car => `${car.brand} ${car.model}`)];
    
    // Create data rows
    const rows = features.map(feature => [
      feature.name,
      ...feature.values.map(value => this.formatValue(value, feature.type))
    ]);
    
    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    return csvContent;
  }

  /**
   * Download comparison as CSV file
   */
  downloadCSV(comparisonData: ComparisonData, filename: string = 'car-comparison.csv'): void {
    const csvContent = this.exportToCSV(comparisonData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

const comparisonService = new ComparisonService();
export default comparisonService;
