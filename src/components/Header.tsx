import { Button } from "@/components/ui/button";
import { User, Menu, X, GitCompare, Heart, Truck } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthDialog from "@/components/auth/AuthDialog";
import ImportRequestDialog from "@/components/ImportRequestDialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useComparison } from "@/contexts/ComparisonContext";
import CurrencyToggle from "@/components/CurrencyToggle";

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { comparisonCars } = useComparison();


  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b gold-accent-line">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-r from-automotive-navy to-automotive-accent gold-glow-subtle">
              <Logo className="h-6 w-6 sm:h-8 sm:w-8 text-white" size={32} />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-automotive-navy hidden xs:block">
              GSC
            </span>
            <span className="text-lg font-bold text-automotive-navy xs:hidden">
            Gold Standard Cars
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/cars" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Browse Cars
            </Link>
            <Link to="/compare" className="text-foreground hover:text-automotive-navy transition-colors font-medium flex items-center gap-1">
              Compare
              {comparisonCars.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {comparisonCars.length}
                </span>
              )}
            </Link>
            <Link to="/finance" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Finance
            </Link>
            <Link to="/reviews" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Reviews
            </Link>
            <Link to="/about" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <div className="hidden sm:block">
              <CurrencyToggle />
            </div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-1 sm:space-x-3">
                <span className="text-xs sm:text-sm text-muted-foreground hidden lg:block">
                  Welcome, {user?.full_name || user?.email}
                </span>
                <Button variant="ghost" size="sm" asChild className="px-2 sm:px-3">
                  <Link to="/account">
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Account</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setAuthDialogOpen(true)} className="px-2 sm:px-3">
                <User className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
            <Button 
              size="sm" 
              className="bg-automotive-navy hover:bg-automotive-dark text-xs sm:text-sm px-2 sm:px-3"
              onClick={() => isAuthenticated ? setImportDialogOpen(true) : setAuthDialogOpen(true)}
            >
              <span className="hidden sm:inline">Request Import</span>
              <span className="sm:hidden">Import</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/cars" 
                className="text-foreground hover:text-automotive-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Cars
              </Link>
              <Link 
                to="/compare" 
                className="text-foreground hover:text-automotive-navy transition-colors font-medium py-2 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
                {comparisonCars.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {comparisonCars.length}
                  </span>
                )}
              </Link>
              <Link 
                to="/finance" 
                className="text-foreground hover:text-automotive-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Finance
              </Link>
              <Link 
                to="/reviews" 
                className="text-foreground hover:text-automotive-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-automotive-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-automotive-navy transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
            
            {/* Mobile Actions */}
            <div className="pt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Currency:</span>
                <CurrencyToggle />
              </div>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/favorites" onClick={() => setMobileMenuOpen(false)}>
                      <Heart className="h-4 w-4 mr-2" />
                      Favorites
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/import-requests" onClick={() => setMobileMenuOpen(false)}>
                      <Truck className="h-4 w-4 mr-2" />
                      Import Requests
                    </Link>
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" className="w-full justify-start" onClick={() => setAuthDialogOpen(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
              <Button 
                className="w-full bg-automotive-navy hover:bg-automotive-dark"
                onClick={() => isAuthenticated ? setImportDialogOpen(true) : setAuthDialogOpen(true)}
              >
                Request Import
              </Button>
            </div>
          </div>
        </div>
      )}

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      <ImportRequestDialog open={importDialogOpen} onOpenChange={setImportDialogOpen} />
    </header>
  );
};

export default Header;