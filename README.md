# 🏪 WHG Store

متجر إلكتروني احترافي بألوان خضراء مدرجة، مبني بـ HTML + CSS + JavaScript خالص.

[![Deploy to GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?logo=github)](https://YOUR-USERNAME.github.io/whg-store)

---

## 📸 المميزات

- 🎨 تصميم بألوان خضراء مدرجة (غامق → فاتح)
- 📱 متوافق مع الجوال والحاسوب (Responsive)
- 🛒 سلة تسوق تفاعلية مع تخزين محلي
- 🔍 بحث فوري في المنتجات
- ❤️ قائمة المفضلة
- 💳 صفحة دفع كاملة
- 📞 صفحة تواصل
- 📋 صفحة الشروط والأحكام
- ✅ نشر تلقائي على GitHub Pages

---

## 🚀 خطوات النشر على GitHub Pages

### الطريقة الأولى: GitHub Actions (تلقائي — الأفضل)

**1. أنشئ Repository جديد على GitHub:**
- اذهب إلى [github.com/new](https://github.com/new)
- الاسم: `whg-store`
- اجعله **Public** (مهم لـ GitHub Pages المجاني)
- لا تضف أي ملفات (اتركه فارغاً)
- اضغط **Create repository**

**2. ارفع الملفات من جهازك:**
```bash
# في مجلد المشروع
git init
git add .
git commit -m "🚀 WHG Store - Initial Launch"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/whg-store.git
git push -u origin main
```

**3. فعّل GitHub Pages:**
- اذهب إلى Settings → Pages
- تحت **Source** اختر: **GitHub Actions**
- سيبدأ النشر تلقائياً في دقيقتين ✅

**4. رابط موقعك:**
```
https://YOUR-USERNAME.github.io/whg-store/
```

---

### الطريقة الثانية: رفع مباشر بدون Git

1. اذهب إلى github.com وأنشئ Repository
2. اضغط **uploading an existing file**
3. اسحب جميع الملفات إلى المربع
4. اضغط **Commit changes**
5. اذهب إلى Settings → Pages → Source: **GitHub Actions**

---

## 📁 هيكل المشروع

```
whg-store/
├── index.html          # الصفحة الرئيسية (كل الصفحات فيها)
├── style.css           # جميع التصاميم والألوان
├── script.js           # المنطق والتفاعلية
├── README.md           # هذا الملف
└── .github/
    └── workflows/
        └── deploy.yml  # ملف النشر التلقائي
```

---

## 🛠️ تخصيص المتجر

### تغيير المنتجات
في ملف `script.js`، ابحث عن `const products = [` وعدّل المصفوفة:
```javascript
{ id: 1, name: 'اسم المنتج', desc: 'الوصف', price: 999, icon: '🎮', cat: 'tech' }
```

### تغيير الألوان
في ملف `style.css`، عدّل المتغيرات في `:root`:
```css
--green-dark: #0a3d1f;    /* الأخضر الغامق */
--green-bright: #2ecc71;  /* الأخضر الفاتح */
```

### تغيير اسم المتجر
في `index.html` غيّر كل `WHG Store` إلى اسمك.

---

## ⚙️ تشغيل محلياً

```bash
# بدون server (افتح مباشرة)
open index.html

# أو مع server بسيط (Python)
python3 -m http.server 8000
# ثم افتح: http://localhost:8000
```

---

## 📝 ملاحظات مهمة

- المتجر يستخدم `localStorage` لحفظ السلة والمفضلة
- لا يحتاج إلى قاعدة بيانات أو سيرفر
- يعمل 100% على GitHub Pages المجاني
- لدعم RTL (عربي) كامل

---

صُنع بـ ❤️ — WHG Store © 2025
