import React from 'react';
import Navbar from './Navbar';

const OrderConfirmation = () => {
    function OrdNum(){
        let x = Math.floor((Math.random() * 10000000) + 1);
        return x
    }
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-56">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-green-600">Order Placed Successfully!</h1>
          <p className="text-center text-gray-600 mt-4">
            Your order has been placed successfully. Your Order Number is {OrdNum()}.
          </p>
          <p className="text-center text-gray-600 mt-4">
            Thank you for shopping with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
