const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');



router.get('/timeline/postsuccess/:userid',postController.getPostSuccess)
router.get('/timeline/:userid',postController.getPostTimeLine)
router.post('/create',postController.createPost)



module.exports = router