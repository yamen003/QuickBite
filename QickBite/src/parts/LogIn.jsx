import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      console.log(res.data); // Handle successful login (e.g., store token, etc.)
      setLoading(false);
      localStorage.setItem('token', res.data.token);
        console.log('Login successful, token stored:', res.data.token);
      navigate('/Home.jsx'); 
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-[50%] h-[50%] md:h-full">
        <img src="src/assets/image.png" alt="Chef" className="w-full h-full object-cover" />
      </div>
      <div className="w-full md:w-[50%] h-[50%] md:h-full bg-white flex flex-col justify-center items-start px-8 md:px-16">
        <div className="mt-10 md:mt-0">
          <h1 className="font-light text-xs md:text-3xl sm:text-3xl sm:mt-10">Welcome To</h1>
          <h1 className="text-left text-pretty text-3xl md:text-5xl font-semibold text-[#E56F0B]">QuickBite</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 md:mt-20">
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email Address"
            className="block w-[300px] md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F0B] transition duration-200 ease-in-out"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="block w-[300px] md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F0B] transition duration-200 ease-in-out"
            required
          />
          <br />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="mt-5">
            <button
              type="submit"
              className={`block w-[150px] bg-[#E56F0B] text-white py-3 rounded-lg font-semibold hover:bg-[#d55f0a] transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </div>
          <br />
          <div>
            <h2 className="text-left">No Account? <Link to="/signup" className="text-[#E56F0B]">Click Here</Link></h2>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
