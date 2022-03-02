const Users= require('../models/user');
const Posts = require("../models/posts");
const bcrypt= require('bcrypt');
const axios = require('axios');




const jwt= require('jsonwebtoken');
const { get } = require('express/lib/response');

const userCtrl={
register: async (req,res)=>{
    const {username,email,password}=req.body;
    
    let checkEmailExist =await Users.findOne({email});
    if (checkEmailExist) return res.status(400).send({msg:"Email Already Exists"});
    if (password.length<6) return res.status(400).send({msg:"Password must be 6 digits or more"});
    
    let users = await Users.find();
    let id=users.length+1;
    const hashedPassword=await bcrypt.hashSync(password,10);
    const newUser= new Users({id,username,email,password:hashedPassword});
    let result=await newUser.save();
    token= jwt.sign({id:result.id,_id:result._id,email:result.email},"AHMED");
    res.send({msg:'Registeration Successfuly',token,data:{id:result.id,email:result.email,usernmae:result.email}});
},
login: async (req,res)=>{
const {email,password}= req.body;
const user= await Users.findOne({email});
if (!user) return res.status(400).send({msg:"Invalid Credentials"});
const checkPassword=bcrypt.compareSync(password,user.password);
if(!checkPassword) return res.status(400).send({msg:"Invalid Credentials"});

if(user.firstTimeLogin)
{
    await Users.findByIdAndUpdate(user._id,{firstTimeLogin:false});
    
    let userIDforAPI =(user.id<11)?user.id:Math.floor(Math.random()*10);
    let postsFromApi= await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userIDforAPI}`);

            postsFromApi.data.map(post=>{
           post.userId=user.id;  
        });
       
        await Posts.insertMany(postsFromApi.data);
       
}

let posts = await Posts.find({userId:user.id});
token= jwt.sign({id:user.id,_id:user._id,email:user.email},"AHMED");
    if(!token) return res.status(400).send({msg:"Access Denied"});

    return res.send({msg:"Login successfuly",data:posts,token});


},
getAllUsers:async (req,res)=>{
    const {token}= req.headers;
    let tokenData;
    try{
         tokenData= await jwt.verify(token,"AHMED");
         let users  = await Users.find({},{password:0,firstTimeLogin:0});
         res.status(200).send({msg:"success",data:users});
    }catch(err)
    {
        res.status(400).send({msg:err.message});
    }
  
}
}

module.exports=userCtrl;