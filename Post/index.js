const bodyParser = require("body-parser");
const express = require("express");
const crypto = require("crypto")
const cors = require("cors")
const multer = require("multer")
const mongoose = require('mongoose');
const model_post = require('./db')
const axios =require('axios');
const { type } = require("os");

mongoose.connect('mongodb+srv://at180144:pbmadl7B2qDV6KSM@cluster0.qvph5.mongodb.net/post?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));




const app=express();
const upload =multer({dest:'uploads/'})

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.get('/posts',async (req,res)=>{
    try {
        const posts= await model_post.find()
        console.log(posts)
        res.status(200).send({status:'ok',
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
     

  
    
});
app.get('/post/:id', async(req,res)=>{

    try {
        const post= await model_post.findById(req.params.id)
        console.log(post)
        res.status(200).send({status:'ok',
            post
        })
    } catch (error) {
        console.log(error)
        res.status(400)
    }
    
});



const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: "Không có token xác thực" });
    }

    try {
        const response = await axios.post(
            "http://localhost:4003/authen_token",{},
            {
                headers: {
                    Authorization: authHeader
                }
            }
        );

        if (response.data && response.data.success) {
            // Xác thực thành công, chuyển tiếp middleware
            return next();
        } else {
            // Xác thực thất bại
            return res.status(403).json({ message: "Token không hợp lệ" });
        }
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Token không hợp lệ hoặc lỗi khi xác thực" });
    }
};

app.post('/post', authenticateToken, async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = new model_post({
            title: title,
            content: content
        });
        await post.save();

        await axios.post("http://localhost:4010/event", {
            type: "create-post",
            data: {
                id: post.id
            }
        });

        res.status(201).send({ status: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'fail' });
    }
});



app.listen(4000,()=>{
    console.log("server running on port 4000");
})
