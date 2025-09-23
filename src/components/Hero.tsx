import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-automotive-navy via-automotive-accent to-automotive-dark py-20 lg:py-28">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-automotive-silver to-white bg-clip-text text-transparent">
              Dream Car
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Browse thousands of quality vehicles from trusted dealers and private sellers. 
            Your next car is just a search away.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                <SelectItem value="audi">Audi</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Model</SelectItem>
                <SelectItem value="camry">Camry</SelectItem>
                <SelectItem value="accord">Accord</SelectItem>
                <SelectItem value="f150">F-150</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white border-gray-300">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-20k">Under $20,000</SelectItem>
                <SelectItem value="20k-40k">$20,000 - $40,000</SelectItem>
                <SelectItem value="40k-60k">$40,000 - $60,000</SelectItem>
                <SelectItem value="over-60k">Over $60,000</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Zip Code" 
                className="pl-10 bg-white border-gray-300"
              />
            </div>
          </div>

          <Button className="w-full bg-automotive-navy hover:bg-automotive-dark text-white py-3 text-lg font-semibold">
            <Search className="mr-2 h-5 w-5" />
            Search Cars
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/80">Cars Available</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">15K+</div>
            <div className="text-white/80">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-white/80">Dealers</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/80">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;