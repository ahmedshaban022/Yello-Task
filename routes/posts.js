const express = require('express');
const router = express.Router();

const postsCtrl= require('../controllers/posts');


router.post('/add-post',postsCtrl.addPost);
router.get('/user-posts/:id',postsCtrl.getPostsByUserId);





module.exports= router;