import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { URL } from '../url';
function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const navigate = useNavigate();

   const handleLogin = async (e) => {
     e.preventDefault();
     try {
       const res = await fetch(URL+ '/api/auth/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
         body: JSON.stringify({ email, password }),
       });

       const data = await res.json();

       if (res.ok) {
         console.log('Login successful', data);
         navigate('/');
       } else {
         setError(data.message || 'Login failed');
       }
     } catch (err) {
       console.error('Login error:', err);
       setError('Network error. Please try again.');
     }
   };

   return (
     <>
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
           <h1 className="text-3xl font-bold text-center mb-4">
            <Link to="/">Blog-Web</Link>
 </h1>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center">Login</h2>
            
           <form onSubmit={handleLogin}>
              <input
                type="email"
                className="w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
               value={email}
                onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
               required
               />

               <input
                 type="password"
                 className="w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Enter Your Password"
                 required
               />

               <button
                 type="submit"
                 className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
               >
                 Login
               </button>
             </form>
           </div>

           {error && <h3 className="text-red-500 text-center mt-2">{error}</h3>}

           <p className="text-center mt-4 text-gray-600">
             Don't have an account?{' '}
             <Link to={'/register'} className="text-blue-500 hover:underline">Register</Link>
           </p>
         </div>
       </div>
       <div>
         <Footer />
       </div>
     </>
   );
}

export default Login;