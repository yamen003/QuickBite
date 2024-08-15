import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCartBackend, loadCart } = useCart();
  const [cleanedCart, setCleanedCart] = useState([]);

  useEffect(() => {
    const cleanCartData = (cartData) => {
  
      return cartData.flat(Infinity).filter(item => item && typeof item === 'object');
    };

    const fetchData = async () => {
      await loadCart(); 
      setCleanedCart(cleanCartData(cart)); 
    };

    fetchData();
  }, [loadCart]);

  const handleRemoveFromCart = async (index) => {
    await removeFromCart(index); 
  };

  const handleClearCart = async () => {
    await clearCartBackend(); 
  };
  const handleOrder=async()=>{
    await clearCartBackend();
    navigate('/order-confirmation');
  }

  const getPriceValue = (price) => {
    if (!price) return 0;
    if (typeof price === 'string') {
      return parseFloat(price.replace('$', '')) || 0;
    }
    return parseFloat(price) || 0;
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-56">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <header className="bg-orange-500 text-white p-4 rounded-t-lg">
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </header>
          <div className="p-6">
            {cleanedCart.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              <div>
                <ul className="space-y-4">
                  {cleanedCart.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-gray-600">{item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={handleClearCart}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleOrder}
                    className="bg-green-400 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Order
                  </button>
                  <div className="text-right">
                    <h2 className="text-xl font-semibold">
                      Total: $
                      {cleanedCart
                        .reduce(
                          (total, item) => total + getPriceValue(item.price),
                          0
                        )
                        .toFixed(2)}
                    </h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
