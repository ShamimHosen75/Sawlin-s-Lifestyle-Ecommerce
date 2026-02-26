-- Add specifications array column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specifications TEXT[] DEFAULT '{}';
