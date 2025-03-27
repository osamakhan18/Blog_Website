const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const Comment = require('../models/Comment')
const Post = require('../models/Post');
const bcrypt = require('bcrypt')
const verifyToken = require('../../VerifyToken');

// create comment
router.post('/create', verifyToken, async (req, res) => {
 try {
  const newComment = new Comment(req.body)
  const savedComment = await newComment.save()
  res.status(200).json(savedComment)
 }
 catch(err) {
  res.status(500).json("error occurred")
 }
})

// update comment
router.put('/:id', verifyToken, async (req, res) => {
 try {
  const updateComment = await Comment.findByIdAndUpdate(req.params.id,
    {$set: req.body},
    {new: true})
    res.status(200).json(updateComment)
 } catch(err) {
  res.status(500).json("error occurred")
 }
})

// delete comment
router.delete("/:id", verifyToken, async (req, res) => {
 try {
  await Comment.findByIdAndDelete(req.params.id)
  res.status(200).json("comment section is deleted")
 } catch(err) {
  res.status(500).json("error occurred")
 }
})

// get comment
router.get("/post/:postId", verifyToken, async (req, res) => {
 try {
  const getComment = await Comment.find({postId: req.params.postId})
  res.status(200).json(getComment)
 } catch(err) {
  res.status(500).json("error occurred")
 }
})

module.exports = router