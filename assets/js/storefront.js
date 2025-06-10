/**
 * Doomzy Ink Storefront JavaScript
 * Handles all storefront functionality including navigation, animations, and product display
 */

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const productGrid = document.querySelector('.store-products-grid');
  const hero = document.querySelector('.store-hero');
  const scrollTopBtn = document.getElementById('back-to-top');
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const searchToggle = document.querySelector('.search-toggle');
  const searchForm = document.querySelector('.search-form');
  const closeSearch = document.querySelector('.close-search');
  const filterButtons = document.querySelectorAll('.store-filter-btn');
  const cartCount = document.querySelector('.cart-count');
  const loadingScreen = document.querySelector('.loading');
  
  // Cart state
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Initialize everything
  function init() {
    // Load products
    loadProducts();
    
    // Set up scroll event for nav
    setupScrollEffects();
    
    // Initialize mobile menu
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
    
    // Search toggle
    if (searchToggle) {
      searchToggle.addEventListener('click', function(e) {
        e.preventDefault();
        searchForm.classList.add('active');
        document.querySelector('.search-form input[type="search"]').focus();
      });
    }
    
    // Close search
    if (closeSearch) {
      closeSearch.addEventListener('click', function(e) {
        e.preventDefault();
        searchForm.classList.remove('active');
      });
    }
    
    // Scroll to top button
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      });
      
      scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Initialize filters
    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          const filterValue = this.getAttribute('data-filter');
          
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Filter products
          const products = document.querySelectorAll('.store-product-card');
          products.forEach(product => {
            if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
              product.style.display = 'block';
              setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
              }, 50);
            } else {
              product.style.opacity = '0';
              product.style.transform = 'translateY(20px)';
              setTimeout(() => {
                product.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
          // In a real app, you would send this to your server
          showNotification('Thanks for subscribing!');
          emailInput.value = '';
        } else {
          showNotification('Please enter a valid email address', 'error');
        }
      });
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Initial check for elements in viewport
    checkElementsInView();
    
    // Add hero flicker effect
    if (hero) {
      setInterval(heroFlicker, 5000);
    }
    
    // Hide loading screen when everything is loaded
    window.addEventListener('load', function() {
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.opacity = '0';
          loadingScreen.style.visibility = 'hidden';
          
          // Animate in content
          document.querySelectorAll('.store-fade-in').forEach((element, index) => {
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }, 100 * index);
          });
        }
      }, 500);
    });
  }
  
  // Initialize the storefront
  init();
  
  // Add to Cart event delegation
  document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart')) {
      e.preventDefault();
      const button = e.target.closest('.add-to-cart');
      const productCard = button.closest('.store-product-card');
      const productId = button.getAttribute('data-product-id');
      
      // In a real app, you would get this data from your products array
      const product = {
        id: productId,
        name: productCard.querySelector('.store-product-title')?.textContent || 'Product',
        price: productCard.querySelector('.store-product-price')?.textContent.trim() || '$0.00',
        image: productCard.querySelector('img')?.src || '',
        quantity: 1
      };
      
      addToCart(product);
    }
    
    // Quick view
    if (e.target.closest('.quick-view')) {
      e.preventDefault();
      const productId = e.target.closest('.quick-view').getAttribute('data-product-id');
      openQuickView(productId);
    }
  });
});

// Load products into the grid
async function loadProducts() {
  if (!productGrid) return;
  
  try {
    // Show loading state
    productGrid.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading products...</p></div>';
    
    // In a real app, you would fetch products from an API
    // For now, we'll use a sample product
    const products = [
      {
        id: '1',
        title: 'Cursed Design Tee',
        category: 'shirts',
        price: 29.99,
        comparePrice: 39.99,
        image: 'assets/images/placeholder-product.jpg',
        tags: ['new', 'bestseller']
      },
      // Add more sample products as needed
    ];
    
    // Add a small delay to show loading state (remove in production)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Render products
    productGrid.innerHTML = products.map(product => `
      <div class="store-product-card animate-on-scroll store-fade-in" data-category="${product.category}">
        <div class="store-product-image">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
          ${product.tags.includes('bestseller') ? '<span class="store-product-badge">Bestseller</span>' : ''}
          ${product.tags.includes('new') ? '<span class="store-product-badge new">New</span>' : ''}
          <div class="store-product-overlay">
            <button class="store-btn store-btn-outline quick-view" data-product-id="${product.id}">Quick View</button>
          </div>
        </div>
        <div class="store-product-info">
          <span class="store-product-category">${product.category}</span>
          <h3 class="store-product-title">${product.title}</h3>
          <div class="store-product-price">
            ${product.comparePrice ? 
              `<span>$${product.price.toFixed(2)}</span>
               <span class="original">$${product.comparePrice.toFixed(2)}</span>` : 
              `<span>$${product.price.toFixed(2)}</span>`}
          </div>
          <div class="store-product-actions">
            <button class="store-btn store-btn-primary add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
            <button class="store-btn store-btn-outline view-details" data-product-id="${product.id}">
              Details
            </button>
          </div>
        </div>
      </div>
    `).join('');
    
    // If no products, show empty state
    if (products.length === 0) {
      productGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-tshirt"></i>
          <h3>No Products Found</h3>
          <p>Check back soon for new arrivals!</p>
        </div>
      `;
    }
    
    // Re-initialize animations for the loaded products
    setupScrollAnimations();
    
  } catch (error) {
    console.error('Error loading products:', error);
    productGrid.innerHTML = `
      <div class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error Loading Products</h3>
        <p>We couldn't load the products. Please try again later.</p>
        <button class="store-btn store-btn-outline" onclick="window.location.reload()">
          Retry
        </button>
      </div>
    `;
  }
}

// Set up scroll effects for navigation
function setupScrollEffects() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide/show nav on scroll
    if (currentScroll <= 0) {
      nav.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
      // Scroll down
      nav.classList.remove('scroll-up');
      nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
      // Scroll up
      nav.classList.remove('scroll-down');
      nav.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
    
    // Check for elements in viewport for animations
    checkElementsInView();
  });
}

// Set up scroll animations
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
}

// Check if elements are in viewport for animations
function checkElementsInView() {
  const elements = document.querySelectorAll('.animate-on-scroll:not(.animate)');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  menuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
  document.body.classList.toggle('menu-open');
}

// Close mobile menu
function closeMobileMenu() {
  menuToggle.classList.remove('active');
  mobileNav.classList.remove('active');
  document.body.classList.remove('menu-open');
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Hero flicker effect
function heroFlicker() {
  if (!hero) return;
  
  hero.style.animation = 'flicker 0.5s';
  setTimeout(() => {
    hero.style.animation = '';
  }, 500);
}

// Initialize product interactions
function initProductInteractions() {
  // Quick view
  document.addEventListener('click', (e) => {
    const quickViewBtn = e.target.closest('.quick-view');
    if (!quickViewBtn) return;
    
    e.preventDefault();
    const productId = quickViewBtn.dataset.productId;
    openQuickView(productId);
  });
  
  // Add to cart
  document.addEventListener('click', (e) => {
    const addToCartBtn = e.target.closest('.add-to-cart');
    if (!addToCartBtn) return;
    
    e.preventDefault();
    const productId = addToCartBtn.dataset.productId;
    addToCart(productId);
  });
}

// Open quick view modal
function openQuickView(productId) {
  // In a real implementation, this would fetch product details and show a modal
  console.log('Quick view for product:', productId);
  showNotification('Quick view coming soon!', 'info');
}

// Add product to cart
function addToCart(productId) {
  // In a real implementation, this would add the product to the cart
  console.log('Added to cart:', productId);
  showNotification('Added to cart!', 'success');
  
  // Update cart count
  updateCartCount();
}

// Update cart count in the header
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (!cartCount) return;
  
  // In a real implementation, this would get the actual count from the cart
  const currentCount = parseInt(cartCount.textContent) || 0;
  cartCount.textContent = currentCount + 1;
  cartCount.classList.add('updated');
  
  // Remove the update class after animation
  setTimeout(() => {
    cartCount.classList.remove('updated');
  }, 300);
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide after delay
  setTimeout(() => {
    notification.classList.remove('show');
    
    // Remove from DOM after animation
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize filter buttons
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;
      
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter products
      const products = document.querySelectorAll('.product-card');
      products.forEach(product => {
        if (filterValue === 'all' || product.dataset.category === filterValue) {
          product.style.display = '';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (menuToggle && mobileNav) {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }
}

// Close mobile menu
function closeMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (menuToggle && mobileNav) {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}

// Hero flicker effect
function heroFlicker() {
  const hero = document.querySelector('.store-hero');
  if (!hero) return;
  
  hero.style.animation = 'flicker 0.5s';
  setTimeout(() => {
    hero.style.animation = '';
  }, 500);
}

// Add product to cart
function addToCart(product) {
  // Check if product is already in cart
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }
  
  // Update cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count in UI
  updateCartCount();
  
  // Show success notification
  showNotification(`${product.name} added to cart`);
  
  // Optional: Open cart drawer
  // openCartDrawer();
}

// Update cart count in the header
function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (!cartCount) return;
  
  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Open quick view modal
function openQuickView(productId) {
  // In a real app, you would fetch product details and show a modal
  showNotification(`Quick view for product ${productId} coming soon!`);
  
  // Example of what this might look like:
  /*
  const product = products.find(p => p.id === productId);
  if (product) {
    const modal = createQuickViewModal(product);
    document.body.appendChild(modal);
    modal.showModal();
  }
  */
}

// Show notification
function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">&times;</button>
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Auto-remove after delay
  const timeout = setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
  
  // Close button
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    clearTimeout(timeout);
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });
}

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function init() {
  // Initialize all components
  initFilters();
  setupScrollEffects();
  setupScrollAnimations();
  checkElementsInView();
}
