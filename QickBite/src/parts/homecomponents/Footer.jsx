import React from 'react'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='bg-black text-white rounded-t-3xl mt-8 md:mt-0'>
        <div className='flex flex-col md:flex-row justify-between p-8 md:px-32 px-5'>
            <div className='w-full md:w-1/4 '>
                <h1 className='font semibold text-xl pb-4'>QuickBite</h1>
                <p className='text-sm'>
                Elevate Your Inner Foodie with Every Bite Using QuickBite
                </p>
            </div>
            <div>
        <nav className='flex flex-col gap-2'>
          <a className='hover:text-orange-600 transition-all cursor-pointer' href="#hero">Home</a>
          <a className='hover:text-orange-600 transition-all cursor-pointer' href="#dishes">Dishes</a>
          <a className='hover:text-orange-600 transition-all cursor-pointer' href="#about">About</a>
          <a className='hover:text-orange-600 transition-all cursor-pointer' href="#review">Reviews</a>
        </nav>
      </div>
      <div>
        <h1 className='font-medium text-xl pb-4 pt-5 md:pt-0'>
          Your Profile
        </h1>
        <div>
          <nav className='flex flex-col gap-2'>
            <Link className='hover:text-orange-600 transition-all cursor-pointer' to="/profile">Profile</Link>
            <Link className='hover:text-orange-600 transition-all cursor-pointer' to="/cart">Cart</Link>
          </nav>
        </div>
      </div>
            <div>
                <h1 className='font-medium text-xl pb-4 pt-5 md:pt-0'>
                    Contact Us
                </h1>
                <div>
                <nav className='flex flex-col gap-2'>
                    <a className='hover:text-orange-600 transition-all cursor-pointer' href="https://mail.google.com/mail/u/0/">Yamenouannes123@gmail.com</a>
                    <a className='hover:text-orange-600 transition-all cursor-pointer'>+216 42 16 39 80</a>
                    <a className='hover:text-orange-600 transition-all cursor-pointer' href="https://www.facebook.com/mohamed.yamen.wannes.9/">Social Media</a>
                </nav>
                </div>
            </div>
        </div>
        <div>
            <p className=' text-center font-medium text-xl pb-4 pt-5 md:pt-0'>
                @Copyright Developed By <span className='text-orange-500'>Med Yamen Ouannes</span> <br />
                All Rights Reserved

            </p>
        </div>
    </div>
  )
}

export default Footer