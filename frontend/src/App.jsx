import React from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import PostDetails from './pages/PostDetails'
import EditPost from './pages/EditPost'
import MyBlog from './pages/MyBlog'
import Profile from './pages/Profile'

function App() {
 

  return (
    <>
    <Routes>
      <Route exact path='/' element ={<Home/>}/>
      <Route exact path='/login' element ={<Login/>}/>
      <Route exact path='/register' element ={<Register/>}/>
      <Route exact path='/write' element ={<CreatePost/>}/>
      <Route exact path='/post/post/:id' element ={<PostDetails/>}/>
      <Route exact path='/edit/:id' element ={<EditPost/>}/>
      <Route exact path='/myblogs/:id' element ={<MyBlog/>}/>
      <Route exact path='/profile/:id' element ={<Profile/>}/>

    </Routes>
    </>
  )
}

export default App
