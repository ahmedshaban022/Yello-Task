const Users= require('../models/user');
const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

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
    token= jwt.sign({id:result._id},"AHMED");
    res.send({msg:'Registeration Successfuly',token,data:{id:result.id,email:result.email,usernmae:result.email}});
}

}



module.exports=userCtrl;