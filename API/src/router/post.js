const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');



router.get('/timeline/postsuccess/:userid',postController.getPostSuccess)
router.delete('/delete/:postid' , postController.deletePost);
router.put('/update/:postid' , postController.updatePost);
router.get('/timeline/:userid',postController.getPostTimeLine)
router.put('/like/:postid',postController.likePost)
router.post('/create',postController.createPost)



module.exports = router