
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-medical-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-medical-500 to-medical-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="mx-3 font-bold text-xl text-white">واصــل-Wasel</span>
            </div>
            <p className="text-gray-300 text-sm">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse pt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/orthoses" className="text-gray-300 hover:text-white transition-colors">{t('nav.orthoses')}</Link>
              </li>
              <li>
                <Link to="/prosthetics" className="text-gray-300 hover:text-white transition-colors">{t('nav.prosthetics')}</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white transition-colors">{t('nav.team', 'فريق العمل')}</Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-300 hover:text-white transition-colors">{t('nav.centers')}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact_us')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-medical-400" />
                <a href="https://wa.me/201119056895" className="text-gray-300 hover:text-white transition-colors">
                  +201119056895
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-medical-400" />
                <a href="mailto:mahmoudebrahim049@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  mahmoudebrahim049@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-medical-400" />
                <span className="text-gray-300 mx-2">
                  {t('footer.location')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
