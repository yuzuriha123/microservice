const bodyParser = require("body-parser");
const express = require("express");
const crypto = require("crypto")
const cors = require("cors")
const mongoose = require('mongoose');
const axios =require('axios');
const model_user=require("./db")
const passport=require("passport")
const bcrypt =require("bcrypt")
const LocalStrategy = require('passport-local').Strategy;
const jwt = require("jsonwebtoken")



mongoose.connect('mongodb+srv://at180144:pbmadl7B2qDV6KSM@cluster0.qvph5.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));

const app=express();
app.use(passport.initialize());
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


passport.use(new LocalStrategy(
    async (username, password, done) => {
      console.log(password);
      try {
        const user = await model_user.findOne({ username: username });
        console.log(user);
        if (!user) {
          return done(null, false, { message: "Sai tên đăng nhập" });
        }
        // Sử dụng await để đảm bảo bcrypt.compare trả về đúng kết quả so sánh
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          console.log("dung mk");
          return done(null, user);
        } else {
          return done(null, false, { message: "Sai mật khẩu" });
        }
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  

  
  // Route đăng nhập và tạo token JWT
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) return res.status(500).json({ success: false, message: "Đã xảy ra lỗi" });
      if (!user) {
        return res.status(401).json({ success: false, message: info.message });
      }
      const token = jwt.sign({ id: user._id }, "taolathanhdeptraivcl", { expiresIn: "3h" });
      res.json({ success: true, token });
    })(req, res, next);
  });
  
  // Middleware xác thực JWT
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Chưa cung cấp token" });
  
    jwt.verify(token, "taolathanhdeptraivcl", (err, user) => {
      if (err) return res.status(403).json({ message: "Token không hợp lệ" });
      req.user = user;
      next();
    });
  };

  app.post("/authen_token",authenticateToken,(req, res, next) => {
    res.status(200).send({
        success:true
    })
  });
  

  
  // Hàm tạo tài khoản admin mặc định
  async function createAdminUser() {
    const existingUser = await model_user.findOne({ username: "admin" });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("tuchoancut123", 10);
      const user = new model_user({
        username: "admin",
        password: hashedPassword,
      });
      await user.save();
      console.log("Admin user created");
    }
  }
  // Chạy hàm tạo admin nếu cần thiết
  // createAdminUser();
  
  app.listen(4003, () => {
    console.log("Server running on port 4003");
  });