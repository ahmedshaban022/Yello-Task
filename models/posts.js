const mongoose = require('mongoose');


const postsSchema = new mongoose.Schema({
    userId:{
        type:String,
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
    }
});
module.exports= mongoose.model('user',userSchema);