
import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  // Get featured products (top rated from each category)
  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our most popular items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
