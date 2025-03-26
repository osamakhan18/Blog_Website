const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const Comment = require('./comment')
const Post = require('./Post');
const bcrypt = require('bcrypt')
const verifyToken = require('/VerifyToken')

// create comment
router.post('/create',verifyToken, async (req,res)=>{
 try{
  const newComment = new Comment(req.body)
  const savedComment = await  newComment.save()
  res.status(200).json(savedComment)
 }
 catch(err){
  res.status(404).json("errer occur")
 }

})

// update comment

router.put('/:id',verifyToken,async (req,res)=>{
 try{
  const updateComment = await Comment.findByIdandUpdate(req.params.id,
    {$set:req.body},
    {new:true})
    res.status(200).json(updateComment)
  

 }catch(err){
  res.status(404).json("errer occur")

 }

})

// delete comment

router.delete("/:id",verifyToken,async (req,res)=>{
try{
  await Comment.findByIdandDelete(req.params.id)
  res.status(200).json("comment section is deleted")
}catch(err){
  res.status(404).json("errer occur")

 }

})

// get comment

router.get("post/post/Id",verifyToken,async(req,res)=>{
try{
  const getComment = Comment.find({PostId:req.params.PostId})
  res.status(200).json(getComment)
}
catch(err){
  res.status(404).json("errer occur")

}
})

module.exports = router

