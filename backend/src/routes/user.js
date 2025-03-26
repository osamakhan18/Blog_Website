const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const Comment = require('./comment')
const Post = require('./Post');
const bcrypt = require('bcrypt')

const verifyToken = require('/VerifyToken')

// update the user
router.put("/:id",verifyToken,async (req,res)=>{
 try{
  if(req.body.password){
    const salt = await  bcrypt.genSalt(10)
   req.body.password = await bcrypt.hashSync(req.body.password,salt)
  }

  const updatedUser = await User.findByIDandUpdate(req.params.id,
    {$set:req.body},
    {new:true}
  )
res.status(200).json(updatedUser)
 }catch(err){
  res.status(401).json(err)
 } 
})


// delete the user 

router.delete('/:id',verifyToken,async (req,res)=>{

 try{
  await User.findByIDandDelete(req.params.id)
  await Post.deleteMany({userId:req.params.id})
  await Comment.deleteMany({userId:req.params.id})
  res.status(200).json("deleted user successfully")
 }catch(err){
 res.status(401).json(err)
}

})

// get user 

router.get('/:id',async (req,res)=>{
try{
  const user = await User.findById(req.params.id)
  const {password,...info} = user._doc
  res.status(200).json("get user successfully")
}catch(err){
  res.status(401).json(err)

}
})

module.exports = router