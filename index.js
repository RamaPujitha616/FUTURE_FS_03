
// ─── DATA ───
const allProducts = [
  { 
    id:1, name:'Monstera Deliciosa', type:'indoor', 
    img:'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600', 
    category:'tropical', price:499.00, oldPrice:600.00, pot:'6"', leaves:'12', care:['Low Water','Med Light','Non-Toxic'], rating:4.9, reviews:127, badge:'Popular', desc:'The iconic Swiss cheese plant. Perfect for bright rooms, with stunning split leaves that grow dramatically over time.' 
  },
  { 
    id:2, name:'Desert Barrel Cactus', type:'outdoor', 
img:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600',    category:'succulent', price:500.00, oldPrice:599.00, pot:'4"', leaves:'—', care:['Minimal Water','Full Sun','Easy Care'], rating:4.7, reviews:84, badge:'', desc:'A low-maintenance beauty that thrives in sunny spots. Stores water efficiently — ideal for busy plant parents.' 
  },
  { 
    id:3, name:'Peace Lily', type:'indoor', 
    img:'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600', 
    category:'tropical', price:900.00, oldPrice:950.00, pot:'5"', leaves:'8', care:['Med Water','Low Light','Air Purifier'], rating:4.8, reviews:203, badge:'New', desc:'Elegant white blooms with glossy leaves. Excellent air purifier and thrives even in low-light corners.' 
  },
   { 
    id:7, name:'ZZ Plant', type:'indoor', 
img:'https://images.pexels.com/photos/3097770/pexels-photo-3097770.jpeg?auto=compress&w=600',    category:'indoor', price:950.00, oldPrice:1000.00, pot:'6"', leaves:'10', care:['Low Water','Any Light','Beginner Friendly'], rating:5.0, reviews:189, badge:'', desc:'Nearly indestructible — thrives on neglect. Glossy leaves and air-purifying qualities make it a top choice.' 
  },
  
  { 
    id:5, name:'String of Pearls', type:'indoor', 
    img:'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=600', 
    category:'succulent', price:1200.00, oldPrice:1400.00, pot:'4"', leaves:'trailing', care:['Low Water','Bright Light','Trailing'], rating:4.9, reviews:62, badge:'New', desc:'A cascading succulent with bead-like leaves. Perfect for hanging baskets and high shelves.' 
  },
  { 
    id:6, name:'Bird of Paradise', type:'outdoor', 
    img:'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=600', 
    category:'tropical', price:1000.00, oldPrice:1200.00, pot:'10"', leaves:'20', care:['Med Water','Full Sun','Bold'], rating:4.8, reviews:44, badge:'Sale', desc:'Stunning tropical plant with large paddle-shaped leaves. Creates a resort-like atmosphere on patios and balconies.' 
  },
 { 
    id:4, name:'Fiddle Leaf Fig', type:'indoor', 
img:'https://images.pexels.com/photos/3511755/pexels-photo-3511755.jpeg?auto=compress&w=600',    category:'tropical', price:800.00, oldPrice:1000.00, pot:'8"', leaves:'15', care:['Med Water','Bright Light','Statement Plant'], rating:4.6, reviews:96, badge:'Sale', desc:'The queen of interior plants. Large, violin-shaped leaves make a dramatic statement in any living space.' 
  },
  { 
    id:8, name:'Aloe Vera', type:'outdoor', 
    img:'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600', 
    category:'succulent', price:500.00, oldPrice:650.00, pot:'4"', leaves:'6', care:['Low Water','Full Sun','Medicinal'], rating:4.7, reviews:312, badge:'Popular', desc:'The world\'s most beloved succulent. Soothing gel inside, drought tolerant, and incredibly easy to care for.' 
  },
];

let cart = [];
let currentFilter = 'all';
let currentSort = 'default';
let selectedRating = 0;
let reviews = [
  { name:'A. Charishma', rating:4, text:'Absolutely love my Monstera! Arrived perfectly packed and has been thriving for months. The care instructions included were super helpful.', date:'January 2026' },
  { name:'A. Srinivasa Rao', rating:5, text:'The ZZ Plant I ordered is stunning. Perfect for my low-light apartment and it\'s been growing beautifully. Will definitely order again!', date:'February 2026' },
  { name:'A. Padma Latha', rating:4.5, text:'Great selection and fast delivery. My Peace Lily is flowering already — within 3 weeks of arrival. Customer service was very responsive.', date:'March 2026' },
];

// ─── RENDER PRODUCTS ───
function renderProducts() {
  let filtered = allProducts.filter(p => {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchFilter = currentFilter === 'all' || p.type === currentFilter || p.category === currentFilter;
    return matchSearch && matchFilter;
  });

  if (currentSort === 'price-asc') filtered.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  else if (currentSort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (currentSort === 'rating') filtered.sort((a,b) => b.rating - a.rating);

  const grid = document.getElementById('productsGrid');
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:3rem;font-size:1.1rem;">🌵 No plants found. Try a different search.</p>';
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" onclick="openProductModal(${p.id})">
      ${p.badge ? `<div class="product-badge ${p.badge==='New'?'new':''}">${p.badge}</div>` : ''}
<div class="product-img"><img src="${p.img}" alt="${p.name}"></div>      <div class="product-info">
        <div class="product-type">${p.type} · ${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-meta">
          <span>🪴 ${p.pot} pot</span>
          <span>⭐ ${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-care">${p.care.map(c=>`<span class="care-tag">${c}</span>`).join('')}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.oldPrice ? `<span class="old">₹${p.oldPrice}</span>` : ''}₹${p.price}
          </div>
          <div class="product-actions">
            <button class="wishlist-btn" onclick="event.stopPropagation();addToWishlist(${p.id})" title="Add to wishlist">❤️</button>
            <button class="add-to-cart" onclick="event.stopPropagation();addToCart(${p.id})" title="Add to cart">+</button>
            <button class="buy-now-btn" onclick="event.stopPropagation();buyNow(${p.id})" title="Buy now">🛒</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function filterProducts() { renderProducts(); }
function setFilter(val, el) {
  currentFilter = val;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderProducts();
}
function sortProducts(val) { currentSort = val; renderProducts(); }

// ─── PRODUCT MODAL ───
function openProductModal(id) {
  const p = allProducts.find(x => x.id === id);
document.getElementById('pmEmoji').innerHTML = `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:0;">`;
  document.getElementById('pmType').textContent = p.type.toUpperCase() + ' · ' + p.category.toUpperCase();
  document.getElementById('pmName').textContent = p.name;
  document.getElementById('pmStars').textContent = '★'.repeat(Math.round(p.rating)) + ` ${p.rating} (${p.reviews} reviews)`;
  document.getElementById('pmDesc').textContent = p.desc;
  document.getElementById('pmPrice').textContent = (p.oldPrice ? `₹${p.oldPrice}  ` : '') + `₹${p.price}`;
  document.getElementById('pmDetails').innerHTML = `
    <div class="pm-detail"><strong>Pot Size:</strong>${p.pot}</div>
    <div class="pm-detail"><strong>Care:</strong>${p.care.join(', ')}</div>
    <div class="pm-detail"><strong>Type:</strong>${p.type}</div>
  `;
  
  // Set up button handlers
  document.getElementById('pmAddBtn').onclick = () => { 
    addToCart(id); 
    closeProductModal(); 
  };
  
  document.getElementById('pmBuyBtn').onclick = () => { 
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      alert('Please login to make a purchase.');
      closeProductModal();
      window.location.href = 'login.html';
      return;
    }
    
    // Show order modal with product details
    closeProductModal();
    showOrderModal(p);
  };
  
  document.getElementById('productModal').classList.add('open');
}
function closeProductModal() { document.getElementById('productModal').classList.remove('open'); }

// ─── CART ───
function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCart();
  showToast(`🌿 ${p.name} added to cart!`);
}

function updateCart() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    items.innerHTML = '<div class="cart-empty"><div class="empty-icon">🪴</div><p>Your cart is empty.<br>Add some plants!</p></div>';
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  items.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">🌿</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${(item.price * item.qty).toFixed(2)}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${item.id})">🗑</button>
    </div>
  `).join('');
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = `₹${total.toFixed(2)}`;
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  updateCart();
}
function removeFromCart(id) { cart = cart.filter(x => x.id !== id); updateCart(); }

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) return;
  cart = []; updateCart(); toggleCart();
  showToast('✅ Order placed! Thank you for shopping with us.');
}

// ─── REVIEWS ───
function renderReviews() {
  document.getElementById('reviewsGrid').innerHTML = reviews.map(r => `
    <div class="review-card reveal">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <div class="review-text">${r.text}</div>
      <div class="reviewer">
        <div class="reviewer-avatar">${r.name[0]}</div>
        <div><div class="reviewer-name">${r.name}</div><div class="reviewer-date">${r.date}</div></div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function openReviewModal() { document.getElementById('reviewModal').classList.add('open'); }
function closeReviewModal() {
  document.getElementById('reviewModal').classList.remove('open');
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
  selectedRating = 0;
  updateStars();
}

function setRating(val) { selectedRating = val; updateStars(); }
function updateStars() {
  document.querySelectorAll('.star-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.val) <= selectedRating);
  });
}

function submitReview() {
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  let valid = true;

  if (!name) { showErr('reviewNameErr', 'reviewName'); valid = false; } else { hideErr('reviewNameErr', 'reviewName'); }
  if (!selectedRating) { document.getElementById('reviewRatingErr').classList.add('show'); valid = false; } else { document.getElementById('reviewRatingErr').classList.remove('show'); }
  if (!text) { showErr('reviewTextErr', 'reviewText'); valid = false; } else { hideErr('reviewTextErr', 'reviewText'); }

  if (!valid) return;

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const now = new Date();
  reviews.unshift({ name, rating: selectedRating, text, date: `${months[now.getMonth()]} ${now.getFullYear()}` });
  renderReviews();
  closeReviewModal();
  showToast('⭐ Thank you for your review!');
}

// ─── CONTACT ───
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value.trim();
  let valid = true;

  if (!name) { showErr('contactNameErr','contactName'); valid=false; } else { hideErr('contactNameErr','contactName'); }
  if (!email || !email.includes('@') || !email.includes('.')) { showErr('contactEmailErr','contactEmail'); valid=false; } else { hideErr('contactEmailErr','contactEmail'); }
  if (!message) { showErr('contactMessageErr','contactMessage'); valid=false; } else { hideErr('contactMessageErr','contactMessage'); }

  if (!valid) return;

  // Show loading state
  const submitBtn = event.target.querySelector('.send-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '📤 Sending...';
  submitBtn.disabled = true;

  // Submit to Formspree
  fetch(event.target.action, {
    method: 'POST',
    body: new FormData(event.target),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    console.log('Response status:', response.status);
    if (response.ok) {
      // Clear form
      document.getElementById('contactName').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactMessage').value = '';
      document.getElementById('contactSubject').selectedIndex = 0;
      
      showToast('📬 Message sent! We\'ll get back to you soon.');
    } else {
      console.log('Response not ok:', response);
      showToast(`❌ Error ${response.status}: Please try again.`);
    }
  }).catch(error => {
    console.error('Fetch error:', error);
    showToast('❌ Network error. Check your connection and try again.');
  }).finally(() => {
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// ─── HELPERS ───
function showErr(errId, inputId) {
  document.getElementById(errId).classList.add('show');
  document.getElementById(inputId).classList.add('input-error');
}
function hideErr(errId, inputId) {
  document.getElementById(errId).classList.remove('show');
  document.getElementById(inputId).classList.remove('input-error');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ─── SCROLL ───
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function closeMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// Close modals on overlay click
document.getElementById('reviewModal').addEventListener('click', function(e) { if(e.target===this) closeReviewModal(); });
document.getElementById('productModal').addEventListener('click', function(e) { if(e.target===this) closeProductModal(); });

// ─── INIT ───
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  
  // If user is not logged in, redirect to advertising page
  if (!isLoggedIn) {
    window.location.href = 'advertising.html';
    return;
  }
  
  if (isLoggedIn && userName) {
    // Update UI for logged in user
    console.log('User is logged in:', userName);
    
    // Show dashboard button in navigation
    const dashboardBtn = document.getElementById('dashboardBtn');
    if (dashboardBtn) {
      dashboardBtn.style.display = 'block';
      dashboardBtn.textContent = `👤 ${userName}`;
    }
    
    // Show logout button in navigation
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.style.display = 'block';
    }
    
    // Show welcome message in hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = `Bring <span style="font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700; color: var(--terracotta);">Nature</span> Into Your Space`;
    }
    
    // Load user-specific data
    loadUserCart();
    loadUserWishlist();
  }
  
  renderProducts();
  renderReviews();
  observeReveal();
});

function logoutToAdvertising() {
  // Clear login state
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userPhone');
  
  // Redirect to advertising page
  window.location.href = 'advertising.html';
}

// User account functions
function showUserAccount() {
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userPhone = localStorage.getItem('userPhone');
  const joinDate = localStorage.getItem('loginTime');
  
  const wishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
  const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
  
  // Update dashboard content
  document.getElementById('dashboardUserName').textContent = userName || 'User';
  document.getElementById('dashboardUserEmail').textContent = userEmail || 'user@example.com';
  document.getElementById('cartCount').textContent = cart.length;
  document.getElementById('wishlistCount').textContent = wishlist.length;
  document.getElementById('ordersCount').textContent = orders.length;
  
  // Update recent orders
  const recentOrdersDiv = document.getElementById('recentOrders');
  if (orders.length > 0) {
    const recentOrders = orders.slice(-3).reverse();
    recentOrdersDiv.innerHTML = recentOrders.map(order => `
      <div class="order-item-dashboard">
        <strong>Order #${order.id}</strong><br>
        ${order.items[0].productName} - ₹${order.totalAmount}<br>
        <small>${new Date(order.orderDate).toLocaleDateString()}</small>
      </div>
    `).join('');
  } else {
    recentOrdersDiv.innerHTML = '<p class="no-data">No orders yet</p>';
  }
  
  // Update wishlist
  const wishlistDiv = document.getElementById('wishlistItems');
  if (wishlist.length > 0) {
    wishlistDiv.innerHTML = wishlist.slice(0, 5).map(item => `
      <div class="wishlist-item-dashboard">
        ${item.name} - ₹${item.price}
      </div>
    `).join('');
  } else {
    wishlistDiv.innerHTML = '<p class="no-data">No items in wishlist</p>';
  }
  
  // Show dashboard modal
  document.getElementById('dashboardModal').classList.add('open');
}

function closeDashboard() {
  document.getElementById('dashboardModal').classList.remove('open');
}

function viewAllOrders() {
  const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
  if (orders.length === 0) {
    showToast('No orders yet');
    return;
  }
  
  let ordersList = '📦 All Orders\n================\n\n';
  orders.forEach((order, index) => {
    ordersList += `Order #${order.id}\n`;
    ordersList += `Product: ${order.items[0].productName}\n`;
    ordersList += `Quantity: ${order.items[0].quantity}\n`;
    ordersList += `Total: ₹${order.totalAmount}\n`;
    ordersList += `Date: ${new Date(order.orderDate).toLocaleDateString()}\n`;
    ordersList += `Status: ${order.status}\n\n`;
  });
  
  alert(ordersList);
}

function viewWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
  if (wishlist.length === 0) {
    showToast('No items in wishlist');
    return;
  }
  
  let wishlistList = '❤️ Your Wishlist\n================\n\n';
  wishlist.forEach((item, index) => {
    wishlistList += `${index + 1}. ${item.name}\n`;
    wishlistList += `   Price: ₹${item.price}\n`;
    wishlistList += `   Type: ${item.type}\n\n`;
  });
  
  alert(wishlistList);
}

function showSettings() {
  showToast('Settings feature coming soon!');
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    // Save cart before logout
    localStorage.setItem('userCart', JSON.stringify(cart));
    
    // Clear login data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('loginTime');
    
    alert('You have been logged out successfully.');
    window.location.href = 'login.html';
  }
}

function loadUserCart() {
  const savedCart = JSON.parse(localStorage.getItem('userCart') || '[]');
  if (savedCart.length > 0) {
    cart = savedCart;
    updateCart();
  }
}

function loadUserWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
  console.log('User wishlist loaded:', wishlist);
}

function addToWishlist(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  
  const wishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
  
  if (!wishlist.find(item => item.id === productId)) {
    wishlist.push(product);
    localStorage.setItem('userWishlist', JSON.stringify(wishlist));
    showToast(`❤️ ${product.name} added to wishlist!`);
  } else {
    showToast(`${product.name} is already in your wishlist!`);
  }
}

function buyNow(productId) {
  // Check if user is logged in
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert('Please login to make a purchase.');
    window.location.href = 'login.html';
    return;
  }
  
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;
  
  // Update order summary with product details
  const orderSummary = document.getElementById('orderSummary');
  orderSummary.innerHTML = `
    <h3>📦 Order Summary</h3>
    <div class="order-item">
      <span>${product.name}</span>
      <span>₹${product.price}</span>
    </div>
    <div class="order-item">
      <span>Pot Size</span>
      <span>${product.pot}</span>
    </div>
    <div class="order-item">
      <strong>Total Amount</strong>
      <strong id="totalAmount">₹${product.price}</strong>
    </div>
  `;
  
  // Pre-fill user information if available
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userPhone = localStorage.getItem('userPhone');
  
  if (userName) document.getElementById('orderName').value = userName;
  if (userEmail) document.getElementById('orderEmail').value = userEmail;
  if (userPhone) document.getElementById('orderPhone').value = userPhone;
  
  // Store current product for order processing
  localStorage.setItem('currentOrderProduct', JSON.stringify(product));
  
  // Add quantity change listener
  document.getElementById('orderQuantity').addEventListener('change', updateTotal);
  
  // Scroll to order section
  document.getElementById('orderSection').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

function updateTotal() {
  const product = JSON.parse(localStorage.getItem('currentOrderProduct'));
  const quantity = parseInt(document.getElementById('orderQuantity').value);
  const total = product.price * quantity;
  document.getElementById('totalAmount').textContent = `₹${total}`;
}

function scrollToTop() {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
}

function processOrder(event) {
  event.preventDefault();
  
  const name = document.getElementById('orderName').value;
  const phone = document.getElementById('orderPhone').value;
  const email = document.getElementById('orderEmail').value;
  const address = document.getElementById('orderAddress').value;
  const quantity = parseInt(document.getElementById('orderQuantity').value);
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const notes = document.getElementById('orderNotes').value;
  
  const product = JSON.parse(localStorage.getItem('currentOrderProduct'));
  const totalAmount = product.price * quantity;
  
  // Create order
  const order = {
    id: Date.now(),
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    deliveryAddress: address,
    paymentMethod: payment,
    specialNotes: notes,
    items: [{
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: quantity
    }],
    totalAmount: totalAmount,
    orderDate: new Date().toISOString(),
    status: 'Processing'
  };
  
  // Save order to user's order history
  const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
  orders.push(order);
  localStorage.setItem('userOrders', JSON.stringify(orders));
  
  // Show confirmation
  showOrderConfirmation(order);
  
  // Close modal and reset form
  closeOrderModal();
  document.getElementById('orderForm').reset();
  
  // Clear current product
  localStorage.removeItem('currentOrderProduct');
}

function showOrderConfirmation(order) {
  const confirmation = `
🎉 Order Placed Successfully!
============================
Order ID: #${order.id}
Customer: ${order.customerName}
Phone: ${order.customerPhone}
Email: ${order.customerEmail}

📦 Order Details:
Product: ${order.items[0].productName}
Price: ₹${order.items[0].price}
Total: ₹${order.totalAmount}
Payment: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}

🚚 Delivery Address:
${order.deliveryAddress}

Status: ${order.status}
Order Date: ${new Date(order.orderDate).toLocaleDateString()}

Thank you for your purchase! We'll contact you soon for delivery confirmation.
  `;
  
  alert(confirmation);
}

function toggleDarkMode() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  const isDark = body.classList.toggle('dark');

  // Update button label
  btn.textContent = isDark ? '☀️ Light' : '🌙 Dark';

  // Save preference so it remembers after refresh
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// On page load — restore saved theme
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️ Light';
  }
})();
