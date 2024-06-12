// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './views/ProductList';
import ProductForm from './views/ProductForm'; // Import ProductForm component


function App({ productController }) {
  return (
    <Router>
      <div>
      <Routes>
          <Route path="/" element={<ProductList productController={productController} />} />
          <Route path="/add-product" element={<ProductForm productController={productController} />} />
          <Route path="/edit-product/:id" element={<ProductForm productController={productController} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
