import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from './Menu'
import { IoSearchOutline } from "react-icons/io5"
import { CiMenuBurger } from "react-icons/ci"
import { UserContext } from '../context/UserContext'

function Navbar() {
   const [prompt, setPrompt] = useState("")
   const [menu, setMenu] = useState(false)
   const navigate = useNavigate()
   const path = useLocation().pathname

   const showMenu = () => {
     setMenu(!menu)
   }

   const { user } = useContext(UserContext)

   return (
     <div className='w-full h-16 border-b-4 px-6 flex justify-between items-center bg-white shadow-md'>
       <h1 className='text-2xl font-bold text-gray-900'><Link to="/">Blog-Web</Link></h1>
       { path === '/' && 
         <div className='flex items-center gap-2'>
           <input 
             className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
             type="text" 
             placeholder='Search'
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
           />
           <p className='cursor-pointer text-xl text-gray-600 hover:text-gray-900' onClick={() => navigate(prompt ? "?search=" + prompt : '/')}> 
             <IoSearchOutline />
           </p>
         </div>
       }
       <div className='flex items-center gap-4'>
         { user 
  ? <Link className='text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200' to={"/write"}>Write</Link>
           : <Link className='text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200' to={"/login"}>Login</Link>
         }
         { user 
           ? <div className='cursor-pointer text-2xl text-gray-700 hover:text-blue-600 transition duration-200' onClick={showMenu}>
               <CiMenuBurger/>
               {menu && <Menu/>}
             </div>
           : <Link className='text-lg font-medium text-gray-700 hover:text-blue-600 transition duration-200' to={"/register"}>Register</Link>
         }
       </div>
       <div onClick={showMenu} className='md:hidden text-2xl cursor-pointer relative'>
         <CiMenuBurger className='text-gray-700 hover:text-blue-600 transition duration-200'/>
         {menu && <Menu/>}
       </div>
     </div>
   )
}

export default Navbar
