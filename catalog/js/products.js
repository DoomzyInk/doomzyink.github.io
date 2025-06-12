// Doomzy Ink - Product Data and Utilities

// Product Data
const products = [
    {
        id: 'doomzy-hoodie-1',
        name: 'Doomzy Hoodie',
        price: 64.99,
        description: 'Premium black hoodie with occult embroidery featuring the Doomzy Ink sigil on the back and subtle detailing on the sleeves.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Doomzy+Hoodie',
        category: 'Hoodies',
        tags: ['Cursed Drop', 'Cult Exclusive'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black'],
        stock: 42,
        limitedEdition: false,
        onSale: false,
        featured: true,
        vendor: 'Doomzy Ink',
        sku: 'DZ-HD-001',
        weight: 1.2,
        createdAt: '2023-01-15',
        rating: 4.8,
        reviews: 24,
        materials: ['80% Cotton', '20% Polyester']
    },
    {
        id: 'occult-tee-1',
        name: 'Occult Tee',
        price: 34.99,
        description: 'Classic black t-shirt with occult design featuring a minimalist sigil on the front and ritual symbols on the sleeves.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Occult+Tee',
        category: 'Shirts',
        tags: ['Drip Vault', 'Cursed Drop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black'],
        stock: 87,
        limitedEdition: false,
        onSale: true,
        salePrice: 27.99,
        featured: true,
        vendor: 'Doomzy Ink',
        sku: 'DZ-TS-001',
        weight: 0.3,
        createdAt: '2023-02-10',
        rating: 4.5,
        reviews: 36,
        materials: ['100% Organic Cotton']
    },
    {
        id: 'ritual-hat-1',
        name: 'Ritual Hat',
        price: 29.99,
        description: 'Black snapback with embroidered occult symbols and an adjustable strap for the perfect fit.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Ritual+Hat',
        category: 'Accessories',
        tags: ['Cult Exclusive'],
        sizes: ['One Size'],
        colors: ['Black'],
        stock: 15,
        limitedEdition: true,
        limitedStock: 3,
        onSale: false,
        featured: true,
        vendor: 'Doomzy Ink',
        sku: 'DZ-HT-001',
        weight: 0.2,
        createdAt: '2023-03-05',
        rating: 4.9,
        reviews: 18,
        materials: ['100% Cotton Twill']
    },
    {
        id: 'cursed-socks-1',
        name: 'Cursed Socks',
        price: 19.99,
        description: 'Ankle socks with hidden occult symbols and reinforced heel and toe for durability.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Cursed+Socks',
        category: 'Accessories',
        tags: ['Drip Vault'],
        sizes: ['One Size'],
        colors: ['Black', 'Navy'],
        stock: 56,
        limitedEdition: false,
        onSale: false,
        featured: false,
        vendor: 'Doomzy Ink',
        sku: 'DZ-SK-001',
        weight: 0.1,
        createdAt: '2023-01-20',
        rating: 4.7,
        reviews: 42,
        materials: ['80% Cotton', '15% Polyester', '5% Spandex']
    },
    {
        id: 'sacred-hoodie-1',
        name: 'Sacred Hoodie',
        price: 69.99,
        description: 'Limited edition hoodie with glow-in-the-dark print featuring sacred geometry and occult symbols.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Sacred+Hoodie',
        category: 'Hoodies',
        tags: ['Cursed Drop', 'Cult Exclusive'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'Dark Gray'],
        stock: 8,
        limitedEdition: true,
        limitedStock: 8,
        onSale: false,
        featured: true,
        vendor: 'Doomzy Ink',
        sku: 'DZ-HD-002',
        weight: 1.1,
        createdAt: '2023-03-15',
        rating: 5.0,
        reviews: 12,
        materials: ['70% Cotton', '30% Polyester']
    },
    {
        id: 'ritual-tee-1',
        name: 'Ritual Tee',
        price: 32.99,
        description: 'Dark ritual themed t-shirt with a distressed print of ancient symbols and sigils.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Ritual+Tee',
        category: 'Shirts',
        tags: ['Drip Vault'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Heather Gray'],
        stock: 24,
        limitedEdition: false,
        onSale: true,
        salePrice: 24.99,
        featured: false,
        vendor: 'Doomzy Ink',
        sku: 'DZ-TS-002',
        weight: 0.3,
        createdAt: '2023-02-25',
        rating: 4.6,
        reviews: 29,
        materials: ['100% Ring-Spun Cotton']
    },
    {
        id: 'arcane-joggers-1',
        name: 'Arcane Joggers',
        price: 59.99,
        description: 'Comfortable joggers with hidden pockets and subtle arcane symbols along the legs.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Arcane+Joggers',
        category: 'Bottoms',
        tags: ['Cult Exclusive'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Dark Gray'],
        stock: 18,
        limitedEdition: false,
        onSale: false,
        featured: true,
        vendor: 'Doomzy Ink',
        sku: 'DZ-JG-001',
        weight: 0.8,
        createdAt: '2023-03-10',
        rating: 4.8,
        reviews: 15,
        materials: ['85% Cotton', '15% Polyester']
    },
    {
        id: 'mystic-beanie-1',
        name: 'Mystic Beanie',
        price: 24.99,
        description: 'Warm beanie with an embroidered mystical eye symbol on the front.',
        image: 'https://via.placeholder.com/800x1000/1a1a1a/ffffff?text=Mystic+Beanie',
        category: 'Accessories',
        tags: ['New Arrivals'],
        sizes: ['One Size'],
        colors: ['Black', 'Charcoal'],
        stock: 32,
        limitedEdition: false,
        onSale: false,
        featured: true,
        vendor: 'Doomzy Ink',
        sku: 'DZ-BT-001',
        weight: 0.15,
        createdAt: '2023-04-01',
        rating: 4.7,
        reviews: 8,
        materials: ['100% Acrylic']
    }
];

// Utility Functions
function getAllProducts() {
    return [...products];
}

function getProductsByCategory(category) {
    return products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
    );
}

function getProductsByTag(tag) {
    return products.filter(product => 
        product.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
}

function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

function getProductsOnSale() {
    return products.filter(product => product.onSale);
}

function getLimitedEditionProducts() {
    return products.filter(product => product.limitedEdition);
}

function getProductById(id) {
    return products.find(product => product.id === id);
}

// Render Products to the Page
function renderProducts(productsToRender, containerId = 'product-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear existing products
    container.innerHTML = '';

    if (productsToRender.length === 0) {
        container.innerHTML = '<div class="no-products">No products found matching your criteria.</div>';
        return;
    }

    // Create product cards
    productsToRender.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.dataset.id = product.id;
        productElement.dataset.category = product.category.toLowerCase();
        productElement.dataset.tags = product.tags.join(' ').toLowerCase();

        // Limited edition badge
        let limitedBadge = '';
        if (product.limitedEdition) {
            const stockText = product.limitedStock ? `Only ${product.limitedStock} left!` : 'Limited Edition';
            limitedBadge = `<span class="limited-badge">${stockText}</span>`;
        }
        
        // Sale badge
        let saleBadge = '';
        if (product.onSale && !product.salePrice) {
            saleBadge = '<span class="sale-badge">SALE</span>';
        }

        // Create product card HTML
        productElement.innerHTML = `
            ${limitedBadge}
            ${saleBadge}
            <div class="product-image" style="background-image: url('${product.image}')">
                <div class="quick-view">Quick View</div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">
                    ${product.onSale && product.salePrice 
                        ? `<span class="sale-price">$${product.salePrice.toFixed(2)}</span>
                           <span class="original-price">$${product.price.toFixed(2)}</span>` 
                        : `$${product.price.toFixed(2)}`}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="size-selector">
                    <label for="size-${product.id}">Size:</label>
                    <select id="size-${product.id}" class="size-dropdown" 
                            onchange="document.querySelector('#add-to-cart-${product.id}').setAttribute('data-item-custom1-value', this.value)">
                        ${product.sizes.map(size => 
                            `<option value="${size}">${size}</option>`
                        ).join('')}
                    </select>
                </div>
                <button id="add-to-cart-${product.id}" 
                        class="add-to-cart snipcart-add-item"
                        data-item-id="${product.id}"
                        data-item-name="${product.name}"
                        data-item-price="${product.onSale && product.salePrice ? product.salePrice : product.price}"
                        data-item-url="${window.location.href}"
                        data-item-image="${product.image}"
                        data-item-description="${product.description}"
                        data-item-custom1-name="Size"
                        data-item-custom1-options="${product.sizes.join('|')}"
                        data-item-custom1-value="${product.sizes[0]}">
                    Add to Cart
                </button>
            </div>
            <div class="product-tags">
                ${product.tags.map(tag => 
                    `<span class="product-tag">${tag}</span>`
                ).join('')}
            </div>
        `;
        
        container.appendChild(productElement);
    });
    
    // Reinitialize Snipcart for the new elements
    if (window.Snipcart) {
        window.Snipcart.api.theme.cart.initialize();
    }
}

// Initialize the page with products
document.addEventListener('DOMContentLoaded', function() {
    // Check URL parameters for category or tag filters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const tag = urlParams.get('tag');
    
    let productsToShow = [];
    
    if (category) {
        productsToShow = getProductsByCategory(category);
        // Update page title
        document.title = `${category} | Doomzy Ink`;
        // Update active category in sidebar
        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            if (link.textContent.trim().toLowerCase() === category.toLowerCase()) {
                link.classList.add('active');
            }
        });
    } else if (tag) {
        productsToShow = getProductsByTag(tag);
        // Update page title
        document.title = `${tag} | Doomzy Ink`;
    } else if (window.location.pathname.includes('new-arrivals')) {
        // Show only featured products for new arrivals
        productsToShow = getFeaturedProducts();
    } else if (window.location.pathname.includes('on-sale')) {
        // Show only products on sale
        productsToShow = getProductsOnSale();
    } else {
        // Show all products by default
        productsToShow = getAllProducts();
    }
    
    // Render the filtered products
    renderProducts(productsToShow);
    
    // Update product count
    const productCount = document.getElementById('product-count');
    if (productCount) {
        productCount.textContent = `${productsToShow.length} ${productsToShow.length === 1 ? 'product' : 'products'}`;
    }
});

// Make functions available globally
window.DoomzyInk = window.DoomzyInk || {};
window.DoomzyInk.Products = {
    getAllProducts,
    getProductsByCategory,
    getProductsByTag,
    getFeaturedProducts,
    getProductsOnSale,
    getLimitedEditionProducts,
    getProductById,
    renderProducts
};