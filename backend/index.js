const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoute = require('./src/routes/auth')

require('dotenv').config()
app.use(express.json())

app.use(cors())

const corsOptions = {
  origin:"*",
  credential:true
}

app.use(cors(corsOptions))


const connect_db= async (req,res)=>{
  const db = await   mongoose.connect(process.env.MONGO_URL)
  console.log("mongodb is connected successfully")
}
connect_db()

const port = 7000

app.listen(port,()=>{
  console.log( `the server is running on the port ${port}`)
})