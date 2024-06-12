import ProductController from '../ProductController';

const mockProductService = {
  getProducts: jest.fn(),
  getProduct: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  getProductHistory: jest.fn(),
};

const productController = new ProductController(mockProductService);

describe('ProductController', () => {
  afterEach(() => {
    Object.values(mockProductService).forEach(mockFn => mockFn.mockClear());
  });

  describe('getProducts', () => {
    test('should fetch products successfully', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      mockProductService.getProducts.mockResolvedValue(mockProducts);

      const products = await productController.getProducts();

      expect(mockProductService.getProducts).toHaveBeenCalled();
      expect(products).toEqual(mockProducts);
    });

    test('should handle error when fetching products', async () => {
      const errorMessage = 'Failed to fetch products';
      mockProductService.getProducts.mockRejectedValue(new Error(errorMessage));

      await expect(productController.getProducts()).rejects.toThrow(errorMessage);
    });
  });

  describe('getProduct', () => {
    test('should fetch product by id successfully', async () => {
      const mockProduct = { id: 1, name: 'Product 1' };
      const productId = 1;
      mockProductService.getProduct.mockResolvedValue(mockProduct);

      const product = await productController.getProduct(productId);

      expect(mockProductService.getProduct).toHaveBeenCalledWith(productId);
      expect(product).toEqual(mockProduct);
    });

    test('should handle error when fetching product by id', async () => {
      const productId = 1;
      const errorMessage = `Failed to fetch product with id ${productId}`;
      mockProductService.getProduct.mockRejectedValue(new Error(errorMessage));

      await expect(productController.getProduct(productId)).rejects.toThrow(errorMessage);
    });
  });

  describe('createProduct', () => {
    test('should create product successfully', async () => {
      const mockProduct = { name: 'New Product' };
      mockProductService.createProduct.mockResolvedValue(mockProduct);

      const createdProduct = await productController.createProduct(mockProduct);

      expect(mockProductService.createProduct).toHaveBeenCalledWith(mockProduct);
      expect(createdProduct).toEqual(mockProduct);
    });

    test('should handle error when creating product', async () => {
      const mockProduct = { name: 'New Product' };
      const errorMessage = 'Failed to create product';
      mockProductService.createProduct.mockRejectedValue(new Error(errorMessage));

      await expect(productController.createProduct(mockProduct)).rejects.toThrow(errorMessage);
    });
  });

  describe('updateProduct', () => {
    test('should update product successfully', async () => {
      const productId = 1;
      const updatedProduct = { id: productId, name: 'Updated Product' };
      mockProductService.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productController.updateProduct(productId, updatedProduct);

      expect(mockProductService.updateProduct).toHaveBeenCalledWith(productId, updatedProduct);
      expect(result).toEqual(updatedProduct);
    });

    test('should handle error when updating product', async () => {
      const productId = 1;
      const updatedProduct = { id: productId, name: 'Updated Product' };
      const errorMessage = `Failed to update product with id ${productId}`;
      mockProductService.updateProduct.mockRejectedValue(new Error(errorMessage));

      await expect(productController.updateProduct(productId, updatedProduct)).rejects.toThrow(errorMessage);
    });
  });

  describe('deleteProduct', () => {
    test('should delete product successfully', async () => {
      const productId = 1;
      mockProductService.deleteProduct.mockResolvedValue();

      await productController.deleteProduct(productId);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(productId);
    });

    test('should handle error when deleting product', async () => {
      const productId = 1;
      const errorMessage = `Failed to delete product with id ${productId}`;
      mockProductService.deleteProduct.mockRejectedValue(new Error(errorMessage));

      await expect(productController.deleteProduct(productId)).rejects.toThrow(errorMessage);
    });
  });

  describe('getProductHistory', () => {
    test('should fetch product history successfully', async () => {
      const mockProductHistory = [{ id: 1, action: 'updated' }];
      mockProductService.getProductHistory.mockResolvedValue(mockProductHistory);

      const productHistory = await productController.getProductHistory();

      expect(mockProductService.getProductHistory).toHaveBeenCalled();
      expect(productHistory).toEqual(mockProductHistory);
    });

    test('should handle error when fetching product history', async () => {
      const errorMessage = 'Failed to fetch product history';
      mockProductService.getProductHistory.mockRejectedValue(new Error(errorMessage));

      await expect(productController.getProductHistory()).rejects.toThrow(errorMessage);
    });
  });
});

