const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');
router.get('/:chatID', messageController.getMessage);
router.post('/', messageController.createMessage);
module.exports = router;