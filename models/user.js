const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   
    id:Number,
    email:{
        type:String,
        unique:true,
        required:true 
    },
    username:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstTimeLogin:{type:Boolean,default:true}
});
module.exports= mongoose.model('user',userSchema);