const authRouter = require('./auth.js');
const conversationRouter = require('./conversation.js');
const messageRouter = require('./message.js');

function router(app){
    app.use('/auth', authRouter);
    app.use('/conversation', conversationRouter);
    app.use('/message', messageRouter);
}

module.exports = router;