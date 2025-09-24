import { Button } from "@/components/ui/button";
import { Car, User, Heart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AuthDialog from "@/components/auth/AuthDialog";
import ImportRequestDialog from "@/components/ImportRequestDialog";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    }
  };

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
              Browse Cars
            </a>
            <a href="/finance" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Finance
            </a>
            <a href="/reviews" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Reviews
            </a>
            <a href="/about" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              About
            </a>
            <a href="/contact" className="text-foreground hover:text-automotive-navy transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {user && (
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Heart className="h-4 w-4 mr-2" />
                Saved
              </Button>
            )}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome, {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setAuthDialogOpen(true)}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
            <Button 
              size="sm" 
              className="bg-automotive-navy hover:bg-automotive-dark"
              onClick={() => user ? setImportDialogOpen(true) : setAuthDialogOpen(true)}
            >
              Request Import
            </Button>
          </div>
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      <ImportRequestDialog open={importDialogOpen} onOpenChange={setImportDialogOpen} />
    </header>
  );
};

export default Header;