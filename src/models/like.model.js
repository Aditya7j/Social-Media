const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    feed_id:{type:mongoose.Schema.Types.ObjectId,ref:"feed",required:true,},
    likes : [{ 
        user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true}
    }],


})

const Like = mongoose.model("like",likeSchema)
module.exports = Like;




