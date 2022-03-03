const Posts= require('../models/posts');
const Users= require('../models/user');
const jwt = require('jsonwebtoken');


const postsCtrl={
    getPosts:async (req,res)=>{
        try {
            
            const {token}= req.headers;
            let tokenData = await jwt.verify(token,"AHMED");
            const isUser= await Users.findById(tokenData._id);
            if(!isUser) return res.status(400).send({msg:"Access Denied. Log in first"});
            
            let posts = await Posts.find({userId:tokenData.id});
            res.send({msg:"success",data:posts,id:tokenData.id})
        } catch (error) {
            res.status(400).send({msg:error.message});
        }

    },
addPost: async (req,res)=>{
       
    try{
        const {token}= req.headers;
        
       let tokenData = await jwt.verify(token,"AHMED");
        const isUser= await Users.findById(tokenData._id);
        if(!isUser) return res.status(400).send({msg:"Access Denied. Log in first"});

         const {title,body}=req.body;
         let allPosts= await Posts.find();
         let id=allPosts.length+1;

         if(!title || !body) return res.status(400).send({msg:"Post has Missing Data"});
         const newPost= new Posts ({userId:tokenData.id,title,body,id})
            newPost.save();
          res.status(200).send({msg:"success"});
    }catch(err)
    {
        res.status(400).send({msg:err.message});
    }


    },

    deletePost: async(req,res)=>{

    try {
    
       const {token}= req.headers;
       if(!token) return  res.status(400).send({msg:"Token not found!!"});

       let tokenData= await jwt.verify(token,"AHMED");
       const isUser= await Users.findById(tokenData._id);
       if(!isUser) return res.status(400).send({msg:"Access Denied. Login first"});
       
       let postId = req.params.id;
       let post = await Posts.findOne({_id:postId});
       if(!post) return res.status(400).send({msg:"Post Not Found!"});
        
       if(post.userId != tokenData.id) return res.status(400).send({msg:"Access denied !"});

         await Posts.findByIdAndDelete(post._id);
         res.status(200).send({msg:"post deleted successfuly"});

    } catch (err) {
        res.status(400).send({msg:err.message});
    }

    },

    editPost: async(req,res)=>{


        try {
    
            const {token}= req.headers;
            if(!token) return  res.status(400).send({msg:"Token not found!!"});
     
            let tokenData = await jwt.verify(token,"AHMED");
            const isUser  = await Users.findById(tokenData._id);
            if(!isUser)     return res.status(400).send({msg:"Access Denied. Login first"});
            
            let postId = req.params.id;
            let post = await Posts.findOne({_id:postId});
            if(!post) return res.status(400).send({msg:"Post Not Found!"});
         
            if(post.userId != tokenData.id) return res.status(400).send({msg:"Access denied !"});
            
            const {title,body}=req.body;
              await Posts.findByIdAndUpdate(post._id,{title,body});
              res.status(200).send({msg:"post updated successfuly"});
     
         } catch (err) {
             res.status(400).send({msg:err.message});
         }



    },
    getPostsByUserId: async(req,res)=>{
       
        try {
            
        const {token}= req.headers;
       let tokenData= await jwt.verify(token,"AHMED");
       const isUser= await Users.findById(tokenData._id);
       if(!isUser) return res.status(400).send({msg:"Access Denied. Login first"});

       let userId=req.params.id;
        let posts= await Posts.find({userId});
            res.status(200).send({msg:"success",data:posts});

    } catch (err) {
        return res.status(400).send({msg:err.message});
    }

    }    
    
    }
    
    
    
    module.exports=postsCtrl;