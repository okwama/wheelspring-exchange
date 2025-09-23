import { Car, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-automotive-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-automotive-navy to-automotive-accent">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AutoMarket</span>
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
                <span>support@automarket.com</span>
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
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Buy a Car</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sell Your Car</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Car Reviews</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Financing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Car History Reports</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Car Buying Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Selling Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Car Values</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Maintenance Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Safety Ratings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fuel Economy</a></li>
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
              © 2024 AutoMarket. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;