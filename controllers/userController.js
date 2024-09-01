const BlogPost = require("../model/Blog");
const User = require("../model/User");
const cloudinary = require('cloudinary').v2;

//? Get User Controller
const getUserController = async(req,res,next) =>{
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('blogs');
    if(!user){
      return res.status(404).json({ error:"user not found!" });
    }
    const {password, ...data} = user._doc;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

//? Update User Controller
const updateUserController = async(req,res,next) =>{
  try {
    const{ userId } = req.params;
    const updatedData = req.body;
    const userToUpdate = await User.findById(userId);
    if(!userToUpdate){
      return res.status(404).json({ error:"user not found!" });
    }
    Object.assign(userToUpdate, updatedData);
    await userToUpdate.save();

    res.status(200).json({ message:"Profile Updated", user: userToUpdate });
  } catch (error) {
    next(error);
  }
}

//? Delete User Controller
const deleteUserController = async(req,res,next) =>{
  try {
    const { userId } = req.params;
    const userToDelete = await User.findById(userId);
    if(!userToDelete){
      return res.status(404).json({ error:"user not found!" });
    }
    await BlogPost.deleteMany({ user: userId });
    await userToDelete.deleteOne();
    res.status(200).json({ message: " User Deleted" });
  } catch (error) {
    next(error);
  }
}

const uploadProfilePicture = async(req,res,next) =>{
    const { userId } = req.params;
    try {
      cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = await cloudinary.uploader.upload(req.file.path , {
       folder:'uploads'
    });
    const user = await User.findByIdAndUpdate(userId, { profilePicture: result.secure_url },{ new:true });
        if(!user){
            return res.status(404).json({ error:"user not found!" });
        }
        res.status(200).json({ message:"Profile Picture Updated Successfully!", user })
  } catch (error) {
    next(error);
  }
}

module.exports = {
    uploadProfilePicture,
    getUserController,
    deleteUserController,
    updateUserController
}