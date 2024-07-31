import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password
      });
      console.log(res.data); 
      setLoading(false);
      navigate('/Home.jsx');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Email already in use');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-fit">
        <h1 className="text-center mb-10 text-4xl md:text-5xl font-semibold text-[#E56F0B]">Create Account</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={handleChange}
            className="block w-[300px] md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F0B] transition duration-200 ease-in-out"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            className="block w-[300px] md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F0B] transition duration-200 ease-in-out"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            className="block w-[300px] md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F0B] transition duration-200 ease-in-out"
            required
          />
          <input
            type="password"
            placeholder="Re-type Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="block w-[300px] md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E56F0B] transition duration-200 ease-in-out"
            required
          />
          <button
            type="submit"
            className="block w-[150px] bg-[#E56F0B] mt-5 items-center text-white py-3 rounded-lg font-semibold hover:bg-[#d55f0a] transition duration-200 ease-in-out"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
