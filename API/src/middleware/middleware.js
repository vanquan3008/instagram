const jwt = require('jsonwebtoken')
const middleware = {
    //Verify whether the user is himself or not (When login is successful)
    verifyToken : async (req, res, next) =>{
        const Token = req.headers.token;
        if(Token){
            const accesstoken = Token.split("")[1];
            console.log(accesstoken);
            jwt.verify(accesstoken , process.env.JWT_ACCESS_KEY , 
                (err, user) =>{
                    if(err){
                        return res.status(403).json({
                            message : 'Invalid Token'
                        })
                    }
                req.user = user;
                next();
            })
        }
        else{
            return res.status(401).json({
                message : 'You are not authenticated'
            })
        }
    },

    // Generate the access token
    generateAccessToken : (user) =>{
        return jwt.sign({
                id : user.id,
                isAdmin : user.isAdmin
            }, 
            process.env.JWT_ACCESS_KEY,
            {expiresIn : "30d"})
    }, 

    //Generate the refresh token
    generateRefreshToken : (user) =>{
        return jwt.sign({
                id : user.id,
                isAdmin : user.isAdmin
            }, 
            process.env.JWT_REFRESH_KEY,
            {expiresIn : "365d"})
    }
}

module.exports = middleware;