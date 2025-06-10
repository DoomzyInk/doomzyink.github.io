class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <div class="container">
          <div class="logo">
            <a href="/" class="logo-link">
              <img src="assets/images/logo-spiral.svg" alt="Doomzy Ink" class="logo-img">
              <span class="logo-text">Doomzy Ink</span>
            </a>
          </div>
          
          <button class="mobile-menu-btn" aria-label="Toggle navigation">
            <span class="menu-line"></span>
            <span class="menu-line"></span>
            <span class="menu-line"></span>
          </button>
          
          <nav class="nav-links">
            <ul>
              <li><a href="/" class="nav-link">Home</a></li>
              <li><a href="/cult" class="nav-link">The Cult</a></li>
              <li><a href="/hotline" class="nav-link">Hotline</a></li>
              <li><a href="/lore" class="nav-link">The Lore</a></li>
              <li><a href="/contact" class="nav-link">Contact</a></li>
              <li class="cart-icon">
                <a href="#" aria-label="Shopping Cart">
                  <i class="fas fa-shopping-cart"></i>
                  <span class="cart-count">0</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('main-header', Header);
