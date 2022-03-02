const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    userId:{
        type:Number,
        required:true 
    },
    id:Number,
    title:{
        type:String
    },
    body:{
        type:String,
    }
});
module.exports= mongoose.model('post',postSchema);