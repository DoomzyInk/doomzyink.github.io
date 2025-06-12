# Doomzy Ink

A bold, occult-inspired e-commerce website for Doomzy Ink, featuring dark art and gothic designs. This site integrates with Printify for print-on-demand products and Snipcart for e-commerce functionality.

## Features

- **Printify Integration**: Seamless connection to your Printify store
- **Snipcart Checkout**: Secure and customizable checkout process
- **Product Management**: Easy management of products, variants, and inventory
- **Responsive Design**: Works on all devices
- **Dynamic Product Grid**: Loaded from Printify API with fallback to local data
- **Interactive Shopping Cart**: Real-time cart updates and quick view
- **Modern UI/UX**: Dark theme with smooth animations
- **SEO Optimized**: For better search engine visibility

## Project Structure

```
doomzyink.github.io/
├── assets/
│   ├── css/
│   │   ├── style.css        # Base styles
│   │   └── main.css         # Main styles with animations
│   │   └── filters.css      # Product filter styles
│   ├── js/
│   │   ├── main.js          # Main application logic
│   │   ├── products.js      # Product data and rendering
│   │   ├── filters.js       # Product filtering and sorting
│   │   ├── cart.js          # Shopping cart functionality
│   │   ├── printify.js      # Printify API integration
│   │   └── config.js        # Configuration settings
│   ├── images/              # Image assets
│   └── fonts/               # Custom fonts
├── netlify/
│   └── functions/         # Serverless functions
│       └── printify.js       # Printify API proxy
├── templates/
│   └── snipcart.html      # Custom Snipcart template
├── catalog/                 # Product catalog section
├── index.html               # Main HTML file
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Netlify account (for deployment)
- Printify account
- Snipcart account

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/DoomzyInk/doomzyink.github.io.git
   cd doomzyink.github.io
   ```

2. Install dependencies for Netlify Functions:
   ```bash
   cd netlify/functions
   npm install
   cd ../..
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```env
   PRNTFY_API_KEY=your_printify_api_key
   PRNTFY_SHOP_ID=your_printify_shop_id
   ```

4. Start the local development server:
   ```bash
   npx netlify dev
   ```

5. Open `http://localhost:8888` in your browser.

## Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify:
   - `PRNTFY_API_KEY`: Your Printify API key
   - `PRNTFY_SHOP_ID`: Your Printify shop ID
   - `SNIPCART_API_KEY`: Your Snipcart public API key

## Configuration

### Printify Setup
1. Get your API key from the Printify dashboard
2. Update the `PrintifyConfig` in `js/config.js`
3. Make sure your Printify products are published to your store

### Snipcart Setup
1. Sign up for a Snipcart account
2. Get your public API key
3. Update the `SnipcartConfig` in `js/config.js`
4. Configure your shipping and tax settings in the Snipcart dashboard

## Customization

### Adding Products
1. Add products in your Printify dashboard
2. Products will automatically sync with your store
3. For local development, you can use the sample data in `js/products.js`

### Styling
Edit the CSS variables in `assets/css/main.css` to customize the theme:

```css
:root {
  --primary: #8a2be2;
  --primary-dark: #6a1f9e;
  --bg-dark: #0a0a0a;
  --text: #ffffff;
  --text-muted: #999999;
}
```

## Troubleshooting

- **API errors**: Make sure your API keys are correct and have the right permissions
- **CORS issues**: Ensure your Netlify function is properly configured
- **Missing products**: Check if products are published in your Printify store

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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
