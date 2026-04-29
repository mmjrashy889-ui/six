// ===== WHG STORE - Main JavaScript =====

// State
let cart = JSON.parse(localStorage.getItem('whg_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('whg_wishlist') || '[]');

// Products Data
const products = [
  { id: 1, name: 'جهاز PS5', desc: 'أحدث جيل من بلايستيشن 5 الرهيب', price: 2299, oldPrice: 2799, icon: '🎮', cat: 'games', badge: 'sale' },
  { id: 2, name: 'Nike Air Max', desc: 'حذاء رياضي أصلي بجودة عالية', price: 450, oldPrice: null, icon: '👟', cat: 'fashion', badge: 'new' },
  { id: 3, name: 'iPhone 15 Pro', desc: 'أقوى آيفون بكاميرا تيتانيوم', price: 4999, oldPrice: 5499, icon: '📱', cat: 'tech', badge: 'sale' },
  { id: 4, name: 'سماعة Sony WH', desc: 'سماعة لاسلكية بجودة صوت استثنائية', price: 799, oldPrice: null, icon: '🎧', cat: 'tech', badge: null },
  { id: 5, name: 'كرسي Gaming', desc: 'كرسي مريح للجيمرز المحترفين', price: 1299, oldPrice: 1599, icon: '🪑', cat: 'games', badge: 'sale' },
  { id: 6, name: 'لابتوب MacBook', desc: 'أداء لا يصدق بشريحة M3', price: 6999, oldPrice: null, icon: '💻', cat: 'tech', badge: 'new' },
  { id: 7, name: 'تيشيرت كاجوال', desc: 'تصميم عصري بقماش قطني فاخر', price: 120, oldPrice: 180, icon: '👕', cat: 'fashion', badge: 'sale' },
  { id: 8, name: 'ساعة Smart Watch', desc: 'تتبع صحتك بأحدث التقنيات', price: 599, oldPrice: null, icon: '⌚', cat: 'tech', badge: null },
];

// ===== NAVIGATION =====
function navigate(page, event) {
  if (event) event.preventDefault();

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const targetPage = document.getElementById('page-' + page);
  if (targetPage) targetPage.classList.add('active');

  const navLink = document.querySelector(`.nav-links a[href="#${page}"]`);
  if (navLink) navLink.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'cart') renderCartPage();
  if (page === 'checkout') renderCheckout();
}

// ===== PRODUCTS =====
function renderProducts(filter = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">
        <span>${p.icon}</span>
        ${p.badge ? `<span class="product-badge ${p.badge}">${getBadgeLabel(p.badge)}</span>` : ''}
        <button class="wishlist-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="toggleWishlist(${p.id}, this)" title="المفضلة">
          ${wishlist.includes(p.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div>
            ${p.oldPrice ? `<span class="old-price">${p.oldPrice} ر.س</span>` : ''}
            <span class="price">${p.price} ر.س</span>
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">
            🛒 أضف
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getBadgeLabel(badge) {
  const labels = { sale: '🔥 تخفيض', new: '✨ جديد', hot: '⚡ رائج' };
  return labels[badge] || badge;
}

function filterProducts(cat, el) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderProducts(cat);
}

// ===== CART =====
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  showToast(`✅ تم إضافة ${product.name} للسلة`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartSidebar();
  renderCartPage();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  renderCartSidebar();
  renderCartPage();
}

function saveCart() {
  localStorage.setItem('whg_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const count = getCartCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ===== CART SIDEBAR =====
function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-sidebar').classList.add('open');
  renderCartSidebar();
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
}

function renderCartSidebar() {
  const itemsEl = document.getElementById('cart-sidebar-items');
  const totalEl = document.getElementById('cart-sidebar-total');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p>السلة فارغة<br><small>أضف منتجات لتبدأ التسوق</small></p>
      </div>`;
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">${item.price} ر.س</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          <button class="remove-item" onclick="removeFromCart(${item.id})">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  if (totalEl) totalEl.textContent = getCartTotal().toLocaleString('ar-SA') + ' ر.س';
}

// ===== CART PAGE =====
function renderCartPage() {
  const container = document.getElementById('cart-page-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:4rem;color:#aaa;">
        <div style="font-size:4rem;margin-bottom:1rem;">🛒</div>
        <h3 style="font-size:1.3rem;margin-bottom:0.5rem;">السلة فارغة</h3>
        <p style="margin-bottom:1.5rem;">ابدأ التسوق واضف منتجاتك المفضلة</p>
        <button class="btn-primary" onclick="navigate('home')">🏠 تسوق الآن</button>
      </div>`;
    return;
  }

  container.innerHTML = `
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:var(--green-dark);color:white;text-align:right;">
          <th style="padding:14px 16px;border-radius:8px 0 0 0;">المنتج</th>
          <th style="padding:14px 16px;">السعر</th>
          <th style="padding:14px 16px;">الكمية</th>
          <th style="padding:14px 16px;">المجموع</th>
          <th style="padding:14px 16px;border-radius:0 8px 0 0;">حذف</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr style="border-bottom:1px solid #eee;background:white;">
            <td style="padding:16px;display:flex;align-items:center;gap:12px;">
              <span style="font-size:2rem;">${item.icon}</span>
              <div>
                <strong>${item.name}</strong><br>
                <small style="color:#888;">${item.desc.substring(0,30)}...</small>
              </div>
            </td>
            <td style="padding:16px;font-weight:700;color:var(--green-dark);">${item.price.toLocaleString()} ر.س</td>
            <td style="padding:16px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <button class="qty-btn" onclick="updateQty(${item.id},-1);renderCartPage()">−</button>
                <span style="font-weight:700;min-width:24px;text-align:center;">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${item.id},1);renderCartPage()">+</button>
              </div>
            </td>
            <td style="padding:16px;font-weight:900;color:var(--green-mid);">${(item.price * item.qty).toLocaleString()} ر.س</td>
            <td style="padding:16px;">
              <button onclick="removeFromCart(${item.id});renderCartPage()" style="background:none;border:none;color:#e74c3c;cursor:pointer;font-size:1.2rem;">🗑️</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="margin-top:2rem;padding:1.5rem;background:white;border-radius:var(--radius);box-shadow:var(--shadow);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
      <div>
        <div style="font-size:0.9rem;color:#888;">المجموع الكلي</div>
        <div style="font-size:1.8rem;font-weight:900;color:var(--green-dark);">${getCartTotal().toLocaleString()} ر.س</div>
      </div>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        <button class="btn-secondary" onclick="navigate('home')" style="color:var(--green-dark);border-color:var(--green-mid);">← متابعة التسوق</button>
        <button class="btn-primary" onclick="navigate('checkout')">إتمام الطلب ←</button>
      </div>
    </div>
  `;
}

// ===== CHECKOUT =====
function renderCheckout() {
  const summary = document.getElementById('checkout-summary');
  if (!summary) return;

  const shipping = 30;
  const total = getCartTotal() + shipping;

  summary.innerHTML = `
    ${cart.map(item => `
      <div class="summary-item">
        <span>${item.icon} ${item.name} × ${item.qty}</span>
        <span>${(item.price * item.qty).toLocaleString()} ر.س</span>
      </div>
    `).join('')}
    <div class="summary-item">
      <span>رسوم الشحن</span>
      <span>${shipping} ر.س</span>
    </div>
    <div class="summary-total">
      <span>المجموع الكلي</span>
      <span>${total.toLocaleString()} ر.س</span>
    </div>
    <button class="btn-primary" style="width:100%;margin-top:1rem;justify-content:center;" onclick="placeOrder()">
      ✅ تأكيد الطلب
    </button>
  `;
}

function placeOrder() {
  const form = document.getElementById('checkout-form');
  const name = document.getElementById('order-name')?.value;
  const phone = document.getElementById('order-phone')?.value;
  const address = document.getElementById('order-address')?.value;

  if (!name || !phone || !address) {
    showToast('⚠️ يرجى تعبئة جميع الحقول المطلوبة');
    return;
  }

  if (cart.length === 0) {
    showToast('⚠️ السلة فارغة!');
    return;
  }

  const orderId = 'WHG-' + Math.floor(Math.random() * 90000 + 10000);
  showToast(`🎉 تم تأكيد طلبك! رقم الطلب: ${orderId}`);

  cart = [];
  saveCart();
  updateCartBadge();

  setTimeout(() => navigate('home'), 3000);
}

// ===== WISHLIST =====
function toggleWishlist(productId, btn) {
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter(id => id !== productId);
    btn.textContent = '🤍';
    btn.classList.remove('active');
    showToast('💔 تمت إزالة المنتج من المفضلة');
  } else {
    wishlist.push(productId);
    btn.textContent = '❤️';
    btn.classList.add('active');
    showToast('❤️ تمت إضافة المنتج للمفضلة');
  }
  localStorage.setItem('whg_wishlist', JSON.stringify(wishlist));
}

// ===== TOAST =====
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// ===== CONTACT FORM =====
function submitContact(e) {
  e.preventDefault();
  showToast('✅ تم إرسال رسالتك بنجاح! سنرد عليك قريباً');
  e.target.reset();
}

// ===== SEARCH =====
function searchProducts(query) {
  if (!query.trim()) {
    renderProducts();
    return;
  }
  const q = query.toLowerCase();
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#aaa;">
      <div style="font-size:3rem;">🔍</div>
      <p>لا توجد نتائج لـ "${query}"</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img"><span>${p.icon}</span></div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="price">${p.price} ر.س</span>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">🛒 أضف</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();
  navigate('home');
});
