import { Button } from "@/components/ui/button";
import { Car, Search, User, Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-automotive-navy to-automotive-accent">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-automotive-navy">AutoMarket</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/cars" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Buy
            </a>
            <a href="/sell" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Sell
            </a>
            <a href="/finance" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Finance
            </a>
            <a href="/reviews" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Reviews
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="h-4 w-4 mr-2" />
              Saved
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm" className="bg-automotive-navy hover:bg-automotive-dark">
              Sell Your Car
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;