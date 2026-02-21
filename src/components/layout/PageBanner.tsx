import { Sparkles, type LucideIcon } from 'lucide-react';

interface PageBannerProps {
  title: string;
  description?: string;
  badge?: string;
  badgeIcon?: LucideIcon;
}

export function PageBanner({
  title,
  description,
  badge,
  badgeIcon: BadgeIcon = Sparkles,
}: PageBannerProps) {
  return (
    <div className="relative bg-primary overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl" />

      <div className="container-shop relative z-10 py-16 md:py-24 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <BadgeIcon className="h-4 w-4" />
            {badge}
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-primary-foreground/70 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
