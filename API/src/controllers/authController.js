const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

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
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if (validPassword) {
                    //Login success and create jwt token
                    const token = jwt.sign(
                        { 
                            _id: user._id , 
                            isAdmin: user.isAdmin
                        }, 
                        process.env.JWT_ACCESS_KEY, 
                        { expiresIn: 3600 }
                    )
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
    }

}


module.exports = authController;