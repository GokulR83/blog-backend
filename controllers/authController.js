const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async(req,res,next) =>{
    try {
        const { email, password, username, fullName } = req.body;
        const existingUser = await User.findOne({ $or :[{username},{email}] });
        if(existingUser){
            return res.status(400).json({ error: "Username or email Already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password,salt);
        const newUser = new User({...req.body, password: hashedPassword });
        const savedUser = await newUser.save();
        const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRE });
        res.cookie("token",token).status(200).json({data: savedUser, token});
    } catch (error) {
        next(error);
    }
}

//? login Controller
const loginController = async(req,res,next) =>{
    try {
        let user;
        if(req.body.username){
            user = await User.findOne({ username: req.body.username });
        }
        else{
            user = await User.findOne({ email: req.body.email });
        }
        if(!user){
            return res.status(404).json({ error:"user not found!" });
        }

        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
            return res.status(401).json({ error:"Wrong Credentials" });
        }
        const {password, ...data} = user._doc;
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRE });
        res.cookie("token",token).status(200).json({data,token});
    } catch (error) {
        next(error);
    }
}

//? Logout Controller

const logoutController = async(req,res,next) =>{
    try {
        res.clearCookie("token",{ sameSite:"none", secure: true }).status(200).json("logged out successfully!");
    } catch (error){
        next(error);
    }
}

//? Refetch User Controller
const refetchUserController = async(req,res,next) =>{
    const token = req.cookies.token
    jwt.verify(token,process.env.JWT_SECRET,{},async(err,data)=>{
        if(err){
            return res.status(404).json({ error: err });
        }
        try {
            const id = data._id
            const user = await User.findOne({ _id:id });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    })
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    refetchUserController
}