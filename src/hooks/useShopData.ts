import {
    categories as mockCategories,
    products as mockProducts,
    reviews as mockReviews,
    sliderSlides as mockSliderSlides,
} from '@/data/products';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  category_id: string | null;
  category?: Category;
  stock: number;
  sku: string;
  short_description: string | null;
  description: string | null;
  images: string[];
  is_new: boolean;
  is_best_seller: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  has_variants?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
  product_count?: number;
}

export interface SliderSlide {
  id: string;
  image: string;
  heading: string;
  text: string;
  cta_text: string;
  cta_link: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  is_approved: boolean;
  created_at: string;
}

// ─── Mock Data Adapters ─────────────────────────────────────────────
// Convert camelCase mock data to snake_case Supabase format

const now = new Date().toISOString();

function adaptMockCategories(): Category[] {
  return mockCategories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image,
    product_count: c.productCount,
    created_at: now,
    updated_at: now,
  }));
}

function adaptMockProducts(): (Product & { category: Category | null })[] {
  const cats = adaptMockCategories();
  return mockProducts.map((p) => {
    const cat = cats.find((c) => c.slug === p.categorySlug) || null;
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      sale_price: p.salePrice ?? null,
      category_id: cat?.id ?? null,
      category: cat,
      stock: p.stock,
      sku: p.sku,
      short_description: p.shortDescription,
      description: p.description,
      images: p.images,
      is_new: p.isNew ?? false,
      is_best_seller: p.isBestSeller ?? false,
      is_featured: p.isFeatured ?? false,
      created_at: now,
      updated_at: now,
    };
  });
}

function adaptMockSlides(): SliderSlide[] {
  return mockSliderSlides.map((s, i) => ({
    id: s.id,
    image: s.image,
    heading: s.heading,
    text: s.text,
    cta_text: s.ctaText,
    cta_link: s.ctaLink,
    sort_order: i,
    is_active: true,
    created_at: now,
    updated_at: now,
  }));
}

function adaptMockReviews(): Review[] {
  return mockReviews.map((r) => ({
    id: r.id,
    name: r.name,
    rating: r.rating,
    text: r.text,
    is_approved: true,
    created_at: r.date || now,
  }));
}

// ─── Query Hooks (with mock fallback) ───────────────────────────────

// Products - for Shop page (all products)
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, category:categories(*)')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(20);
        
        if (error) throw error;
        if (data && data.length > 0) return data as (Product & { category: Category | null })[];
      } catch (e) {
        console.warn('Supabase products fetch failed, using mock data:', e);
      }
      return adaptMockProducts();
    },
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, category:categories(*)')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) throw error;
        if (data) return data as (Product & { category: Category | null }) | null;
      } catch (e) {
        console.warn('Supabase product fetch failed, using mock data:', e);
      }
      const mock = adaptMockProducts().find((p) => p.slug === slug);
      return mock || null;
    },
    enabled: !!slug,
  });
};

// Featured products for home page (limit 12)
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, category:categories(*)')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(12);
        
        if (error) throw error;
        if (data && data.length > 0) return data as (Product & { category: Category | null })[];
      } catch (e) {
        console.warn('Supabase featured products fetch failed, using mock data:', e);
      }
      return adaptMockProducts().slice(0, 12);
    },
  });
};

export const useBestSellers = () => {
  return useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, category:categories(*), product_variants(count)')
          .eq('is_best_seller', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          return data.map((p: any) => ({
            ...p,
            product_variants: undefined,
            has_variants: (p.product_variants?.[0]?.count || 0) > 0,
          })) as (Product & { category: Category | null })[];
        }
      } catch (e) {
        console.warn('Supabase bestsellers fetch failed, using mock data:', e);
      }
      return adaptMockProducts().filter((p) => p.is_best_seller);
    },
  });
};

export const useNewArrivals = () => {
  return useQuery({
    queryKey: ['products', 'new'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, category:categories(*), product_variants(count)')
          .eq('is_new', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          return data.map((p: any) => ({
            ...p,
            product_variants: undefined,
            has_variants: (p.product_variants?.[0]?.count || 0) > 0,
          })) as (Product & { category: Category | null })[];
        }
      } catch (e) {
        console.warn('Supabase new arrivals fetch failed, using mock data:', e);
      }
      return adaptMockProducts().filter((p) => p.is_new);
    },
  });
};

export const useProductsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['products', 'category', categorySlug],
    queryFn: async () => {
      try {
        const { data: category, error: catError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .maybeSingle();
        
        if (catError) throw catError;
        if (category) {
          const { data, error } = await supabase
            .from('products')
            .select('*, category:categories(*), product_variants(count)')
            .eq('category_id', category.id)
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          if (data && data.length > 0) {
            return data.map((p: any) => ({
              ...p,
              product_variants: undefined,
              has_variants: (p.product_variants?.[0]?.count || 0) > 0,
            })) as (Product & { category: Category | null })[];
          }
        }
      } catch (e) {
        console.warn('Supabase products by category fetch failed, using mock data:', e);
      }
      return adaptMockProducts().filter((p) => p.category?.slug === categorySlug);
    },
    enabled: !!categorySlug,
  });
};

export const useRelatedProducts = (product: Product | null, limit = 4) => {
  return useQuery({
    queryKey: ['products', 'related', product?.id],
    queryFn: async () => {
      try {
        if (!product?.category_id) throw new Error('No category');
        
        const { data, error } = await supabase
          .from('products')
          .select('*, category:categories(*), product_variants(count)')
          .eq('category_id', product.category_id)
          .neq('id', product.id)
          .limit(limit);
        
        if (error) throw error;
        if (data && data.length > 0) {
          return data.map((p: any) => ({
            ...p,
            product_variants: undefined,
            has_variants: (p.product_variants?.[0]?.count || 0) > 0,
          })) as (Product & { category: Category | null })[];
        }
      } catch (e) {
        console.warn('Supabase related products fetch failed, using mock data:', e);
      }
      return adaptMockProducts()
        .filter((p) => p.category_id === product?.category_id && p.id !== product?.id)
        .slice(0, limit);
    },
    enabled: !!product,
  });
};

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (error) throw error;
        if (data && data.length > 0) return data as Category[];
      } catch (e) {
        console.warn('Supabase categories fetch failed, using mock data:', e);
      }
      return adaptMockCategories();
    },
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) throw error;
        if (data) return data as Category | null;
      } catch (e) {
        console.warn('Supabase category fetch failed, using mock data:', e);
      }
      return adaptMockCategories().find((c) => c.slug === slug) || null;
    },
    enabled: !!slug,
  });
};

// Slider
export const useSliderSlides = (activeOnly = true) => {
  return useQuery({
    queryKey: ['slider_slides', activeOnly],
    queryFn: async () => {
      try {
        let query = supabase.from('slider_slides').select('*').order('sort_order');
        if (activeOnly) {
          query = query.eq('is_active', true);
        }
        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data as SliderSlide[];
      } catch (e) {
        console.warn('Supabase slider fetch failed, using mock data:', e);
      }
      return adaptMockSlides();
    },
  });
};

// Reviews
export const useReviews = (approvedOnly = true) => {
  return useQuery({
    queryKey: ['reviews', approvedOnly],
    queryFn: async () => {
      try {
        let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
        if (approvedOnly) {
          query = query.eq('is_approved', true);
        }
        const { data, error } = await query;
        if (error) throw error;
        if (data && data.length > 0) return data as Review[];
      } catch (e) {
        console.warn('Supabase reviews fetch failed, using mock data:', e);
      }
      return adaptMockReviews();
    },
  });
};

// Mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created');
    },
    onError: (error) => {
      toast.error('Failed to create product: ' + error.message);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...product }: Partial<Product> & { id: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated');
    },
    onError: (error) => {
      toast.error('Failed to update product: ' + error.message);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete product: ' + error.message);
    },
  });
};

// Category mutations
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'product_count'>) => {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created');
    },
    onError: (error) => {
      toast.error('Failed to create category: ' + error.message);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...category }: Partial<Category> & { id: string }) => {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated');
    },
    onError: (error) => {
      toast.error('Failed to update category: ' + error.message);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete category: ' + error.message);
    },
  });
};

// Slider mutations
export const useCreateSlide = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (slide: Omit<SliderSlide, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('slider_slides')
        .insert(slide)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slider_slides'] });
      toast.success('Slide created');
    },
    onError: (error) => {
      toast.error('Failed to create slide: ' + error.message);
    },
  });
};

export const useUpdateSlide = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...slide }: Partial<SliderSlide> & { id: string }) => {
      const { data, error } = await supabase
        .from('slider_slides')
        .update(slide)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slider_slides'] });
      toast.success('Slide updated');
    },
    onError: (error) => {
      toast.error('Failed to update slide: ' + error.message);
    },
  });
};

export const useDeleteSlide = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('slider_slides').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['slider_slides'] });
      toast.success('Slide deleted');
    },
    onError: (error) => {
      toast.error('Failed to delete slide: ' + error.message);
    },
  });
};
