const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken = async (req,res,next)=>{
  const token = req.cookies.token

  jwt.verify(_id,process.env.KEY,async (err,data)=>{
    if(!token){
      res.status(401).json("cannot found the cookie")

    }
    res.status(200).json(data)

  })

}
module.exports = verifyToken

