import Product from '../models/Product';
import ShortProduct from '../models/ShortProduct';

const API_URL = 'http://localhost:8080/api/products';  // Ensure this URL is correct

class ProductService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.productCache = new Map();
    this.cacheExpirationTime = 5 * 60 * 1000; // 5 minutes
  }

  async getProducts() {
    const cachedProducts = this.productCache.get('products');
    if (cachedProducts && Date.now() - cachedProducts.timestamp < this.cacheExpirationTime) {
      console.log('Products fetched from cache');
      return cachedProducts.data;
    }

    const response = await this.httpClient.get(API_URL);
    const products = response.data.map(product => new ShortProduct(product._id, product.name, product.price));

    this.productCache.set('products', { data: products, timestamp: Date.now() });

    return products;
  }

  async getProduct(id) {
    const cachedProduct = this.productCache.get(id);
    if (cachedProduct && Date.now() - cachedProduct.timestamp < this.cacheExpirationTime) {
      console.log(`Product with id ${id} fetched from cache`);
      return cachedProduct.data;
    }

    const response = await this.httpClient.get(`${API_URL}/${id}`);
    const product = new Product(response.data._id, response.data.name, response.data.description, response.data.price, response.data.quantity, response.data.status);

    this.productCache.set(id, { data: product, timestamp: Date.now() });

    console.log(`Product with id ${id} fetched from the API`);
    return product;
  }

  async createProduct(product) {
    const response = await this.httpClient.post(API_URL, product);
    return response.data;
  }

  async updateProduct(id, product) {
    const response = await this.httpClient.put(`${API_URL}/${id}`, product);
    return response.data;
  }

  async deleteProduct(id) {
    const response = await this.httpClient.delete(`${API_URL}/${id}`);
    return response.data;
  }

  async getProductHistory() {
    const response = await this.httpClient.get(`${API_URL}/history`);
    return response.data;
  }
}

export default ProductService;
