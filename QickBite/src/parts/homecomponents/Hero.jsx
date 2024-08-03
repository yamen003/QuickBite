import React from 'react'
function Hero() {
  return (
    <div>
    <div className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./src/assets/mainBG.jpg')] bg-cover bg-no-repeat ">
        <div className='w-full lg:w-2/3 space-y-5'>
       <h1 className=' text-[#091a08] font-semibold text-6xl '>Elevate Your Inner Foodie with Every Bite Using <span className='text-orange-500'>QuickBite</span></h1> 
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio accusamus velit perferendis itaque quam porro iste repellat quia eaque ad natus consequuntur, voluptates recusandae animi quas corrupti adipisci dolorum nesciunt!</p>
       <div className='lg:pl-44'>
        <button className=' rounded-[100px] bg-orange-500 h-[60px] w-[200px] font-bold text-white hover:bg-[#698E5B] hover:scale-105 transition-all'>
            Order Now
       </button>

       </div>
        </div></div>
        </div>
  )
}

export default Hero