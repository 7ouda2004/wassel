
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-medical-950 text-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-medical-500 to-medical-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="mx-3 font-bold text-xl text-white">واصــل-Wasel</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              أفضل حلول الجبائر الطبية والأطراف الصناعية في مصر بأحدث التقنيات والمعايير العالمية لعام 2025.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse pt-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-block"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-block"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform inline-block"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "الرئيسية" },
                { to: "/orthoses", label: "الجبائر الطبية" },
                { to: "/prosthetics", label: "الأطراف الصناعية" },
                { to: "/about", label: "عن التطبيق" },
                { to: "/team", label: "فريق العمل" },
                { to: "/centers", label: "مراكزنا" },
                { to: "/contact", label: "تواصل معنا" }
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block transform text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <Phone className="h-5 w-5 mr-2 text-medical-400 flex-shrink-0 mt-0.5" />
                <a href="https://wa.me/201119056895" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  +201119056895
                </a>
              </li>
              <li className="flex items-start group">
                <Mail className="h-5 w-5 mr-2 text-medical-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:mahmoudebrahim049@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  mahmoudebrahim049@gmail.com
                </a>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-2 text-medical-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  المنصورة , مصر
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; حقوق النشر {new Date().getFullYear()}  جميع الحقوق محفوظة لدى محمود إبراهيم مسعد</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
