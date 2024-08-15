import React from 'react'
import { Link } from 'react-scroll';
function Hero() {
  return (
    <div>
    <div className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./src/assets/MAINBG2_00000.png')] bg-cover bg-no-repeat ">
        <div className='w-full lg:w-2/3 space-y-5'>
       <h1 className=' text-[#091a08] font-semibold text-6xl '>Elevate Your Inner Foodie with Every Bite Using <span className='text-orange-500'>QuickBite</span></h1> 
       <p>Elevate your inner foodie with every bite using QuickBite, where gourmet convenience meets culinary delight. Discover the joy of quick, high-quality meals and let QuickBite take your taste buds on a delectable journey.</p>
       <div className='lg:pl-44'>
        <button className=' rounded-[100px] bg-orange-500 h-[60px] w-[200px] font-bold text-white hover:bg-[#698E5B] hover:scale-105 transition-all'>
            <Link  to="dishes" spy={true} smooth={true} duration={250}>Order Now</Link>
       </button>

       </div>
        </div></div>
        </div>
  )
}

export default Hero