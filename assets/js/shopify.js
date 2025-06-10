// Shopify Integration for Doomzy Ink
// This file handles all the dynamic functionality for the Shopify store

document.addEventListener('DOMContentLoaded', function() {
  // Initialize quick view functionality
  initQuickView();
  
  // Initialize filter toggles
  initFilterToggles();
  
  // Initialize price range sliders
  initPriceRangeSliders();
  
  // Handle sort by dropdown
  initSortBy();
  
  // Handle AJAX add to cart
  initAjaxAddToCart();
  
  // Handle wishlist functionality
  initWishlist();
});

/**
 * Initialize quick view functionality
 */
function initQuickView() {
  // Handle quick view button clicks
  document.addEventListener('click', function(e) {
    const quickViewBtn = e.target.closest('.quick-view-button');
    if (!quickViewBtn) return;
    
    const productHandle = quickViewBtn.dataset.productHandle;
    openQuickView(productHandle);
  });
  
  // Close quick view when clicking outside or on close button
  document.addEventListener('click', function(e) {
    const quickViewModal = document.querySelector('.quick-view-modal.active');
    if (!quickViewModal) return;
    
    if (e.target === quickViewModal || e.target.closest('.close-quick-view')) {
      closeQuickView();
    }
  });
  
  // Close with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeQuickView();
    }
  });
}

/**
 * Open quick view modal
 * @param {string} productHandle - The handle of the product to display
 */
async function openQuickView(productHandle) {
  try {
    // Show loading state
    const quickViewModal = document.createElement('div');
    quickViewModal.className = 'quick-view-modal active';
    quickViewModal.id = `quick-view-${productHandle}`;
    quickViewModal.innerHTML = `
      <div class="quick-view-content">
        <button class="close-quick-view" aria-label="Close quick view">&times;</button>
        <div class="quick-view-loading">
          <div class="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(quickViewModal);
    document.body.style.overflow = 'hidden';
    
    // Fetch product data
    const response = await fetch(`/products/${productHandle}?view=quick-view`);
    if (!response.ok) throw new Error('Product not found');
    
    const html = await response.text();
    quickViewModal.querySelector('.quick-view-content').innerHTML = `
      <button class="close-quick-view" aria-label="Close quick view">&times;</button>
      ${html}
    `;
    
    // Initialize product form
    const productForm = quickViewModal.querySelector('.product-form');
    if (productForm) {
      initProductForm(productForm);
    }
    
  } catch (error) {
    console.error('Error loading quick view:', error);
    const quickViewModal = document.querySelector('.quick-view-modal.active');
    if (quickViewModal) {
      quickViewModal.querySelector('.quick-view-content').innerHTML = `
        <button class="close-quick-view" aria-label="Close quick view">&times;</button>
        <div class="quick-view-error">
          <p>Unable to load product. Please try again.</p>
          <button class="button" onclick="this.closest('.quick-view-modal').remove(); document.body.style.overflow = '';">
            Close
          </button>
        </div>
      `;
    }
  }
}

/**
 * Close quick view modal
 */
function closeQuickView() {
  const quickViewModal = document.querySelector('.quick-view-modal.active');
  if (quickViewModal) {
    quickViewModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove from DOM after animation
    setTimeout(() => {
      quickViewModal.remove();
    }, 300);
  }
}

/**
 * Initialize filter toggles for mobile
 */
function initFilterToggles() {
  const filterToggles = document.querySelectorAll('.filter-group-toggle');
  
  filterToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      const content = this.nextElementSibling;
      if (content) {
        content.style.maxHeight = isExpanded ? '0' : `${content.scrollHeight}px`;
        const indicator = this.querySelector('.filter-group-indicator');
        if (indicator) {
          indicator.textContent = isExpanded ? '+' : '−';
        }
      }
    });
    
    // Initialize state
    toggle.setAttribute('aria-expanded', 'true');
    const content = toggle.nextElementSibling;
    if (content) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
  
  // Mobile filter toggle
  const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
  const collectionSidebar = document.querySelector('.collection-sidebar');
  
  if (mobileFilterToggle && collectionSidebar) {
    mobileFilterToggle.addEventListener('click', function() {
      collectionSidebar.classList.toggle('active');
      document.body.style.overflow = collectionSidebar.classList.contains('active') ? 'hidden' : '';
    });
  }
}

/**
 * Initialize price range sliders
 */
function initPriceRangeSliders() {
  const priceRangeContainers = document.querySelectorAll('.price-range');
  
  priceRangeContainers.forEach(container => {
    const minInput = container.querySelector('.price-range-min');
    const maxInput = container.querySelector('.price-range-max');
    const minValue = container.querySelector('#filter-filter-v-price-gte');
    const maxValue = container.querySelector('#filter-filter-v-price-lte');
    
    if (!minInput || !maxInput || !minValue || !maxValue) return;
    
    const min = parseInt(minInput.min);
    const max = parseInt(maxInput.max);
    
    // Update input fields when sliders change
    function updateInputs() {
      minValue.value = minInput.value;
      maxValue.value = maxInput.value;
      updateSliderTrack(minInput, maxInput);
    }
    
    minInput.addEventListener('input', updateInputs);
    maxInput.addEventListener('input', updateInputs);
    
    // Prevent min from being greater than max and vice versa
    minInput.addEventListener('input', function() {
      if (parseInt(this.value) > parseInt(maxInput.value)) {
        this.value = maxInput.value;
      }
      updateInputs();
    });
    
    maxInput.addEventListener('input', function() {
      if (parseInt(this.value) < parseInt(minInput.value)) {
        this.value = minInput.value;
      }
      updateInputs();
    });
    
    // Initialize slider track
    updateSliderTrack(minInput, maxInput);
  });
}

/**
 * Update the slider track fill
 */
function updateSliderTrack(minInput, maxInput) {
  const min = parseInt(minInput.min);
  const max = parseInt(maxInput.max);
  const minVal = parseInt(minInput.value);
  const maxVal = parseInt(maxInput.value);
  
  const track = minInput.parentElement.querySelector('.price-range-track');
  if (track) {
    const minPercent = ((minVal - min) / (max - min)) * 100;
    const maxPercent = ((maxVal - min) / (max - min)) * 100;
    track.style.background = `linear-gradient(
      to right,
      #ddd ${minPercent}%,
      #8a2be2 ${minPercent}%,
      #8a2be2 ${maxPercent}%,
      #ddd ${maxPercent}%
    )`;
  }
}

/**
 * Initialize sort by dropdown
 */
function initSortBy() {
  const sortSelect = document.getElementById('sort-by');
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', function() {
    // Get current URL and update sort_by parameter
    const url = new URL(window.location.href);
    url.searchParams.set('sort_by', this.value);
    
    // Preserve other query parameters
    const filterParams = new URLSearchParams(window.location.search);
    filterParams.forEach((value, key) => {
      if (key.startsWith('filter.v.') || key === 'q') {
        url.searchParams.set(key, value);
      }
    });
    
    // Reload with new sort parameter
    window.location.href = url.toString();
  });
}

/**
 * Initialize AJAX add to cart functionality
 */
function initAjaxAddToCart() {
  document.addEventListener('submit', async function(e) {
    const form = e.target.closest('.add-to-cart-form, .product-form');
    if (!form) return;
    
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.innerHTML : '';
    
    try {
      // Show loading state
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner"></span> Adding...';
      }
      
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
      
      // Update cart count
      await updateCartCount();
      
      // Show success message
      showNotification('Item added to cart!', 'success');
      
      // Close quick view if open
      const quickView = form.closest('.quick-view-modal');
      if (quickView) {
        setTimeout(closeQuickView, 1000);
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Failed to add item to cart. Please try again.', 'error');
    } finally {
      // Reset button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      }
    }
  });
}

/**
 * Update cart count in the header
 */
async function updateCartCount() {
  try {
    const response = await fetch('/cart.js');
    const cart = await response.json();
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
      el.textContent = cart.item_count;
      el.classList.toggle('visible', cart.item_count > 0);
    });
    
    return cart;
  } catch (error) {
    console.error('Error updating cart count:', error);
  }
}

/**
 * Initialize wishlist functionality
 */
function initWishlist() {
  // Load wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('doomzy_wishlist')) || [];
  
  // Update wishlist buttons
  function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-button').forEach(button => {
      const productHandle = button.dataset.productHandle;
      if (!productHandle) return;
      
      const isInWishlist = wishlist.includes(productHandle);
      const icon = button.querySelector('i');
      
      button.classList.toggle('active', isInWishlist);
      if (icon) {
        icon.className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
      }
    });
  }
  
  // Toggle wishlist item
  function toggleWishlist(productHandle) {
    const index = wishlist.indexOf(productHandle);
    
    if (index === -1) {
      // Add to wishlist
      wishlist.push(productHandle);
      showNotification('Added to wishlist!', 'success');
    } else {
      // Remove from wishlist
      wishlist.splice(index, 1);
      showNotification('Removed from wishlist', 'info');
    }
    
    // Save to localStorage
    localStorage.setItem('doomzy_wishlist', JSON.stringify(wishlist));
    updateWishlistButtons();
  }
  
  // Handle wishlist button clicks
  document.addEventListener('click', function(e) {
    const wishlistBtn = e.target.closest('.wishlist-button');
    if (!wishlistBtn || !wishlistBtn.dataset.productHandle) return;
    
    e.preventDefault();
    toggleWishlist(wishlistBtn.dataset.productHandle);
  });
  
  // Initialize wishlist buttons on page load
  updateWishlistButtons();
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Hide after delay
  setTimeout(() => {
    notification.classList.remove('show');
    
    // Remove from DOM after animation
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/**
 * Initialize product form (for variants, quantity, etc.)
 */
function initProductForm(form) {
  const productForm = form;
  const productId = productForm.dataset.productId;
  const productJson = document.getElementById(`ProductJson-${productId}`);
  
  if (!productJson) return;
  
  const product = JSON.parse(productJson.textContent);
  const variantSelects = productForm.querySelectorAll('select[name="id"]');
  const addToCartButton = productForm.querySelector('.add-to-cart-button');
  const priceElement = productForm.querySelector('.product-price');
  
  // Handle variant changes
  function updateVariant() {
    const selectedOptions = [];
    
    // Get selected options
    productForm.querySelectorAll('input[type="radio"]:checked, select').forEach(input => {
      selectedOptions.push(input.value);
    });
    
    // Find matching variant
    const currentVariant = product.variants.find(variant => {
      return variant.options.every((option, index) => {
        return option === selectedOptions[index];
      });
    });
    
    if (!currentVariant) return;
    
    // Update URL with variant ID
    const url = new URL(window.location.href);
    url.searchParams.set('variant', currentVariant.id);
    window.history.replaceState({}, '', url);
    
    // Update form with selected variant ID
    variantSelects.forEach(select => {
      select.value = currentVariant.id;
    });
    
    // Update price
    if (priceElement) {
      const price = formatMoney(currentVariant.price);
      const comparePrice = currentVariant.compare_at_price 
        ? formatMoney(currentVariant.compare_at_price) 
        : null;
      
      if (comparePrice && currentVariant.compare_at_price > currentVariant.price) {
        priceElement.innerHTML = `
          <span class="sale-price">${price}</span>
          <span class="original-price"><s>${comparePrice}</s></span>
          <span class="sale-badge">SALE</span>
        `;
      } else {
        priceElement.textContent = price;
      }
    }
    
    // Update availability
    if (addToCartButton) {
      if (currentVariant.available) {
        addToCartButton.disabled = false;
        addToCartButton.textContent = 'ADD TO CART';
      } else {
        addToCartButton.disabled = true;
        addToCartButton.textContent = 'SOLD OUT';
      }
    }
    
    // Update image
    if (currentVariant.featured_image) {
      const imageElement = productForm.querySelector('.product-image');
      if (imageElement) {
        imageElement.src = currentVariant.featured_image.src;
        imageElement.srcset = `${currentVariant.featured_image.src} 1x, ${currentVariant.featured_image.src} 2x`;
      }
    }
  }
  
  // Add event listeners
  productForm.querySelectorAll('input[type="radio"], select').forEach(input => {
    input.addEventListener('change', updateVariant);
  });
  
  // Initialize
  updateVariant();
}

/**
 * Format money value
 */
function formatMoney(cents, format = '{{amount}}') {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  
  const value = parseInt(cents, 10) / 100;
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || '${{amount}}';
  
  function formatWithDelimiters(number, precision, thousands, decimal) {
    thousands = thousands || ',';
    decimal = decimal || '.';
    
    if (isNaN(number) || number === null) {
      return 0;
    }
    
    number = (number / 100.0).toFixed(precision);
    
    const parts = number.split('.');
    const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
    let result = dollars;
    
    if (parts[1]) {
      result += decimal + parts[1];
    }
    
    return result;
  }
  
  const match = formatString.match(placeholderRegex);
  
  if (!match) {
    return formatString;
  }
  
  const formatType = match[1];
  
  switch (formatType) {
    case 'amount':
      return formatWithDelimiters(cents, 2);
    case 'amount_no_decimals':
      return formatWithDelimiters(cents, 0);
    case 'amount_with_comma_separator':
      return formatWithDelimiters(cents, 2, '.', ',');
    case 'amount_no_decimals_with_comma_separator':
      return formatWithDelimiters(cents, 0, '.', ',');
    case 'amount_with_space_separator':
      return formatWithDelimiters(cents, 2, ' ', ',');
    case 'amount_no_decimals_with_space_separator':
      return formatWithDelimiters(cents, 0, ' ');
    case 'amount_with_apostrophe_separator':
      return formatWithDelimiters(cents, 2, "'");
  }
  
  return value;
}

// Expose functions to global scope for inline event handlers
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
