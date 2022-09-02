const express = require("express")
const router = express.Router()
const Comment = require("../models/comment.model");

router.post("/",async(req,res)=>{
    try{
        const comment = await Comment.create(req.body)
        res.status(200).send(comment)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        const comment = await Comment.find().lean().exec()
        res.status(200).send(comment)
    }
    catch(err){
        res.status(500).send(err)
    }
})

module.exports = router