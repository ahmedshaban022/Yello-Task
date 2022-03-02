const Posts= require('../models/posts');
const Users= require('../models/user');
const jwt = require('jsonwebtoken');
const postsCtrl={
addPost: async (req,res)=>{
        
    const {token}= req.headers;
    try{
        
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

    },
    editPost: async(req,res)=>{

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