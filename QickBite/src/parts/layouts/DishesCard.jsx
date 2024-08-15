import React, { useContext } from 'react';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useCart } from '../homecomponents/CartContext';

const DishesCard = (props) => {
  const { addToCart } = useCart();

  const handleOrderNow = () => {
    addToCart({
      img: props.img,
      title: props.title,
      price: props.price
    });
  };

  return (
    <div className='w-full lg:w-1/4 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg'>
      <img src={props.img} alt={props.title} />
      <div className='space-y-4'>
        <h3 className='font-semibold text-center text-xl pt-6'>{props.title}</h3>

        <div className='flex flex-row justify-center'>
          <BsStarFill className='text-orange-400' />
          <BsStarFill className='text-orange-400' />
          <BsStarFill className='text-orange-400' />
          <BsStarFill className='text-orange-400' />
          <BsStarHalf className='text-orange-400' />
        </div>
        <div className='flex flex-row items-center justify-center gap-4'>
          <h3 className='font-semibold text-lg'>{props.price}</h3>
          <button
            onClick={handleOrderNow}
            className='rounded-[100px] bg-orange-500 h-[50px] w-[170px] font-bold text-white hover:bg-white hover:text-orange-500 hover:scale-105 hover:border border-orange-500 transition-all'
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishesCard;
