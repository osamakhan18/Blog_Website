import React, { useState } from 'react'
import { Link, useLocation,  useNavigate,  useNavigation } from 'react-router-dom'
import Menu from './Menu';
import { IoSearchOutline } from "react-icons/io5"
import { CiMenuBurger } from "react-icons/ci";
function Navbar() {
  const [prompt,setprompt] = useState("")
  const [menu,setMenu] = useState(false)
  const navaigate =useNavigation()
  const path = useLocation().pathname

  const showmenu = ()=>{
    setMenu(!menu)
  }

  

  return (
    <>
    <div className='w-[100%] h-[30%] border border-[4px]  p-6 flex justify-between items-center'>
      <h1 className='text-xl text-2xl'><Link>Blog-Web</Link></h1>
    { path ==='/' && <div onChange={(e)=>{e.target.value}} className='flex justify-center items-center '>
  <input  className='p-2 border ' type="text" placeholder='Search' />
  <p onClick={()=>navaigate(prompt?"?search"+prompt:navaigate('/'))}>
  <IoSearchOutline />
  </p>
  </div>

  }

  <div className='w-auto h-auto flex '>
{
  user ? <Link to={"/write"}>write</Link>:<Link to={"/login"}>Login</Link>
}

{
  user ? <div onClick={showmenu}>
    <p className='curser'>    </p>
    <CiMenuBurger/>
    {menu && <Menu/>}
  </div> : <Link to={"register"}>register</Link>
}

  </div>
  <div onClick={showmenu} className='md:hidden text-2xl'>
    <p className='curser-pointer relative'>
    <CiMenuBurger/>
      </p> 
      {menu && <Menu/>}
       </div>

    </div>
    </>
  )
}

export default Navbar