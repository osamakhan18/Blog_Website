const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
  title:{
    type:String,
    required:true,
    unique:true

  },
  desc:{
    type:String,
    required:true,
    unique:true
  },
  photo:{
    type:String,
    required:true,
    
  },
  username:{
    type:String,
    required:true,
  },
  userId:{
    type:String,
    required:true,
   
  },
  categories:{
    type:Array
  },
},{timeStamp:true})

module.exports = mongoose.model("Post",PostSchema)