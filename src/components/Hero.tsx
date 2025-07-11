
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const banners = [
    {
      id: 1,
      title: 'Big Billion Days',
      subtitle: 'Biggest Sale of the Year',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e1c6e8?w=800',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 2,
      title: 'Electronics Sale',
      subtitle: 'Up to 80% Off on Mobiles & Laptops',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      id: 3,
      title: 'Fashion Fiesta',
      subtitle: 'Trendy Styles at Unbeatable Prices',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      gradient: 'from-green-600 to-teal-600'
    }
  ];

  return (
    <div className="relative bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Main Banner */}
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1607083206869-4c7672e1c6e8?w=1200"
            alt="Sale Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Big Billion Days
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                India's Biggest Shopping Festival
              </p>
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors transform hover:scale-105">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative h-48 rounded-lg overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90 z-10`}></div>
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white p-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                  <p className="text-sm opacity-90">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
