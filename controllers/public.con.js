const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const db=require('../models');
const User=db.users;

// Signup
exports.signUp=async(req,res)=>{
    try {
        let {username,email,password,isAdmin}=req.body;
        password=await bcryptjs.hash(password,10);
        isAdmin=isAdmin||false;
        const user=new User({username,email,password,isAdmin});
        await user.save();
        res.status(201).json({message:"User created!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}
// Login
exports.signIn=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({where:{email:email}});
        if(user===null) res.status(400).json({error:"Invalid credentials!"});
        else{
            let valid=await bcryptjs.compare(password,user.password);
            if(valid) {
                let token=jwt.sign({id:user.id},process.env.SECRET,{expiresIn:process.env.EXPIRES});
                res.status(200).json({token:token});
            }
            else res.status(400).json({error:"not valid"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}
