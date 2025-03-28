import React, { useContext, useState } from 'react'
import { ImCross } from "react-icons/im";
import Footer from '../components/Footer';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


function CreatePost() {
  const [title,usitle]= useState('')
  const [desc,setdesc] = useState('')
  const [file,setfile] = useState(null)
  const [cats,setCats] = useState([])
  const [cat,setCat] = useState('a')
  const {user} = useContext(UserContext)

  const navigate = useNavigate()

  const addCaterory = ()=>{
    const updateCats = [...cats]
       updateCats.push(cat)
       setCat("")
       setCats(updateCats)


  }


  const deleteCats = (i)=>{
 let updateCats = [...cats]
 updateCats.splice(i)
 setCats(updateCats)
  }

  const handleCreates = async (e)=>{
    e.preventDefault()
    const post = {
      title:desc,
      username:user.username,
      userId:user._id,
      categories:cats
    }

    if(file){
      const data = new FormData()
      const filename = Date.now() + filename
      data.append("img",filename)
      data.append("file",file)
      post.photo = filename
    }

    try{
      const imgUpload = await axios.post("api/upload",data)
    }catch(err){
      console.log(err)
    }

  }



  return (
   <>

   </>
  )
}

export default CreatePost