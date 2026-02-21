-- =============================================
-- SAMPLE PRODUCTS - Run this after the main migration
-- =============================================

-- Get category IDs for reference
DO $$
DECLARE
    womens_fashion_id UUID;
    mens_fashion_id UUID;
    babys_fashion_id UUID;
    casual_wear_id UUID;
    formal_wear_id UUID;
    accessories_id UUID;
BEGIN
    SELECT id INTO womens_fashion_id FROM public.categories WHERE slug = 'womens-fashion' LIMIT 1;
    SELECT id INTO mens_fashion_id FROM public.categories WHERE slug = 'mens-fashion' LIMIT 1;
    SELECT id INTO babys_fashion_id FROM public.categories WHERE slug = 'babys-fashion' LIMIT 1;
    SELECT id INTO casual_wear_id FROM public.categories WHERE slug = 'casual-wear' LIMIT 1;
    SELECT id INTO formal_wear_id FROM public.categories WHERE slug = 'formal-wear' LIMIT 1;
    SELECT id INTO accessories_id FROM public.categories WHERE slug = 'accessories' LIMIT 1;

    -- Insert sample products
    INSERT INTO public.products (name, slug, price, sale_price, category_id, stock, sku, short_description, description, images, is_new, is_best_seller, is_featured, is_active) VALUES
    -- Men's Fashion
    ('Classic Fit Oxford Shirt', 'classic-fit-oxford-shirt', 1299, 999, mens_fashion_id, 45, 'MW-OXF-001', 
     'Premium cotton Oxford shirt with a timeless button-down collar.',
     'Elevate your wardrobe with this classic Oxford shirt. Crafted from 100% premium cotton, featuring a button-down collar, single chest pocket, and adjustable cuffs. Perfect for both office and casual wear.',
     ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80'],
     true, false, true, true),
    
    ('Slim Fit Chino Trousers', 'slim-fit-chino-trousers', 1499, NULL, casual_wear_id, 30, 'MW-CHI-002',
     'Comfortable slim-fit chinos in a versatile neutral tone.',
     'These slim-fit chinos are a wardrobe essential. Made from stretch cotton twill for maximum comfort, featuring a flat front, belt loops, and clean-finished hems. Pair with a shirt or tee for any occasion.',
     ARRAY['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'],
     false, true, true, true),
    
    ('Premium Denim Jacket', 'premium-denim-jacket', 2499, 1999, casual_wear_id, 20, 'MW-DNM-003',
     'Classic denim jacket with a modern washed finish.',
     'A wardrobe staple that never goes out of style. This premium denim jacket features a button-front closure, chest pockets, and a comfortable regular fit. The washed finish gives it a vintage character.',
     ARRAY['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&q=80'],
     true, false, false, true),

    -- Women's Fashion
    ('Floral Print Maxi Dress', 'floral-print-maxi-dress', 1899, 1499, womens_fashion_id, 25, 'WW-MXD-001',
     'Elegant floral maxi dress perfect for summer occasions.',
     'Turn heads with this stunning floral print maxi dress. Features a flattering V-neckline, flowing skirt, and adjustable waist tie. Made from lightweight, breathable fabric — ideal for summer events, brunches, and vacation.',
     ARRAY['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80'],
     false, true, true, true),
    
    ('Silk Blend Blouse', 'silk-blend-blouse', 1599, NULL, womens_fashion_id, 35, 'WW-BLS-002',
     'Luxurious silk blend blouse with delicate pleating.',
     'Effortlessly chic, this silk blend blouse features delicate front pleating, a relaxed fit, and mother-of-pearl buttons. The smooth, lustrous fabric drapes beautifully. Pair with tailored trousers for the office or jeans for a casual look.',
     ARRAY['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80', 'https://images.unsplash.com/photo-1551163943-3f7fb896e3f2?w=800&q=80'],
     true, false, true, true),

    ('High-Waist Palazzo Pants', 'high-waist-palazzo-pants', 1399, NULL, womens_fashion_id, 40, 'WW-PLZ-003',
     'Flowy high-waist palazzo pants for effortless elegance.',
     'These flowing palazzo pants offer the perfect blend of style and comfort. Featuring a high waist with a wide self-tie belt, wide legs, and a luxurious drape. Available in multiple colors to suit every taste.',
     ARRAY['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'],
     false, true, false, true),

    -- Baby's Fashion
    ('Boys Graphic Print T-Shirt', 'boys-graphic-print-tshirt', 599, 449, babys_fashion_id, 60, 'KW-TSH-001',
     'Fun graphic print t-shirt in soft, breathable cotton.',
     'Let kids express their style with this fun graphic print t-shirt. Made from 100% soft cotton, it is comfortable for all-day wear. Features vibrant, long-lasting prints and reinforced stitching for durability.',
     ARRAY['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80', 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=80'],
     true, false, true, true),
    
    ('Girls Party Frock', 'girls-party-frock', 899, NULL, babys_fashion_id, 35, 'KW-FRK-002',
     'Adorable party frock with tulle layers and satin details.',
     'Make every occasion special with this beautiful party frock. Features a satin bodice with floral appliqué, a tulle-layered skirt, and a comfortable cotton lining. Perfect for birthdays, weddings, and family gatherings.',
     ARRAY['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80'],
     false, true, false, true),

    ('Kids Denim Dungarees', 'kids-denim-dungarees', 1099, 849, babys_fashion_id, 25, 'KW-DNG-003',
     'Adorable denim dungarees with adjustable straps.',
     'These classic denim dungarees are perfect for playful adventures. Featuring adjustable shoulder straps, multiple pockets, and a comfortable relaxed fit. Made from durable denim that gets softer with every wash.',
     ARRAY['https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80', 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80'],
     true, false, true, true),

    -- Accessories
    ('Leather Crossbody Bag', 'leather-crossbody-bag', 1999, NULL, accessories_id, 20, 'AC-BAG-001',
     'Genuine leather crossbody bag with adjustable strap.',
     'This elegant crossbody bag is crafted from genuine leather with a smooth finish. Features an adjustable strap, magnetic snap closure, interior zip pocket, and card slots. Compact yet spacious enough for your daily essentials.',
     ARRAY['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'],
     false, true, true, true),
    
    ('Classic Aviator Sunglasses', 'classic-aviator-sunglasses', 799, 599, accessories_id, 50, 'AC-SUN-002',
     'Retro aviator sunglasses with UV400 protection.',
     'These timeless aviator sunglasses combine classic style with modern UV400 protection. Features a lightweight metal frame, polarized lenses, and adjustable nose pads for a comfortable fit. Comes with a protective case and cleaning cloth.',
     ARRAY['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],
     true, false, true, true),

    ('Woven Leather Belt', 'woven-leather-belt', 699, NULL, accessories_id, 55, 'AC-BLT-003',
     'Hand-woven leather belt with brushed metal buckle.',
     'Add a sophisticated touch to any outfit with this hand-woven leather belt. Crafted from genuine leather strips, featuring a brushed antique metal buckle. The woven design allows for flexible sizing. Perfect for both formal and casual wear.',
     ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80'],
     false, true, false, true);

    RAISE NOTICE 'Successfully inserted 12 sample clothing products!';
END $$;
