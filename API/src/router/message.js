const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');

router.post('/',messageController.createMessage);
router.get('/:chatID',messageController.getMessage);



module.exports = router;