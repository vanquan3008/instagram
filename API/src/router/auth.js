const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js')
const middleware = require('../middleware/middleware.js');


router.post('/login',authController.loginUser);
router.post('/logout',middleware.verifyToken,authController.logoutUser);
router.post('/register',authController.registerUser);
router.post('/refreshtoken',authController.refreshToken);
router.get('/find/search/' , authController.getUserNamebyQuery);
router.get('/find/:id',authController.getUserID);
router.put('/:id/follower',authController.updateUserFollow);
router.put('/:id/unfollower',authController.updateUserUnFollow);
router.get('/:username',authController.getUsername);





module.exports = router;