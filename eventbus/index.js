const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors")
const axios =require('axios')



const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.post('/event', (req,res)=>{
   try {
    axios.post("http://localhost:4001/check-event",req.body)
    console.log(req.body)

    
   } catch (error) {
    console.log(error)
   }
});





app.listen(4010,()=>{
    console.log("server running on port 4010");
})