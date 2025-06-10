// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav-links');
const productGrid = document.getElementById('products-grid');
const cultButton = document.querySelector('.cult-button');
const audioPlayer = document.querySelector('.audio-player');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBtn = document.getElementById('volume');
const volumeSlider = document.querySelector('.volume-slider');
const newsletterForm = document.querySelector('.newsletter-form');
const backToTop = document.querySelector('.back-to-top');

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');  
  mobileMenuBtn.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Back to top button
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.section, .product-card, .lore-card, .audio-player').forEach(el => {
  observer.observe(el);
});

// Cult button glow effect
if (cultButton) {
  setInterval(() => {
    cultButton.classList.add('glow');
    setTimeout(() => {
      cultButton.classList.remove('glow');
    }, 2000);
  }, 5000);
}

// Fake audio player functionality
if (audioPlayer) {
  let isPlaying = false;
  let isMuted = false;
  let progressInterval;
  
  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Set initial duration
  durationEl.textContent = '2:45';
  
  // Play/Pause button
  playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      progressInterval = setInterval(updateProgress, 1000);
    } else {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      clearInterval(progressInterval);
    }
  });
  
  // Update progress bar
  const updateProgress = () => {
    const currentTime = parseFloat(progressBar.value) + 1;
    const duration = 165; // 2:45 in seconds
    
    if (currentTime >= duration) {
      progressBar.value = 0;
      currentTimeEl.textContent = '0:00';
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      isPlaying = false;
      clearInterval(progressInterval);
    } else {
      progressBar.value = currentTime;
      currentTimeEl.textContent = formatTime(currentTime);
    }
  };
  
  // Volume control
  volumeBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    volumeBtn.innerHTML = isMuted ? 
      '<i class="fas fa-volume-mute"></i>' : 
      '<i class="fas fa-volume-up"></i>';
    volumeSlider.style.display = isMuted ? 'none' : 'block';
  });
  
  // Volume slider
  volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    // In a real implementation, this would set the audio volume
    console.log('Volume set to:', volume);
  });
  
  // Progress bar click
  progressBar.addEventListener('input', (e) => {
    const seekTime = (e.target.value / 100) * 165; // 165 seconds = 2:45
    currentTimeEl.textContent = formatTime(seekTime);
  });
}

// Newsletter form submission
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Simple validation
    if (email && email.includes('@')) {
      // In a real implementation, you would send this to a server
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Load products from JSON file
async function loadProducts() {
  try {
    const response = await fetch('/data/products.json');
    const data = await response.json();
    
    if (data.products && productGrid) {
      productGrid.innerHTML = data.products.map(product => `
        <div class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.alt}" onerror="this.src='https://via.placeholder.com/300x400/1a1712/f0d7a1?text=Product+Image'">
            <div class="product-overlay">
              <button class="quick-view">Quick View</button>
            </div>
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>
      `).join('');
      
      // Observe the newly added product cards
      document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
      });
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Load products
  loadProducts();
  
  // Add current year to footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// Add animation class to hero text
const heroText = document.querySelector('.hero h1');
if (heroText) {
  heroText.classList.add('animate-text');
}

// Add hover effect to product cards
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('.product-card')) {
    const card = e.target.closest('.product-card');
    card.style.transform = 'translateY(-10px) rotate(1deg)';
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.closest('.product-card')) {
    const card = e.target.closest('.product-card');
    card.style.transform = 'translateY(0) rotate(0)';
    card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
  }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  }
});
