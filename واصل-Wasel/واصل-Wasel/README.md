<div align="center">

# 🦾 واصـــل | Wasel

### منصة الأطراف الصناعية والجبائر الطبية

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com/)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<br />

<img src="public/wasel.ico" alt="Wasel Logo" width="120" />

<br />

**واصل** هي منصة طبية متكاملة متخصصة في الأطراف الصناعية والجبائر الطبية، تهدف إلى ربط المرضى بأفضل المراكز والخدمات الطبية في مصر.

[🌐 زيارة الموقع](https://wasel-ortho.netlify.app) · [📋 الإبلاغ عن مشكلة](https://github.com/YOUR_USERNAME/wasel/issues) · [💡 اقتراح ميزة](https://github.com/YOUR_USERNAME/wasel/issues)

</div>

---

## ✨ المميزات

<table>
<tr>
<td align="center" width="33%">

### 🦿 الأطراف الصناعية
استعراض شامل لجميع أنواع الأطراف الصناعية مع تفاصيل وأسعار

</td>
<td align="center" width="33%">

### 🏥 الجبائر الطبية
دليل متكامل للجبائر والدعامات الطبية بمختلف أنواعها

</td>
<td align="center" width="33%">

### 📅 حجز المواعيد
نظام حجز ذكي مع إمكانية رفع الملفات والتواصل المباشر

</td>
</tr>
<tr>
<td align="center">

### 🗺️ شبكة المراكز
خريطة تفاعلية لمراكز واصل المنتشرة في أنحاء مصر

</td>
<td align="center">

### 👥 فريق العمل
تعرّف على فريق الأطباء والمتخصصين المعتمدين

</td>
<td align="center">

### 💬 استشارة مجانية
تواصل مباشر عبر واتساب للاستشارات المجانية

</td>
</tr>
</table>

---

## 🛠️ التقنيات المستخدمة

```
⚡ Vite 5          → أداة بناء فائقة السرعة
⚛️  React 18        → مكتبة واجهات المستخدم
📘 TypeScript 5    → كتابة كود آمن ومنظم
🎨 TailwindCSS 3   → تصميم سريع ومتجاوب
🎭 Framer Motion   → حركات وأنيميشن سلسة
🧩 Shadcn/UI       → مكونات واجهة مستخدم أنيقة
📊 Recharts        → رسوم بيانية تفاعلية
🔀 React Router 6  → تنقل سلس بين الصفحات
```

---

## 🚀 التشغيل المحلي

```bash
# 1️⃣ استنساخ المستودع
git clone https://github.com/YOUR_USERNAME/wasel.git
cd wasel

# 2️⃣ تثبيت التبعيات
npm install

# 3️⃣ تشغيل خادم التطوير
npm run dev

# 4️⃣ فتح المتصفح
# 🌐 http://localhost:5173
```

---

## 📦 البناء والنشر

```bash
# بناء نسخة الإنتاج
npm run build

# معاينة نسخة الإنتاج محلياً
npm run preview
```

### 🔄 النشر التلقائي على Netlify

هذا المشروع مُعد للنشر التلقائي على **Netlify**:

1. ✅ كل `push` على فرع `main` يُطلق بناء ونشر تلقائي
2. ✅ كل `Pull Request` ينشئ نسخة معاينة (`Deploy Preview`)
3. ✅ إعدادات الأمان والكاش مُضمّنة في `netlify.toml`

---

## 📁 هيكل المشروع

```
واصل-Wasel/
├── 📄 index.html              # نقطة الدخول
├── 📄 netlify.toml             # إعدادات Netlify
├── 📄 vite.config.ts           # إعدادات Vite
├── 📄 tailwind.config.ts       # إعدادات Tailwind
├── 📂 public/                  # ملفات ثابتة
│   ├── 📂 images/              # صور الموقع
│   ├── 📄 _redirects           # توجيهات Netlify
│   └── 📄 robots.txt           # إعدادات SEO
├── 📂 src/
│   ├── 📂 components/          # المكونات القابلة لإعادة الاستخدام
│   ├── 📂 pages/               # صفحات التطبيق
│   ├── 📂 hooks/               # React Hooks مخصصة
│   ├── 📂 lib/                 # دوال مساعدة
│   ├── 📂 styles/              # أنماط CSS
│   ├── 📂 types/               # تعريفات TypeScript
│   ├── 📄 App.tsx              # المكون الرئيسي
│   └── 📄 main.tsx             # نقطة بدء React
└── 📂 dist/                    # ملفات الإنتاج (يتم إنشاؤها تلقائياً)
```

---

## 🤝 المساهمة

المساهمات مرحّب بها! اتبع الخطوات التالية:

```bash
# 1. Fork المستودع
# 2. إنشاء فرع جديد
git checkout -b feature/amazing-feature

# 3. عمل التعديلات وحفظها
git commit -m '✨ إضافة ميزة رائعة'

# 4. رفع الفرع
git push origin feature/amazing-feature

# 5. فتح Pull Request
```

---

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة **MIT** — انظر ملف [LICENSE](./LICENSE) للتفاصيل.

---

<div align="center">

### 💙 صُنع بحب في مصر 🇪🇬

**واصل** — لأن كل خطوة تستحق أن تكون واثقة

<br />

[![GitHub Stars](https://img.shields.io/github/stars/YOUR_USERNAME/wasel?style=social)](https://github.com/YOUR_USERNAME/wasel)
[![Follow](https://img.shields.io/github/followers/YOUR_USERNAME?style=social)](https://github.com/YOUR_USERNAME)

</div>
