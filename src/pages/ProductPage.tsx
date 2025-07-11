
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Zap, Shield, Truck } from 'lucide-react';
import { getProductById } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = productId ? getProductById(productId) : null;

  if (!product) {
    return <div>Product not found</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <span>Home</span> / <span>Electronics</span> / <span className="text-blue-600 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart size={16} />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div>
              {/* Brand and Name */}
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.brand}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded text-sm font-bold">
                  <span>{product.rating}</span>
                  <Star size={14} className="ml-1 fill-current" />
                </div>
                <span className="text-sm text-gray-600 ml-3">
                  {product.reviews.toLocaleString()} ratings & reviews
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-green-600 font-bold">
                    {product.discount}% off
                  </span>
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
                  <Zap size={20} />
                  <span>Buy Now</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-orange-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Services */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <Truck className="text-green-600" size={16} />
                  <span>Free delivery on orders above ₹499</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <Shield className="text-blue-600" size={16} />
                  <span>1 year warranty</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span>7 days return policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
