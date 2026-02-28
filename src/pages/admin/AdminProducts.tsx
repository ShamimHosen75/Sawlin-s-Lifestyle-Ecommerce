import { MultiImageUpload } from '@/components/admin/ImageUpload';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Product, useCategories, useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from '@/hooks/useShopData';
import { supabase } from '@/integrations/supabase/client';
import { Edit, GripVertical, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export default function AdminProducts() {
  const { data: products = [], isLoading, error } = useProducts();
  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    sale_price: '',
    category_id: '',
    stock: '0',
    sku: '',
    description: '',
    images: [] as string[],
    gallery_images: [] as string[],
    specifications: [] as string[],
    is_new: false,
    is_best_seller: false,
    is_featured: false,
    is_active: true,
    variants: [] as { id?: string; size: string; stock: string; price_adjustment: string }[],
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      sale_price: product.sale_price?.toString() || '',
      category_id: product.category_id || '',
      stock: product.stock.toString(),
      sku: product.sku,
      description: product.description || '',
      images: product.images || [],
      gallery_images: product.gallery_images || [],
      specifications: product.specifications || [],
      is_new: product.is_new || false,
      is_best_seller: product.is_best_seller || false,
      is_featured: product.is_featured || false,
      is_active: (product as any).is_active ?? true,
      variants: [], // Will load just after
    });
    setIsDialogOpen(true);
    
    // Fetch variants inline
    try {
      const { data } = await supabase.from('product_variants').select('*').eq('product_id', product.id);
      if (data) {
        setFormData(prev => ({
          ...prev,
          variants: data.map(v => ({
            id: v.id,
            size: v.size || '',
            stock: v.stock.toString(),
            price_adjustment: (v.price_adjustment || 0).toString()
          }))
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProduct.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    const productData = {
      name: formData.name,
      slug: formData.slug,
      price: parseFloat(formData.price),
      sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
      category_id: formData.category_id || null,
      stock: parseInt(formData.stock),
      short_description: formData.short_description || null,
      description: formData.description || null,
      images: formData.images,
      gallery_images: formData.gallery_images,
      specifications: formData.specifications.filter(s => s.trim() !== ''),
      is_new: formData.is_new,
      is_best_seller: formData.is_best_seller,
      is_featured: formData.is_featured,
    };

    try {
      let createdOrUpdatedProduct: Product | undefined;
      
      if (editingProduct) {
        createdOrUpdatedProduct = await updateProduct.mutateAsync({ id: editingProduct.id, ...productData });
      } else {
        createdOrUpdatedProduct = await createProduct.mutateAsync(productData as any);
      }
      
      const targetProductId = editingProduct?.id || createdOrUpdatedProduct?.id;
      
      // Upsert inline variations if we have a target product ID
      if (targetProductId) {
        // Delete existing variations to recreate them cleanly (simple method)
        await supabase.from('product_variants').delete().eq('product_id', targetProductId);
        
        const validVariantsToInsert = formData.variants
          .filter(v => v.size.trim() !== '' && v.stock.trim() !== '')
          .map(v => ({
            product_id: targetProductId,
            size: v.size,
            sku: formData.sku + '-' + v.size.toUpperCase().replace(/\s+/g, '-'), // Auto append SKU
            stock: parseInt(v.stock) || 0,
            price_adjustment: parseFloat(v.price_adjustment) || 0,
            is_active: true
          }));
          
        if (validVariantsToInsert.length > 0) {
          await supabase.from('product_variants').insert(validVariantsToInsert);
        }
      }
      
      setIsDialogOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      price: '',
      sale_price: '',
      category_id: '',
      stock: '0',
      sku: '',
      description: '',
      images: [],
      gallery_images: [],
      specifications: [],
      is_new: false,
      is_best_seller: false,
      is_featured: false,
      is_active: true,
      variants: [],
    });
  };

  // Auto-generate slug from name
  useEffect(() => {
    if (!editingProduct && formData.name) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.name) }));
    }
  }, [formData.name, editingProduct]);

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive">Failed to load products. Check RLS policies.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="btn-accent"
              onClick={() => {
                setEditingProduct(null);
                resetForm();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-shop"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="input-shop"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-shop"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sale Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sale_price}
                    onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    className="input-shop"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="input-shop"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">SKU *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="input-shop"
                    required
                  />
                </div>
              </div>
              
              {/* Size Variations Inline Map */}
              <div className="border border-border rounded-lg p-4 bg-muted/20">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-sm font-semibold">Size Variations (Optional)</h3>
                    <p className="text-xs text-muted-foreground mt-1">Add specific sizes and their individual stock count</p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setFormData(prev => ({ ...prev, variants: [...prev.variants, { size: '', stock: '0', price_adjustment: '0' }] }))}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Size
                  </Button>
                </div>
                
                {formData.variants.length > 0 ? (
                  <div className="space-y-3">
                    {formData.variants.map((variant, index) => (
                      <div key={index} className="flex items-center gap-3 bg-card p-3 rounded border shadow-sm">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab opacity-50" />
                        
                        <div className="flex-1">
                          <label className="text-xs text-muted-foreground mb-1 block">Size</label>
                          <input
                            type="text"
                            value={variant.size}
                            placeholder="e.g. 36, 38, L"
                            className="input-shop !py-2 text-sm"
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].size = e.target.value;
                              setFormData({ ...formData, variants: newVariants });
                            }}
                          />
                        </div>
                        
                        <div className="w-24">
                          <label className="text-xs text-muted-foreground mb-1 block">Stock</label>
                          <input
                            type="number"
                            value={variant.stock}
                            className="input-shop !py-2 text-sm"
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].stock = e.target.value;
                              setFormData({ ...formData, variants: newVariants });
                            }}
                          />
                        </div>
                        
                        <div className="w-24">
                          <label className="text-xs text-muted-foreground mb-1 block">Price Adj +/-</label>
                          <input
                            type="number"
                            value={variant.price_adjustment}
                            className="input-shop !py-2 text-sm"
                            onChange={(e) => {
                              const newVariants = [...formData.variants];
                              newVariants[index].price_adjustment = e.target.value;
                              setFormData({ ...formData, variants: newVariants });
                            }}
                          />
                        </div>
                        
                        <div className="pt-5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-9 w-9"
                            onClick={() => {
                              const newVariants = [...formData.variants];
                              newVariants.splice(index, 1);
                              setFormData({ ...formData, variants: newVariants });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-center py-6 text-muted-foreground border-2 border-dashed rounded bg-background/50">
                    No sizes added. The product will have no size options.
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  className="input-shop"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-shop min-h-[100px]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specifications (one per line)</label>
                <textarea
                  value={formData.specifications.join('\n')}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value.split('\n') })}
                  className="input-shop min-h-[100px]"
                  placeholder={"Fabrics: Imported Cotton\nSize: M/38 & Long: 38-39\nSleeve length: 20\""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Images *
                </label>
                <MultiImageUpload
                  values={formData.images}
                  onChange={(urls) => setFormData({ ...formData, images: urls })}
                  folder="products"
                  maxImages={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gallery Images
                </label>
                <MultiImageUpload
                  values={formData.gallery_images}
                  onChange={(urls) => setFormData({ ...formData, gallery_images: urls })}
                  folder="products/gallery"
                  maxImages={10}
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_new}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">New Arrival</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_best_seller}
                    onChange={(e) => setFormData({ ...formData, is_best_seller: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Best Seller</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="btn-accent flex-1" disabled={createProduct.isPending || updateProduct.isPending}>
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-shop pl-10 max-w-md"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Category</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0] || '/placeholder.svg'}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-secondary"
                          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                        />
                        <span className="font-medium line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.sku}</td>
                    <td className="px-6 py-4">
                      {product.sale_price ? (
                        <div>
                          <span className="font-medium">${product.sale_price}</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">${product.price}</span>
                        </div>
                      ) : (
                        <span className="font-medium">${product.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.category?.name || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeleteId(product.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
