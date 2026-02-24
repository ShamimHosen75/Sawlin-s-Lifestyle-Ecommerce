import { Layout } from '@/components/layout/Layout';
import { PageBanner } from '@/components/layout/PageBanner';
import { Button } from '@/components/ui/button';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useStoreSettings } from '@/hooks/useStoreSettings';
import {
    Clock,
    HeadphonesIcon,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContactPage() {
  const { t } = useSiteSettings();
  const { data: storeSettings, isLoading } = useStoreSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!', {
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const storePhone = storeSettings?.store_phone || '+8801622823164';
  const storeEmail = storeSettings?.store_email || 'info@sawlinslifestyle.com';
  const storeAddress = storeSettings?.store_address || 'Dhaka';
  const storeCity = storeSettings?.store_city || 'Bangladesh';
  const whatsappNumber = storeSettings?.whatsapp_number || '+8801622823164';
  const fullAddress = [storeAddress, storeCity].filter(Boolean).join(', ');

  return (
    <Layout>
      <PageBanner
        title="Get In Touch"
        badge="We'd love to hear from you"
        badgeIcon={Sparkles}
        description="Have a question about an order, need styling advice, or just want to say hello? Our team is ready to help."
      />

      <div className="container-shop section-padding">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-14 relative z-20 mb-16">
          {/* Phone */}
          <a
            href={`tel:${storePhone}`}
            className="group bg-card rounded-2xl border border-border p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
            <p className="text-muted-foreground text-sm">{storePhone}</p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${storeEmail}`}
            className="group bg-card rounded-2xl border border-border p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
            <p className="text-muted-foreground text-sm">{storeEmail}</p>
          </a>

          {/* Hours */}
          <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
            <p className="text-muted-foreground text-sm">Sat – Thu: 10am – 8pm</p>
          </div>

          {/* Location */}
          <div className="bg-card rounded-2xl border border-border p-6 text-center shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
            <p className="text-muted-foreground text-sm">{fullAddress}</p>
          </div>
        </div>

        {/* WhatsApp CTA Banner */}
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 w-full p-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl font-medium transition-all duration-300 mb-16 shadow-lg hover:shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <p className="text-lg font-semibold">Chat on WhatsApp</p>
              <p className="text-white/80 text-sm">
                Get instant replies — we're always online during business hours.
              </p>
            </div>
            <Send className="h-5 w-5 ml-auto opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </a>
        )}

        {/* Main Content: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Form — takes 3 columns */}
          <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
              <p className="text-muted-foreground text-sm">
                Fill out the form below and we'll respond within 24 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="input-shop"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-shop"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Subject <span className="text-accent">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-shop"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Returns & Exchange">Returns & Exchange</option>
                  <option value="Bulk Order">Bulk Order</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  className="input-shop min-h-[160px] resize-none"
                  required
                />
              </div>
              <Button type="submit" className="btn-accent w-full py-3 text-base font-semibold">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Map + Address — takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Map */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.0639675276!2d90.35633099999999!3d23.7805733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbcad5ca69!2sDhaka!5e0!3m2!1sen!2sbd!4v1706601234567!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Trust Badges */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <HeadphonesIcon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">24/7 Support</h4>
                  <p className="text-muted-foreground text-xs">Always here to help you</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Secure & Trusted</h4>
                  <p className="text-muted-foreground text-xs">Your data is safe with us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
