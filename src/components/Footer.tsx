import { Car, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-automotive-dark text-white gold-accent-line">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-automotive-navy to-automotive-accent gold-glow-subtle">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gold-text-gradient">Gold Standard Cars</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner in finding the perfect vehicle. We connect buyers and sellers with quality cars at fair prices.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-automotive-accent" />
                <span>1-800-AUTO-CARS</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-automotive-accent" />
                <span>support@goldstandardcars.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-automotive-accent" />
                <span>123 Auto Street, Car City, CC 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/cars" className="text-gray-300 hover:text-white transition-colors">Buy a Car</Link></li>
              <li><Link to="/sell" className="text-gray-300 hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link to="/reviews" className="text-gray-300 hover:text-white transition-colors">Car Reviews</Link></li>
              <li><Link to="/finance" className="text-gray-300 hover:text-white transition-colors">Financing</Link></li>
              <li><Link to="/insurance" className="text-gray-300 hover:text-white transition-colors">Insurance</Link></li>
              <li><Link to="/car-history" className="text-gray-300 hover:text-white transition-colors">Car History Reports</Link></li>
              <li><Link to="/account" className="text-gray-300 hover:text-white transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">Car Buying Guide</Link></li>
              <li><Link to="/sell" className="text-gray-300 hover:text-white transition-colors">Selling Tips</Link></li>
              <li><Link to="/car-values" className="text-gray-300 hover:text-white transition-colors">Car Values</Link></li>
              <li><Link to="/maintenance-tips" className="text-gray-300 hover:text-white transition-colors">Maintenance Tips</Link></li>
              <li><Link to="/safety-ratings" className="text-gray-300 hover:text-white transition-colors">Safety Ratings</Link></li>
              <li><Link to="/fuel-economy" className="text-gray-300 hover:text-white transition-colors">Fuel Economy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Get the latest car deals and market insights delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-automotive-navy hover:bg-automotive-accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300">
              © 2024 Gold Standard Cars. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;