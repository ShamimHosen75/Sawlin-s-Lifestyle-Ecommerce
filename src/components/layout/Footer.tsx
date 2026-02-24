import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { useStoreSettings } from '@/hooks/useStoreSettings';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useSiteSettings();
  const { data: storeSettings, isLoading } = useStoreSettings();

  const footerLinks = {
    shop: [
      { name: t('nav.shop'), href: '/shop' },
      { name: t('home.newArrivals'), href: '/shop?filter=new' },
      { name: t('home.bestSellers'), href: '/shop?filter=bestsellers' },
      { name: t('product.sale'), href: '/shop?filter=sale' },
    ],
    company: [
      { name: t('footer.aboutUs'), href: '/about' },
      { name: t('nav.contact'), href: '/contact' },
      { name: t('nav.faq'), href: '/faq' },
    ],
    support: [
      { name: t('footer.shippingInfo'), href: '/shipping' },
      { name: t('footer.returnPolicy'), href: '/returns' },
    ],
  };

  // Build social links from settings
  const socialLinks = [];
  if (storeSettings?.facebook_url) {
    socialLinks.push({ name: 'Facebook', href: storeSettings.facebook_url, icon: Facebook });
  }
  if (storeSettings?.instagram_url) {
    socialLinks.push({ name: 'Instagram', href: storeSettings.instagram_url, icon: Instagram });
  }
  if (storeSettings?.twitter_url) {
    socialLinks.push({ name: 'Twitter', href: storeSettings.twitter_url, icon: Twitter });
  }
  if (storeSettings?.youtube_url) {
    socialLinks.push({ name: 'YouTube', href: storeSettings.youtube_url, icon: Youtube });
  }
  if (storeSettings?.tiktok_url) {
    socialLinks.push({ name: 'TikTok', href: storeSettings.tiktok_url, icon: MessageCircle }); // Fallback to MessageCircle if Music icon is not available in current lucide version
  }

  // Fallback if no social links configured
  if (socialLinks.length === 0) {
    socialLinks.push(
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Instagram', href: '#', icon: Instagram }
    );
  }

  const storeName = storeSettings?.store_name || "Sawlin's Lifestyle";
  const storeTagline = storeSettings?.store_tagline || t('home.heroSubtitle');
  const storePhone = storeSettings?.store_phone || '+8801622823164';
  const storeEmail = storeSettings?.store_email || 'info@sawlinslifestyle.com';
  const storeAddress = storeSettings?.store_address || 'Dhaka';
  const storeCity = storeSettings?.store_city || 'Bangladesh';
  const footerText = storeSettings?.footer_text || '';
  const whatsappNumber = storeSettings?.whatsapp_number || '+8801622823164';

  // Additional contact info
  const secondPhone = '+8801921386426';

  const fullAddress = [storeAddress, storeCity].filter(Boolean).join(', ');

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-shop section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Us */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold mb-4">About Us</h4>
            <p className="text-primary-foreground/80 text-sm mb-6 max-w-xs">
              Sawlin's Lifestyle is a premium fashion brand in Bangladesh, offering high-quality clothing and lifestyle products for everyone.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('nav.shop')}</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3">
              {fullAddress && (
                <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{fullAddress}</span>
                </li>
              )}
              {storePhone && (
                <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${storePhone}`} className="hover:text-primary-foreground">
                      {storePhone}
                    </a>
                    <a href={`tel:${secondPhone}`} className="hover:text-primary-foreground">
                      {secondPhone}
                    </a>
                  </div>
                </li>
              )}
              {storeEmail && (
                <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a href={`mailto:${storeEmail}`} className="hover:text-primary-foreground">
                      {storeEmail}
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              {footerText || `© ${new Date().getFullYear()} Sawlin's Lifestyle. ${t('footer.allRightsReserved')}.`}
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                to="/terms"
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {t('footer.termsConditions')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
