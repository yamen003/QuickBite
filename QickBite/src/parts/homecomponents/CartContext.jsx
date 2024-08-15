import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(response.data.cart || []);
      } catch (error) {
        console.error('Failed to load cart:', error.response ? error.response.data : error.message);
      }
    } else {
      console.warn('No token found');
    }
  };

  const updateCart = async (updatedCart) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/cart', { cart: updatedCart }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Cart updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update cart:', error.message);
    }
  };
  

  const addToCart = async (item) => {
    if (!item) return;
    const updatedCart = [...cart, item]; 
    setCart(updatedCart);
  
    try {
      await updateCart(updatedCart);
      console.log('Item added to cart:', item);
    } catch (error) {
      console.error('Failed to add item to cart:', error.message);
    }
  };
  

  const removeFromCart = async (index) => {
    if (index < 0 || index >= cart.length) {
      console.warn('Invalid index for removal:', index);
      return;
    }

    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    await updateCart(updatedCart);
  };

  const clearCart = async () => {
    console.log('Clearing cart locally...');
    setCart([]);
    await updateCart([]); 
    console.log('Cart cleared');
  };


  const clearCartBackend = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.delete('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Cart cleared:', response.data);
        setCart([]); // Clear local state
      } catch (error) {
        console.error('Failed to clear cart:', error.message);
      }
    } else {
      setCart([]); 
    }
  };
  

  return (
    <CartContext.Provider
      value={{ cart, loadCart, addToCart, removeFromCart, clearCart, clearCartBackend }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
