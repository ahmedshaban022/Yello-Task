const Posts= require('../models/posts');
const jwt = require('jsonwebtoken');
const postsCtrl={
addPost: async (req,res)=>{
        
    const {token}= req.headers;
    let tokenData;
    try{
         tokenData= await jwt.verify(token,"AHMED");
         const {title,body}=req.body;
         let allPosts= await Posts.find();
         let id=allPosts.length+1;
         if(!title || !body) return res.status(400).send({msg:"Missing Data"});
         const newPost= new Posts ({userId:tokenData.id,title,body,id})
            newPost.save();
          res.status(200).send({msg:"success"});
    }catch(err)
    {
        res.status(400).send({msg:err.message});
    }


    }
    
    }
    
    
    
    module.exports=postsCtrl;