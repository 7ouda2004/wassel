
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-medical-950 text-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "الرئيسية" },
                { to: "/orthoses", label: "الجبائر الطبية" },
                { to: "/prosthetics", label: "الأطراف الصناعية" },
                { to: "/about", label: "عن التطبيق" },
                { to: "/team", label: "فريق العمل" },
                { to: "/locations", label: "مراكزنا" },
                { to: "/contact", label: "تواصل معنا" }
              ].map((link, index) => (
                <motion.li 
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={link.to} className="text-gray-300 hover:text-white transition-colors hover:translate-x-2 inline-block transform duration-200">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-start"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-5 w-5 mr-2 text-medical-400" />
                <a href="https://wa.me/201119056895" className="text-gray-300 hover:text-white transition-colors">
                  +201119056895
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-5 w-5 mr-2 text-medical-400" />
                <a href="mailto:mahmoudebrahim049@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  mahmoudebrahim049@gmail.com
                </a>
              </motion.li>
              <motion.li 
                className="flex items-start"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-5 w-5 mr-2 text-medical-400" />
                <span className="text-gray-300">
                  المنصورة , مصر
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>&copy; حقوق النشر {new Date().getFullYear()}  جميع الحقوق محفوظة لدى محمود إبراهيم مسعد</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
