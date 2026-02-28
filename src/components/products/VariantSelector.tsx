import { ProductVariant } from '@/hooks/useVariants';
import { cn } from '@/lib/utils';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelect: (variant: ProductVariant | null) => void;
  specifications?: string[];
}

export function VariantSelector({ variants, selectedVariant, onSelect, specifications }: VariantSelectorProps) {
  // Group variants by attribute
  const sizes = [...new Set(variants.filter(v => v.size).map(v => v.size))];
  const colors = [...new Set(variants.filter(v => v.color).map(v => v.color))];
  
  const selectedSize = selectedVariant?.size || null;
  const selectedColor = selectedVariant?.color || null;

  const handleSizeSelect = (size: string) => {
    const variant = variants.find(
      v => v.size === size && (colors.length === 0 || v.color === selectedColor || !selectedColor)
    );
    if (variant) onSelect(variant);
  };

  const handleColorSelect = (color: string) => {
    const variant = variants.find(
      v => v.color === color && (sizes.length === 0 || v.size === selectedSize || !selectedSize)
    );
    if (variant) onSelect(variant);
  };

  const isVariantAvailable = (size?: string | null, color?: string | null) => {
    return variants.some(
      v => (!size || v.size === size) && (!color || v.color === color) && v.stock > 0 && v.is_active
    );
  };

  return (
    <div className="space-y-4">
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm mt-6">
          <ul className="space-y-3">
            {/* Size Options */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-sm font-semibold">Size:</h3>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {sizes.map((size) => {
                    const available = isVariantAvailable(size, selectedColor);
                    const isSelected = selectedSize === size;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size!)}
                        disabled={!available}
                        className={cn(
                          "relative w-11 h-11 flex items-center justify-center rounded-md border text-sm transition-all",
                          available ? "bg-white text-foreground hover:border-primary/50" : "",
                          isSelected 
                            ? "border-zinc-800 bg-zinc-800 text-white font-bold shadow-sm" 
                            : "border-border",
                          !available && "opacity-50 hover:border-border cursor-not-allowed text-muted-foreground bg-muted/30"
                        )}
                      >
                        {size}
                        
                        {/* Red Cross Overlay for Unavailable Sizes (Crucial requirement) */}
                        {!available && (
                          <svg className="absolute inset-0 w-full h-full text-red-500/70" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
                            <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                  
                  {/* Clear selection button */}
                  {selectedSize && (
                    <button 
                      onClick={() => onSelect(null)}
                      className="ml-2 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                      type="button"
                    >
                      <span>&#x2715;</span> Clear
                    </button>
                  )}
                </div>
                
                {/* Dynamic Stock Indicator */}
                {selectedSize && isVariantAvailable(selectedSize, selectedColor) && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 border rounded border-green-300/50 bg-green-50/50">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-sm font-medium text-green-800">In stock</span>
                  </div>
                )}
              </div>
            )}

            {/* Color/Other Options */}
            {colors.length > 0 && colors.map((color) => {
              const available = isVariantAvailable(selectedSize, color);
              const isSelected = selectedColor === color;
              
              return (
                <li key={color}>
                  <button
                    onClick={() => handleColorSelect(color!)}
                    disabled={!available}
                    className={cn(
                      "flex items-start gap-3 w-full text-left transition-colors",
                      !available && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <span className={cn(
                      "mt-0.5 flex-shrink-0 p-0.5 rounded-full transition-colors",
                      isSelected ? "text-green-600 bg-red-100" : "text-green-600 bg-red-50"
                    )}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
                           className={cn("transition-opacity", "opacity-100")}>
                        <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className={cn("font-medium leading-snug text-sm", !available && "line-through", isSelected && "text-foreground font-semibold")}>
                      {color}
                    </span>
                  </button>
                </li>
              );
            })}

            {/* Static Specifications */}
            {specifications && specifications.length > 0 && specifications.map((spec, index) => (
              <li key={`spec-${index}`} className="flex items-start gap-3 w-full text-left">
                <span className="mt-0.5 flex-shrink-0 p-0.5 rounded-full text-green-600 bg-red-50">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-100">
                    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="font-medium leading-snug text-sm text-foreground">
                  {spec}
                </span>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}
