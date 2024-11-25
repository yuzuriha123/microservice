const bodyParser = require("body-parser");
const express = require("express");
const crypto = require("crypto")
const cors = require("cors")
const mongoose = require('mongoose');
const model_comment=require('./db')
const model_checkid=require("./db-event")

mongoose.connect('mongodb+srv://at180144:pbmadl7B2qDV6KSM@cluster0.qvph5.mongodb.net/comment?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));



const app=express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())


app.get('/post/:id/comment',async(req,res)=>{
    
    try {
        const postid=new mongoose.Types.ObjectId(req.params.id)
        const comments= await model_comment.find({idPost:postid})
        console.log(comments)
        res.status(200).send({status:'ok',
            comments
        })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
    
});


app.post('/post/:id/comment',async(req,res)=>{
   
    try {
        const postid=new mongoose.Types.ObjectId(req.params.id)
        const{name,content}=req.body;
        if(model_checkid.findOne({idPost:postid})){
            const comment= new model_comment({
                name:name,
                content:content,
                idPost:postid
            })
            comment.save()
            res.status(201).send({status:'ok'})
        }
        else{
            res.status(401).send({status:'fail'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).send({status:'fail'})
    }


})

app.post('/check-event',async(req,res)=>{
   try {
    if(req.body.type==='create-post'){
        const postid =new model_checkid({
            idPost:req.body.data.id
        })
        postid.save()

    }
    
   } catch (error) {
    console.log(error)
   }
    
});




app.listen(4001,()=>{
    console.log("server running on port 4001");
})
