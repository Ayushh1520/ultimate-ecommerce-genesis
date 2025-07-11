
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Filter and sort products based on search query
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Price filter
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      
      // Brand filter
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      
      // Rating filter
      const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(rating => product.rating >= rating);
      
      return searchMatch && priceMatch && brandMatch && ratingMatch;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return b.rating - a.rating;
      }
    });

    return sorted;
  }, [searchQuery, priceRange, selectedBrands, selectedRatings, sortBy]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating]);
    } else {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    }
  };

  // Extract unique brands from search results
  const availableBrands = [...new Set(
    products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(product => product.brand)
  )];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <span>Home</span> / <span className="text-blue-600 font-medium">Search Results</span>
          {searchQuery && <span> / "{searchQuery}"</span>}
        </nav>

        {/* Search Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Search Results {searchQuery && <span className="text-lg text-gray-600">for "{searchQuery}"</span>}
          </h1>
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} products
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 bg-white rounded-lg p-4 shadow-sm h-fit`}>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Filter className="mr-2" size={20} />
              Filters
            </h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Price Range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{priceRange.max.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Brand</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableBrands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="mr-2"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Rating Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Customer Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={selectedRatings.includes(rating)}
                      onChange={(e) => handleRatingChange(rating, e.target.checked)}
                    />
                    <span className="text-sm">{rating}★ & above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setPriceRange({ min: 0, max: 200000 });
                setSelectedBrands([]);
                setSelectedRatings([]);
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Clear All Filters
            </button>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} />
                  <span>Filters</span>
                </button>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="discount">Discount</option>
                    </select>
                  </div>

                  <div className="flex border border-gray-300 rounded">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery ? `No products found for "${searchQuery}"` : 'No products found matching your criteria.'}
                </p>
                <button
                  onClick={() => {
                    setPriceRange({ min: 0, max: 200000 });
                    setSelectedBrands([]);
                    setSelectedRatings([]);
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
