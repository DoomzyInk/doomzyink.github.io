// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Printify service
  window.printifyService = window.PrintifyService;
  
  // Initialize cart
  if (window.DoomzyInk && window.DoomzyInk.Cart) {
    window.DoomzyInk.Cart.initialize();
  }
  
  // Load products if on catalog page
  if (document.body.classList.contains('catalog-page')) {
    loadPrintifyProducts();
  }
});

// Load products from Printify
async function loadPrintifyProducts() {
  try {
    const shopId = window.PrintifyConfig.SHOP_ID;
    const response = await window.PrintifyService.getProducts(shopId);
    
    if (response && response.data) {
      // Process and display products
      displayProducts(response.data);
    }
  } catch (error) {
    console.error('Error loading products:', error);
    // Fallback to static products if API fails
    if (window.DoomzyInk && window.DoomzyInk.Products) {
      displayProducts(window.DoomzyInk.Products);
    }
  }
}

// Display products in the grid
function displayProducts(products) {
  const container = document.getElementById('product-grid');
  if (!container) return;
  
  // Clear existing products
  container.innerHTML = '';
  
  if (!products || products.length === 0) {
    container.innerHTML = '<p class="no-products">No products found.</p>';
    return;
  }
  
  // Create product cards
  products.forEach(product => {
    const productElement = createProductCard(product);
    if (productElement) {
      container.appendChild(productElement);
    }
  });
  
  // Initialize any product interactions
  initializeProductInteractions();
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = product.id;
  
  // Get the first image or a placeholder
  const imageUrl = product.images && product.images[0] ? 
    product.images[0].src : 'https://via.placeholder.com/400x500?text=Doomzy+Ink';
  
  // Format price
  const price = product.variants && product.variants[0] ? 
    `$${parseFloat(product.variants[0].price / 100).toFixed(2)}` : 'Price not available';
  
  card.innerHTML = `
    <div class="product-image" style="background-image: url('${imageUrl}')">
      <div class="quick-view">Quick View</div>
    </div>
    <div class="product-info">
      <h3>${product.title}</h3>
      <div class="product-price">${price}</div>
      <button class="btn btn-primary add-to-cart" 
              data-item-id="${product.id}"
              data-item-name="${product.title}"
              data-item-price="${product.variants ? product.variants[0].price / 100 : 0}"
              data-item-url="${window.location.href}"
              data-item-image="${imageUrl}">
        Add to Cart
      </button>
    </div>
  `;
  
  return card;
}

// Initialize product interactions
function initializeProductInteractions() {
  // Quick view
  document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productCard = this.closest('.product-card');
      if (productCard) {
        const productId = productCard.dataset.id;
        openQuickView(productId);
      }
    });
  });
  
  // Add to cart
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.itemId;
      const productName = this.dataset.itemName;
      const productPrice = parseFloat(this.dataset.itemPrice);
      const productImage = this.dataset.itemImage;
      
      // Add to cart logic here
      if (window.Snipcart && window.Snipcart.api) {
        window.Snipcart.api.cart.items.add({
          id: productId,
          name: productName,
          price: productPrice,
          url: window.location.href,
          image: productImage
        });
      }
    });
  });
}

// Open quick view modal
async function openQuickView(productId) {
  try {
    // Fetch product details
    const shopId = window.PrintifyConfig.SHOP_ID;
    const product = await window.PrintifyService.getProduct(shopId, productId);
    
    if (!product) {
      console.error('Product not found');
      return;
    }
    
    // Create and show modal
    showProductModal(product);
  } catch (error) {
    console.error('Error opening quick view:', error);
  }
}

// Show product modal
function showProductModal(product) {
  // Create modal HTML
  const modal = document.createElement('div');
  modal.className = 'product-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      <div class="modal-body">
        <div class="product-gallery">
          <img src="${product.images[0].src}" alt="${product.title}">
        </div>
        <div class="product-details">
          <h2>${product.title}</h2>
          <div class="price">$${(product.variants[0].price / 100).toFixed(2)}</div>
          <div class="description">
            ${product.description || 'No description available.'}
          </div>
          <button class="btn btn-primary add-to-cart" 
                  data-item-id="${product.id}"
                  data-item-name="${product.title}"
                  data-item-price="${product.variants[0].price / 100}"
                  data-item-url="${window.location.href}"
                  data-item-image="${product.images[0].src}">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add to DOM
  document.body.appendChild(modal);
  
  // Add event listeners
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
  
  // Initialize product interactions for the modal
  initializeProductInteractions();
}
