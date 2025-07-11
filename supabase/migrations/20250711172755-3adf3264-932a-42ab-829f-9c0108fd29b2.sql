
-- Insert some sample categories
INSERT INTO public.categories (name, description, image_url) VALUES
('Electronics', 'Laptops, Smartphones, Cameras and more', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
('Fashion', 'Clothing, Shoes, Accessories for Men and Women', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'),
('Home & Furniture', 'Home Decor, Furniture, Kitchen & Dining', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'),
('Books', 'Fiction, Non-fiction, Academic Books', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'),
('Sports', 'Sports Equipment, Fitness, Outdoor gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'),
('Beauty', 'Makeup, Skincare, Fragrances', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400');

-- Insert some sample products
INSERT INTO public.products (name, description, price, original_price, discount_percentage, brand, category_id, image_url, rating, review_count, stock_quantity) VALUES
('iPhone 15 Pro Max', 'Latest iPhone with A17 Pro chip, 256GB storage, Titanium build', 134900, 149900, 10, 'Apple', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400', 4.5, 2847, 50),
('Samsung Galaxy S24 Ultra', 'Flagship Android phone with S Pen, 512GB storage', 124900, 139900, 11, 'Samsung', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', 4.4, 1923, 30),
('MacBook Air M3', '13-inch laptop with M3 chip, 16GB RAM, 512GB SSD', 134900, 149900, 10, 'Apple', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 4.6, 1456, 25),
('Nike Air Max 270', 'Comfortable running shoes with air cushioning', 12995, 14995, 13, 'Nike', (SELECT id FROM categories WHERE name = 'Fashion' LIMIT 1), 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 4.3, 8934, 100),
('Adidas Ultraboost 22', 'Premium running shoes with boost technology', 17995, 19995, 10, 'Adidas', (SELECT id FROM categories WHERE name = 'Fashion' LIMIT 1), 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400', 4.4, 5621, 75),
('Wooden Dining Table', '6-seater solid wood dining table', 24999, 29999, 17, 'HomeDecor', (SELECT id FROM categories WHERE name = 'Home & Furniture' LIMIT 1), 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 4.2, 234, 15),
('The Alchemist', 'Bestselling novel by Paulo Coelho', 299, 399, 25, 'HarperCollins', (SELECT id FROM categories WHERE name = 'Books' LIMIT 1), 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 4.7, 12456, 200),
('Yoga Mat Premium', 'Non-slip yoga mat with carrying strap', 1499, 1999, 25, 'FitnessPro', (SELECT id FROM categories WHERE name = 'Sports' LIMIT 1), 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 4.1, 892, 150),
('Lakme Lipstick Set', 'Set of 5 matte lipsticks in different shades', 899, 1299, 31, 'Lakme', (SELECT id FROM categories WHERE name = 'Beauty' LIMIT 1), 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', 4.0, 1567, 80);

-- Create trigger to update products updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
