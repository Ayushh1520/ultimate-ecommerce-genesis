
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Product = Tables<'products'>;
type Category = Tables<'categories'>;

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      if (!categoryId) return;
      
      setLoading(true);
      
      try {
        // Fetch category
        const { data: categoryData } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .single();
        
        setCategory(categoryData);
        
        // Fetch products for this category
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', categoryId)
          .eq('is_active', true);
        
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Price filter
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      
      // Brand filter
      const brandMatch = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
      
      // Rating filter
      const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(rating => (product.rating || 0) >= rating);
      
      // Search filter
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return priceMatch && brandMatch && ratingMatch && searchMatch;
    });

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'discount':
          return (b.discount_percentage || 0) - (a.discount_percentage || 0);
        default:
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    return sorted;
  }, [products, priceRange, selectedBrands, selectedRatings, searchQuery, sortBy]);

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

  // Extract unique brands from products
  const availableBrands = [...new Set(products.map(product => product.brand).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Category not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <span>Home</span> / <span className="text-blue-600 font-medium">{category.name}</span>
          {searchQuery && <span> / Search: "{searchQuery}"</span>}
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {category.name}
            {searchQuery && <span className="text-lg text-gray-600 ml-2">- Search: "{searchQuery}"</span>}
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
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
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

export default CategoryPage;
