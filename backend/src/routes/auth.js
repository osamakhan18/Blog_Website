const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')

 // register User
router.post('/register',async (req,res)=>{
  try{
    const { username,email,password,} = req.body

    const  salt= await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const newUser = new User({
      username,email,password:hashPassword
    })

    const saveUser = await  newUser.save()
    res.status(200).json("user saved successfully")

  }catch{
    res.status(500).json("error occur ")
    
  }

})

// Login

router.post('/login',async (req,res)=>{
   try{
    // const {email,password} = req.body
    const user =await User.findOne({email:req.body.email})
    if(!user){
      res.status(401).json("user  cannot found ")
    }
    const match = await bcrypt.compare(req.body.password,user.password)
    if(!match){
      res.status(401).json("incorrect password")
    }

    const token = jwt.sign({_id,username:user.username,email:user.email},
      process.env.KEY)
      const { password, ...info } = user.doc;
res.cookie("token",token,{
  httpOnly:true,
  secure:true,
  sameSite:'none'
}).status(200).json(info)


  

   }catch{
    res.status(401)

   }
})