import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Link,useNavigation } from 'react-router-dom'


function Menu() {

  
  const {user} = useContext(UserContext)
  const {setUser} = useContext(UserContext)
  const navaigate = useNavigation()
  const handleLogOut = async ()=>{
    try{
      const res = await axios.get('/api/auth/logout',{withCredentials:true})
      setUser(null)
      navaigate('/login')

    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
    <div className='bg-black text-amber-50 z-10 '>
      {!user  && <h3>
   <Link to={'/login'}>Login</Link>
        </h3>
        }

        // register
         {!user  && <h3>
   <Link to={'/register'}>Register</Link>
        </h3>


        }
         {user  && <h3>
   <Link to={'/profile'+ user._id}>Profile</Link>
        </h3>
        }



         {user  && <h3>
   <Link to={'/myblogs'+ user._id}>My Blogs</Link>
        </h3>
        }


         {user   &&
        <h3 onClick={()=>{handleLogOut}}>Logout</h3>
        }

    </div>
    </>
  )
}

export default Menu