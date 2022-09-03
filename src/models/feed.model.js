const mongoose = require("mongoose")

const feedSchema = new mongoose.Schema({
    text:{type:String,required:false},
    profile_pic:{type:String,required:false},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true,}
},{
    versionKey:false,
    timestamps:true
})

const Feed = mongoose.model("feed",feedSchema)


module.exports = Feed;