const express = require("express");
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const connect = require("./config/db");
const userController = require("./controller/user.controller");
const authController = require("./controller/auth");
const feedController = require("./controller/feed.controller");


app.use("/register",userController);
app.use("/login",authController);
app.use("/feed",feedController)

app.listen(5000,async()=>{
    try{
        await connect()
        console.log("Listening on Port 5000")
    }
    catch(err){
        console.error(err)
    }
})