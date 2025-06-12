// Printify API Configuration
window.PrintifyConfig = {
    API_BASE_URL: '/.netlify/functions/printify',
    SHOP_ID: process.env.PRNTFY_SHOP_ID || 'your_shop_id',
    API_KEY: process.env.PRNTFY_API_KEY || 'your_printify_api_key'
};

// Snipcart Configuration
window.SnipcartConfig = {
    API_KEY: process.env.SNIPCART_API_KEY || 'your_snipcart_api_key',
    // Add any other Snipcart configuration here
};

// Site Configuration
window.SiteConfig = {
    currency: 'USD',
    currencySymbol: '$',
    taxRate: 0.07, // 7% tax
    shippingRates: {
        standard: 4.99,
        express: 9.99,
        freeThreshold: 50.00 // Free shipping over $50
    },
    // Add other site-wide settings here
};

// Initialize environment variables from .env file
if (typeof process === 'undefined') {
    // Browser environment - use window._env or defaults
    window._env = window._env || {};
    Object.keys(PrintifyConfig).forEach(key => {
        PrintifyConfig[key] = window._env[`PRNTFY_${key}`] || PrintifyConfig[key];
    });
    Object.keys(SnipcartConfig).forEach(key => {
        SnipcartConfig[key] = window._env[`SNIPCART_${key}`] || SnipcartConfig[key];
    });
}
