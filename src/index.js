// index.js

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import "./index.css"
import axios from 'axios';
import ProductService from './services/ProductService';
import ProductController from './controllers/ProductController';

const client = axios.create();
const productService = new ProductService(client);
const productController = new ProductController(productService);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App productController={productController} />
  </React.StrictMode>
);