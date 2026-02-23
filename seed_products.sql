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
     false, true, false, true),

    -- Men's Fashion (additional)
    ('Tailored Wool Blazer', 'tailored-wool-blazer', 3499, 2799, mens_fashion_id, 18, 'MW-BLZ-004',
     'Slim-fit wool blend blazer with notch lapels.',
     'Command attention with this impeccably tailored wool blend blazer. Features notch lapels, a two-button front, functional sleeve buttons, and a fully lined interior. Perfect for business meetings, dinners, and formal events.',
     ARRAY['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80'],
     false, true, true, true),

    ('Classic Polo T-Shirt', 'classic-polo-tshirt', 899, NULL, mens_fashion_id, 70, 'MW-POL-005',
     'Breathable pique cotton polo with contrast collar.',
     'A timeless polo shirt crafted from premium pique cotton. Features a ribbed collar and cuffs, two-button placket, and side vents for comfortable movement. Available in six versatile colors.',
     ARRAY['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80'],
     true, false, false, true),

    ('Stretch Jogger Pants', 'stretch-jogger-pants', 1199, 949, mens_fashion_id, 40, 'MW-JOG-006',
     'Tapered jogger pants with elastic cuffs and drawstring waist.',
     'Upgrade your casual wardrobe with these tapered jogger pants. Made from a soft cotton-polyester blend with four-way stretch, featuring an elastic drawstring waist, zippered pockets, and ribbed ankle cuffs.',
     ARRAY['https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'],
     false, true, false, true),

    -- Women's Fashion (additional)
    ('Embroidered Cotton Kurti', 'embroidered-cotton-kurti', 1299, 1049, womens_fashion_id, 30, 'WW-KRT-004',
     'Hand-embroidered cotton kurti with mirror work details.',
     'This stunning cotton kurti showcases intricate hand embroidery and delicate mirror work. Features a mandarin collar, three-quarter sleeves, and side slits for easy movement. Pair with leggings or palazzo pants for a complete look.',
     ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80', 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&q=80'],
     true, false, true, true),

    -- Baby's Fashion (additional)
    ('Toddler Canvas Sneakers', 'toddler-canvas-sneakers', 699, 549, babys_fashion_id, 45, 'KW-SNK-004',
     'Adorable canvas sneakers with easy velcro straps.',
     'These cute and practical canvas sneakers are designed for little adventurers. Feature easy-to-use velcro straps, cushioned insoles, and non-slip rubber soles. Available in fun colors and patterns that kids love.',
     ARRAY['https://images.unsplash.com/photo-1555009306-30a937a36929?w=800&q=80', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80'],
     false, true, true, true),

    -- Casual Wear (additional)
    ('Graphic Print Hoodie', 'graphic-print-hoodie', 1799, 1399, casual_wear_id, 35, 'CW-HOD-001',
     'Oversized graphic hoodie in heavyweight French terry.',
     'Stay cozy and stylish with this oversized graphic hoodie. Made from premium heavyweight French terry cotton, featuring a bold chest print, kangaroo pocket, drawstring hood, and ribbed trims. Perfect for layering on cool days.',
     ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80'],
     true, false, true, true),

    ('Cotton Cargo Shorts', 'cotton-cargo-shorts', 999, NULL, casual_wear_id, 50, 'CW-SHR-002',
     'Relaxed-fit cargo shorts with multiple utility pockets.',
     'Built for adventure and everyday comfort, these cargo shorts feature a relaxed fit, multiple utility pockets with button flaps, and a durable cotton twill construction. Belt loops and zip-fly closure complete the look.',
     ARRAY['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80', 'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800&q=80'],
     false, true, false, true),

    -- Formal Wear
    ('Pinstripe Three-Piece Suit', 'pinstripe-three-piece-suit', 7999, 6499, formal_wear_id, 10, 'FW-SUT-001',
     'Classic pinstripe three-piece suit in navy wool blend.',
     'Make a statement with this classic pinstripe three-piece suit. Crafted from fine wool blend fabric, includes a single-breasted jacket with peak lapels, matching waistcoat, and flat-front trousers. Fully lined for a polished finish.',
     ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80'],
     false, true, true, true),

    ('French Cuff Dress Shirt', 'french-cuff-dress-shirt', 1899, NULL, formal_wear_id, 30, 'FW-DSH-002',
     'Crisp white dress shirt with French cuffs and spread collar.',
     'Elevate your formal wardrobe with this immaculate white dress shirt. Features a spread collar, French cuffs for cufflinks, a slim fit silhouette, and wrinkle-resistant premium cotton construction. A boardroom essential.',
     ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'],
     true, false, true, true),

    ('Slim Fit Dress Trousers', 'slim-fit-dress-trousers', 1699, 1399, formal_wear_id, 25, 'FW-DTR-003',
     'Tailored slim-fit dress trousers with crease detailing.',
     'These expertly tailored dress trousers offer a modern slim fit with classic crease detailing. Made from a wool-polyester blend for shape retention, featuring a hook-and-bar closure, belt loops, and a clean hemmed finish.',
     ARRAY['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'],
     false, true, false, true),

    ('Silk Necktie and Pocket Square Set', 'silk-necktie-pocket-square-set', 999, 799, formal_wear_id, 40, 'FW-TIE-004',
     'Premium silk necktie with matching pocket square in gift box.',
     'Complete your formal look with this premium silk necktie and matching pocket square. Features a rich satin finish, precise stitching, and comes beautifully presented in a gift box. Available in a range of sophisticated patterns.',
     ARRAY['https://images.unsplash.com/photo-1589756823695-278bc923a84d?w=800&q=80', 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80'],
     true, false, false, true),

    -- Accessories (additional)
    ('Canvas Weekend Tote Bag', 'canvas-weekend-tote-bag', 1299, NULL, accessories_id, 30, 'AC-TOT-004',
     'Spacious canvas tote with leather handles and zip top.',
     'This versatile canvas tote bag is perfect for weekends, work, or travel. Features durable waxed canvas, reinforced leather handles, a secure zip-top closure, interior organizer pockets, and a detachable shoulder strap.',
     ARRAY['https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80'],
     true, false, true, true);

    RAISE NOTICE 'Successfully inserted 24 sample clothing products!';
END $$;
