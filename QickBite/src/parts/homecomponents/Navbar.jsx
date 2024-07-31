import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiRestaurant } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineMenuUnfold } from 'react-icons/ai'; // Correct import for AiOutlineClose and AiOutlineMenuUnfold
import axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState('');
  const [menu, setMenu] = useState(false); // Added state for menu toggle

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log the token to check if it exists
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Response:', response.data); // Log the response to see if the data is correct
          setUsername(response.data.name);
        } catch (error) {
          console.error('Fetch username error', error);
        }
      }
    };
    fetchUsername();
  }, []);

  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <div className='fixed w-full'>
      <div>
        <div className='flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]'>
          <div className='flex flex-row items-center cursor-pointer'>
            <span>
              <BiRestaurant size={32} />
            </span>
            <h1 className='text-xl font-semibold'>QuickBite</h1>
          </div>
          <nav className='hidden md:flex flex-row items-center text-lg font-medium gap-8'>
            <Link to="home" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Home</Link>

            <Link to="dishes" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Dishes</Link>
            <Link to="about" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>About</Link>
            <Link to="menu" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Menu</Link>
            <Link to="reviews" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Reviews</Link>
            <Link to="profile" className='text-orange-500 hover:text-black transition-all cursor-pointer'>Welcome, {username}</Link>
          </nav>
          <div className='md:hidden flex items-center'>
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) :
              (<AiOutlineMenuUnfold size={25} onClick={handleChange} />)}
          </div>

          <div className={`${menu ? "translate-x-0" : "-translate-x-full "} lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-20xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}>
          <Link to="profile" className='text-orange-500 hover:text-black transition-all cursor-pointer'>Welcome, {username}</Link>
            <Link to="home" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Home</Link>
            <Link to="dishes" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Dishes</Link>
            <Link to="about" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>About</Link>
            <Link to="menu" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Menu</Link>
            <Link to="reviews" spy="true" smooth={true} duration={500} className='hover:text-orange-500 transition-all cursor-pointer'>Reviews</Link>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
