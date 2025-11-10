const jwt = require('jsonwebtoken')
const User = require("../models/User")

const protect = async ( req , res , next) => 
{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
    {
        try{
            // Get TOKEN FROM THE HEADER
            token = req.headers.authorization.split(' ')[1];

            //Verify TOKEN
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get usr from token
            req.user= await  User.findById(decoded.id).select('-password');

            next();
        }
        catch(err){
            return res.status(401).json({
                message:'Not authorized, token failed'
            });
        }
    }
    if(!token)
    {
        return res.status(401).json({
            message:'Not authorized, No token'
        });
    }
};

module.exports={ protect };