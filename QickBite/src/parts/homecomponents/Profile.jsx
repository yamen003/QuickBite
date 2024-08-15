import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState({ nameuser: '', emailuser: '' })
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(response.data);
        } catch (error) {
          console.error('Fetch profile error', error);
          setError('Failed to fetch profile. Redirecting to login...');
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
    fetchProfile();
  }, [navigate]);

  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="mb-4">
        <strong>Name:</strong> {profile.nameuser}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {profile.emailuser}
      </div>
    </div>
  );
}

export default Profile;
