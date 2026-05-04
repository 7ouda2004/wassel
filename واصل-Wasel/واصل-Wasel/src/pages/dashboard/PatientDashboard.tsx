import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, ShieldCheck, Package, Clock, CheckCircle2, XCircle, AlertCircle, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/providers/auth-provider';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import EmptyState from '@/components/shared/EmptyState';
import type { Booking, InsuranceRequest } from '@/types/database';

import { insuranceService } from '@/services/insurance.service';
import { bookingsService } from '@/services/bookings.service';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-800',
  under_review: 'bg-purple-100 text-purple-800',
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Clock,
  approved: CheckCircle2,
  rejected: XCircle,
  completed: CheckCircle2,
  cancelled: XCircle,
  under_review: AlertCircle,
};

const PatientDashboard = () => {
  const { i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const isAr = i18n.language === 'ar';
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [insuranceRequests, setInsuranceRequests] = useState<InsuranceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const insuranceProvidersList = insuranceService.getInsuranceProviders();
  const getProviderName = (providerId: string) => {
    const provider = insuranceProvidersList.find(p => p.id === providerId);
    return provider ? (isAr ? provider.name_ar : provider.name_en) : providerId;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Skip redirect if we're still checking auth status
    const authIsLoading = typeof user === 'undefined'; // Handle depending on how useAuth works
    if (!user) {
      // Small timeout to allow auth to load from local storage if needed
      const t = setTimeout(() => {
        if (!user) window.location.href = '/login';
      }, 500);
      return () => clearTimeout(t);
    }

    if (user.role === 'center' || user.role === 'insurance') {
      window.location.href = '/specialist-dashboard';
      return;
    }
    
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const [userBookings, userInsurance] = await Promise.all([
          bookingsService.getByUser(user.id).catch(() => []),
          insuranceService.getByPatient(user.id).catch(() => [])
        ]);
        setBookings(userBookings);
        setInsuranceRequests(userInsurance);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  const statusLabel = (status: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      pending: { ar: 'قيد الانتظار', en: 'Pending' },
      approved: { ar: 'مقبول', en: 'Approved' },
      rejected: { ar: 'مرفوض', en: 'Rejected' },
      completed: { ar: 'مكتمل', en: 'Completed' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' },
      under_review: { ar: 'قيد المراجعة', en: 'Under Review' },
    };
    return labels[status]?.[isAr ? 'ar' : 'en'] || status;
  };

  const stats = [
    { icon: Calendar, label: isAr ? 'الحجوزات' : 'Bookings', value: bookings.length, color: 'bg-blue-50 text-blue-600' },
    { icon: ShieldCheck, label: isAr ? 'طلبات التأمين' : 'Insurance Requests', value: insuranceRequests.length, color: 'bg-purple-50 text-purple-600' },
    { icon: CheckCircle2, label: isAr ? 'مواعيد مؤكدة' : 'Confirmed', value: bookings.filter(b => b.status === 'approved').length, color: 'bg-green-50 text-green-600' },
    { icon: Clock, label: isAr ? 'قيد الانتظار' : 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-medical-500 to-medical-700 flex items-center justify-center shadow-lg shadow-medical-500/20">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{isAr ? 'مرحباً' : 'Welcome'}, {user?.full_name || (isAr ? 'المستخدم' : 'User')}</h1>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to="/booking"><Button className="bg-medical-600 text-white rounded-xl shadow-lg"><Calendar className="w-4 h-4 me-2" />{isAr ? 'حجز جديد' : 'New Booking'}</Button></Link>
                <Link to="/insurance-request"><Button variant="outline" className="rounded-xl"><ShieldCheck className="w-4 h-4 me-2" />{isAr ? 'طلب تأمين' : 'Insurance Request'}</Button></Link>
                <Button variant="ghost" onClick={signOut} className="text-red-500"><LogOut className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}><stat.icon className="w-6 h-6" /></div>
                  <div><p className="text-sm text-gray-500">{stat.label}</p><p className="text-2xl font-bold text-gray-900">{stat.value}</p></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <Tabs defaultValue="bookings">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="bookings"><Calendar className="w-4 h-4 me-2" />{isAr ? 'الحجوزات' : 'Bookings'}</TabsTrigger>
                <TabsTrigger value="insurance"><ShieldCheck className="w-4 h-4 me-2" />{isAr ? 'التأمين' : 'Insurance'}</TabsTrigger>
                <TabsTrigger value="profile"><Settings className="w-4 h-4 me-2" />{isAr ? 'الملف الشخصي' : 'Profile'}</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings">
                {isLoading ? <LoadingSkeleton variant="list" count={3} /> :
                  bookings.length === 0 ? (
                    <EmptyState type="no-bookings" action={{ label: isAr ? 'احجز الآن' : 'Book Now', onClick: () => window.location.href = '/booking' }} />
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking, i) => {
                        const StatusIcon = statusIcons[booking.status] || Clock;
                        return (
                          <motion.div key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-medical-50 flex items-center justify-center"><Calendar className="w-6 h-6 text-medical-600" /></div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900">
                                {booking.centers ? (isAr ? booking.centers.name_ar : booking.centers.name_en) : (isAr ? 'حجز بمركز واصل' : 'Booking with Wasel Center')}
                              </p>
                              <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                                <Calendar className="w-3 h-3" />
                                <span>{booking.booking_date} {booking.booking_time ? `- ${booking.booking_time}` : ''}</span>
                                {booking.appointment_type && (
                                  <>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                                    <span>{booking.appointment_type === 'consultation' ? (isAr ? 'استشارة طبية' : 'Medical Consultation') : (isAr ? 'جلسة قياس' : 'Measurement Session')}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status]}`}>
                              <StatusIcon className="w-3 h-3" />{statusLabel(booking.status)}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
              </TabsContent>

              <TabsContent value="insurance">
                {isLoading ? <LoadingSkeleton variant="list" count={3} /> :
                  insuranceRequests.length === 0 ? (
                    <EmptyState type="no-insurance" action={{ label: isAr ? 'تقديم طلب' : 'Submit Request', onClick: () => window.location.href = '/insurance-request' }} />
                  ) : (
                    <div className="space-y-4">
                      {insuranceRequests.map((req, i) => {
                        const StatusIcon = statusIcons[req.status] || Clock;
                        return (
                          <motion.div key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-purple-600" /></div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900">{getProviderName(req.insurance_provider)}</p>
                              <p className="text-sm text-gray-500">{new Date(req.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[req.status]}`}>
                                <StatusIcon className="w-3 h-3" />{statusLabel(req.status)}
                              </span>
                              {req.policy_number && <span className="text-xs text-gray-400 font-medium">#{req.policy_number}</span>}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
              </TabsContent>

              <TabsContent value="profile">
                <div className="max-w-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">{isAr ? 'المعلومات الشخصية' : 'Personal Information'}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"><span className="text-gray-500">{isAr ? 'الاسم' : 'Name'}</span><span className="font-semibold">{user?.full_name || '-'}</span></div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"><span className="text-gray-500">{isAr ? 'البريد' : 'Email'}</span><span className="font-semibold">{user?.email || '-'}</span></div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"><span className="text-gray-500">{isAr ? 'الهاتف' : 'Phone'}</span><span className="font-semibold">{user?.phone || '-'}</span></div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"><span className="text-gray-500">{isAr ? 'نوع الحساب' : 'Account Type'}</span><span className="font-semibold capitalize">{user?.role || '-'}</span></div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
