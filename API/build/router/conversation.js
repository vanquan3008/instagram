const ConversationController = require('../controllers/conversationController.js');
const express = require('express');
const router = express.Router();
router.post('/', ConversationController.createConversation);
router.get('/:userID', ConversationController.findUserChat);
router.get('/find/:firstUserID/:secondUserID', ConversationController.findConversations);
module.exports = router;