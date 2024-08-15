import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { BiRestaurant } from 'react-icons/bi';
import { AiOutlineClose, AiOutlineMenuUnfold } from 'react-icons/ai';
import axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState('');
  const [menu, setMenu] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsername(response.data.nameuser);
        } catch (error) {
          console.error('Fetch username error', error);
          setError('Failed to fetch username. Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } else {
        setError('No token found. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };
    fetchUsername();
  }, [navigate]);

  const handleChange = () => {
    setMenu(!menu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Check if the current location path matches the link path
  const getLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="fixed w-full">
      <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.2)]">
        <div className="flex flex-row items-center cursor-pointer">
          <span>
            <BiRestaurant size={32} />
          </span>
          <RouterLink to="/Home.jsx">
            <h1 className="text-xl font-semibold">QuickBite</h1>
          </RouterLink>
        </div>
        <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
          <Link
            to="hero"
            spy={true}
            smooth={true}
            duration={250}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            <RouterLink to="/Home.jsx">Home</RouterLink>
          </Link>
          <Link
            to="dishes"
            spy={true}
            smooth={true}
            duration={250}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dishes
          </Link>
          <RouterLink
            to="/Cart"
            className={`hover:text-orange-500 transition-all cursor-pointer ${getLinkClass('/Cart')}`}
          >
            Cart
          </RouterLink>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={250}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link
            to="review"
            spy={true}
            smooth={true}
            duration={250}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            Reviews
          </Link>
          <RouterLink
            to="/Profile"
            className={`text-orange-500 hover:text-black transition-all cursor-pointer ${getLinkClass('/Profile')}`}
          >
            Welcome, {username}
          </RouterLink>
          <button
            onClick={handleLogout}
            className="hover:text-red-500 transition-all cursor-pointer"
          >
            Logout
          </button>
        </nav>
        <div className="md:hidden flex items-center">
          {menu ? (
            <AiOutlineClose size={25} onClick={handleChange} />
          ) : (
            <AiOutlineMenuUnfold size={25} onClick={handleChange} />
          )}
        </div>

        <div
          className={`${
            menu ? 'translate-x-0' : '-translate-x-full '
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-20xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <RouterLink
            to="/Profile"
            className={`text-orange-500 hover:text-black transition-all cursor-pointer ${getLinkClass('/Profile')}`}
          >
            Welcome, {username}
          </RouterLink>
          <Link
            to="hero"
            spy={true}
            smooth={true}
            duration={500}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="dishes"
            spy={true}
            smooth={true}
            duration={500}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dishes
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            About
          </Link>
          <RouterLink
            to="/Cart"
            className={`hover:text-orange-500 transition-all cursor-pointer ${getLinkClass('/Cart')}`}
          >
            Cart
          </RouterLink>
          <Link
            to="reviews"
            spy={true}
            smooth={true}
            duration={500}
            className={`hover:text-orange-500 transition-all cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}
          >
            Reviews
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-full bg-orange-500 h-[60px] w-[60px] font-bold text-white hover:bg-[#698E5B] hover:scale-105 transition-all flex justify-center items-center"
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
