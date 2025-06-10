# Doomzy Ink

A bold, occult-inspired e-commerce website for Doomzy Ink, featuring dark art and gothic designs.

## Features

- Responsive design that works on all devices
- Animated hero section with spiral background
- Dynamic product grid loaded from JSON
- Interactive audio player for the Hotline podcast
- Flip card for Lore section
- Newsletter subscription form
- Modern CSS with CSS variables for easy theming
- Smooth scrolling and animations
- Mobile-friendly navigation

## Project Structure

```
doomzyink.github.io/
├── assets/
│   ├── css/
│   │   ├── style.css    # Base styles
│   │   └── main.css     # Main styles with animations
│   ├── js/
│   │   └── main.js      # Main JavaScript functionality
│   ├── images/          # Image assets
│   └── fonts/           # Custom fonts
├── data/
│   └── products.json  # Product data
├── index.html           # Main HTML file
└── README.md            # This file
```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/DoomzyInk/doomzyink.github.io.git
   ```

2. Open `index.html` in your browser to view the site locally.

## Customization

### Colors
Edit the CSS variables in `assets/css/main.css` to change the color scheme:

```css
:root {
  --color-primary: #8b0000;
  --color-secondary: #f0d7a1;
  --color-dark: #0d0b07;
  --color-light: #f8f5ee;
  --color-accent: #ff4500;
}
```

### Products
Edit `data/products.json` to update the product listings:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Creepy But Interesting",
      "price": 39.99,
      "image": "assets/images/products/creepy-hoodie.jpg",
      "alt": "Creepy But Interesting Hoodie"
    }
  ]
}
```

## Adding New Pages

1. Create a new HTML file (e.g., `about.html`)
2. Link to it in the navigation menu in `index.html`
3. Style it using the existing CSS classes or add new styles to `main.css`

## Deployment

This site is designed to be deployed on GitHub Pages. Push your changes to the `main` branch to update the live site.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 10+)
- Chrome for Android

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For inquiries, please contact [your-email@example.com](mailto:your-email@example.com)
