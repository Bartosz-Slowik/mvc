// src/controllers/ProductController.js

class ProductController {
    constructor(productService) {
      this.productService = productService;
    }

  async getProducts() {
    try {
      return await this.productService.getProducts();
    } catch (error) {
      console.error('Error fetching products:', error); // Log error details
      throw error;
    }
  }

  async getProduct(id) {
    try {
      return await this.productService.getProduct(id);
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error); // Log error details
      throw error;
    }
  }

  async createProduct(product) {
    try {
      return await this.productService.createProduct(product);
    } catch (error) {
      console.error('Error creating product:', error); // Log error details
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      return await this.productService.updateProduct(id, product);
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error); // Log error details
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await this.productService.deleteProduct(id);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error); // Log error details
      throw error;
    }
  }

  async getProductHistory() {
    try {
      return await this.productService.getProductHistory();
    } catch (error) {
      console.error('Error fetching product history:', error); // Log error details
      throw error;
    }
  }
}

export default ProductController;