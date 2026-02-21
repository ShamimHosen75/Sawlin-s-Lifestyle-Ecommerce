import {
    Shirt,
    Sparkles,
    Star,
    Truck,
    Users,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % BG_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-[420px] md:min-h-[500px] overflow-hidden">
      {/* Background Slider Images */}
      {BG_IMAGES.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      <div className="container-shop relative z-10 py-16 md:py-24 flex items-center min-h-[420px] md:min-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
          {/* Left — Text & CTA */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-5 border border-accent/20">
              <Sparkles className="h-4 w-4" />
              New Season Arrivals
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
              Discover Your <br />
              <span className="text-accent">Perfect Style</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md mb-8">
              Explore our curated collection of premium clothing for men, women,
              and kids. Fashion that fits your lifestyle — delivered to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                Browse Categories
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
              {BG_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-accent w-8' : 'bg-white/40 w-4 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right — Floating Glass Cards */}
          <div className="hidden md:flex flex-col gap-4 items-end">
            {[
              { icon: Users, num: '5,000+', label: 'Happy Customers' },
              { icon: Shirt, num: '500+', label: 'Fashion Products' },
              { icon: Star, num: '4.9 ★', label: 'Customer Rating' },
              { icon: Truck, num: 'Fast', label: 'Nationwide Delivery' },
            ].map((card) => (
              <div
                key={card.label}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 w-64 shadow-xl hover:bg-white/15 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <card.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{card.num}</p>
                  <p className="text-white/60 text-xs">{card.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
