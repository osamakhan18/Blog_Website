const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer');
const path = require('path')
const cookieParser = require('cookie-parser')
const authRoute = require('./src/routes/auth')
const postRoute = require('./src/routes/post')
const commentRoute = require('./src/routes/comment')
const userRoute = require('./src/routes/user')

const corsOptions = {
 origin: "*",
 credentials: true
}

app.use(cors(corsOptions))

// middleware
app.use("/images", express.static(path.join(__dirname, '/images')))

require('dotenv').config()
app.use(express.json())

app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/users", userRoute)
app.use("/api/comment", commentRoute)

// upload image
const storage = multer.diskStorage({
 destination: (req, file, fn) => {
   fn(null, "images")
 },
 filename: (req, file, fn) => {
   fn(null, req.body.img)
 }
})

const upload = multer({storage: storage})
app.post("/api/post", upload.single('img'), (req, res) => {
 res.status(200).json("image upload successfully")
})

const connect_db = async () => {
 const db = await mongoose.connect(process.env.MONGO_URL)
 console.log("mongodb is connected successfully")
}
connect_db()

const port = 4000

app.listen(port, () => {
 console.log(`the server is running on the port ${port}`)
})