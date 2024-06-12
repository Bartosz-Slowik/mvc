import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = ({ productController }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await productController.getProducts(); // Call getProducts method
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };


    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="form-container">
        <h1>Product List</h1>
        <button className="success" onClick={() => navigate('/add-product')}>Add New Product</button>
        <ul className="product-list">
          {products.map(product => (
            <li key={product.id.$oid}>
              <Link to={`/edit-product/${product.id.$oid}`}>
                {product.name} - ${product.price}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
