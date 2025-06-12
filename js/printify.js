// Printify API Service
class PrintifyService {
  static async request(endpoint, options = {}) {
    try {
      const response = await fetch('/.netlify/functions/printify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: endpoint,
          method: options.method || 'GET',
          body: options.body,
        }),
      });

      if (!response.ok) {
        throw new Error(`Printify API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Printify API request failed:', error);
      throw error;
    }
  }

  // Get all products
  static async getProducts(shopId) {
    return this.request(`/shops/${shopId}/products.json`);
  }

  // Get a single product
  static async getProduct(shopId, productId) {
    return this.request(`/shops/${shopId}/products/${productId}.json`);
  }

  // Get all blueprints (product templates)
  static async getBlueprints() {
    return this.request('/catalog/blueprints.json');
  }

  // Get blueprint details
  static async getBlueprint(blueprintId) {
    return this.request(`/catalog/blueprints/${blueprintId}.json`);
  }

  // Get print providers for a blueprint
  static async getPrintProviders(blueprintId) {
    return this.request(`/catalog/blueprints/${blueprintId}/print_providers.json`);
  }

  // Get variants for a blueprint and print provider
  static async getVariants(blueprintId, providerId) {
    return this.request(
      `/catalog/blueprints/${blueprintId}/print_providers/${providerId}/variants.json`
    );
  }

  // Create an order
  static async createOrder(orderData) {
    return this.request('/orders.json', {
      method: 'POST',
      body: orderData,
    });
  }
}

// Make it globally available
window.PrintifyService = PrintifyService;
