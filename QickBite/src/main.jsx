// src/index.js or src/main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartProvider } from '../src/parts/homecomponents/CartContext'; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <CartProvider>
    <App />
    </CartProvider>
  </Router>
);
