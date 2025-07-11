
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const CategoryGrid = () => {
  const categoryImages = {
    electronics: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    fashion: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    home: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    books: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400',
    automotive: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-full w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={categoryImages[category.id as keyof typeof categoryImages]}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="font-semibold text-sm md:text-base text-gray-700 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
