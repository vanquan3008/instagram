const authRouter = require('./auth.js');

function router(app){
    app.use('/auth', authRouter);
}

module.exports = router;