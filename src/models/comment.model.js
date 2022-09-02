const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true,},
    feed_id:{type:mongoose.Schema.Types.ObjectId,ref:"feed",required:true,},
    comment:{type:String,required:true}
})

const Comment = mongoose.model("comment",commentSchema)
module.exports = Comment;

