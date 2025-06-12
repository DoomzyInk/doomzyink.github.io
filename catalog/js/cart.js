// Doomzy Ink - Cart Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Listen for Snipcart events
    document.addEventListener('snipcart.ready', function() {
        // Update cart count when items are added/removed
        document.addEventListener('snipcart.cart.items.changed', updateCartCount);
        document.addEventListener('snipcart.cart.open', updateCartCount);
        document.addEventListener('snipcart.cart.closed', updateCartCount);
    });
    
    // Toggle mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Toggle search
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    
    if (searchToggle && searchForm) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchForm.classList.toggle('active');
            if (searchForm.classList.contains('active')) {
                searchForm.querySelector('input[type="search"]').focus();
            }
        });
    }
    
    // Handle quick view functionality
    document.addEventListener('click', function(e) {
        // Check if quick view button was clicked
        if (e.target.closest('.quick-view')) {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.dataset.id;
                openQuickView(productId);
            }
        }
    });
    
    // Close quick view when clicking outside
    document.addEventListener('click', function(e) {
        const quickView = document.querySelector('.quick-view-container');
        if (quickView && !quickView.contains(e.target) && !e.target.closest('.quick-view')) {
            closeQuickView();
        }
    });
    
    // Close quick view with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeQuickView();
        }
    });
});

// Update cart count in the header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    if (window.Snipcart) {
        const count = window.Snipcart.store.getState().cart.items.count || 0;
        cartCountElements.forEach(el => {
            el.textContent = count;
            el.setAttribute('aria-label', `${count} items in cart`);
        });
    }
}

// Open quick view modal
function openQuickView(productId) {
    // Close any open quick view first
    closeQuickView();
    
    // Get product data
    const product = window.DoomzyInk.Products.getProductById(productId);
    if (!product) return;
    
    // Create quick view HTML
    const quickViewHtml = `
        <div class="quick-view-container active">
            <div class="quick-view-overlay"></div>
            <div class="quick-view-content">
                <button class="close-quick-view" aria-label="Close quick view">&times;</button>
                <div class="quick-view-left">
                    <div class="quick-view-image" style="background-image: url('${product.image}')"></div>
                </div>
                <div class="quick-view-right">
                    <h2>${product.name}</h2>
                    <div class="price">
                        ${product.onSale && product.salePrice 
                            ? `<span class="sale-price">$${product.salePrice.toFixed(2)}</span>
                               <span class="original-price">$${product.price.toFixed(2)}</span>` 
                            : `$${product.price.toFixed(2)}`}
                    </div>
                    <p class="description">${product.description}</p>
                    
                    <form class="add-to-cart-form">
                        <div class="form-group">
                            <label for="quick-view-size">Size:</label>
                            <select id="quick-view-size" class="form-control" required>
                                ${product.sizes.map(size => 
                                    `<option value="${size}">${size}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="quick-view-quantity">Quantity:</label>
                            <input type="number" id="quick-view-quantity" class="form-control" min="1" value="1" required>
                        </div>
                        <button type="submit" class="btn-add-to-cart snipcart-add-item"
                                data-item-id="${product.id}"
                                data-item-name="${product.name}"
                                data-item-price="${product.onSale && product.salePrice ? product.salePrice : product.price}"
                                data-item-url="${window.location.href}"
                                data-item-image="${product.image}"
                                data-item-description="${product.description}"
                                data-item-custom1-name="Size"
                                data-item-custom1-options="${product.sizes.join('|')}"
                                data-item-custom1-value="${product.sizes[0]}"
                                data-item-quantity="1">
                            Add to Cart
                        </button>
                    </form>
                    
                    <div class="product-meta">
                        <div class="meta-item">
                            <i class="fas fa-truck"></i>
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-undo"></i>
                            <span>30-day returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add to DOM
    document.body.insertAdjacentHTML('beforeend', quickViewHtml);
    
    // Add event listeners
    const closeBtn = document.querySelector('.close-quick-view');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeQuickView);
    }
    
    const form = document.querySelector('.quick-view-container .add-to-cart-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const sizeSelect = document.getElementById('quick-view-size');
            const quantityInput = document.getElementById('quick-view-quantity');
            
            if (sizeSelect && quantityInput) {
                // Update the Snipcart button attributes
                const addToCartBtn = form.querySelector('.snipcart-add-item');
                if (addToCartBtn) {
                    addToCartBtn.setAttribute('data-item-custom1-value', sizeSelect.value);
                    addToCartBtn.setAttribute('data-item-quantity', quantityInput.value);
                    addToCartBtn.click();
                }
            }
        });
    }
    
    // Prevent body scroll when quick view is open
    document.body.style.overflow = 'hidden';
}

// Close quick view modal
function closeQuickView() {
    const quickView = document.querySelector('.quick-view-container');
    if (quickView) {
        quickView.remove();
        // Re-enable body scroll
        document.body.style.overflow = '';
    }
}

// Make functions available globally
window.DoomzyInk = window.DoomzyInk || {};
window.DoomzyInk.Cart = {
    updateCartCount,
    openQuickView,
    closeQuickView
};