
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
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
              أفضل حلول الجبائر الطبية والأطراف الصناعية في مصر بأحدث التقنيات والمعايير العالمية لعام 2025.
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
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/orthoses" className="text-gray-300 hover:text-white transition-colors">الجبائر الطبية</Link>
              </li>
              <li>
                <Link to="/prosthetics" className="text-gray-300 hover:text-white transition-colors">الأطراف الصناعية</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">عن التطبيق</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-white transition-colors">فريق العمل</Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-300 hover:text-white transition-colors">مراكزنا</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">تواصل معنا</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
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
                <span className="text-gray-300">
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
