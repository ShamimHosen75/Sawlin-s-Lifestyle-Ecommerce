import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string | null;
  color: string | null;
  sku: string;
  price_adjustment: number;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const MOCK_VARIANTS: ProductVariant[] = [
  { id: 'v1', product_id: 'mock', size: '36', color: null, sku: 'SKU-36', price_adjustment: 0, stock: 0, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'v2', product_id: 'mock', size: '38', color: null, sku: 'SKU-38', price_adjustment: 0, stock: 5, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'v3', product_id: 'mock', size: '40', color: null, sku: 'SKU-40', price_adjustment: 0, stock: 12, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'v4', product_id: 'mock', size: '42', color: null, sku: 'SKU-42', price_adjustment: 0, stock: 0, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'v5', product_id: 'mock', size: '44', color: null, sku: 'SKU-44', price_adjustment: 0, stock: 1, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'v6', product_id: 'mock', size: '46', color: null, sku: 'SKU-46', price_adjustment: 0, stock: 5, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 'v7', product_id: 'mock', size: '48', color: null, sku: 'SKU-48', price_adjustment: 0, stock: 0, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

async function fetchVariants(productId: string): Promise<ProductVariant[]> {
  try {
    const { data, error } = await (supabase as any)
      .from('product_variants')
      .select('*')
      .eq('product_id', productId)
      .order('created_at');
    
    if (error) throw error;
    if (data && data.length > 0) return data;
  } catch (e) {
    console.warn('Supabase fetchVariants failed, using mock data:', e);
  }
  
  // Return mock variants dynamically mapped to this product
  return MOCK_VARIANTS.map(v => ({ ...v, product_id: productId }));
}

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: ['product_variants', productId],
    queryFn: () => fetchVariants(productId),
    enabled: !!productId,
  });
};

export const useCreateVariant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (variant: Omit<ProductVariant, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await (supabase as any)
        .from('product_variants')
        .insert(variant)
        .select()
        .single();
      
      if (error) throw error;
      return data as ProductVariant;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product_variants', variables.product_id] });
      toast.success('Variant created');
    },
    onError: (error: Error) => {
      toast.error('Failed to create variant: ' + error.message);
    },
  });
};

export const useUpdateVariant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...variant }: Partial<ProductVariant> & { id: string }) => {
      const { data, error } = await (supabase as any)
        .from('product_variants')
        .update(variant)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ProductVariant;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['product_variants', data.product_id] });
      toast.success('Variant updated');
    },
    onError: (error: Error) => {
      toast.error('Failed to update variant: ' + error.message);
    },
  });
};

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, productId }: { id: string; productId: string }) => {
      const { error } = await (supabase as any).from('product_variants').delete().eq('id', id);
      if (error) throw error;
      return productId;
    },
    onSuccess: (productId) => {
      queryClient.invalidateQueries({ queryKey: ['product_variants', productId] });
      toast.success('Variant deleted');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete variant: ' + error.message);
    },
  });
};
