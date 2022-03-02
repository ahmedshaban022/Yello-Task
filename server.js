const express = require('express');
const app=express();

const mongoose= require('mongoose');
const DB_URL="mongodb+srv://uahmed:27727746@main.zojjg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(res=>{console.log("Connected to DB");})
.catch((err)=>console.log(err));
app.use(require('cors')());
app.use(express.json());

app.use('/users',require('./routes/users'));
  app.use('/posts',require('./routes/posts'));
    app.listen(5000);
