import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import Footer from '../components/Footer';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Validate inputs
      if (!username || !email || !password) {
        setError("Please fill in all fields");
        return;
      }

      const res = await axios.post(`${URL}/api/auth/register`, {
        username, 
        email, 
        password
      }, {
        // Add these options to handle CORS and credentials
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Reset form and navigate on successful registration
      setUsername('');
      setEmail('');
      setPassword('');
      setError(null);
      navigate('/login');

    } catch (err) {
      // Handle specific error responses
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(err.response.data.error || "Registration failed");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server");
      } else {
        // Something happened in setting up the request
        setError("Error processing registration");
      }
      console.error('Registration Error:', err);
    }
  };

  return (
   <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md md:max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">
          <Link to="/" className="hover:text-blue-500">Blog-Web</Link>
        </h1>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center text-gray-800">Create Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              value={username}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your Name"
              required
            />
            <input
              type="email"
              value={email}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
            <input
              type="password"
              value={password}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          </form>

          {error && <h3 className="text-red-500 text-center mt-2">{error}</h3>}

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to={'/login'} className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
      <div className="w-full mt-8">
        <Footer />
      </div>
    </div>
   </>
  );
}

export default Register;
