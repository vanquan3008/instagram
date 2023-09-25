const router = require('express').router;
const messageController = require('../controllers/messageController.js');

router.post('/',messageController.createMessage);
router.get('/:chatID',messageController.getMessage);



module.exports = router;