// Doomzy Ink - Product Filtering and Sorting

document.addEventListener('DOMContentLoaded', function() {
    // Initialize filter elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tagButtons = document.querySelectorAll('.tag-btn');
    const sortSelect = document.getElementById('sort-by');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyFilterBtn = document.querySelector('.apply-filter');
    const inStockCheckbox = document.getElementById('in-stock-only');
    const sidebar = document.querySelector('.catalog-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    
    // Initialize event listeners for filter elements
    function initializeFilterListeners() {
        // Color filter buttons
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                const color = option.dataset.color;
                if (color) {
                    filterByColor(color);
                }
            });
        });
        
        // Size filter buttons
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                const size = option.dataset.size;
                if (size) {
                    filterBySize(size);
                }
            });
        });
        
        // Rating filter buttons
        document.querySelectorAll('.rating-option').forEach(option => {
            option.addEventListener('click', () => {
                const rating = parseInt(option.dataset.rating);
                if (!isNaN(rating)) {
                    filterByRating(rating);
                }
            });
        });
        
        // In-stock filter
        if (inStockCheckbox) {
            inStockCheckbox.addEventListener('change', applyFilters);
        }
        
        // Price range filter apply button
        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', applyFilters);
        }
        
        // Sort dropdown
        if (sortSelect) {
            sortSelect.addEventListener('change', applyFilters);
        }
        
        // Close sidebar after clicking on a filter on mobile
        document.querySelectorAll('.sidebar-content a, .apply-filter').forEach(el => {
            el.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar?.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Toggle sidebar on mobile
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', function() {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== mobileMenuToggle && 
            !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Toggle sidebar on desktop
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-collapsed');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('sidebar-collapsed')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    }
    
    // Handle category filter clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Handle tag filter clicks
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');
            filterByTag(tag);
            
            // Toggle active state
            this.classList.toggle('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Handle price filter apply button
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilters);
    }
    
    // Handle sort change
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    // Filter by category
    function filterByCategory(category) {
        // Update URL without page reload
        const url = new URL(window.location);
        
        if (category === 'all') {
            url.searchParams.delete('category');
        } else {
            url.searchParams.set('category', category);
        }
        
        // Remove tag filter when selecting a category
        url.searchParams.delete('tag');
        
        // Update browser URL without reload
        window.history.pushState({}, '', url);
        
        // Update page title
        if (category !== 'all') {
            document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} | Doomzy Ink`;
        } else {
            document.title = 'Shop All | Doomzy Ink';
        }
        
        // Apply filters
        applyFilters();
    }
    
    // Filter by tag
    function filterByTag(tag) {
        // Update URL without page reload
        const url = new URL(window.location);
        
        // Toggle tag in URL
        const tags = new Set(url.searchParams.get('tags')?.split(',').filter(Boolean) || []);
        if (tags.has(tag)) {
            tags.delete(tag);
        } else {
            tags.add(tag);
        }
        
        // Update URL with new tags
        if (tags.size > 0) {
            url.searchParams.set('tags', Array.from(tags).join(','));
        } else {
            url.searchParams.delete('tags');
        }
        
        // Update browser URL without reload
        window.history.pushState({}, '', url);
        
        // Apply filters
        applyFilters();
    }
    
    // Filter by color
    function filterByColor(color) {
        const url = new URL(window.location);
        const colors = new Set(url.searchParams.get('colors')?.split(',').filter(Boolean) || []);
        
        if (colors.has(color)) {
            colors.delete(color);
        } else {
            colors.add(color);
        }
        
        if (colors.size > 0) {
            url.searchParams.set('colors', Array.from(colors).join(','));
        } else {
            url.searchParams.delete('colors');
        }
        
        window.history.pushState({}, '', url);
        applyFilters();
    }
    
    // Filter by size
    function filterBySize(size) {
        const url = new URL(window.location);
        const sizes = new Set(url.searchParams.get('sizes')?.split(',').filter(Boolean) || []);
        
        if (sizes.has(size)) {
            sizes.delete(size);
        } else {
            // Only allow one size at a time for sizes
            sizes.clear();
            sizes.add(size);
        }
        
        if (sizes.size > 0) {
            url.searchParams.set('sizes', Array.from(sizes).join(','));
        } else {
            url.searchParams.delete('sizes');
        }
        
        window.history.pushState({}, '', url);
        applyFilters();
    }
    
    // Filter by rating
    function filterByRating(rating) {
        const url = new URL(window.location);
        const currentRating = parseInt(url.searchParams.get('minRating') || '0');
        
        if (currentRating === rating) {
            // Clicking the same rating again removes the filter
            url.searchParams.delete('minRating');
        } else {
            url.searchParams.set('minRating', rating);
        }
        
        window.history.pushState({}, '', url);
        applyFilters();
    }
    
    // Apply all active filters
    function applyFilters() {
        // Update URL with current filters
        const url = new URL(window.location);
        const urlParams = new URLSearchParams(window.location.search);
        
        // Update sort in URL
        if (sortSelect) {
            if (sortSelect.value !== 'featured') {
                url.searchParams.set('sort', sortSelect.value);
            } else {
                url.searchParams.delete('sort');
            }
        }
        
        // Update price range in URL
        const minPrice = parseFloat(minPriceInput?.value) || 0;
        const maxPrice = parseFloat(maxPriceInput?.value) || '';
        
        if (minPrice > 0) {
            url.searchParams.set('minPrice', minPrice.toString());
        } else {
            url.searchParams.delete('minPrice');
        }
        
        if (maxPrice) {
            url.searchParams.set('maxPrice', maxPrice.toString());
        } else {
            url.searchParams.delete('maxPrice');
        }
        
        // Update in-stock filter in URL
        const inStockOnly = document.getElementById('in-stock-only')?.checked || false;
        if (inStockOnly) {
            url.searchParams.set('inStock', 'true');
        } else {
            url.searchParams.delete('inStock');
        }
        
        // Update browser URL without reload
        window.history.pushState({}, '', url);
        
        // Get products and apply filters
        let filteredProducts = [...window.DoomzyInk.Products.getAllProducts()];
        
        // Update UI to reflect current filters
        updateActiveFilters();
        
        // Parse filter values from URL
        const currentFilters = {
            categories: urlParams.get('category') ? [urlParams.get('category').toLowerCase()] : [],
            tags: urlParams.get('tags') ? urlParams.get('tags').split(',').filter(Boolean).map(t => t.toLowerCase()) : [],
            colors: urlParams.get('colors') ? urlParams.get('colors').split(',').filter(Boolean).map(c => c.toLowerCase()) : [],
            sizes: urlParams.get('sizes') ? urlParams.get('sizes').split(',').filter(Boolean).map(s => s.toUpperCase()) : [],
            minPrice: parseFloat(urlParams.get('minPrice')) || 0,
            maxPrice: parseFloat(urlParams.get('maxPrice')) || Infinity,
            inStockOnly: urlParams.get('inStock') === 'true',
            minRating: parseInt(urlParams.get('minRating')) || 0,
            searchTerm: urlParams.get('search') || ''
        };
        
        // Filter products based on current filters
        function filterProducts(products) {
            // Use the currentFilters defined in the parent scope
            return products.filter(product => {
                // Filter by category
                if (currentFilters.categories.length > 0 && 
                    !currentFilters.categories.includes(product.category.toLowerCase())) {
                    return false;
                }
                
                // Filter by tags
                if (currentFilters.tags.length > 0 && 
                    !currentFilters.tags.some(tag => 
                        product.tags?.map(t => t.toLowerCase()).includes(tag)
                    )) {
                    return false;
                }
                
                // Filter by colors
                if (currentFilters.colors.length > 0) {
                    const productColors = product.colors?.map(c => c.toLowerCase()) || [];
                    if (!currentFilters.colors.some(color => productColors.includes(color))) {
                        return false;
                    }
                }
                
                // Filter by sizes
                if (currentFilters.sizes.length > 0) {
                    const productSizes = product.sizes?.map(s => s.toUpperCase()) || [];
                    if (!currentFilters.sizes.some(size => productSizes.includes(size))) {
                        return false;
                    }
                }
                
                // Filter by price range
                const price = product.onSale && product.salePrice ? product.salePrice : product.price;
                if (price < currentFilters.minPrice || price > currentFilters.maxPrice) {
                    return false;
                }
                
                // Filter by stock status
                if (currentFilters.inStockOnly && (product.stock === 0 || product.stock === '0')) {
                    return false;
                }
                
                // Filter by minimum rating
                if (currentFilters.minRating > 0 && (!product.rating || product.rating < currentFilters.minRating)) {
                    return false;
                }
                
                // Filter by search term
                if (currentFilters.searchTerm) {
                    const searchLower = currentFilters.searchTerm.toLowerCase();
                    const matchesName = product.name.toLowerCase().includes(searchLower);
                    const matchesDescription = product.description.toLowerCase().includes(searchLower);
                    const matchesTags = product.tags?.some(tag => tag.toLowerCase().includes(searchLower)) || false;
                    
                    if (!matchesName && !matchesDescription && !matchesTags) {
                        return false;
                    }
                }
                
                return true;
            });
            
        }
        
        filteredProducts = filterProducts(filteredProducts);
        
        // Apply sorting
        if (sortSelect) {
            const sortBy = sortSelect.value;
            filteredProducts.sort((a, b) => {
                switch(sortBy) {
                    case 'price-asc':
                        return (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price);
                    case 'price-desc':
                        return (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price);
                    case 'name-asc':
                        return a.name.localeCompare(b.name);
                    case 'name-desc':
                        return b.name.localeCompare(a.name);
                    case 'newest':
                        // Assuming newer products have higher IDs
                        return (b.id || '').localeCompare(a.id || '');
                    default: // 'featured'
                        // Featured products first, then by name
                        if (a.featured && !b.featured) return -1;
                        if (!a.featured && b.featured) return 1;
                        return a.name.localeCompare(b.name);
                }
            });
        }
        
        // Update product count
        const productCount = document.getElementById('product-count');
        if (productCount) {
            const count = filteredProducts.length;
            productCount.textContent = `${count} ${count === 1 ? 'product' : 'products'}`;
            
            // Update all category counts
            document.querySelectorAll('.filter-btn .item-count').forEach(span => {
                const category = span.closest('.filter-btn').getAttribute('data-category');
                if (category) {
                    const categoryCount = window.DoomzyInk.Products.getProductsByCategory(category).length;
                    span.textContent = categoryCount;
                }
            });
        }
        
        // Update URL with current filters for sharing
        updateFilterIndicators();
    }

    // Update product count
    const productCount = document.getElementById('product-count');
    if (productCount) {
        const count = filteredProducts.length;
        productCount.textContent = `${count} ${count === 1 ? 'product' : 'products'}`;

        // Update all category counts
        document.querySelectorAll('.filter-btn .item-count').forEach(span => {
            const category = span.closest('.filter-btn').getAttribute('data-category');
            if (category) {
                const categoryCount = window.DoomzyInk.Products.getProductsByCategory(category).length;
                span.textContent = categoryCount;
            }
        });
        
        if (!isNaN(minPrice) && minPriceInput) {
            minPriceInput.value = minPrice;
        }
        
        if (!isNaN(maxPrice) && maxPriceInput) {
            maxPriceInput.value = maxPrice;
        }
        
        // Update sort selection
        const sortBy = urlParams.get('sort');
        if (sortBy && sortSelect) {
            sortSelect.value = sortBy;
        }
    }
    
    // Update filter indicators in the UI
    function updateFilterIndicators() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Update active states of category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            const category = btn.dataset.category?.toLowerCase();
            const currentCategory = urlParams.get('category')?.toLowerCase();
            if (currentCategory && category === currentCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update active states of tag buttons
        document.querySelectorAll('.tag-btn').forEach(btn => {
            const tag = btn.dataset.tag?.toLowerCase();
            const currentTags = urlParams.get('tags')?.toLowerCase().split(',').filter(Boolean) || [];
            if (currentTags.includes(tag)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update active states of color options
        document.querySelectorAll('.color-option').forEach(option => {
            const color = option.dataset.color?.toLowerCase();
            const currentColors = urlParams.get('colors')?.toLowerCase().split(',').filter(Boolean) || [];
            if (currentColors.includes(color)) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
        
        // Update active states of size options
        document.querySelectorAll('.size-option').forEach(option => {
            const size = option.dataset.size?.toUpperCase();
            const currentSizes = urlParams.get('sizes')?.toUpperCase().split(',').filter(Boolean) || [];
            if (currentSizes.includes(size)) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
        
        // Update price range inputs
        if (minPriceInput) {
            minPriceInput.value = urlParams.get('minPrice') || '';
        }
        if (maxPriceInput) {
            maxPriceInput.value = urlParams.get('maxPrice') || '';
        }
        
        // Update in-stock checkbox
        if (inStockCheckbox) {
            inStockCheckbox.checked = urlParams.get('inStock') === 'true';
        }
        
        // Update rating filter
        const minRating = urlParams.get('minRating');
        if (minRating) {
            document.querySelectorAll('.rating-option').forEach(option => {
                const rating = parseInt(option.dataset.rating);
                option.classList.toggle('selected', rating === parseInt(minRating));
            });
        } else {
            document.querySelectorAll('.rating-option').forEach(option => {
                option.classList.remove('selected');
            });
        }
    }
    
    // Update active filters display
    function updateActiveFilters() {
        const activeFiltersContainer = document.querySelector('.active-filters');
        if (!activeFiltersContainer) return;
        
        const urlParams = new URLSearchParams(window.location.search);
        let activeFilters = [];
        
        // Category filter
        const category = urlParams.get('category');
        if (category) {
            activeFilters.push({
                type: 'category',
                value: category,
                label: `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`
            });
        }
        
        // Tags filter
        const tags = urlParams.get('tags');
        if (tags) {
            tags.split(',').forEach(tag => {
                if (tag) {
                    activeFilters.push({
                        type: 'tag',
                        value: tag,
                        label: `Tag: ${tag.charAt(0).toUpperCase() + tag.slice(1)}`
                    });
                }
            });
        }
        
        // Colors filter
        const colors = urlParams.get('colors');
        if (colors) {
            colors.split(',').forEach(color => {
                if (color) {
                    activeFilters.push({
                        type: 'color',
                        value: color,
                        label: `Color: ${color.charAt(0).toUpperCase() + color.slice(1)}`
                    });
                }
            });
        }
        
        // Sizes filter
        const sizes = urlParams.get('sizes');
        if (sizes) {
            sizes.split(',').forEach(size => {
                if (size) {
                    activeFilters.push({
                        type: 'size',
                        value: size,
                        label: `Size: ${size}`
                    });
                }
            });
        }
        
        // Price range filter
        const minPrice = urlParams.get('minPrice');
        const maxPrice = urlParams.get('maxPrice');
        if (minPrice || maxPrice) {
            activeFilters.push({
                type: 'price',
                value: `${minPrice || '0'}-${maxPrice || '∞'}`,
                label: `Price: $${minPrice || '0'} - ${maxPrice ? '$' + maxPrice : '∞'}`
            });
        }
        
        // Rating filter
        const minRating = urlParams.get('minRating');
        if (minRating) {
            activeFilters.push({
                type: 'rating',
                value: minRating,
                label: `Rating: ${minRating}+`
            });
        }
        
        // In-stock filter
        if (urlParams.get('inStock') === 'true') {
            activeFilters.push({
                type: 'inStock',
                value: 'true',
                label: 'In Stock Only'
            });
        }
        
        // Update the active filters display
        if (activeFilters.length > 0) {
            activeFiltersContainer.innerHTML = `
                <div class="active-filters-header">
                    <span>Active Filters:</span>
                    <button class="clear-filters" onclick="window.location.href='${window.location.pathname}'">
                        Clear All
                    </button>
                </div>
                <div class="active-filters-list">
                    ${activeFilters.map(filter => `
                        <span class="active-filter" data-type="${filter.type}" data-value="${filter.value}">
                            ${filter.label}
                            <span class="remove-filter" onclick="removeFilter('${filter.type}', '${filter.value}')">&times;</span>
                        </span>
                    `).join('')}
                </div>
            `;
            activeFiltersContainer.style.display = 'block';
        } else {
            activeFiltersContainer.style.display = 'none';
        }
    }
    
    // Remove a single filter
    window.removeFilter = function(type, value) {
        const url = new URL(window.location);
        
        switch(type) {
            case 'category':
                url.searchParams.delete('category');
                break;
            case 'tag':
                const tags = new URLSearchParams(window.location.search).get('tags')?.split(',').filter(Boolean) || [];
                const updatedTags = tags.filter(tag => tag !== value).join(',');
                if (updatedTags) {
                    url.searchParams.set('tags', updatedTags);
                } else {
                    url.searchParams.delete('tags');
                }
                break;
            case 'color':
                const colors = new URLSearchParams(window.location.search).get('colors')?.split(',').filter(Boolean) || [];
                const updatedColors = colors.filter(color => color !== value).join(',');
                if (updatedColors) {
                    url.searchParams.set('colors', updatedColors);
                } else {
                    url.searchParams.delete('colors');
                }
                break;
            case 'size':
                url.searchParams.delete('sizes');
                break;
            case 'price':
                url.searchParams.delete('minPrice');
                url.searchParams.delete('maxPrice');
                break;
            case 'rating':
                url.searchParams.delete('minRating');
                break;
            case 'inStock':
                url.searchParams.delete('inStock');
                break;
        }
        
        window.history.pushState({}, '', url);
        applyFilters();
    };
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        applyFilters();
    });
    
    // Initialize filters from URL on page load
    updateActiveFilters();
    

    
    // Initialize all filter event listeners
    initializeFilterListeners();
    
    // Update filter indicators on page load
    updateFilterIndicators();
    
    // Apply initial filters
    applyFilters();
});
