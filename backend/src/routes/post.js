const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const Comment = require('./comment')
const Post = require('./Post');
const bcrypt = require('bcrypt')
const verifyToken = require('/VerifyToken')

// create post 

router.post('/createPost',verifyToken, async (req,res)=>{
try{
  const newPost  = new Post(req.body)
  const savedPost = newPost.save()
  res.status(200).json(savedPost)
}catch(err){
  res.status(404).json("error occur")
}

})

// update post 
 router.put("/:id",verifyToken,async (req,res)=>{
 try{
  const updatePost = Post.findByIdAndUpdate(req.params.id,
    {$set:req.body},
    {$new:true}
  )
  res.status(200).json(updatePost)
 }catch(err){
  res.status(404).json("error occur")
}


 })

 // delete post 

 router.delete("/:id",verifyToken,async (req,res)=>{
  try{
    await Post.findByIdAndDelete(req.params.id)
  await Comment.findByIdAndDelete({PostId:req.params.id})
  
  res.status(200).json("delete successfully ")

  }catch(err){
    res.status(404).json("error occur")
  }
  

 })

 // get Post details

 router.get("/:id",async (req,res)=>{
try{
  const post = Post.findById(req.params.id)
  res.status(200).json(post)
}catch(err){
  res.status(404).json("error occur")
}

 })

// get post

router.get('/',async(req,res)=>{
 

  try{
    const searchfilter ={
      title:{$regex:express.querry.search,$option:"i"}
    }
    const posts = await post.find(express.querry.search?searchfilter:null)
    res.status(200).json(savedPost)
  }catch(err){
    res.status(404).json("error occur")
  }
})


// get user post 

router.get("user/user/Id",async(req,res)=>{
 try{
  const posts = await Post.find({userId:req.params.id})
 res.status(200).json(posts)
 }catch(err){
  res.status(404).json("error occur")
}
})

module.exports = router
