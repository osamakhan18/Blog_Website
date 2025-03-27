const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

// Routes
const authRoute = require('./src/routes/auth')
const postRoute = require('./src/routes/post')
const commentRoute = require('./src/routes/comment')
const userRoute = require('./src/routes/user')

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// Static file serving
app.use("/images", express.static(path.join(__dirname, '/images')))

// Load environment variables
require('dotenv').config()

// Routes
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/users", userRoute)
app.use("/api/comment", commentRoute)

// Database Connection
const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}
connect_db()

// Server Start
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})