const express = require('express');
const app=express();

const mongoose= require('mongoose');
const DB_URL="mongodb+srv://uahmed:27727746@main.zojjg.mongodb.net/yello-task?retryWrites=true&w=majority";
try {
    mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(res=>{console.log("Connected to DB");})
// .catch((err)=>console.log(err));
} catch (error) {
    console.log(error.message);
}
app.use(require('cors')());
app.use(express.json());

app.use('/users',require('./routes/users'));
app.use('/posts',require('./routes/posts'));


app.use(express.static('client/build'));
app.get('*',(req,res)=>{
   res.sendFile(`${__dirname}/client/build/index.html`)
})

// app.listen( 5000);
 app.listen(process.env.PORT || 5000);
