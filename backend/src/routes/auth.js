const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')

 // register User
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      username, email, password: hashPassword
    })

    const saveUser = await newUser.save()
    res.status(200).json(saveUser) // Removed duplicate response

  } catch (error) {
    res.status(500).json("error occurred: " + error.message)
  }
})

// Login
router.post('/login', async (req, res) => {
   try {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
      return res.status(401).json("user cannot be found")
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
      return res.status(401).json("incorrect password")
    }

    const token = jwt.sign(
      {_id: user._id, username: user.username, email: user.email}, 
      process.env.KEY
    )
    const { password, ...info } = user.toObject(); // Corrected destructuring

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }).status(200).json(info)

    // Logout route (corrected)
    router.get('/logout', async (req, res) => {
      try {
        res.clearCookie("token", {
          sameSite: "none",
          secure: true
        }).status(200).json("logout successfully")
      } catch (error) {
        res.status(401).json("cannot logout, please try later")
      }
    })
  } catch (error) {
    res.status(401).json("login error: " + error.message)
  }
})

// refetch the user data
router.get('/refetch', async (req, res) => {
  try {
    const token = req.cookies.token
    jwt.verify(token, process.env.KEY, async (err, data) => {
      if (err) {
        return res.status(401).json("cannot verify")
      }
      res.status(200).json(data)
    })
  } catch (error) {
    res.status(404).json("cannot found: " + error.message)
  }
})

module.exports = router