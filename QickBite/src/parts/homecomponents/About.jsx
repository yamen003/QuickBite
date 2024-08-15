import React from 'react'
import img from '../../assets/about.png';
function About() {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5'>
        <img src={img} alt="dish" />
    <div className='space-y-4 lg:pt-14 '>
        <h1 className='font-semibold text-4xl text-center md:text-start'>Why Cheese Us ?</h1>
        <p>
        Our restaurant is committed to serving only the finest ingredients. From farm-fresh vegetables to premium cuts of meat, each dish is prepared with care and attention to detail, ensuring a dining experience that surpasses expectations.
        </p>
        <p>
        We pride ourselves on crafting unique and memorable flavors. Our chefs blend traditional recipes with innovative techniques, creating a menu that delights the senses and offers something special for every taste.        </p>
        <p>
        Our team is dedicated to providing outstanding service in a warm and inviting atmosphere. Whether youre here for a casual meal or a special celebration, we strive to make every visit enjoyable and hassle-free.       </p>
        <div className='flex justify-center lg:justify-start'>
        <button className=' rounded-[100px] bg-orange-500 h-[50px] w-[170px] font-bold text-white hover:bg-white hover:text-orange-500 hover:scale-105 hover: border border-orange-500  transition-all'>
            Learn More
       </button>
        </div>
    </div>
    </div>
  )
}

export default About