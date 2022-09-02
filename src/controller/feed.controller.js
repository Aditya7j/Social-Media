const express = require("express");
const { uploadSingle } = require("../middleware/Fileupload");
const Feed = require("../models/feed.model");
const fs = require("fs");

const router = express.Router()

router.post("/", uploadSingle("profile_pic"),async(req,res)=>{
    try{
        const feed = await Feed.create({
        text:req.body.text,
        profile_pic:req.file.path,
        user_id:req.body.user_id
         })   
       console.log("hi");
         res.status(201).send(feed);
 
         }catch(err){
             res.status(501).send(err)
         }
})

router.get("/",async(req,res)=>{
    try{
        const feed = await Feed.find().lean().exec()
        res.status(200).send(feed)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.delete("/",async(req,res)=>{
    try{
        const feed = await Feed.findByIdAndDelete(req.params.id).lean().exec()
        res.status(200).send(feed)
    }
    catch(err){
        res.status(500).send(err)
    }
})

module.exports = router;