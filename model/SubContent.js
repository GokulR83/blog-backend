const mongoose = require("mongoose");


const subContentSchema = new mongoose.Schema({
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"BlogPost",
    },
    subheading:{
        type:String,
        trim: true,
    },
    content:{
        type: String,
        trim:true
    }
});

const SubContent = mongoose.model("SubContent", subContentSchema);


module.exports = SubContent;