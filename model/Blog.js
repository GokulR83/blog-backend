const mongoose = require("mongoose");

//? Creating Schema
const blogSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    title:{
        type: String,
        trim: true,
        required: true,
    },
    summary:{
        type: String,
        trim: true,
        required:true,
    },
    content:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"SubContent",
    }],
    blogPicture: {
        type: String,
        default:"",
    },
    timestamp:{
        type: Date,
        default: Date.now,
    }
})

//? Creating model
const BlogPost = mongoose.model("BlogPost",blogSchema);

module.exports = BlogPost;