/**
 * AURELIA LUXURY BEAUTY PARLOUR & BRIDAL STUDIO
 * Interactive Editorial Experience & Micro-Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // State Management
  let cart = JSON.parse(localStorage.getItem('areena_beauty_services')) || [];
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  // DOM Elements
  const heroSection = document.getElementById('hero');
  const heroImageWrapper = document.getElementById('heroImageWrapper');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const centerBtn = document.getElementById('centerCursorBtn');
  const floatItems = document.querySelectorAll('.float-item');
  const soundToggle = document.getElementById('soundToggle');
  const mainHeader = document.getElementById('mainHeader');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const wishlistTriggerBtn = document.getElementById('wishlistTriggerBtn');
  const cartCount = document.getElementById('cartCount');
  const cartDrawerBadge = document.getElementById('cartDrawerBadge');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const searchModal = document.getElementById('searchModal');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchInput = document.getElementById('searchInput');
  const toastMessage = document.getElementById('toastMessage');

  // ==========================================================================
  // 1. Initial Hero Reveal Sequence (Opening Curtain & Staggered Text Slide-Up)
  // ==========================================================================
  function runEntranceAnimation() {
    setTimeout(() => {
      if (heroImageWrapper) heroImageWrapper.classList.add('revealed');
      if (heroSection) heroSection.classList.add('revealed');
    }, 200);
  }
  runEntranceAnimation();

  // ==========================================================================
  // 2. Custom Fluid Magnetic Cursor Follower
  // ==========================================================================
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    }
  });

  function renderCursor() {
    ringX += (targetMouseX - ringX) * 0.15;
    ringY += (targetMouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  function attachCursorHover() {
    const interactives = document.querySelectorAll('button, a, .magnetic-target, .circle-cat-card, .luxury-product-card, .insta-photo-box');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorRing) cursorRing.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('cursor-active');
      });
    });
  }
  attachCursorHover();

  // ==========================================================================
  // 3. Floating Micro-Cards Mouse Parallax Physics
  // ==========================================================================
  const floatItemStates = Array.from(floatItems).map(item => ({
    el: item,
    currentX: 0,
    currentY: 0,
    currentRot: 0,
    speed: parseFloat(item.dataset.speed) || 0.04,
    tilt: parseFloat(item.dataset.tilt) || 5
  }));

  function updateParallax() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const diffX = targetMouseX - centerX;
    const diffY = targetMouseY - centerY;

    floatItemStates.forEach(item => {
      const targetX = diffX * item.speed * 1.2;
      const targetY = diffY * item.speed * 1.2;
      const targetRot = (diffX / centerX) * item.tilt;

      item.currentX += (targetX - item.currentX) * 0.08;
      item.currentY += (targetY - item.currentY) * 0.08;
      item.currentRot += (targetRot - item.currentRot) * 0.08;

      item.el.style.transform = `translate3d(${item.currentX}px, ${item.currentY}px, 0px) rotate(${item.currentRot}deg)`;
    });

    requestAnimationFrame(updateParallax);
  }
  updateParallax();

  // ==========================================================================
  // 4. Center Seam Divider Button Magnetic Physics
  // ==========================================================================
  let centerBtnX = 0;
  let centerBtnY = 0;

  function handleCenterButtonMagnet() {
    if (!centerBtn) return;

    const rect = centerBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dist = Math.hypot(targetMouseX - btnCenterX, targetMouseY - btnCenterY);
    const triggerRadius = 140;

    if (dist < triggerRadius) {
      const strength = (1 - dist / triggerRadius) * 20;
      const angle = Math.atan2(targetMouseY - btnCenterY, targetMouseX - btnCenterX);
      
      const targetMoveX = Math.cos(angle) * strength;
      const targetMoveY = Math.sin(angle) * strength;

      centerBtnX += (targetMoveX - centerBtnX) * 0.2;
      centerBtnY += (targetMoveY - centerBtnY) * 0.2;
    } else {
      centerBtnX += (0 - centerBtnX) * 0.15;
      centerBtnY += (0 - centerBtnY) * 0.15;
    }

    centerBtn.style.transform = `translate3d(${centerBtnX}px, ${centerBtnY}px, 0)`;
    requestAnimationFrame(handleCenterButtonMagnet);
  }
  handleCenterButtonMagnet();

  if (centerBtn) {
    centerBtn.addEventListener('click', () => {
      const target = document.getElementById('areena-hero');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 5. Scroll Animations: Fade In & Slide Up on Scroll
  // ==========================================================================
  const scrollElements = document.querySelectorAll('.reveal-on-scroll');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  scrollElements.forEach(el => scrollObserver.observe(el));

  // Also trigger visible on initial load if already in viewport
  setTimeout(() => {
    scrollElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('is-visible');
      }
    });
  }, 350);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================================================
  // 6. Sanctuary Ambient Sound Synthesizer (Web Audio API)
  // ==========================================================================
  let audioCtx = null;
  let isSoundPlaying = false;
  let masterGain = null;
  let oscillators = [];

  function toggleAmbience() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isSoundPlaying) {
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 3);
      masterGain.connect(audioCtx.destination);

      const freqs = [136.1, 272.2, 340.5, 432];
      oscillators = freqs.map((f, i) => {
        const osc = audioCtx.createOscillator();
        const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
        const subGain = audioCtx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);

        const lfo = audioCtx.createOscillator();
        const lfoGain = audioCtx.createGain();
        lfo.frequency.value = 0.15 + i * 0.05;
        lfoGain.gain.value = 0.8;
        lfo.connect(osc.frequency);
        lfo.start();

        subGain.gain.value = 0.25 / freqs.length;
        osc.connect(subGain);

        if (panner) {
          panner.pan.value = (i / (freqs.length - 1)) * 1.6 - 0.8;
          subGain.connect(panner);
          panner.connect(masterGain);
        } else {
          subGain.connect(masterGain);
        }

        osc.start();
        return osc;
      });

      isSoundPlaying = true;
      soundToggle.classList.add('playing');
      const icon = document.getElementById('soundIcon');
      if (icon) icon.setAttribute('data-lucide', 'volume-2');
      if (window.lucide) window.lucide.createIcons();
      showToast('🌸 Parlour Zen Ambience Enabled (432Hz)');
    } else {
      if (masterGain) {
        masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        setTimeout(() => {
          oscillators.forEach(osc => osc.stop());
          oscillators = [];
        }, 1300);
      }
      isSoundPlaying = false;
      soundToggle.classList.remove('playing');
      const icon = document.getElementById('soundIcon');
      if (icon) icon.setAttribute('data-lucide', 'volume-x');
      if (window.lucide) window.lucide.createIcons();
      showToast('Ambience Muted');
    }
  }

  if (soundToggle) {
    soundToggle.addEventListener('click', toggleAmbience);
  }

  // ==========================================================================
  // 7. Interactive Appointment Slide-Over Drawer
  // ==========================================================================
  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.textContent = totalCount;
    if (cartDrawerBadge) cartDrawerBadge.textContent = totalCount;
    const mobileCartCount = document.getElementById('mobileCartCount');
    if (mobileCartCount) mobileCartCount.textContent = totalCount;
    if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    localStorage.setItem('areena_beauty_services', JSON.stringify(cart));
    renderCartItems();
  }

  function renderCartItems() {
    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-view">
          <div class="empty-cart-icon">🌸</div>
          <h4>No treatments selected yet</h4>
          <p>Choose from our signature hydra-derm facials, keratin hair spa rituals, or bridal makeover packages.</p>
          <button class="gold-shop-btn magnetic-target" onclick="closeCartDrawer(); window.location.href='#bestsellers';">
            Browse Signature Services
          </button>
        </div>
      `;
      return;
    }

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          <div class="cart-qty-ctrls">
            <button class="qty-btn" onclick="updateItemQuantity('${item.id}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove-btn magnetic-target" onclick="removeFromCart('${item.id}')" title="Remove treatment">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
    attachCursorHover();
  }

  window.addToCart = function(product) {
    const existingIndex = cart.findIndex(i => i.id === product.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    updateCartUI();
    openCartDrawer();
    showToast(`Added "${product.name}" to appointment list! 🌸`);
  };

  window.updateItemQuantity = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }

    updateCartUI();
  };

  window.removeFromCart = function(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
    showToast('Service removed from appointment list');
  };

  window.openCartDrawer = function() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('active');
      cartBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCartDrawer = function() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('active');
      cartBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (cartTriggerBtn) {
    cartTriggerBtn.addEventListener('click', window.openCartDrawer);
  }

  if (wishlistTriggerBtn) {
    wishlistTriggerBtn.addEventListener('click', () => {
      showToast('Saved treatments view — you have 3 rituals saved! ♡');
    });
  }

  window.handleCheckout = function() {
    if (cart.length === 0) {
      showToast('Please select at least one treatment first!');
      return;
    }
    showToast('🌸 Appointment requested! Our beauty concierge will call to confirm slot.');
  };

  updateCartUI();

  // ==========================================================================
  // 8. Wishlist, Category Filter, Search & Newsletter Handlers
  // ==========================================================================
  window.toggleWishlist = function(button, serviceName) {
    button.classList.toggle('liked');
    const isLiked = button.classList.contains('liked');
    showToast(isLiked ? `Saved "${serviceName}" to beauty wishlist ♡` : `Removed from wishlist`);
  };

  window.filterCategory = function(catId) {
    const cards = document.querySelectorAll('.luxury-product-card');
    cards.forEach(card => {
      if (catId === 'all' || card.dataset.category === catId) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });

    const bestSellersSec = document.getElementById('bestsellers');
    if (bestSellersSec) {
      bestSellersSec.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Displaying: ${catId.toUpperCase()} Services`);
  };

  // Testimonials Carousel
  window.nextTestimonial = function() {
    showToast('Browsing real bride & parlour guest testimonials ✨');
  };
  window.prevTestimonial = function() {
    showToast('Browsing real bride & parlour guest testimonials ✨');
  };

  // Search Modal
  window.toggleSearchModal = function(show) {
    if (!searchModal) return;
    if (show) {
      searchModal.classList.add('active');
      if (searchInput) searchInput.focus();
    } else {
      searchModal.classList.remove('active');
    }
  };

  if (searchTriggerBtn) {
    searchTriggerBtn.addEventListener('click', () => window.toggleSearchModal(true));
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) window.toggleSearchModal(false);
    });
  }

  window.applySearchTag = function(term) {
    window.toggleSearchModal(false);
    window.filterCategory(term);
  };

  // Account Trigger
  const accountBtn = document.getElementById('accountTriggerBtn');
  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      showToast('Welcome to Aurelia VIP Beauty Club ♡ Logged in as Member');
    });
  }

  // Newsletter Submit
  window.submitNewsletter = function() {
    const input = document.getElementById('newsletterInput');
    if (input && input.value) {
      input.value = '';
      showToast('🌸 15% OFF parlour voucher sent to your email!');
    }
  };

  // Toast Helper
  let toastTimer = null;
  function showToast(text) {
    if (!toastMessage) return;
    toastMessage.textContent = text;
    toastMessage.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 3200);
  }
  window.showToast = showToast;

  // ==========================================================================
  // 9. Mobile Side Navbar Drawer Controller
  // ==========================================================================
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

  window.openMobileNav = function() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      mobileNavDrawer.classList.add('active');
      mobileNavBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  };

  window.closeMobileNav = function() {
    if (mobileNavDrawer && mobileNavBackdrop) {
      mobileNavDrawer.classList.remove('active');
      mobileNavBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.toggleMobileAccordion = function(menuId, triggerBtn) {
    const submenu = document.getElementById(menuId);
    if (!submenu) return;
    const isOpen = submenu.classList.contains('is-open');
    if (isOpen) {
      submenu.classList.remove('is-open');
      if (triggerBtn) triggerBtn.classList.remove('is-active');
    } else {
      submenu.classList.add('is-open');
      if (triggerBtn) triggerBtn.classList.add('is-active');
    }
  };

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeMobileNav();
      window.closeCartDrawer();
    }
  });
});
