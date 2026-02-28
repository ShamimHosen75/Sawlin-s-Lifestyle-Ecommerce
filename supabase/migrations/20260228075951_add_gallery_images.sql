-- Add gallery_images to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images TEXT[] NOT NULL DEFAULT '{}';
