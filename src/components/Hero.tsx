import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import HierarchicalSearch from "./HierarchicalSearch";
import StockLocationFilter from "./StockLocationFilter";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-automotive-navy via-automotive-accent to-automotive-dark py-20 lg:py-28 gold-accent-line">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block gold-text-gradient">
              Dream Car
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Browse thousands of quality vehicles from trusted dealers and private sellers. 
            Your next car is just a search away.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl gold-glow-subtle">
          <HierarchicalSearch className="mb-4" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <StockLocationFilter 
              className="space-y-2"
            />
            
            <Select>
              <SelectTrigger className="bg-white border-gray-300 h-10 sm:h-11">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-20k">Under $20,000</SelectItem>
                <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                <SelectItem value="over-60k">Over $60,000</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative sm:col-span-2 lg:col-span-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Zip Code" 
                className="pl-10 bg-white border-gray-300 h-10 sm:h-11"
              />
            </div>
          </div>

            <Button className="w-full bg-automotive-navy hover:bg-automotive-dark text-white py-2 sm:py-3 text-base sm:text-lg font-semibold gold-glow-subtle">
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Search Cars
            </Button>
        </div>

        {/* Brand Logos Marquee */}
        <div className="mt-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent"></div>
          <div className="brands-marquee">
            <div className="brands-track">
              {/* First set of brand logos */}
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">TOYOTA</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">BMW</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="12" fontWeight="bold">MERCEDES</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">AUDI</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">HONDA</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">FORD</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">NISSAN</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">HYUNDAI</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">LEXUS</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">PORSCHE</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">VOLVO</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">MAZDA</text>
                </svg>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">TOYOTA</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">BMW</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="12" fontWeight="bold">MERCEDES</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">AUDI</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">HONDA</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">FORD</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">NISSAN</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">HYUNDAI</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">LEXUS</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">PORSCHE</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="16" fontWeight="bold">VOLVO</text>
                </svg>
              </div>
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" className="h-8 w-20 fill-white/90 hover:fill-gold-400 transition-colors">
                  <text x="50" y="25" textAnchor="middle" fontSize="14" fontWeight="bold">MAZDA</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;