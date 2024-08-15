import React from 'react'
import DishesCard from '../layouts/DishesCard'
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
function Dishes() {
  return (
    <div>
    <div className='min-h-screen flex flex-col justify-center items-center lg:px-32 px-5'>
      <h1 className='text-4xl font-semibold text-center pt-24 pb-10'>Our Dishes</h1>
      <div className='flex flex-wrap gap-8 justify-center'>
        <DishesCard img={img1} title="Chicken Wings" price="10.99$"/>
        <DishesCard img={img2} title="Mixed Grilled" price="12.99$"/>
        <DishesCard img={img3} title="Pasta Carbonara" price="9.99$"/>
        <DishesCard img={img4} title="Stickit Chicken" price="15.99$"/>
        <DishesCard img={img5} title="Rice Indian" price="20.99$"/>
        <DishesCard img={img6} title="Spicy Wings" price="6.99$"/>
      </div>
      </div>
        </div>
  )
}

export default Dishes