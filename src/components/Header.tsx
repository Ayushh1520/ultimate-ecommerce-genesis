
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or filter products
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-white">Flip</span>
              <span className="text-yellow-400">kart</span>
            </div>
            <div className="hidden sm:block text-xs italic text-blue-100">
              Explore <span className="text-yellow-300">Plus</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={handleSearchInput}
                className="w-full px-4 py-2.5 pr-12 text-gray-800 bg-white rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button 
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-yellow-400 text-blue-700 hover:bg-yellow-500 transition-colors rounded-r-sm"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* Login Button */}
            <button 
              onClick={() => alert('Please connect to Supabase for authentication functionality')}
              className="hidden sm:flex items-center space-x-1 px-6 py-2 text-blue-600 bg-white hover:bg-gray-50 rounded-sm font-medium transition-colors"
            >
              <User size={18} />
              <span>Login</span>
            </button>

            {/* Cart */}
            <Link to="/cart" className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
              <ShoppingCart size={20} />
              <span className="hidden sm:block">Cart</span>
              <span className="bg-red-500 text-xs px-1.5 py-0.5 rounded-full">0</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="w-full px-4 py-2.5 pr-12 text-gray-800 bg-white rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-yellow-400 text-blue-700 hover:bg-yellow-500 transition-colors rounded-r-sm"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t border-blue-500`}>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 py-3">
            <Link to="/category/electronics" className="hover:text-yellow-400 transition-colors font-medium">
              Electronics
            </Link>
            <Link to="/category/appliances" className="hover:text-yellow-400 transition-colors font-medium">
              TVs & Appliances
            </Link>
            <Link to="/category/fashion" className="hover:text-yellow-400 transition-colors font-medium">
              Fashion
            </Link>
            <Link to="/category/home" className="hover:text-yellow-400 transition-colors font-medium">
              Home & Furniture
            </Link>
            <Link to="/category/books" className="hover:text-yellow-400 transition-colors font-medium">
              Books
            </Link>
            <Link to="/category/sports" className="hover:text-yellow-400 transition-colors font-medium">
              Sports
            </Link>
            <Link to="/category/beauty" className="hover:text-yellow-400 transition-colors font-medium">
              Beauty
            </Link>
            <Link to="/category/automotive" className="hover:text-yellow-400 transition-colors font-medium">
              Automotive
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
