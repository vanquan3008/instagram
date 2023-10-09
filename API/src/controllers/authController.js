const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const middleware = require('../middleware/middleware.js')
let refreshTokens = [];

const authController = {
    //[Post]/Register
    registerUser: async (req, res) => { 
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                fullname : req.body.username,
            })
            const user = await newUser.save()
            res.status(201).json(user)
        } 
        catch (error) {
            res.status(400).json(error)
        }
    },
    //[POST]/Login
    loginUser : async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (user) {
                const validPassword = await bcrypt.compare(
                    req.body.password, 
                    user.password
                );
                if (validPassword) {
                    //Login success and create jwt token
                    const token = middleware.generateAccessToken(user);
                    const newrefreshtoken = middleware.generateRefreshToken(user);
                    refreshTokens.push(newrefreshtoken);
                    //Save new refresh token to cookie
                    res.cookie("refreshToken", newrefreshtoken, {
                        httpOnly: true,
                        secure : false,
                        path: "/",
                        sameSite: "strict",
                    });
                    const {password , ...other} = user._doc; 
                    res.status(200).json({ token ,...other})
                } else {
                    res.status(400).json({ message: 'Invalid password' })
                }
            } 
            else {
                res.status(400).json({ message: 'Invalid username' })
            }
        } 
        catch (error) {
            res.status(400).json(error)
        }
    },

    //[POST]/LogOut
    logoutUser : async (req,res) => {
        //Clear cookies when user logs out
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    },
    //[POST] /Refresh Token 
    refreshToken: async(req,res)=>{
        const rftoken =  req.cookies.refreshToken;
        if (!rftoken) {
            return res.status(401).json("You are not authenticated");
        }
       
        if (!refreshTokens.includes(rftoken)) {
            return res.status(403).json("Refresh token is not valid");
        }
       
        //Verify refresh
        jwt.verify(rftoken , process.env.JWT_REFRESH_KEY , 
            (err,user)=>{
                if(err) {
                    return res.status(404).json({message:"Error refreshing token"});
                }
                else {
                    //Create new access token and refresh token
                    const newtoken = middleware.generateAccessToken(user);
                    const newrefreshtoken = middleware.generateRefreshToken(user);
                    refreshTokens.push(newrefreshtoken);  
                    refreshTokens = refreshTokens.filter((token) => token !== rftoken);
                    //Save new refresh token
                    res.cookie("refreshToken", newrefreshtoken, {
                        httpOnly: true,
                        secure : false,
                        path: "/",
                        sameSite: "strict",
                    });
                    res.status(200).json({newtoken , refreshTokens})
                }
            }
        )
        res.status(200)
    },
    //[GET]/
    getUsername : async (req,res)=>{
        try{
            const user = await User.findOne({username : req.params.username});
            if(user){
                const {password , createdAt , updatedAt, token  , ...others} = user._doc; 
                res.status(200).json(others);
            }
            else{
                res.status(404).json({message : "User not found"});
            }
        }
        catch(err){
            res.status(404).json({message : "Error"});
        }
    },
    //Get user by id
    //[GET]/:id
    getUserID : async (req, res) => {
        try{
            const user = await User.findOne({_id : req.params.id});
            const {password , createdAt , updatedAt, token  , ...others} = user._doc;
            if (others) {
                res.status(200).json(others);
            } else {
                res.status(404).json("User not found");
            }
        }
        catch(err){
            res.status(500).json({message:"Not found"});
        }
    }

}


module.exports = authController;