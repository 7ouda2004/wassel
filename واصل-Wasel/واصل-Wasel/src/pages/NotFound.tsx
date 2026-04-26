import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, i18n.language]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <h1 className="text-9xl font-bold text-medical-600 mb-4 animate-bounce">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('not_found.title')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('not_found.message')}</p>
          <Link to="/">
            <Button size="lg" className="medical-btn px-8 py-6 text-lg">
              {t('not_found.back_home')}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
