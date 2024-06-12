import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = ({ productController }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    status: '',
  });
  const navigate = useNavigate();
  const isEditMode = !!id; // Check if we are in edit mode

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const productData = await productController.getProduct(id);
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await productController.updateProduct(id, product);
      } else {
        await productController.createProduct(product);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await productController.deleteProduct(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={product.name} onChange={handleChange} />

          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={product.description} onChange={handleChange} />

          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} />

          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} />

          <label htmlFor="status">Status:</label>
          <input type="text" id="status" name="status" value={product.status} onChange={handleChange} />

          <button className="success" type="submit">{isEditMode ? 'Update Product' : 'Add Product'}</button>
          {isEditMode && (
          <button className="danger" onClick={handleDelete}>Delete Product</button>
        )}
        </form>

      </div>
    </div>
  );
};

export default ProductForm;
