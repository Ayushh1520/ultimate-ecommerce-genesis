
import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-sm text-xs font-bold">
            {product.discount}% OFF
          </div>
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
            <Heart size={16} className="text-gray-600 hover:text-red-500" />
          </button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded-sm text-xs font-bold">
              <span>{product.rating}</span>
              <Star size={12} className="ml-1 fill-current" />
            </div>
            <span className="text-xs text-gray-500 ml-2">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          {/* Features */}
          <div className="text-xs text-gray-600">
            <ul className="list-disc list-inside space-y-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="truncate">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
