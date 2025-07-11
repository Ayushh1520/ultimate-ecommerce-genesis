
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold">
                <span className="text-white">Flip</span>
                <span className="text-yellow-400">kart</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              India's leading e-commerce platform offering millions of products at the best prices.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/flipkart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/flipkart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/flipkart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 cursor-pointer transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/flipkart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://www.flipkart.com/pages/about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="https://www.flipkart.com/careers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="https://stories.flipkart.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              <li><a href="https://investor.flipkart.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Investor Relations</a></li>
              <li><a href="https://www.flipkart.com/gift-card-store" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="https://www.flipkart.com/helpcentre" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="https://www.flipkart.com/pages/returnpolicy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              <li><a href="https://www.flipkart.com/pages/shippingpolicy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="https://www.flipkart.com/account/orders" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="https://www.flipkart.com/helpcentre?catalog=55c9c6edb0062d0b30002b69&view=CONTACT" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">1800-208-9898</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">support@flipkart.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Flipkart Clone. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.flipkart.com/pages/privacypolicy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="https://www.flipkart.com/pages/terms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="https://www.flipkart.com/pages/cookies" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
