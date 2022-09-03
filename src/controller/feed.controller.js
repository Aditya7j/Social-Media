const express = require("express");
const { upload } = require("../middleware/Fileupload");
const Feed = require("../models/feed.model");
const fs = require("fs");
const path = require("path");

const router = express.Router()

router.post("/", upload.single("profile_pic"),async(req,res)=>{
    console.log(req.file)
    console.log(req)
    try{
        
        const feed = await Feed.create({
        text:req.body.text,
        profile_pic:req.file.path,
        user_id:req.body.user_id
        
         })   
       
         res.status(201).send(feed); 
         }catch(err){
             res.status(500).send(err.message)
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