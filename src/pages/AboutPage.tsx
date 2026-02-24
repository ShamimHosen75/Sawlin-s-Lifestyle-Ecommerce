import { Layout } from '@/components/layout/Layout';
import { PageBanner } from '@/components/layout/PageBanner';
import { useStoreSettings } from '@/hooks/useStoreSettings';
import {
    Award,
    Heart,
    Leaf,
    Palette,
    Shield,
    Shirt,
    Star,
    Truck,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const { data: storeSettings } = useStoreSettings();
  const storeName = storeSettings?.store_name || "Sawlin's Lifestyle";

  return (
    <Layout>
      <PageBanner
        title="About Us"
        badge="Crafted with Passion"
        badgeIcon={Heart}
        description={`From fabric selection to final stitch, every piece at ${storeName} is curated with care. We're on a mission to make premium fashion accessible to everyone.`}
      />

      {/* ═══ Who We Are ═══ */}
      <section className="container-shop section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
              alt="Fashion shopping"
              className="rounded-2xl w-full h-56 object-cover shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
              alt="Clothing collection"
              className="rounded-2xl w-full h-56 object-cover shadow-md mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80"
              alt="Fashion design"
              className="rounded-2xl w-full h-56 object-cover shadow-md -mt-8"
            />
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80"
              alt="Premium fabrics"
              className="rounded-2xl w-full h-56 object-cover shadow-md"
            />
          </div>

          {/* Text */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Who We Are
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-6 leading-tight">
              Curating Premium Fashion <br />Since Day One
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {storeName} started with a simple vision — to make stylish,
              high-quality clothing accessible to everyone in Bangladesh. From
              everyday essentials to statement pieces, we handpick each item to
              ensure it meets our standards for fabric quality, fit, and design.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're shopping for men's formals, women's fashion, baby
              outfits, or trendy accessories, {storeName} is your one-stop
              destination. We partner with trusted manufacturers who share our
              commitment to craftsmanship.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              <Shirt className="h-4 w-4" />
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Why Choose Us — Values ═══ */}
      <section className="bg-secondary/50">
        <div className="container-shop section-padding">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-3">
              The {storeName} Difference
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We're not just another clothing store. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: 'Premium Quality',
                desc: 'Every piece is crafted from carefully selected fabrics that are comfy, durable, and stylish.',
              },
              {
                icon: Palette,
                title: 'Curated Styles',
                desc: 'Our team stays on top of global trends to bring you looks that turn heads.',
              },
              {
                icon: Truck,
                title: 'Nationwide Delivery',
                desc: 'Fast, reliable shipping across Bangladesh — inside Dhaka within 24 hours.',
              },
              {
                icon: Heart,
                title: 'Easy Returns',
                desc: 'Not the perfect fit? Hassle-free returns and exchanges within 7 days.',
              },
              {
                icon: Shield,
                title: 'Secure Payments',
                desc: 'Cash on delivery and trusted online payment gateways for your peace of mind.',
              },
              {
                icon: Leaf,
                title: 'Sustainable Fashion',
                desc: 'We prioritize eco-friendly packaging and work with ethical manufacturers.',
              },
            ].map((val) => (
              <div
                key={val.title}
                className="group bg-card rounded-2xl border border-border p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <val.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section className="container-shop section-padding">
        <div className="bg-primary text-primary-foreground rounded-3xl px-8 py-12 md:py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
              Our Journey in Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: '5K+', label: 'Happy Customers', icon: Users },
                { num: '500+', label: 'Fashion Products', icon: Shirt },
                { num: '4.9', label: 'Average Rating', icon: Star },
                { num: '24/7', label: 'Customer Support', icon: Shield },
              ].map((s) => (
                <div key={s.label}>
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold mb-1">{s.num}</p>
                  <p className="text-primary-foreground/60 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-secondary/50">
        <div className="container-shop section-padding text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Elevate Your Wardrobe?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Browse our latest arrivals and find your next favorite outfit. New
            styles added every week.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-foreground/20 text-foreground px-8 py-3.5 rounded-lg font-semibold hover:border-accent hover:text-accent transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
