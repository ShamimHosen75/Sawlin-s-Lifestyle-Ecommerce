import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useCategories } from '@/hooks/useShopData';
import { Link } from 'react-router-dom';

export function FeaturedCategories() {
  const { data: categories = [], isLoading } = useCategories();
  const { t } = useSiteSettings();

  if (isLoading) {
    return (
      <section className="section-padding bg-secondary/30">
        <div className="container-shop">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">{t('home.shopByCategory')}</h2>
            <p className="text-muted-foreground mt-2">Browse our curated fashion collections</p>
            <div className="w-12 h-1 bg-accent mx-auto mt-3 rounded-full" />
          </div>
          <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted animate-pulse" />
                <div className="w-20 h-4 bg-muted animate-pulse rounded" />
                <div className="w-12 h-3 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-shop">
        {/* Centered heading with subtitle and accent underline */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {t('home.shopByCategory')}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Browse our curated fashion collections
          </p>
          <div className="w-12 h-1 bg-accent mx-auto mt-3 rounded-full" />
        </div>

        {/* Circular category grid */}
        <div className="flex justify-center gap-6 md:gap-10 lg:gap-14 flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="category-circle-item group"
            >
              <div className="category-circle-img">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground mt-3 text-center">
                {category.name}
              </h3>
              {category.product_count !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {category.product_count} items
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
