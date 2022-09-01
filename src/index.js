const express = require("express");
const app = express()
app.use(express.json())
const connect = require("./config/db");

app.listen(5000,async()=>{
    try{
        await connect()
        console.log("Listening on Port 5000")
    }
    catch(err){
        console.error(err)
    }
})