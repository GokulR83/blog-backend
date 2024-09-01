const BlogPost = require("../model/Blog");
const User = require("../model/User");
const SubContent = require("../model/SubContent");
const cloudinary = require('cloudinary').v2;

//* Create
const createBlogPostController = async(req,res,next) =>{
    try {
        const { userId } = req.params;
        const { title, summary, content } = JSON.parse(req.body.blogData);
        cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const result = await cloudinary.uploader.upload(req.file.path , {
        folder:'uploads'
        });
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ error:"user not found!" });
        }
        const newPost = new BlogPost({
            user: userId,
            title: title,
            summary: summary,
            blogPicture: result.secure_url,
        });
        await newPost.save();
        content.map(async(con)=>{
            const newSubContent = new SubContent({
                blog:newPost._id,
                subheading:con.subheading,
                content:con.content,
            })
            await newSubContent.save();
            const newPost1 = await BlogPost.findById(newPost._id);
            newPost1.content.push(newSubContent._id);
            await newPost1.save();
        })
        user.blogs.push(newPost._id);
        await user.save();
        const existPost = await BlogPost.findById(newPost._id).populate("content");
        res.status(201).json({ message:"Blog Created", post:existPost });
    } catch (error) {
        next(error); 
    }
}
//* Get All Blog Posts
const getAllBlogPostController = async(req,res,next) =>{
    try {
        const posts = await BlogPost.find({}).populate("content");
        if(!posts){
            return res.status(404).json({ error:"post not found!" });
        }
        res.status(200).json({ posts });
    } catch (error) {
        next(error);
    }
}

//? Get One Specific Post
const getBlogPostController = async(req,res,next) =>{
    const { postId } = req.params;
    try {
        const post = await BlogPost.findById(postId).populate("content").populate('user');
        if(!post){
            return res.status(404).json({ error:"post not found!" });
        }
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}


//? Delete Post Controller
const deleteBlogPostController = async(req,res,next) =>{
    const { postId } = req.params;
    try {
        const post = await BlogPost.findById(postId);
        if(!post){
            return res.status(404).json({ error:"post not found!" });
        }
        await BlogPost.findByIdAndDelete(postId);
        await SubContent.deleteMany({ blog: postId });
        res.status(200).json({ message: "Post Deleted!" });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createBlogPostController,
    getAllBlogPostController,
    getBlogPostController,
    deleteBlogPostController
}