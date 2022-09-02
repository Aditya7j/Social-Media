const express = require("express")
const Like = require("../models/like.model")
const router = express.Router()

router.post("/:feed_id",async(req,res)=>{
    try{
        console.log("hello")
        let like = await Like.findOne({feed_id:req.params.feed_id});
        console.log(like)
        if(like){
            like = await Like.findOneAndUpdate({feed_id:req.params.feed_id},{
                feed_id:req.params.feed_id,
                likes:[...like.likes,{user_id:req.body.likes[0].user_id}]
            },{new:true})
        }
        else{
            like = await Like.create({
                feed_id:req.params.feed_id,
                likes:[{user_id:req.body.likes[0].user_id}]
            })
        }   
        res.status(200).send(like)
    }
    catch(err){
        res.status(500).send(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        const like = await Like.find().lean().exec()
        res.status(200).send(like)
    }
    catch(err){
        res.status(500).send(err)
    }
})

module.exports = router;