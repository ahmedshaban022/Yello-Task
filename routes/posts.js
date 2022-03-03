const express = require('express');
const router = express.Router();

const postsCtrl= require('../controllers/posts');


router.post('/add-post',postsCtrl.addPost);
router.get('/user-posts/:id',postsCtrl.getPostsByUserId);
router.get('/',postsCtrl.getPosts);
router.delete('/delete-post/:id',postsCtrl.deletePost);
router.put('/update-post/:id',postsCtrl.editPost);





module.exports= router;