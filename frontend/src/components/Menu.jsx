import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Menu() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true })
      setUser(null)
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="absolute right-0 top-16 bg-white shadow-lg rounded-lg w-48 p-4 flex flex-col gap-2 text-gray-800 border">
      {!user && (
        <Link className="block px-4 py-2 hover:bg-gray-100 rounded-md" to={'/login'}>
          Login
        </Link>
      )}
      {!user && (
        <Link className="block px-4 py-2 hover:bg-gray-100 rounded-md" to={'/register'}>
          Register
        </Link>
      )}
      {user && (
        <Link className="block px-4 py-2 hover:bg-gray-100 rounded-md" to={'/profile/' + user._id}>
          Profile
        </Link>
      )}
      {user && (
        <Link className="block px-4 py-2 hover:bg-gray-100 rounded-md" to={'/myblogs/' + user._id}>
          My Blogs
        </Link>
      )}
      {user && (
        <button
          onClick={handleLogOut}
          className="block px-4 py-2 text-left w-full hover:bg-red-100 text-red-500 rounded-md"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Menu
