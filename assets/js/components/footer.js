class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="footer-logo">
                <img src="assets/images/logo-spiral.svg" alt="Doomzy Ink" class="logo-img">
                <span class="logo-text">Doomzy Ink</span>
              </div>
              <p>Dark art and occult-inspired designs</p>
              <div class="social-links">
                <a href="https://www.instagram.com/doomzyink" target="_blank" rel="noopener" aria-label="Instagram">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@doomzyink" target="_blank" rel="noopener" aria-label="TikTok">
                  <i class="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
            
            <div class="footer-links">
              <div class="footer-column">
                <h3>Shop</h3>
                <ul>
                  <li><a href="/products">All Products</a></li>
                  <li><a href="/products?filter=new">New Arrivals</a></li>
                  <li><a href="/products?filter=bestsellers">Best Sellers</a></li>
                  <li><a href="/sale">Sale Items</a></li>
                </ul>
              </div>
              
              <div class="footer-column">
                <h3>Explore</h3>
                <ul>
                  <li><a href="/about">Our Story</a></li>
                  <li><a href="/lore">The Lore</a></li>
                  <li><a href="/hotline">The Hotline</a></li>
                  <li><a href="/blog">Blog</a></li>
                </ul>
              </div>
              
              <div class="footer-column">
                <h3>Help</h3>
                <ul>
                  <li><a href="/contact">Contact Us</a></li>
                  <li><a href="/faq">FAQs</a></li>
                  <li><a href="/shipping">Shipping</a></li>
                  <li><a href="/returns">Returns</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Doomzy Ink. All rights reserved.</p>
            <div class="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <span>|</span>
              <a href="/terms">Terms of Service</a>
              <span>|</span>
              <a href="/accessibility">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
      
      <!-- Back to Top Button -->
      <a href="#" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-arrow-up"></i>
      </a>
    `;
  }
}

customElements.define('main-footer', Footer);
