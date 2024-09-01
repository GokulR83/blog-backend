const mongoose = require("mongoose");

//? Create A User Schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required: true,
    },
    profilePicture:{
        type: String,
        default:"https://res.cloudinary.com/dhkzebr3n/image/upload/v1725083084/profilePicture_ice3ko.jpg",
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"BlogPost"
    }]
},{ timestamps: true });

//? Creating a model for user Schema
const User = mongoose.model("User",userSchema);
module.exports = User;