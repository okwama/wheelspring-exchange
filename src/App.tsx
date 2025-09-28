import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import Index from "./pages/Index";
import Cars from "./pages/Cars";
import Sell from "./pages/Sell";
import Finance from "./pages/Finance";
import Reviews from "./pages/Reviews";
import CarDetails from "./pages/CarDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Insurance from "./pages/Insurance";
import CarHistory from "./pages/CarHistory";
import CarValues from "./pages/CarValues";
import MaintenanceTips from "./pages/MaintenanceTips";
import SafetyRatings from "./pages/SafetyRatings";
import FuelEconomy from "./pages/FuelEconomy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AccountPage from "./pages/AccountPage";
import FavoritesPage from "./pages/FavoritesPage";
import ImportRequestsPage from "./pages/ImportRequestsPage";
import ImportRequestDetailPage from "./pages/ImportRequestDetailPage";
import ContactHistoryPage from "./pages/ContactHistoryPage";
import FinancingPage from "./pages/FinancingPage";
import ComparisonPage from "./pages/ComparisonPage";
import CarUpload from "./pages/admin/CarUpload";
import CarImageManager from "./pages/admin/CarImageManager";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CurrencyProvider>
        <ComparisonProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <CookieConsent />
          {/* Analytics loader guarded by consent cookie */}
          <script dangerouslySetInnerHTML={{ __html: `
            (function(){
              try{
                var match = document.cookie.split('; ').find(r=>r.startsWith('gsc_consent='));
                if(!match) return;
                var consent = JSON.parse(decodeURIComponent(match.split('=')[1]));
                if(consent.analytics){
                  // Google Analytics (replace G-XXXXXXX)
                  var s = document.createElement('script');
                  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (window.GA_ID || 'G-XXXXXXX');
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments)}
                  gtag('js', new Date());
                  gtag('config', window.GA_ID || 'G-XXXXXXX');
                }
                if(consent.marketing){
                  // Meta Pixel (replace PIXEL_ID)
                  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
                  window.fbq('init', window.FB_PIXEL_ID || 'PIXEL_ID');
                  window.fbq('track', 'PageView');
                }
              }catch(e){}
            })();
          `}} />
          <ErrorBoundary>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/car-history" element={<CarHistory />} />
            <Route path="/car-values" element={<CarValues />} />
            <Route path="/maintenance-tips" element={<MaintenanceTips />} />
            <Route path="/safety-ratings" element={<SafetyRatings />} />
            <Route path="/fuel-economy" element={<FuelEconomy />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/import-requests" element={<ImportRequestsPage />} />
            <Route path="/import-requests/:id" element={<ImportRequestDetailPage />} />
            <Route path="/contact-history" element={<ContactHistoryPage />} />
            <Route path="/financing" element={<FinancingPage />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/admin/car-upload" element={<CarUpload />} />
          <Route path="/admin/image-manager" element={<CarImageManager />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </TooltipProvider>
        </ComparisonProvider>
      </CurrencyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
