const jwt=require('jsonwebtoken');
const db=require('../models');
const User=db.users;

exports.auth=async(req,res,next)=>{
    try {
        const token=req.headers["x-access-token"];
        if(!token) res.status(401).json({error:"User is unauthorized!"});
        else{
            const obj=jwt.verify(token,process.env.SECRET);
            const user=await User.findByPk(obj.id);
            req.user=user;
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
}

exports.checkAdmin=async(req,res,next)=>{
    try {
        if(req.user.isAdmin===false) res.status(401).json({error:"User is not admin!"});
        else next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
}